"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/contexts/auth-context"
import { storage } from "@/lib/storage"
import { Star, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export function FeedbackList() {
  const { user } = useAuth()
  const [deleteError, setDeleteError] = useState("")

  if (!user) return null

  const userFeedback = storage.getFeedbackByStudent(user.id)
  const courses = storage.getCourses()

  const handleDelete = (feedbackId: string) => {
    try {
      storage.deleteFeedback(feedbackId)
      setDeleteError("")
      // Force re-render by updating the component
      window.location.reload()
    } catch (error) {
      setDeleteError("Failed to delete feedback. Please try again.")
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800"
    if (rating >= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  if (userFeedback.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="mb-4">
            <Star className="h-12 w-12 text-muted-foreground mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">No feedback yet</h3>
          <p className="text-muted-foreground mb-4">You haven't submitted any course feedback yet.</p>
          <Button asChild>
            <Link href="/feedback/new">Submit Your First Feedback</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {deleteError && (
        <Alert variant="destructive">
          <AlertDescription>{deleteError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {userFeedback
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((feedback) => {
            const course = courses.find((c) => c.id === feedback.courseId)
            return (
              <Card key={feedback.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course?.name || "Unknown Course"}</CardTitle>
                      <CardDescription>{course?.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRatingColor(feedback.rating)}>
                        <Star className="h-3 w-3 mr-1" />
                        {feedback.rating}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">{feedback.message}</p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>
                        <span>Submitted: {new Date(feedback.createdAt).toLocaleDateString()}</span>
                        {feedback.updatedAt.getTime() !== feedback.createdAt.getTime() && (
                          <span className="ml-4">Updated: {new Date(feedback.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/feedback/edit/${feedback.id}`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this feedback? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(feedback.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
