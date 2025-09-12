import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Brain, Heart, Shield, Coins } from "lucide-react"

interface DashboardStatsProps {
  data: Array<{
    date: string
    stress: number
    anxiety: number
    depression: number
    mood: number
    activities: number
  }>
  user: {
    isAnonymous: boolean
    coins: number
  }
}

export function DashboardStats({ data, user }: DashboardStatsProps) {
  const latest = data[data.length - 1]
  const previous = data[data.length - 8] // Week ago

  const calculateTrend = (current: number, previous: number) => {
    const change = current - previous
    if (Math.abs(change) < 2) return { trend: "stable", icon: Minus, color: "text-gray-500" }
    if (change > 0) return { trend: "up", icon: TrendingUp, color: "text-red-500" }
    return { trend: "down", icon: TrendingDown, color: "text-green-500" }
  }

  const stressTrend = calculateTrend(latest.stress, previous.stress)
  const anxietyTrend = calculateTrend(latest.anxiety, previous.anxiety)
  const depressionTrend = calculateTrend(latest.depression, previous.depression)
  const moodTrend = calculateTrend(latest.mood, previous.mood)

  const stats = [
    {
      title: "Current Stress",
      value: `${latest.stress}%`,
      description: "vs last week",
      icon: Brain,
      trend: stressTrend,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Anxiety Level",
      value: `${latest.anxiety}%`,
      description: "vs last week",
      icon: Heart,
      trend: anxietyTrend,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Mood Score",
      value: `${latest.mood}/10`,
      description: "vs last week",
      icon: Shield,
      trend: { ...moodTrend, color: moodTrend.trend === "up" ? "text-green-500" : "text-red-500" },
      color: "from-purple-500 to-purple-600",
    },
    ...(user.isAnonymous
      ? []
      : [
          {
            title: "Coins Earned",
            value: user.coins.toString(),
            description: "total balance",
            icon: Coins,
            trend: { trend: "stable", icon: Minus, color: "text-gray-500" },
            color: "from-yellow-500 to-yellow-600",
          },
        ]),
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend.icon

        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Badge variant="outline" className={`${stat.trend.color} border-current`}>
                  <TrendIcon className="w-3 h-3 mr-1" />
                  {stat.trend.trend}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold">{stat.value}</CardTitle>
                <CardDescription className="text-sm">{stat.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
