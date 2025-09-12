"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardStats } from "@/components/dashboard-stats"
import { MoodTracker } from "@/components/mood-tracker"
import { ProgressCharts } from "@/components/progress-charts"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const generateMockData = () => {
  const today = new Date()
  const data = []

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      stress: Math.floor(Math.random() * 40) + 20,
      anxiety: Math.floor(Math.random() * 35) + 15,
      depression: Math.floor(Math.random() * 30) + 10,
      mood: Math.floor(Math.random() * 5) + 3, // 3-8 scale
      activities: Math.floor(Math.random() * 3) + 1,
    })
  }

  return data
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  const [dashboardData, setDashboardData] = useState(generateMockData())

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setDashboardData(generateMockData())
  }, [timeRange])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl text-center">
            <Card>
              <CardHeader>
                <CardTitle>Access Required</CardTitle>
                <CardDescription>Please sign in or use anonymous mode to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/auth">Sign In or Continue Anonymously</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back{user.isAnonymous ? "" : `, ${user.email.split("@")[0]}`}
                </h1>
                <p className="text-gray-600">
                  {user.isAnonymous
                    ? "Track your wellness journey anonymously"
                    : "Here's your mental health progress overview"}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button asChild>
                  <Link href="/assessment">
                    <Plus className="w-4 h-4 mr-2" />
                    New Assessment
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats data={dashboardData} user={user} />

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column - Charts and Progress */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as "7d" | "30d" | "90d")}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Progress Overview</h2>
                  <TabsList>
                    <TabsTrigger value="7d">7 Days</TabsTrigger>
                    <TabsTrigger value="30d">30 Days</TabsTrigger>
                    <TabsTrigger value="90d">90 Days</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="7d" className="space-y-6">
                  <ProgressCharts data={dashboardData.slice(-7)} />
                </TabsContent>
                <TabsContent value="30d" className="space-y-6">
                  <ProgressCharts data={dashboardData} />
                </TabsContent>
                <TabsContent value="90d" className="space-y-6">
                  <ProgressCharts data={dashboardData} />
                </TabsContent>
              </Tabs>

              <MoodTracker data={dashboardData} />
            </div>

            {/* Right Column - Quick Actions and Activity */}
            <div className="space-y-8">
              <QuickActions user={user} />
              <RecentActivity data={dashboardData} />
            </div>
          </div>

          {/* Anonymous User Upgrade Prompt */}
          {user.isAnonymous && (
            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2">Unlock Full Features</h3>
                    <p className="text-blue-800 mb-4">
                      Create an account to save your progress, earn coins, and access advanced features like community
                      support and personalized insights.
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/auth">Create Account</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
