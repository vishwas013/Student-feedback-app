"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { FeedbackForm } from "@/components/feedback/feedback-form"

export default function NewFeedbackPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit New Feedback</h1>
            <p className="text-gray-600">Share your thoughts and help improve the learning experience</p>
          </div>

          <FeedbackForm />
        </main>
      </div>
    </ProtectedRoute>
  )
}
