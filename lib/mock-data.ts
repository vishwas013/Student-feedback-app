import type { User, Course, Feedback } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "$2b$10$Admin123!hashed", // Admin123!
    role: "admin",
    isBlocked: false,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "$2b$10$Student123!hashed", // Student123!
    role: "student",
    phoneNumber: "+1234567890",
    dateOfBirth: "1995-05-15",
    address: "123 Main St, City, State",
    isBlocked: false,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2b$10$Student123!hashed", // Student123!
    role: "student",
    phoneNumber: "+1987654321",
    dateOfBirth: "1997-08-22",
    address: "456 Oak Ave, City, State",
    isBlocked: false,
    createdAt: new Date("2024-01-20"),
  },
]

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Introduction to Computer Science",
    description: "Basic concepts of programming and computer science",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Web Development",
    description: "HTML, CSS, JavaScript, and modern web frameworks",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    name: "Database Systems",
    description: "Relational databases, SQL, and database design",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    name: "Data Structures and Algorithms",
    description: "Fundamental data structures and algorithmic thinking",
    createdAt: new Date("2024-01-01"),
  },
]

export const mockFeedback: Feedback[] = [
  {
    id: "1",
    studentId: "2",
    courseId: "1",
    rating: 5,
    message: "Excellent course! Very well structured and easy to follow.",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "2",
    studentId: "2",
    courseId: "2",
    rating: 4,
    message: "Good course but could use more practical examples.",
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
  {
    id: "3",
    studentId: "3",
    courseId: "1",
    rating: 4,
    message: "Great introduction to CS concepts. Instructor was very helpful.",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
]
