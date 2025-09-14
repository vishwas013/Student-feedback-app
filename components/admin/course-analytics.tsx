"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { storage } from "@/lib/storage"
import { Star, MessageSquare } from "lucide-react"

export function CourseAnalytics() {
  const feedback = storage.getFeedback()
  const courses = storage.getCourses()

  const courseStats = courses.map((course) => {
    const courseFeedback = feedback.filter((f) => f.courseId === course.id)
    const averageRating =
      courseFeedback.length > 0 ? courseFeedback.reduce((sum, f) => sum + f.rating, 0) / courseFeedback.length : 0

    return {
      ...course,
      feedbackCount: courseFeedback.length,
      averageRating: Number(averageRating.toFixed(1)),
      ratingDistribution: {
        5: courseFeedback.filter((f) => f.rating === 5).length,
        4: courseFeedback.filter((f) => f.rating === 4).length,
        3: courseFeedback.filter((f) => f.rating === 3).length,
        2: courseFeedback.filter((f) => f.rating === 2).length,
        1: courseFeedback.filter((f) => f.rating === 1).length,
      },
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Analytics</CardTitle>
        <CardDescription>Feedback trends and ratings by course</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courseStats.map((course) => (
            <div key={course.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">{course.name}</h4>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.averageRating || "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MessageSquare className="h-3 w-3" />
                    <span>{course.feedbackCount} reviews</span>
                  </div>
                </div>
              </div>

              {course.feedbackCount > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium mb-2">Rating Distribution:</p>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <span className="text-sm w-8">{rating}★</span>
                      <Progress
                        value={
                          (course.ratingDistribution[rating as keyof typeof course.ratingDistribution] /
                            course.feedbackCount) *
                          100
                        }
                        className="flex-1 h-2"
                      />
                      <span className="text-sm text-muted-foreground w-8">
                        {course.ratingDistribution[rating as keyof typeof course.ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
