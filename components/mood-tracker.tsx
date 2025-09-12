import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Smile, Meh, Frown } from "lucide-react"

interface MoodTrackerProps {
  data: Array<{
    date: string
    mood: number
  }>
}

export function MoodTracker({ data }: MoodTrackerProps) {
  const recentMoods = data.slice(-7)

  const getMoodIcon = (mood: number) => {
    if (mood >= 7) return { icon: Smile, color: "text-green-500", bg: "bg-green-100" }
    if (mood >= 5) return { icon: Meh, color: "text-yellow-500", bg: "bg-yellow-100" }
    return { icon: Frown, color: "text-red-500", bg: "bg-red-100" }
  }

  const getMoodLabel = (mood: number) => {
    if (mood >= 8) return "Great"
    if (mood >= 7) return "Good"
    if (mood >= 5) return "Okay"
    if (mood >= 3) return "Low"
    return "Poor"
  }

  const averageMood = recentMoods.reduce((sum, day) => sum + day.mood, 0) / recentMoods.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Daily Mood Tracker</CardTitle>
            <CardDescription>Track your daily mood to identify patterns</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Log Mood
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Average Mood */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm text-blue-600 font-medium">7-Day Average</p>
              <p className="text-2xl font-bold text-blue-900">{averageMood.toFixed(1)}/10</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">{getMoodLabel(averageMood)}</Badge>
          </div>

          {/* Recent Moods */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Recent Entries</h4>
            <div className="grid grid-cols-7 gap-2">
              {recentMoods.map((day, index) => {
                const moodInfo = getMoodIcon(day.mood)
                const Icon = moodInfo.icon
                const date = new Date(day.date)

                return (
                  <div key={index} className="text-center">
                    <div
                      className={`w-10 h-10 rounded-full ${moodInfo.bg} flex items-center justify-center mx-auto mb-1`}
                    >
                      <Icon className={`w-5 h-5 ${moodInfo.color}`} />
                    </div>
                    <p className="text-xs text-gray-500">{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
                    <p className="text-xs font-medium">{day.mood}/10</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mood Scale Reference */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Mood Scale</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <Frown className="w-6 h-6 text-red-500 mb-1" />
                <span className="text-xs text-gray-600">1-4: Low</span>
              </div>
              <div className="flex flex-col items-center">
                <Meh className="w-6 h-6 text-yellow-500 mb-1" />
                <span className="text-xs text-gray-600">5-6: Okay</span>
              </div>
              <div className="flex flex-col items-center">
                <Smile className="w-6 h-6 text-green-500 mb-1" />
                <span className="text-xs text-gray-600">7-10: Good</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
