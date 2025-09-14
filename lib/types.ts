export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "student" | "admin"
  phoneNumber?: string
  dateOfBirth?: string
  address?: string
  profilePicture?: string
  isBlocked: boolean
  createdAt: Date
}

export interface Course {
  id: string
  name: string
  description: string
  createdAt: Date
}

export interface Feedback {
  id: string
  studentId: string
  courseId: string
  rating: number
  message: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<boolean>
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
}
