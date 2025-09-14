"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { storage } from "@/lib/storage"
import type { Course } from "@/lib/types"

interface CourseFormProps {
  initialData?: Course
  isEditing?: boolean
}

export function CourseForm({ initialData, isEditing = false }: CourseFormProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Course name is required")
      return
    }

    if (!description.trim()) {
      setError("Course description is required")
      return
    }

    // Check for duplicate course names (excluding current course if editing)
    const existingCourses = storage.getCourses()
    const duplicateCourse = existingCourses.find(
      (course) => course.name.toLowerCase() === name.trim().toLowerCase() && course.id !== initialData?.id,
    )

    if (duplicateCourse) {
      setError("A course with this name already exists")
      return
    }

    setIsLoading(true)

    try {
      if (isEditing && initialData) {
        storage.updateCourse(initialData.id, {
          name: name.trim(),
          description: description.trim(),
        })
      } else {
        const newCourse: Course = {
          id: Date.now().toString(),
          name: name.trim(),
          description: description.trim(),
          createdAt: new Date(),
        }
        storage.createCourse(newCourse)
      }

      router.push("/admin/courses")
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Course" : "Add New Course"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update course information" : "Create a new course for student feedback"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Course Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter course name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Course Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update Course" : "Create Course"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
