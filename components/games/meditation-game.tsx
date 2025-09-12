"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, CheckCircle, Volume2, VolumeX } from "lucide-react"

interface MeditationGameProps {
  onComplete: (coins: number) => void
  onBack: () => void
}

export function MeditationGame({ onComplete, onBack }: MeditationGameProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [currentScene, setCurrentScene] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const targetTime = 300 // 5 minutes in seconds
  const coinsReward = 15

  const scenes = [
    {
      name: "Forest Path",
      description: "Walk through a peaceful forest with gentle sunlight filtering through the trees",
      color: "from-green-400 to-green-600",
      duration: 60,
    },
    {
      name: "Ocean Waves",
      description: "Listen to the rhythmic sound of waves gently lapping against the shore",
      color: "from-blue-400 to-blue-600",
      duration: 60,
    },
    {
      name: "Mountain Peak",
      description: "Feel the calm serenity of standing atop a peaceful mountain",
      color: "from-purple-400 to-purple-600",
      duration: 60,
    },
    {
      name: "Starry Night",
      description: "Gaze up at a beautiful night sky filled with twinkling stars",
      color: "from-indigo-400 to-indigo-600",
      duration: 60,
    },
    {
      name: "Garden Sanctuary",
      description: "Rest in a beautiful garden filled with blooming flowers and butterflies",
      color: "from-pink-400 to-pink-600",
      duration: 60,
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTime = prev + 1

          // Change scene every minute
          const newSceneIndex = Math.floor(newTime / 60)
          if (newSceneIndex !== currentScene && newSceneIndex < scenes.length) {
            setCurrentScene(newSceneIndex)
          }

          if (newTime >= targetTime) {
            setIsCompleted(true)
            setIsPlaying(false)
          }

          return newTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, isCompleted, currentScene])

  const handleStart = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setTimeElapsed(0)
    setCurrentScene(0)
    setIsCompleted(false)
  }

  const handleComplete = () => {
    onComplete(coinsReward)
  }

  const progress = (timeElapsed / targetTime) * 100
  const currentSceneData = scenes[currentScene]
  const remainingTime = targetTime - timeElapsed
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Mindful Meditation</CardTitle>
          <CardDescription>Immerse yourself in peaceful scenes to reduce stress and find inner calm</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>
                {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")} / 5:00
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Meditation Scene */}
          <div className="flex flex-col items-center space-y-6">
            <div
              className={`w-80 h-80 rounded-full bg-gradient-to-br ${currentSceneData.color} flex items-center justify-center relative overflow-hidden transition-all duration-2000`}
            >
              {/* Animated elements */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-white rounded-full animate-pulse`}
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${15 + i * 12}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

              <div className="text-center text-white z-10">
                {!isCompleted ? (
                  <>
                    <div className="text-3xl font-bold mb-2">
                      {minutes}:{seconds.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm opacity-90">Time Remaining</div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-12 h-12 mb-2" />
                    <div className="text-lg font-semibold">Complete!</div>
                  </div>
                )}
              </div>
            </div>

            {/* Current Scene */}
            <div className="text-center space-y-2">
              <Badge className={`bg-gradient-to-r ${currentSceneData.color} text-white border-0`}>
                {currentSceneData.name}
              </Badge>
              <p className="text-sm text-gray-600 max-w-md">{currentSceneData.description}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isCompleted ? (
              <>
                {!isPlaying ? (
                  <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Meditation
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
                <Button onClick={() => setIsSoundEnabled(!isSoundEnabled)} variant="outline" size="icon">
                  {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-semibold">Meditation Complete!</span>
                </div>
                <p className="text-gray-600">
                  You've earned {coinsReward} coins for completing this meditation session.
                </p>
                <div className="flex space-x-4 justify-center">
                  <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                    Collect Coins
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    Meditate Again
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Scene Progress */}
          {!isCompleted && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 text-center">Meditation Journey</h4>
              <div className="flex justify-center space-x-2">
                {scenes.map((scene, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index < currentScene ? "bg-green-500" : index === currentScene ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-green-900 mb-2">Meditation Tips:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Find a comfortable, quiet position</li>
                <li>• Focus on your breathing and the peaceful scenes</li>
                <li>• Let thoughts come and go without judgment</li>
                <li>• If your mind wanders, gently return focus to the present</li>
                <li>• Complete the full 5-minute session to earn your reward</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
