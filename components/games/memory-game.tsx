"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, CheckCircle, Leaf, Flower, TreePine, Sun } from "lucide-react"

interface MemoryGameProps {
  onComplete: (coins: number) => void
  onBack: () => void
}

interface GameCard {
  id: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryGame({ onComplete, onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<GameCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const coinsReward = 25
  const totalPairs = 6

  const cardTypes = [
    { icon: Leaf, color: "text-green-500" },
    { icon: Flower, color: "text-pink-500" },
    { icon: TreePine, color: "text-emerald-600" },
    { icon: Sun, color: "text-yellow-500" },
    { icon: Leaf, color: "text-blue-500" },
    { icon: Flower, color: "text-purple-500" },
  ]

  const initializeGame = () => {
    const gameCards: GameCard[] = []
    let id = 0

    // Create pairs of cards
    cardTypes.forEach((cardType) => {
      // Add two cards of each type
      for (let i = 0; i < 2; i++) {
        gameCards.push({
          id: id++,
          icon: cardType.icon,
          color: cardType.color,
          isFlipped: false,
          isMatched: false,
        })
      }
    })

    // Shuffle the cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setIsCompleted(false)
    setGameStarted(true)
  }

  const handleCardClick = (cardId: number) => {
    if (!gameStarted || isCompleted) return

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    // Update card state
    setCards((prevCards) => prevCards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)))

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1)

      const [firstCardId, secondCardId] = newFlippedCards
      const firstCard = cards.find((c) => c.id === firstCardId)
      const secondCard = cards.find((c) => c.id === secondCardId)

      if (firstCard && secondCard && firstCard.icon === secondCard.icon && firstCard.color === secondCard.color) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) => (c.id === firstCardId || c.id === secondCardId ? { ...c, isMatched: true } : c)),
          )
          setMatchedPairs((prev) => {
            const newMatched = prev + 1
            if (newMatched === totalPairs) {
              setIsCompleted(true)
            }
            return newMatched
          })
          setFlippedCards([])
        }, 1000)
      } else {
        // No match - flip cards back
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) => (c.id === firstCardId || c.id === secondCardId ? { ...c, isFlipped: false } : c)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const handleComplete = () => {
    onComplete(coinsReward)
  }

  const progress = (matchedPairs / totalPairs) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Memory Garden</CardTitle>
          <CardDescription>Match pairs of nature elements to improve memory and concentration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Game Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-900">{matchedPairs}</div>
              <p className="text-sm text-green-600">Pairs Found</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{moves}</div>
              <p className="text-sm text-blue-600">Moves</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-900">{Math.round(progress)}%</div>
              <p className="text-sm text-purple-600">Complete</p>
            </div>
          </div>

          {/* Game Board */}
          {!gameStarted ? (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="w-12 h-12 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Play?</h3>
                <p className="text-gray-600 mb-6">
                  Find matching pairs of nature elements. The goal is to match all {totalPairs} pairs in as few moves as
                  possible.
                </p>
                <Button onClick={initializeGame} className="bg-orange-600 hover:bg-orange-700">
                  Start Game
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {cards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      card.isFlipped || card.isMatched
                        ? "bg-white border-gray-300 transform scale-105"
                        : "bg-gradient-to-br from-gray-200 to-gray-300 border-gray-400 hover:from-gray-300 hover:to-gray-400"
                    } ${card.isMatched ? "ring-2 ring-green-400" : ""}`}
                  >
                    {(card.isFlipped || card.isMatched) && <Icon className={`w-8 h-8 ${card.color}`} />}
                  </div>
                )
              })}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isCompleted ? (
              <>
                {gameStarted && (
                  <Button onClick={initializeGame} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    New Game
                  </Button>
                )}
                <Badge variant="outline" className="px-4 py-2">
                  {totalPairs - matchedPairs} pairs remaining
                </Badge>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-semibold">Game Complete!</span>
                </div>
                <p className="text-gray-600">
                  Excellent memory! You completed the game in {moves} moves and earned {coinsReward} coins.
                </p>
                <div className="flex space-x-4 justify-center">
                  <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                    Collect Coins
                  </Button>
                  <Button onClick={initializeGame} variant="outline">
                    Play Again
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-orange-900 mb-2">How to Play:</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Click on cards to flip them and reveal the nature elements</li>
                <li>• Find two cards with matching icons and colors</li>
                <li>• Matched pairs will stay face up and glow green</li>
                <li>• Try to complete the game in as few moves as possible</li>
                <li>• Match all {totalPairs} pairs to earn your reward</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
