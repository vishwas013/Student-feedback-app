"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { storage } from "@/lib/storage"
import { Edit, Trash2, Plus, BookOpen } from "lucide-react"
import Link from "next/link"

export function CourseList() {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")

  const courses = storage.getCourses()
  const feedback = storage.getFeedback()

  const handleDeleteCourse = (courseId: string) => {
    try {
      // Check if course has feedback
      const courseFeedback = feedback.filter((f) => f.courseId === courseId)

      if (courseFeedback.length > 0) {
        setMessage(`Cannot delete course. It has ${courseFeedback.length} feedback submission(s).`)
        setMessageType("error")
        return
      }

      storage.deleteCourse(courseId)
      setMessage("Course deleted successfully")
      setMessageType("success")
      // Force re-render
      window.location.reload()
    } catch (error) {
      setMessage("Failed to delete course")
      setMessageType("error")
    }
  }

  const getCourseStats = (courseId: string) => {
    const courseFeedback = feedback.filter((f) => f.courseId === courseId)
    const averageRating =
      courseFeedback.length > 0
        ? (courseFeedback.reduce((sum, f) => sum + f.rating, 0) / courseFeedback.length).toFixed(1)
        : "N/A"

    return {
      feedbackCount: courseFeedback.length,
      averageRating,
    }
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="mb-4">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">No courses yet</h3>
          <p className="text-muted-foreground mb-4">Create your first course to get started.</p>
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              Add First Course
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Course Management</CardTitle>
            <CardDescription>Manage courses available for student feedback</CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert
            className={`mb-4 ${messageType === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
          >
            <AlertDescription className={messageType === "error" ? "text-red-800" : "text-green-800"}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Feedback Count</TableHead>
                <TableHead>Average Rating</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => {
                const stats = getCourseStats(course.id)
                return (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{course.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{stats.feedbackCount}</Badge>
                    </TableCell>
                    <TableCell>{stats.averageRating}</TableCell>
                    <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild className="bg-transparent">
                          <Link href={`/admin/courses/edit/${course.id}`}>
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
                              <AlertDialogTitle>Delete Course</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{course.name}"?
                                {stats.feedbackCount > 0 && (
                                  <span className="text-red-600 font-medium">
                                    {" "}
                                    This course has {stats.feedbackCount} feedback submission(s) and cannot be deleted.
                                  </span>
                                )}
                                {stats.feedbackCount === 0 && " This action cannot be undone."}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCourse(course.id)}
                                className="bg-red-600 hover:bg-red-700"
                                disabled={stats.feedbackCount > 0}
                              >
                                Delete Course
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
