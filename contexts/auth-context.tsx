"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { AuthContextType, User } from "@/lib/types"
import { storage } from "@/lib/storage"
import { validateEmail, validatePassword, hashPassword, comparePassword, generateJWT, verifyJWT } from "@/lib/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      const userData = verifyJWT(token)
      if (userData && !userData.isBlocked) {
        setUser(userData)
      } else {
        localStorage.removeItem("auth_token")
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUser = storage.getUserByEmail(email)
      if (!existingUser) {
        return false
      }

      if (existingUser.isBlocked) {
        return false
      }

      const isValidPassword = await comparePassword(password, existingUser.password)
      if (!isValidPassword) {
        return false
      }

      const token = generateJWT(existingUser)
      localStorage.setItem("auth_token", token)
      setUser(existingUser)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      if (!validateEmail(email)) {
        return false
      }

      if (!validatePassword(password)) {
        return false
      }

      const existingUser = storage.getUserByEmail(email)
      if (existingUser) {
        return false
      }

      const hashedPassword = await hashPassword(password)
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        role: "student",
        isBlocked: false,
        createdAt: new Date(),
      }

      storage.createUser(newUser)
      const token = generateJWT(newUser)
      localStorage.setItem("auth_token", token)
      setUser(newUser)
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false

      const updatedUser = storage.updateUser(user.id, updates)
      if (updatedUser) {
        setUser(updatedUser)
        return true
      }
      return false
    } catch (error) {
      console.error("Profile update error:", error)
      return false
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      if (!user) return false

      const isValidCurrentPassword = await comparePassword(currentPassword, user.password)
      if (!isValidCurrentPassword) {
        return false
      }

      if (!validatePassword(newPassword)) {
        return false
      }

      const hashedNewPassword = await hashPassword(newPassword)
      const updatedUser = storage.updateUser(user.id, { password: hashedNewPassword })
      if (updatedUser) {
        setUser(updatedUser)
        return true
      }
      return false
    } catch (error) {
      console.error("Password change error:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
