"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, RotateCcw, CheckCircle } from "lucide-react"

interface ColoringGameProps {
  onComplete: (coins: number) => void
  onBack: () => void
}

export function ColoringGame({ onComplete, onBack }: ColoringGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [isDrawing, setIsDrawing] = useState(false)
  const [completedSections, setCompletedSections] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#eab308", // yellow
    "#22c55e", // green
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#84cc16", // lime
    "#f59e0b", // amber
    "#6366f1", // indigo
    "#14b8a6", // teal
  ]

  const coinsReward = 20
  const targetSections = 8

  // Simple mandala pattern paths
  const mandalaPaths = [
    "M200,100 L250,150 L200,200 L150,150 Z", // Center diamond
    "M200,50 L225,100 L200,150 L175,100 Z", // Top petal
    "M250,100 L300,125 L250,150 L200,125 Z", // Right petal
    "M200,150 L225,200 L200,250 L175,200 Z", // Bottom petal
    "M150,100 L100,125 L150,150 L200,125 Z", // Left petal
    "M225,75 L275,100 L225,125 L175,100 Z", // Top-right
    "M225,125 L275,150 L225,175 L175,150 Z", // Bottom-right
    "M175,125 L125,150 L175,175 L225,150 Z", // Bottom-left
    "M175,75 L125,100 L175,125 L225,100 Z", // Top-left
  ]

  const [sectionColors, setSectionColors] = useState<Record<number, string>>({})

  const handleSectionClick = (sectionIndex: number) => {
    if (!sectionColors[sectionIndex]) {
      setCompletedSections((prev) => {
        const newCount = prev + 1
        if (newCount >= targetSections) {
          setIsCompleted(true)
        }
        return newCount
      })
    }

    setSectionColors((prev) => ({
      ...prev,
      [sectionIndex]: selectedColor,
    }))
  }

  const handleReset = () => {
    setSectionColors({})
    setCompletedSections(0)
    setIsCompleted(false)
  }

  const handleComplete = () => {
    onComplete(coinsReward)
  }

  const progress = (completedSections / targetSections) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Digital Coloring</CardTitle>
          <CardDescription>Color the mandala pattern to reduce stress and promote mindfulness</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>
                {completedSections}/{targetSections} sections colored
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Color Palette */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Color Palette
              </h3>
              <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-lg border-2 transition-all ${
                      selectedColor === color ? "border-gray-900 scale-110" : "border-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Selected:</strong>
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <div
                    className="w-6 h-6 rounded border-2 border-gray-300"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="text-sm font-mono">{selectedColor}</span>
                </div>
              </div>
            </div>

            {/* Coloring Canvas */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border-2 border-gray-200 p-8 flex justify-center">
                <svg width="400" height="400" viewBox="0 0 400 400" className="max-w-full h-auto">
                  {/* Background circle */}
                  <circle cx="200" cy="200" r="180" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="2" />

                  {/* Mandala sections */}
                  {mandalaPaths.map((path, index) => (
                    <path
                      key={index}
                      d={path}
                      fill={sectionColors[index] || "#ffffff"}
                      stroke="#374151"
                      strokeWidth="2"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleSectionClick(index)}
                    />
                  ))}

                  {/* Decorative elements */}
                  <circle
                    cx="200"
                    cy="200"
                    r="20"
                    fill={sectionColors[8] || "#ffffff"}
                    stroke="#374151"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => handleSectionClick(8)}
                  />

                  {/* Outer decorative circles */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
                    const radian = (angle * Math.PI) / 180
                    const x = 200 + 160 * Math.cos(radian)
                    const y = 200 + 160 * Math.sin(radian)
                    return (
                      <circle
                        key={`outer-${index}`}
                        cx={x}
                        cy={y}
                        r="8"
                        fill="#f3f4f6"
                        stroke="#9ca3af"
                        strokeWidth="1"
                      />
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isCompleted ? (
              <>
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
                <Badge variant="outline" className="px-4 py-2">
                  {completedSections >= targetSections
                    ? "Ready to complete!"
                    : `${targetSections - completedSections} sections remaining`}
                </Badge>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-semibold">Artwork Complete!</span>
                </div>
                <p className="text-gray-600">
                  You've earned {coinsReward} coins for completing this coloring activity.
                </p>
                <div className="flex space-x-4 justify-center">
                  <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                    Collect Coins
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    <Palette className="w-4 h-4 mr-2" />
                    Color Again
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-purple-900 mb-2">Coloring Tips:</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Click on any white section to color it with your selected color</li>
                <li>• Choose colors that feel calming and peaceful to you</li>
                <li>• Take your time and focus on the present moment</li>
                <li>• Color at least {targetSections} sections to complete the activity</li>
                <li>• There's no right or wrong way - express your creativity!</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
