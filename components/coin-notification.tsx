"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, X } from "lucide-react"

interface CoinNotificationProps {
  coins: number
  activity: string
  onClose: () => void
}

export function CoinNotification({ coins, activity, onClose }: CoinNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow fade out animation
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-yellow-900">+{coins} Coins Earned!</p>
              <p className="text-sm text-yellow-700">{activity}</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
