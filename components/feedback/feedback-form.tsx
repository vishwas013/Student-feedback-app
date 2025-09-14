"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { storage } from "@/lib/storage"
import type { Feedback } from "@/lib/types"
import { Star } from "lucide-react"

interface FeedbackFormProps {
  initialData?: Feedback
  isEditing?: boolean
}

export function FeedbackForm({ initialData, isEditing = false }: FeedbackFormProps) {
  const [courseId, setCourseId] = useState(initialData?.courseId || "")
  const [rating, setRating] = useState(initialData?.rating || 0)
  const [message, setMessage] = useState(initialData?.message || "")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const courses = storage.getCourses()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!courseId) {
      setError("Please select a course")
      return
    }

    if (rating === 0) {
      setError("Please provide a rating")
      return
    }

    if (!message.trim()) {
      setError("Please provide feedback message")
      return
    }

    if (!user) {
      setError("You must be logged in to submit feedback")
      return
    }

    setIsLoading(true)

    try {
      if (isEditing && initialData) {
        storage.updateFeedback(initialData.id, {
          courseId,
          rating,
          message: message.trim(),
        })
      } else {
        const newFeedback: Feedback = {
          id: Date.now().toString(),
          studentId: user.id,
          courseId,
          rating,
          message: message.trim(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        storage.createFeedback(newFeedback)
      }

      router.push("/feedback")
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStarClick = (starRating: number) => {
    setRating(starRating)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Feedback" : "Submit New Feedback"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update your course feedback" : "Share your thoughts about a course"}
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
            <Label htmlFor="course">Course</Label>
            <Select value={courseId} onValueChange={setCourseId} disabled={isEditing}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => handleStarClick(star)} className="focus:outline-none">
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-400 transition-colors`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating} star${rating !== 1 ? "s" : ""}` : "No rating"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Feedback Message</Label>
            <Textarea
              id="message"
              placeholder="Share your detailed feedback about the course..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : isEditing ? "Update Feedback" : "Submit Feedback"}
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
