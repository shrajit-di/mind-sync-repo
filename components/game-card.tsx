"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Coins, CheckCircle, Play } from "lucide-react"

interface Game {
  id: string
  title: string
  description: string
  difficulty: string
  duration: string
  coins: number
  category: string
  color: string
  benefits: string[]
}

interface GameCardProps {
  game: Game
  isCompleted: boolean
  onPlay: () => void
}

export function GameCard({ game, isCompleted, onPlay }: GameCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${isCompleted ? "ring-2 ring-green-200" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${game.color} flex items-center justify-center mb-4`}>
            {isCompleted ? <CheckCircle className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
            <Badge variant="outline" className="text-purple-600 border-purple-200">
              {game.category}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl">{game.title}</CardTitle>
        <CardDescription className="text-gray-600">{game.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{game.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{game.coins} coins</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Benefits:</h4>
          <div className="flex flex-wrap gap-1">
            {game.benefits.map((benefit, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {benefit}
              </Badge>
            ))}
          </div>
        </div>

        {/* Play Button */}
        <Button
          onClick={onPlay}
          className={`w-full ${isCompleted ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Play Again
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Game
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
