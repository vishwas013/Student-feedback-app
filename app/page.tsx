import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Feedback System</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform for students to provide feedback on courses and for administrators to manage the
            educational experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">For Students</CardTitle>
              <CardDescription>Share your thoughts and help improve the learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Submit feedback on courses</li>
                <li>• Rate your learning experience</li>
                <li>• Manage your profile</li>
                <li>• Track your feedback history</li>
              </ul>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">For Administrators</CardTitle>
              <CardDescription>Manage courses, users, and analyze feedback data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-left space-y-2 text-gray-600">
                <li>• View comprehensive analytics</li>
                <li>• Manage student accounts</li>
                <li>• Oversee course feedback</li>
                <li>• Export data for analysis</li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/auth/login">Admin Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Demo Credentials</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div>
                <strong>Admin:</strong> admin@example.com / Admin123!
              </div>
              <div>
                <strong>Student:</strong> john@example.com / Student123!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
