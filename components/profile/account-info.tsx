"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { storage } from "@/lib/storage"
import { Calendar, Mail, Phone, MapPin, User, MessageSquare } from "lucide-react"

export function AccountInfo() {
  const { user } = useAuth()

  if (!user) return null

  const userFeedback = storage.getFeedbackByStudent(user.id)
  const averageRating =
    userFeedback.length > 0
      ? (userFeedback.reduce((sum, f) => sum + f.rating, 0) / userFeedback.length).toFixed(1)
      : "0"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Your account information and activity summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Full Name</p>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {user.phoneNumber && (
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
                </div>
              </div>
            )}

            {user.dateOfBirth && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p className="text-sm text-muted-foreground">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            {user.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{user.address}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Account Status</span>
              <Badge variant={user.isBlocked ? "destructive" : "default"}>
                {user.isBlocked ? "Blocked" : "Active"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Role</span>
              <Badge variant="outline">{user.role === "student" ? "Student" : "Administrator"}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Member Since</span>
              <span className="text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Feedback</span>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{userFeedback.length}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Rating</span>
              <span className="text-sm text-muted-foreground">{averageRating} / 5.0</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
