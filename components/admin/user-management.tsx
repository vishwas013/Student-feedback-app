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
import { Ban, Trash2, UserCheck } from "lucide-react"

export function UserManagement() {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")

  const users = storage.getUsers().filter((user) => user.role === "student")

  const handleBlockUser = (userId: string, isBlocked: boolean) => {
    try {
      storage.updateUser(userId, { isBlocked: !isBlocked })
      setMessage(`User ${!isBlocked ? "blocked" : "unblocked"} successfully`)
      setMessageType("success")
      // Force re-render
      window.location.reload()
    } catch (error) {
      setMessage("Failed to update user status")
      setMessageType("error")
    }
  }

  const handleDeleteUser = (userId: string) => {
    try {
      // Also delete user's feedback
      const userFeedback = storage.getFeedbackByStudent(userId)
      userFeedback.forEach((feedback) => storage.deleteFeedback(feedback.id))

      storage.deleteUser(userId)
      setMessage("User deleted successfully")
      setMessageType("success")
      // Force re-render
      window.location.reload()
    } catch (error) {
      setMessage("Failed to delete user")
      setMessageType("error")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage student accounts and permissions</CardDescription>
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Feedback Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const feedbackCount = storage.getFeedbackByStudent(user.id).length
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.isBlocked ? "destructive" : "default"}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{feedbackCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBlockUser(user.id, user.isBlocked)}
                          className={
                            user.isBlocked
                              ? "text-green-600 hover:text-green-700 bg-transparent"
                              : "text-orange-600 hover:text-orange-700 bg-transparent"
                          }
                        >
                          {user.isBlocked ? (
                            <>
                              <UserCheck className="h-4 w-4 mr-1" />
                              Unblock
                            </>
                          ) : (
                            <>
                              <Ban className="h-4 w-4 mr-1" />
                              Block
                            </>
                          )}
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
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.name}? This will also delete all their feedback.
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete User
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
