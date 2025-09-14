"use client"

import { ProtectedRoute } from "@/components/layout/protected-route"
import { Navbar } from "@/components/layout/navbar"
import { AdminStats } from "@/components/admin/admin-stats"
import { UserManagement } from "@/components/admin/user-management"
import { FeedbackOverview } from "@/components/admin/feedback-overview"
import { CourseAnalytics } from "@/components/admin/course-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, courses, and monitor feedback analytics</p>
          </div>

          <div className="mb-8">
            <AdminStats />
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="feedback">Feedback Overview</TabsTrigger>
              <TabsTrigger value="analytics">Course Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <FeedbackOverview />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <CourseAnalytics />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  )
}
