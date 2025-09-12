"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Brain,
  Heart,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Gamepad2,
  MessageCircle,
  Phone,
} from "lucide-react"
import Link from "next/link"
import type { AssessmentResult } from "@/app/assessment/page"

interface AssessmentResultsProps {
  results: AssessmentResult
  onRetake: () => void
}

export function AssessmentResults({ results, onRetake }: AssessmentResultsProps) {
  const chartData = [
    { name: "Stress", value: results.stress, color: "#ef4444" },
    { name: "Anxiety", value: results.anxiety, color: "#f97316" },
    { name: "Depression", value: results.depression, color: "#8b5cf6" },
  ]

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="w-4 h-4" />
      case "moderate":
        return <AlertTriangle className="w-4 h-4" />
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Assessment Results</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your responses, here's an overview of your current mental health status and personalized
          recommendations.
        </p>
      </div>

      {/* Overall Score */}
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Badge className={`${getRiskLevelColor(results.riskLevel)} border`}>
              {getRiskLevelIcon(results.riskLevel)}
              <span className="ml-1 capitalize">{results.riskLevel} Risk Level</span>
            </Badge>
          </div>
          <CardTitle className="text-2xl">Overall Wellness Score</CardTitle>
          <CardDescription>Your combined mental health assessment score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-gray-900">{100 - results.overall}%</div>
            <Progress value={100 - results.overall} className="h-3" />
            <p className="text-sm text-gray-600">Higher scores indicate better mental wellness</p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Breakdown</CardTitle>
            <CardDescription>Your scores across different mental health categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Individual Scores */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-red-500" />
                  <span className="font-semibold">Stress Level</span>
                </div>
                <span className="text-2xl font-bold">{results.stress}%</span>
              </div>
              <Progress value={results.stress} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">Anxiety Level</span>
                </div>
                <span className="text-2xl font-bold">{results.anxiety}%</span>
              </div>
              <Progress value={results.anxiety} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold">Depression Indicators</span>
                </div>
                <span className="text-2xl font-bold">{results.depression}%</span>
              </div>
              <Progress value={results.depression} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>Based on your assessment, here are some suggested next steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-blue-900">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Gamepad2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Try Stress Relief Games</h3>
            <p className="text-sm text-gray-600 mb-4">Engage in calming activities designed to reduce stress</p>
            <Button asChild className="w-full">
              <Link href="/games">Start Playing</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Join Community</h3>
            <p className="text-sm text-gray-600 mb-4">Connect with peers who understand your journey</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/community">Find Support</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Professional Help</h3>
            <p className="text-sm text-gray-600 mb-4">Speak with qualified mental health professionals</p>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/counseling">Get Help</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Retake Assessment */}
      <div className="text-center">
        <Button onClick={onRetake} variant="outline" size="lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retake Assessment
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          We recommend retaking this assessment weekly to track your progress
        </p>
      </div>

      {/* Crisis Resources */}
      {results.riskLevel === "high" && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Immediate Support Available</h3>
                <p className="text-red-800 mb-4">
                  Your assessment indicates you may benefit from immediate professional support. Please don't hesitate
                  to reach out for help.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Crisis Hotline: 988 (24/7)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Emergency: 911</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
