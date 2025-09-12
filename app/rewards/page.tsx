"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Coins,
  Gift,
  Star,
  Trophy,
  Unlock,
  CheckCircle,
  Clock,
  Zap,
  Heart,
  Shield,
  Crown,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface Reward {
  id: string
  title: string
  description: string
  cost: number
  category: "premium" | "customization" | "features" | "wellness"
  icon: React.ComponentType<{ className?: string }>
  color: string
  isUnlocked: boolean
  isPurchased: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  reward: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  isCompleted: boolean
  progress: number
  maxProgress: number
}

export default function RewardsPage() {
  const { user } = useAuth()
  const [userCoins, setUserCoins] = useState(user?.coins || 0)

  const rewards: Reward[] = [
    {
      id: "premium-themes",
      title: "Premium Themes",
      description: "Unlock beautiful dark mode and nature themes",
      cost: 50,
      category: "customization",
      icon: Sparkles,
      color: "from-purple-500 to-purple-600",
      isUnlocked: userCoins >= 50,
      isPurchased: false,
    },
    {
      id: "advanced-analytics",
      title: "Advanced Analytics",
      description: "Detailed insights and progress tracking",
      cost: 100,
      category: "features",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      isUnlocked: userCoins >= 100,
      isPurchased: false,
    },
    {
      id: "meditation-library",
      title: "Premium Meditation Library",
      description: "Access to 50+ guided meditation sessions",
      cost: 75,
      category: "wellness",
      icon: Heart,
      color: "from-green-500 to-green-600",
      isUnlocked: userCoins >= 75,
      isPurchased: false,
    },
    {
      id: "priority-support",
      title: "Priority Support",
      description: "Skip the queue for counseling appointments",
      cost: 150,
      category: "premium",
      icon: Crown,
      color: "from-yellow-500 to-yellow-600",
      isUnlocked: userCoins >= 150,
      isPurchased: false,
    },
    {
      id: "custom-avatars",
      title: "Custom Avatars",
      description: "Personalize your profile with unique avatars",
      cost: 30,
      category: "customization",
      icon: Star,
      color: "from-pink-500 to-pink-600",
      isUnlocked: userCoins >= 30,
      isPurchased: false,
    },
    {
      id: "wellness-coach",
      title: "AI Wellness Coach",
      description: "Personal AI assistant for mental health guidance",
      cost: 200,
      category: "premium",
      icon: Shield,
      color: "from-indigo-500 to-indigo-600",
      isUnlocked: userCoins >= 200,
      isPurchased: false,
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "first-assessment",
      title: "First Steps",
      description: "Complete your first mental health assessment",
      reward: 25,
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      isCompleted: true,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: "game-master",
      title: "Game Master",
      description: "Complete all 4 stress relief games",
      reward: 50,
      icon: Trophy,
      color: "from-yellow-500 to-yellow-600",
      isCompleted: false,
      progress: 2,
      maxProgress: 4,
    },
    {
      id: "streak-warrior",
      title: "Streak Warrior",
      description: "Maintain a 7-day activity streak",
      reward: 75,
      icon: Zap,
      color: "from-orange-500 to-orange-600",
      isCompleted: false,
      progress: 3,
      maxProgress: 7,
    },
    {
      id: "meditation-monk",
      title: "Meditation Monk",
      description: "Complete 10 meditation sessions",
      reward: 100,
      icon: Heart,
      color: "from-purple-500 to-purple-600",
      isCompleted: false,
      progress: 4,
      maxProgress: 10,
    },
    {
      id: "wellness-champion",
      title: "Wellness Champion",
      description: "Earn 500 total coins",
      reward: 150,
      icon: Crown,
      color: "from-blue-500 to-blue-600",
      isCompleted: false,
      progress: userCoins,
      maxProgress: 500,
    },
  ]

  const handlePurchaseReward = (rewardId: string, cost: number) => {
    if (userCoins >= cost) {
      setUserCoins((prev) => prev - cost)
      // In a real app, this would update the user's purchased rewards
      console.log(`Purchased reward: ${rewardId} for ${cost} coins`)
    }
  }

  const earnedCoinsToday = 45
  const totalEarned = userCoins + 150 // Simulated total earned

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl text-center">
            <Card>
              <CardHeader>
                <CardTitle>Access Required</CardTitle>
                <CardDescription>Please sign in to access your rewards and coin balance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/auth">Sign In</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (user.isAnonymous) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Header />
        <main className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-2xl text-center">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Unlock Coin Rewards</CardTitle>
                <CardDescription>
                  Create an account to start earning and redeeming coins for your wellness activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-white rounded-lg">
                    <Gift className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">Earn Coins</p>
                    <p className="text-xs text-gray-600">Complete activities</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">Unlock Rewards</p>
                    <p className="text-xs text-gray-600">Premium features</p>
                  </div>
                </div>
                <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Link href="/auth">Create Account to Start Earning</Link>
                </Button>
              </CardContent>
            </Card>
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
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Coin Rewards</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Earn coins by completing wellness activities and redeem them for premium features and rewards.
            </p>
          </div>

          {/* Coin Balance Card */}
          <Card className="mb-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-yellow-900 mb-2">{userCoins}</div>
                  <p className="text-yellow-700 font-medium">Current Balance</p>
                  <div className="flex items-center justify-center mt-2">
                    <Coins className="w-5 h-5 text-yellow-600 mr-1" />
                    <span className="text-sm text-yellow-600">Available to spend</span>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-900 mb-2">{earnedCoinsToday}</div>
                  <p className="text-orange-700 font-medium">Earned Today</p>
                  <div className="flex items-center justify-center mt-2">
                    <Clock className="w-5 h-5 text-orange-600 mr-1" />
                    <span className="text-sm text-orange-600">Keep it up!</span>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-red-900 mb-2">{totalEarned}</div>
                  <p className="text-red-700 font-medium">Total Earned</p>
                  <div className="flex items-center justify-center mt-2">
                    <Trophy className="w-5 h-5 text-red-600 mr-1" />
                    <span className="text-sm text-red-600">All time</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="rewards" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="rewards" className="space-y-8">
              {/* How to Earn Coins */}
              <Card>
                <CardHeader>
                  <CardTitle>How to Earn Coins</CardTitle>
                  <CardDescription>Complete these activities to earn coins for rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="font-medium text-blue-900">Assessment</p>
                      <p className="text-sm text-blue-600">15 coins</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="font-medium text-green-900">Meditation</p>
                      <p className="text-sm text-green-600">15 coins</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="font-medium text-purple-900">Games</p>
                      <p className="text-sm text-purple-600">10-25 coins</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <p className="font-medium text-yellow-900">Daily Streak</p>
                      <p className="text-sm text-yellow-600">5 coins/day</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => {
                  const Icon = reward.icon
                  return (
                    <Card
                      key={reward.id}
                      className={`relative overflow-hidden ${
                        reward.isUnlocked ? "hover:shadow-lg transition-shadow" : "opacity-75"
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${reward.color} flex items-center justify-center mb-4`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-1">
                              <Coins className="w-4 h-4 text-yellow-500" />
                              <span className="font-bold text-yellow-700">{reward.cost}</span>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                reward.category === "premium"
                                  ? "border-yellow-300 text-yellow-700"
                                  : reward.category === "features"
                                    ? "border-blue-300 text-blue-700"
                                    : reward.category === "wellness"
                                      ? "border-green-300 text-green-700"
                                      : "border-purple-300 text-purple-700"
                              }
                            >
                              {reward.category}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{reward.title}</CardTitle>
                        <CardDescription>{reward.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => handlePurchaseReward(reward.id, reward.cost)}
                          disabled={!reward.isUnlocked || reward.isPurchased}
                          className={`w-full ${
                            reward.isPurchased
                              ? "bg-green-600 hover:bg-green-700"
                              : reward.isUnlocked
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400"
                          }`}
                        >
                          {reward.isPurchased ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Purchased
                            </>
                          ) : reward.isUnlocked ? (
                            <>
                              <Coins className="w-4 h-4 mr-2" />
                              Purchase
                            </>
                          ) : (
                            <>
                              <Unlock className="w-4 h-4 mr-2" />
                              Need {reward.cost - userCoins} more coins
                            </>
                          )}
                        </Button>
                      </CardContent>
                      {!reward.isUnlocked && (
                        <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
                          <div className="bg-white rounded-full p-3">
                            <Unlock className="w-6 h-6 text-gray-600" />
                          </div>
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  const progress = (achievement.progress / achievement.maxProgress) * 100

                  return (
                    <Card
                      key={achievement.id}
                      className={`${achievement.isCompleted ? "ring-2 ring-green-200 bg-green-50/50" : ""}`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${achievement.color} flex items-center justify-center mb-4`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-yellow-700">+{achievement.reward}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg flex items-center">
                          {achievement.title}
                          {achievement.isCompleted && <CheckCircle className="w-5 h-5 text-green-600 ml-2" />}
                        </CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        {achievement.isCompleted && (
                          <Badge className="bg-green-100 text-green-800 w-full justify-center">
                            <Trophy className="w-4 h-4 mr-1" />
                            Completed!
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
