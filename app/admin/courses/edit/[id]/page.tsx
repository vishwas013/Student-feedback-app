"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { CourseForm } from "@/components/admin/course-form"
import { storage } from "@/lib/storage"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { Course } from "@/lib/types"

export default function EditCoursePage() {
  const { id } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const courseData = storage.getCourseById(id as string)

    if (!courseData) {
      router.push("/admin/courses")
      return
    }

    setCourse(courseData)
    setLoading(false)
  }, [id, router])

  if (loading) {
    return (
      <ProtectedRoute requiredRole="admin">
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  if (!course) {
    return (
      <ProtectedRoute requiredRole="admin">
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
              <p className="text-gray-600">The course you're looking for doesn't exist.</p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course</h1>
            <p className="text-gray-600">Update course information</p>
          </div>

          <CourseForm initialData={course} isEditing={true} />
        </main>
      </div>
    </ProtectedRoute>
  )
}
