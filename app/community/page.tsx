"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Users, Plus, Search, Sparkles, Globe } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"

function FloatingHearts() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ff6b9d" transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

export default function CommunityPage() {
  const { user } = useAuth()
  const [newPost, setNewPost] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const communityPosts = [
    {
      id: 1,
      author: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Just completed my first week of meditation practice! The breathing exercises really helped during my exam stress. Thank you to everyone who encouraged me to start.",
      likes: 24,
      comments: 8,
      timeAgo: "2 hours ago",
      tags: ["meditation", "stress-relief", "exams"],
      isAnonymous: false,
    },
    {
      id: 2,
      author: "Anonymous Student",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Feeling overwhelmed with coursework lately. The memory games on Mind-Sync have been a great distraction. Anyone else find gaming helpful for anxiety?",
      likes: 18,
      comments: 12,
      timeAgo: "4 hours ago",
      tags: ["anxiety", "gaming", "coursework"],
      isAnonymous: true,
    },
    {
      id: 3,
      author: "Alex K.",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Sharing my progress chart from this month - seeing the improvement in my stress levels is so motivating! Small steps really do make a difference.",
      likes: 31,
      comments: 15,
      timeAgo: "1 day ago",
      tags: ["progress", "motivation", "stress"],
      isAnonymous: false,
    },
  ]

  const supportGroups = [
    {
      id: 1,
      name: "Exam Stress Support",
      members: 234,
      description: "A safe space for students dealing with academic pressure",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      name: "Mindfulness Circle",
      members: 189,
      description: "Daily meditation and mindfulness practices",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      name: "Social Anxiety Warriors",
      members: 156,
      description: "Supporting each other through social challenges",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      name: "Sleep & Wellness",
      members: 203,
      description: "Better sleep habits for better mental health",
      color: "bg-indigo-100 text-indigo-800",
    },
  ]

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      console.log("New post:", newPost)
      setNewPost("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with 3D Animation */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FloatingHearts />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Peer Support Community</h1>
            </div>
            <p className="text-pink-100 text-lg">Connect, share, and support each other on your wellness journey</p>
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>1,247 active members</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Safe & supportive space</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Share Your Journey
                  </CardTitle>
                  <CardDescription>Share your experiences, ask for support, or celebrate your progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="What's on your mind? Share your thoughts, experiences, or ask for support..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">Anonymous</Badge>
                      <Badge variant="outline">Public</Badge>
                    </div>
                    <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                      Share Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search posts, topics, or users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={activeFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter("all")}
                    >
                      All Posts
                    </Button>
                    <Button
                      variant={activeFilter === "trending" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter("trending")}
                    >
                      Trending
                    </Button>
                    <Button
                      variant={activeFilter === "recent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter("recent")}
                    >
                      Recent
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={post.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.isAnonymous ? "A" : post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{post.author}</span>
                          {post.isAnonymous && (
                            <Badge variant="secondary" className="text-xs">
                              Anonymous
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-6">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Groups */}
            <Card>
              <CardHeader>
                <CardTitle>Support Groups</CardTitle>
                <CardDescription>Join communities that match your interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportGroups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{group.name}</h4>
                      <Badge className={group.color}>{group.members}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      Join Group
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                  <p className="text-sm">Be respectful and supportive to all members</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                  <p className="text-sm">Share experiences, not medical advice</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2"></div>
                  <p className="text-sm">Respect privacy and anonymity choices</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-pink-500 mt-2"></div>
                  <p className="text-sm">Report inappropriate content</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start a Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="mr-2 h-4 w-4" />
                  Find Study Buddy
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Heart className="mr-2 h-4 w-4" />
                  Share Achievement
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
