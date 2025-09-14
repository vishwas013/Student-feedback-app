"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { FeedbackList } from "@/components/feedback/feedback-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Feedback</h1>
              <p className="text-gray-600">View and manage your course feedback submissions</p>
            </div>
            <Button asChild>
              <Link href="/feedback/new">
                <Plus className="mr-2 h-4 w-4" />
                New Feedback
              </Link>
            </Button>
          </div>

          <FeedbackList />
        </main>
      </div>
    </ProtectedRoute>
  )
}
