"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { CourseList } from "@/components/admin/course-list"

export default function CoursesPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">Add, edit, and manage courses available for student feedback</p>
          </div>

          <CourseList />
        </main>
      </div>
    </ProtectedRoute>
  )
}
