"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { storage } from "@/lib/storage"
import { useAuth } from "@/contexts/auth-context"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { Feedback } from "@/lib/types"

export default function EditFeedbackPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || !id) {
      setLoading(false)
      return
    }

    const feedbackItem = storage.getFeedbackById(id as string)

    if (!feedbackItem) {
      router.push("/feedback")
      return
    }

    if (feedbackItem.studentId !== user.id) {
      router.push("/feedback")
      return
    }

    setFeedback(feedbackItem)
    setLoading(false)
  }, [id, user, router])

  if (loading) {
    return (
      <ProtectedRoute requiredRole="student">
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

  if (!feedback) {
    return (
      <ProtectedRoute requiredRole="student">
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Feedback Not Found</h1>
              <p className="text-gray-600">
                The feedback you're looking for doesn't exist or you don't have permission to edit it.
              </p>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute requiredRole="student">
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Feedback</h1>
            <p className="text-gray-600">Update your course feedback</p>
          </div>

          <FeedbackForm initialData={feedback} isEditing={true} />
        </main>
      </div>
    </ProtectedRoute>
  )
}
