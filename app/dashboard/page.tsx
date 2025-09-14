"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentFeedback } from "@/components/dashboard/recent-feedback"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { storage } from "@/lib/storage"
import { MessageSquare, BookOpen, Star, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const userFeedback = storage.getFeedbackByStudent(user.id)
  const courses = storage.getCourses()
  const averageRating =
    userFeedback.length > 0
      ? (userFeedback.reduce((sum, f) => sum + f.rating, 0) / userFeedback.length).toFixed(1)
      : "0"

  return (
    <ProtectedRoute requiredRole="student">
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">Here's an overview of your feedback activity</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total Feedback"
              value={userFeedback.length}
              description="Feedback submissions"
              icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Courses Reviewed"
              value={new Set(userFeedback.map((f) => f.courseId)).size}
              description="Unique courses"
              icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Average Rating"
              value={averageRating}
              description="Your average rating"
              icon={<Star className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Available Courses"
              value={courses.length}
              description="Total courses"
              icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks you might want to perform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full">
                    <Link href="/feedback/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Submit New Feedback
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/feedback">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      View My Feedback
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/profile">
                      <Star className="mr-2 h-4 w-4" />
                      Update Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Courses</CardTitle>
                  <CardDescription>Courses you can provide feedback on</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {courses.slice(0, 4).map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <h4 className="font-medium text-sm">{course.name}</h4>
                          <p className="text-xs text-muted-foreground">{course.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <RecentFeedback />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
