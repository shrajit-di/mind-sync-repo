import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface ProgressChartsProps {
  data: Array<{
    date: string
    stress: number
    anxiety: number
    depression: number
    mood: number
    activities: number
  }>
}

export function ProgressCharts({ data }: ProgressChartsProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const chartData = data.map((item) => ({
    ...item,
    date: formatDate(item.date),
    wellness: 100 - (item.stress + item.anxiety + item.depression) / 3, // Inverted wellness score
  }))

  return (
    <div className="space-y-6">
      {/* Wellness Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Wellness Trend</CardTitle>
          <CardDescription>Your overall mental wellness over time (higher is better)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${Math.round(Number(value))}%`, "Wellness Score"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area type="monotone" dataKey="wellness" stroke="#3b82f6" fill="url(#wellnessGradient)" strokeWidth={2} />
              <defs>
                <linearGradient id="wellnessGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
          <CardDescription>Track stress, anxiety, and depression levels over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value, name) => [`${Math.round(Number(value))}%`, name]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="stress"
                stroke="#ef4444"
                strokeWidth={2}
                name="Stress"
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="anxiety"
                stroke="#f97316"
                strokeWidth={2}
                name="Anxiety"
                dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="depression"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Depression"
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
