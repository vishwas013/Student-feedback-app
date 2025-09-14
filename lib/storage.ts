import type { User, Course, Feedback } from "./types"
import { mockUsers, mockCourses, mockFeedback } from "./mock-data"

// Simple in-memory storage for demo purposes
let users = [...mockUsers]
let courses = [...mockCourses]
let feedback = [...mockFeedback]

export const storage = {
  // User operations
  getUsers: () => users,
  getUserById: (id: string) => users.find((user) => user.id === id),
  getUserByEmail: (email: string) => users.find((user) => user.email === email),
  createUser: (user: User) => {
    users.push(user)
    return user
  },
  updateUser: (id: string, updates: Partial<User>) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates }
      return users[index]
    }
    return null
  },
  deleteUser: (id: string) => {
    users = users.filter((user) => user.id !== id)
  },

  // Course operations
  getCourses: () => courses,
  getCourseById: (id: string) => courses.find((course) => course.id === id),
  createCourse: (course: Course) => {
    courses.push(course)
    return course
  },
  updateCourse: (id: string, updates: Partial<Course>) => {
    const index = courses.findIndex((course) => course.id === id)
    if (index !== -1) {
      courses[index] = { ...courses[index], ...updates }
      return courses[index]
    }
    return null
  },
  deleteCourse: (id: string) => {
    courses = courses.filter((course) => course.id !== id)
  },

  // Feedback operations
  getFeedback: () => feedback,
  getFeedbackById: (id: string) => feedback.find((f) => f.id === id),
  getFeedbackByStudent: (studentId: string) => feedback.filter((f) => f.studentId === studentId),
  getFeedbackByCourse: (courseId: string) => feedback.filter((f) => f.courseId === courseId),
  createFeedback: (feedbackItem: Feedback) => {
    feedback.push(feedbackItem)
    return feedbackItem
  },
  updateFeedback: (id: string, updates: Partial<Feedback>) => {
    const index = feedback.findIndex((f) => f.id === id)
    if (index !== -1) {
      feedback[index] = { ...feedback[index], ...updates, updatedAt: new Date() }
      return feedback[index]
    }
    return null
  },
  deleteFeedback: (id: string) => {
    feedback = feedback.filter((f) => f.id !== id)
  },
}
