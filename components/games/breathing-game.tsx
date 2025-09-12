"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { CoinNotification } from "@/components/coin-notification"

interface BreathingGameProps {
  onComplete: (coins: number) => void
  onBack: () => void
}

export function BreathingGame({ onComplete, onBack }: BreathingGameProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [cycleCount, setCycleCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(4)
  const [totalTime, setTotalTime] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showCoinNotification, setShowCoinNotification] = useState(false)

  const { addCoins } = useAuth()

  const phases = {
    inhale: { duration: 4, next: "hold", instruction: "Breathe In", color: "bg-blue-500" },
    hold: { duration: 4, next: "exhale", instruction: "Hold", color: "bg-purple-500" },
    exhale: { duration: 6, next: "rest", instruction: "Breathe Out", color: "bg-green-500" },
    rest: { duration: 2, next: "inhale", instruction: "Rest", color: "bg-gray-400" },
  }

  const targetCycles = 5
  const coinsReward = 10

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            const currentPhaseData = phases[currentPhase]
            const nextPhase = currentPhaseData.next as keyof typeof phases

            if (currentPhase === "rest") {
              setCycleCount((prevCount) => {
                const newCount = prevCount + 1
                if (newCount >= targetCycles) {
                  setIsCompleted(true)
                  setIsPlaying(false)
                  return newCount
                }
                return newCount
              })
            }

            setCurrentPhase(nextPhase)
            return phases[nextPhase].duration
          }
          return prev - 1
        })

        setTotalTime((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentPhase, isCompleted])

  const handleStart = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentPhase("inhale")
    setCycleCount(0)
    setTimeRemaining(4)
    setTotalTime(0)
    setIsCompleted(false)
  }

  const handleComplete = () => {
    addCoins(coinsReward, "Breathing Exercise")
    setShowCoinNotification(true)
    onComplete(coinsReward)
  }

  const progress = (cycleCount / targetCycles) * 100
  const currentPhaseData = phases[currentPhase]

  return (
    <>
      {showCoinNotification && (
        <CoinNotification
          coins={coinsReward}
          activity="Breathing Exercise"
          onClose={() => setShowCoinNotification(false)}
        />
      )}

      <div className="max-w-2xl mx-auto space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Breathing Exercise</CardTitle>
            <CardDescription>Follow the guided breathing pattern to reduce stress and anxiety</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>
                  {cycleCount}/{targetCycles} cycles
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div
                  className={`w-48 h-48 rounded-full ${currentPhaseData.color} transition-all duration-1000 flex items-center justify-center ${
                    isPlaying
                      ? currentPhase === "inhale"
                        ? "scale-125"
                        : currentPhase === "exhale"
                          ? "scale-75"
                          : "scale-100"
                      : "scale-100"
                  }`}
                >
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">{timeRemaining}</div>
                    <div className="text-sm opacity-90">{currentPhaseData.instruction}</div>
                  </div>
                </div>
              </div>

              <Badge className={`${currentPhaseData.color} text-white border-0`}>{currentPhaseData.instruction}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">{cycleCount}</div>
                <p className="text-sm text-blue-600">Cycles Completed</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900">
                  {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, "0")}
                </div>
                <p className="text-sm text-green-600">Time Elapsed</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {!isCompleted ? (
                <>
                  {!isPlaying ? (
                    <Button onClick={handleStart} className="bg-blue-600 hover:bg-blue-700">
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={handlePause} variant="outline">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button onClick={handleReset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">Exercise Complete!</span>
                  </div>
                  <p className="text-gray-600">
                    You've earned {coinsReward} coins for completing this breathing exercise.
                  </p>
                  <div className="flex space-x-4 justify-center">
                    <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                      Collect Coins
                    </Button>
                    <Button onClick={handleReset} variant="outline">
                      Practice Again
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-900 mb-2">How to Practice:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Follow the circle's size changes with your breathing</li>
                  <li>• Inhale as the circle grows larger</li>
                  <li>• Hold your breath when the circle is still</li>
                  <li>• Exhale as the circle shrinks</li>
                  <li>• Complete 5 full cycles to earn your reward</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
