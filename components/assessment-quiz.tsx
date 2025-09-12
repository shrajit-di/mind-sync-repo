"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { AssessmentResult } from "@/app/assessment/page"

interface Question {
  id: string
  text: string
  category: "stress" | "anxiety" | "depression"
  options: {
    value: number
    label: string
  }[]
}

const questions: Question[] = [
  // Stress Questions
  {
    id: "stress1",
    text: "How often have you felt overwhelmed by your responsibilities in the past two weeks?",
    category: "stress",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very often" },
    ],
  },
  {
    id: "stress2",
    text: "How difficult has it been to relax or unwind recently?",
    category: "stress",
    options: [
      { value: 0, label: "Not difficult at all" },
      { value: 1, label: "Slightly difficult" },
      { value: 2, label: "Moderately difficult" },
      { value: 3, label: "Very difficult" },
      { value: 4, label: "Extremely difficult" },
    ],
  },
  {
    id: "stress3",
    text: "How often do you feel like you have too much to handle?",
    category: "stress",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Always" },
    ],
  },
  // Anxiety Questions
  {
    id: "anxiety1",
    text: "How often do you worry about things that might go wrong?",
    category: "anxiety",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Almost always" },
    ],
  },
  {
    id: "anxiety2",
    text: "How often do you experience physical symptoms like rapid heartbeat, sweating, or trembling?",
    category: "anxiety",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very often" },
    ],
  },
  {
    id: "anxiety3",
    text: "How much do you avoid situations because they make you anxious?",
    category: "anxiety",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Slightly" },
      { value: 2, label: "Moderately" },
      { value: 3, label: "Quite a bit" },
      { value: 4, label: "Extremely" },
    ],
  },
  // Depression Questions
  {
    id: "depression1",
    text: "How often have you felt down, depressed, or hopeless in the past two weeks?",
    category: "depression",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
      { value: 4, label: "Every day" },
    ],
  },
  {
    id: "depression2",
    text: "How often do you have little interest or pleasure in doing things?",
    category: "depression",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" },
      { value: 4, label: "Every day" },
    ],
  },
  {
    id: "depression3",
    text: "How has your energy level been lately?",
    category: "depression",
    options: [
      { value: 0, label: "High energy" },
      { value: 1, label: "Good energy" },
      { value: 2, label: "Moderate energy" },
      { value: 3, label: "Low energy" },
      { value: 4, label: "Very low energy" },
    ],
  },
]

interface AssessmentQuizProps {
  onComplete: (results: AssessmentResult) => void
}

export function AssessmentQuiz({ onComplete }: AssessmentQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: Number.parseInt(value),
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateResults = () => {
    const stressQuestions = questions.filter((q) => q.category === "stress")
    const anxietyQuestions = questions.filter((q) => q.category === "anxiety")
    const depressionQuestions = questions.filter((q) => q.category === "depression")

    const stressScore = stressQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
    const anxietyScore = anxietyQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
    const depressionScore = depressionQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)

    const maxStressScore = stressQuestions.length * 4
    const maxAnxietyScore = anxietyQuestions.length * 4
    const maxDepressionScore = depressionQuestions.length * 4

    const stressPercentage = (stressScore / maxStressScore) * 100
    const anxietyPercentage = (anxietyScore / maxAnxietyScore) * 100
    const depressionPercentage = (depressionScore / maxDepressionScore) * 100
    const overallPercentage = (stressPercentage + anxietyPercentage + depressionPercentage) / 3

    let riskLevel: "low" | "moderate" | "high" = "low"
    if (overallPercentage > 70) riskLevel = "high"
    else if (overallPercentage > 40) riskLevel = "moderate"

    const recommendations = generateRecommendations(
      stressPercentage,
      anxietyPercentage,
      depressionPercentage,
      riskLevel,
    )

    const results: AssessmentResult = {
      stress: Math.round(stressPercentage),
      anxiety: Math.round(anxietyPercentage),
      depression: Math.round(depressionPercentage),
      overall: Math.round(overallPercentage),
      recommendations,
      riskLevel,
    }

    onComplete(results)
  }

  const generateRecommendations = (
    stress: number,
    anxiety: number,
    depression: number,
    riskLevel: "low" | "moderate" | "high",
  ): string[] => {
    const recommendations: string[] = []

    if (riskLevel === "high") {
      recommendations.push("Consider speaking with a mental health professional")
      recommendations.push("Reach out to campus counseling services")
    }

    if (stress > 60) {
      recommendations.push("Try stress-relief games and activities")
      recommendations.push("Practice deep breathing exercises")
      recommendations.push("Consider time management techniques")
    }

    if (anxiety > 60) {
      recommendations.push("Practice mindfulness and meditation")
      recommendations.push("Try progressive muscle relaxation")
      recommendations.push("Join peer support groups")
    }

    if (depression > 60) {
      recommendations.push("Engage in regular physical activity")
      recommendations.push("Maintain social connections")
      recommendations.push("Consider professional counseling")
    }

    if (riskLevel === "low") {
      recommendations.push("Continue with healthy habits")
      recommendations.push("Use our stress-relief games for maintenance")
      recommendations.push("Check in with yourself regularly")
    }

    return recommendations
  }

  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQ.id]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Assessment</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQ.text}</CardTitle>
          <CardDescription>Select the option that best describes your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={currentAnswer?.toString()} onValueChange={handleAnswerChange}>
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentAnswer === undefined}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
              {currentQuestion < questions.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
