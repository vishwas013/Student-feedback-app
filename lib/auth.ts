import type { User } from "./types"
import { mockUsers } from "./mock-data"

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  const minLength = password.length >= 8
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const hasNumber = /\d/.test(password)
  return minLength && hasSpecialChar && hasNumber
}

export const hashPassword = async (password: string): Promise<string> => {
  // In a real app, use bcrypt. For demo purposes, we'll just return a mock hash
  return `$2b$10$${password}hashed`
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  // In a real app, use bcrypt.compare. For demo purposes, simple check
  return hash.includes(password)
}

export const generateJWT = (user: User): string => {
  // In a real app, use proper JWT library. For demo purposes, return mock token
  return `jwt_token_${user.id}_${Date.now()}`
}

export const verifyJWT = (token: string): User | null => {
  // In a real app, verify JWT properly. For demo purposes, extract user ID
  const userId = token.split("_")[2]
  return mockUsers.find((user) => user.id === userId) || null
}
