"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssessmentQuiz } from "@/components/assessment-quiz"
import { AssessmentResults } from "@/components/assessment-results"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, Brain, Heart, Shield } from "lucide-react"

export interface AssessmentResult {
  stress: number
  anxiety: number
  depression: number
  overall: number
  recommendations: string[]
  riskLevel: "low" | "moderate" | "high"
}

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "results">("intro")
  const [results, setResults] = useState<AssessmentResult | null>(null)

  const handleStartAssessment = () => {
    setCurrentStep("quiz")
  }

  const handleAssessmentComplete = (assessmentResults: AssessmentResult) => {
    setResults(assessmentResults)
    setCurrentStep("results")
  }

  const handleRetakeAssessment = () => {
    setResults(null)
    setCurrentStep("quiz")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {currentStep === "intro" && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Mental Health Assessment</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Take our scientifically-backed assessment to understand your current mental health status. This will
                  help us provide personalized recommendations for your wellness journey.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                <Card className="text-center">
                  <CardHeader>
                    <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <CardTitle className="text-lg">Stress Levels</CardTitle>
                    <CardDescription>Assess your current stress and identify triggers</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <CardTitle className="text-lg">Anxiety Patterns</CardTitle>
                    <CardDescription>Understand your anxiety levels and coping mechanisms</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <CardTitle className="text-lg">Mood Tracking</CardTitle>
                    <CardDescription>Evaluate your overall mood and emotional well-being</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Before You Begin:</h3>
                  <ul className="text-sm text-blue-800 space-y-2 text-left">
                    <li>• This assessment takes approximately 5-10 minutes</li>
                    <li>• Answer honestly for the most accurate results</li>
                    <li>• Your responses are completely confidential</li>
                    <li>• This is not a substitute for professional diagnosis</li>
                    <li>• If you're in crisis, please contact emergency services immediately</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button
                  size="lg"
                  onClick={handleStartAssessment}
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                >
                  Start Assessment
                </Button>
                <p className="text-sm text-gray-500">
                  Crisis support: Call 988 (Suicide & Crisis Lifeline) or 911 for immediate help
                </p>
              </div>
            </div>
          )}

          {currentStep === "quiz" && <AssessmentQuiz onComplete={handleAssessmentComplete} />}

          {currentStep === "results" && results && (
            <AssessmentResults results={results} onRetake={handleRetakeAssessment} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
