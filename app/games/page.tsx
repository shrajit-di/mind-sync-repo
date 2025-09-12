"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GameCard } from "@/components/game-card"
import { BreathingGame } from "@/components/games/breathing-game"
import { MeditationGame } from "@/components/games/meditation-game"
import { ColoringGame } from "@/components/games/coloring-game"
import { MemoryGame } from "@/components/games/memory-game"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Star, Clock, Coins, ArrowLeft } from "lucide-react"

const games = [
  {
    id: "breathing",
    title: "Breathing Exercise",
    description: "Guided breathing patterns to reduce stress and anxiety",
    difficulty: "Easy",
    duration: "3-5 min",
    coins: 10,
    category: "Mindfulness",
    color: "from-blue-500 to-blue-600",
    benefits: ["Reduces anxiety", "Improves focus", "Calms nervous system"],
  },
  {
    id: "meditation",
    title: "Mindful Meditation",
    description: "Interactive meditation with calming visuals and sounds",
    difficulty: "Easy",
    duration: "5-10 min",
    coins: 15,
    category: "Mindfulness",
    color: "from-green-500 to-green-600",
    benefits: ["Reduces stress", "Improves mood", "Enhances awareness"],
  },
  {
    id: "coloring",
    title: "Digital Coloring",
    description: "Relaxing coloring patterns and mandalas",
    difficulty: "Easy",
    duration: "10-15 min",
    coins: 20,
    category: "Creative",
    color: "from-purple-500 to-purple-600",
    benefits: ["Promotes creativity", "Reduces tension", "Improves focus"],
  },
  {
    id: "memory",
    title: "Memory Garden",
    description: "Gentle memory game with nature themes",
    difficulty: "Medium",
    duration: "5-8 min",
    coins: 25,
    category: "Cognitive",
    color: "from-orange-500 to-orange-600",
    benefits: ["Improves memory", "Enhances concentration", "Boosts confidence"],
  },
]

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [completedGames, setCompletedGames] = useState<string[]>([])

  const handleGameComplete = (gameId: string, coinsEarned: number) => {
    setCompletedGames((prev) => [...prev, gameId])
    setSelectedGame(null)
    // In a real app, this would update the user's coin balance
    console.log(`Game ${gameId} completed! Earned ${coinsEarned} coins.`)
  }

  const handleBackToGames = () => {
    setSelectedGame(null)
  }

  const renderGame = () => {
    switch (selectedGame) {
      case "breathing":
        return (
          <BreathingGame onComplete={(coins) => handleGameComplete("breathing", coins)} onBack={handleBackToGames} />
        )
      case "meditation":
        return (
          <MeditationGame onComplete={(coins) => handleGameComplete("meditation", coins)} onBack={handleBackToGames} />
        )
      case "coloring":
        return <ColoringGame onComplete={(coins) => handleGameComplete("coloring", coins)} onBack={handleBackToGames} />
      case "memory":
        return <MemoryGame onComplete={(coins) => handleGameComplete("memory", coins)} onBack={handleBackToGames} />
      default:
        return null
    }
  }

  if (selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Button variant="ghost" onClick={handleBackToGames} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            {renderGame()}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Stress Relief Games</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Engage in calming, interactive activities designed to reduce stress and anxiety while earning rewards for
              your wellness journey.
            </p>
          </div>

          {/* Benefits Section */}
          <Card className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-900 mb-4 text-center">Why Play Stress Relief Games?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <Star className="w-6 h-6 text-green-600 mx-auto" />
                  <p className="text-sm text-green-800">Scientifically proven to reduce cortisol levels</p>
                </div>
                <div className="space-y-2">
                  <Clock className="w-6 h-6 text-blue-600 mx-auto" />
                  <p className="text-sm text-blue-800">Quick 3-15 minute sessions fit any schedule</p>
                </div>
                <div className="space-y-2">
                  <Coins className="w-6 h-6 text-yellow-600 mx-auto" />
                  <p className="text-sm text-yellow-800">Earn coins while improving your mental health</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isCompleted={completedGames.includes(game.id)}
                onPlay={() => setSelectedGame(game.id)}
              />
            ))}
          </div>

          {/* Progress Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your stress relief journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">{completedGames.length}</div>
                  <p className="text-sm text-blue-600">Games Completed</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">
                    {completedGames.reduce((total, gameId) => {
                      const game = games.find((g) => g.id === gameId)
                      return total + (game?.coins || 0)
                    }, 0)}
                  </div>
                  <p className="text-sm text-green-600">Coins Earned</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-900">
                    {Math.round((completedGames.length / games.length) * 100)}%
                  </div>
                  <p className="text-sm text-purple-600">Collection Complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
