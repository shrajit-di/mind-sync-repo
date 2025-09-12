import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Gamepad2, Calendar, TrendingUp } from "lucide-react"

interface RecentActivityProps {
  data: Array<{
    date: string
    activities: number
  }>
}

export function RecentActivity({ data }: RecentActivityProps) {
  // Generate mock activity data
  const activities = [
    {
      type: "assessment",
      title: "Completed Mental Health Assessment",
      time: "2 hours ago",
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-600",
    },
    {
      type: "game",
      title: "Played Breathing Exercise",
      time: "1 day ago",
      icon: Gamepad2,
      color: "bg-green-100 text-green-600",
    },
    {
      type: "mood",
      title: "Logged Daily Mood (7/10)",
      time: "1 day ago",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      type: "assessment",
      title: "Completed Stress Assessment",
      time: "3 days ago",
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-600",
    },
    {
      type: "game",
      title: "Played Meditation Game",
      time: "4 days ago",
      icon: Gamepad2,
      color: "bg-green-100 text-green-600",
    },
  ]

  const totalActivities = data.reduce((sum, day) => sum + day.activities, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your wellness journey progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Activity Summary */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{totalActivities}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>

          {/* Activity List */}
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon

              return (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Streak Info */}
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">3-day streak!</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">Keep up the great work with your daily activities</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
