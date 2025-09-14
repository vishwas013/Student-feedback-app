"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { storage } from "@/lib/storage"
import { Star, Download, Filter } from "lucide-react"

export function FeedbackOverview() {
  const [courseFilter, setCourseFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const feedback = storage.getFeedback()
  const courses = storage.getCourses()
  const users = storage.getUsers()

  // Filter feedback
  const filteredFeedback = feedback.filter((f) => {
    const courseMatch = courseFilter === "all" || f.courseId === courseFilter
    const ratingMatch = ratingFilter === "all" || f.rating.toString() === ratingFilter
    return courseMatch && ratingMatch
  })

  const handleExportCSV = () => {
    const csvData = filteredFeedback.map((f) => {
      const course = courses.find((c) => c.id === f.courseId)
      const student = users.find((u) => u.id === f.studentId)
      return {
        Student: student?.name || "Unknown",
        Email: student?.email || "Unknown",
        Course: course?.name || "Unknown",
        Rating: f.rating,
        Message: f.message,
        Date: new Date(f.createdAt).toLocaleDateString(),
      }
    })

    const csvContent = [
      Object.keys(csvData[0] || {}).join(","),
      ...csvData.map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`)
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "feedback-export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-100 text-green-800"
    if (rating >= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Feedback Overview</CardTitle>
            <CardDescription>View and manage all student feedback</CardDescription>
          </div>
          <Button onClick={handleExportCSV} variant="outline" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredFeedback.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No feedback matches the current filters</p>
          ) : (
            filteredFeedback
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((f) => {
                const course = courses.find((c) => c.id === f.courseId)
                const student = users.find((u) => u.id === f.studentId)
                return (
                  <div key={f.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{course?.name || "Unknown Course"}</h4>
                        <p className="text-sm text-muted-foreground">
                          by {student?.name || "Unknown Student"} ({student?.email || "Unknown"})
                        </p>
                      </div>
                      <Badge className={getRatingColor(f.rating)}>
                        <Star className="h-3 w-3 mr-1" />
                        {f.rating}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{f.message}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Submitted: {new Date(f.createdAt).toLocaleDateString()}</span>
                      {f.updatedAt.getTime() !== f.createdAt.getTime() && (
                        <span>Updated: {new Date(f.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                )
              })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
