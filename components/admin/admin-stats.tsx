"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { storage } from "@/lib/storage"
import { Users, MessageSquare, BookOpen, TrendingUp } from "lucide-react"

export function AdminStats() {
  const users = storage.getUsers()
  const feedback = storage.getFeedback()
  const courses = storage.getCourses()

  const students = users.filter((user) => user.role === "student")
  const activeStudents = students.filter((user) => !user.isBlocked)
  const averageRating =
    feedback.length > 0 ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1) : "0"

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      description: `${activeStudents.length} active`,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Feedback",
      value: feedback.length,
      description: "All submissions",
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Available Courses",
      value: courses.length,
      description: "Active courses",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Average Rating",
      value: averageRating,
      description: "Overall satisfaction",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
