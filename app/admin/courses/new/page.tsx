"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { CourseForm } from "@/components/admin/course-form"

export default function NewCoursePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Course</h1>
            <p className="text-gray-600">Create a new course for students to provide feedback on</p>
          </div>

          <CourseForm />
        </main>
      </div>
    </ProtectedRoute>
  )
}
