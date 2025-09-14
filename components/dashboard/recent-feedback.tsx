"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { storage } from "@/lib/storage"
import { useAuth } from "@/contexts/auth-context"
import { Star } from "lucide-react"

export function RecentFeedback() {
  const { user } = useAuth()

  if (!user) return null

  const userFeedback = storage.getFeedbackByStudent(user.id)
  const recentFeedback = userFeedback
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  const courses = storage.getCourses()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Feedback</CardTitle>
        <CardDescription>Your latest course feedback submissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentFeedback.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No feedback submitted yet</p>
        ) : (
          recentFeedback.map((feedback) => {
            const course = courses.find((c) => c.id === feedback.courseId)
            return (
              <div key={feedback.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{course?.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{feedback.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{feedback.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(feedback.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
