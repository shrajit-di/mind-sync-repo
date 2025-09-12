"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, MessageCircle, Calendar, Video, Star, Clock } from "lucide-react"

export default function PeerSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const peerSupporters = [
    {
      id: 1,
      name: "Emma Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      specialties: ["Anxiety", "Study Stress", "Time Management"],
      rating: 4.9,
      sessions: 127,
      university: "Stanford University",
      year: "3rd Year Psychology",
      availability: "Available now",
      isOnline: true,
      bio: "Psychology student passionate about peer support. Experienced with anxiety management and study techniques.",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      specialties: ["Depression", "Social Anxiety", "Mindfulness"],
      rating: 4.8,
      sessions: 89,
      university: "UCLA",
      year: "4th Year Social Work",
      availability: "Available in 2 hours",
      isOnline: false,
      bio: "Social work student with personal experience overcoming depression. Certified in peer counseling.",
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      avatar: "/placeholder.svg?height=60&width=60",
      specialties: ["Eating Disorders", "Body Image", "Self-Esteem"],
      rating: 4.9,
      sessions: 156,
      university: "Harvard University",
      year: "Graduate Student",
      availability: "Available tomorrow",
      isOnline: true,
      bio: "Graduate student in clinical psychology. Specializes in body positivity and eating disorder recovery.",
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      supporter: "Emma Chen",
      date: "Today, 3:00 PM",
      type: "Video Call",
      topic: "Exam Anxiety Coping Strategies",
    },
    {
      id: 2,
      supporter: "Marcus Johnson",
      date: "Tomorrow, 10:00 AM",
      type: "Chat Session",
      topic: "Daily Mindfulness Practice",
    },
  ]

  const supportGroups = [
    {
      id: 1,
      name: "Study Stress Support Circle",
      nextSession: "Today, 7:00 PM",
      participants: 12,
      facilitator: "Dr. Sarah Kim",
      description: "Weekly group sessions focused on managing academic pressure and developing healthy study habits.",
    },
    {
      id: 2,
      name: "Mindful Mondays",
      nextSession: "Monday, 6:00 PM",
      participants: 18,
      facilitator: "Alex Thompson",
      description: "Start your week with guided meditation and mindfulness exercises in a supportive group setting.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Peer Support Network</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with trained peer supporters who understand your journey and can provide guidance and encouragement.
          </p>
        </div>

        <Tabs defaultValue="supporters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="supporters">Find Supporters</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="become">Become a Supporter</TabsTrigger>
          </TabsList>

          {/* Find Supporters */}
          <TabsContent value="supporters">
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      placeholder="Search by specialty, university, or name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <div className="flex gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                        Anxiety
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
                        Depression
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                        Study Stress
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-pink-50">
                        Social Issues
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Peer Supporters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {peerSupporters.map((supporter) => (
                  <Card key={supporter.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={supporter.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {supporter.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {supporter.isOnline && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{supporter.name}</h3>
                          <p className="text-sm text-muted-foreground">{supporter.university}</p>
                          <p className="text-sm text-muted-foreground">{supporter.year}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{supporter.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{supporter.sessions} sessions</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {supporter.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-sm text-gray-600">{supporter.bio}</p>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{supporter.availability}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Video className="mr-2 h-4 w-4" />
                          Video Call
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* My Sessions */}
          <TabsContent value="sessions">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled peer support sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {session.supporter
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{session.supporter}</h4>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-blue-600">{session.date}</span>
                            <Badge variant="outline">{session.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm">Join Session</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>Your past peer support interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                      <div>
                        <p className="font-medium">Session with Emma Chen</p>
                        <p className="text-sm text-muted-foreground">Anxiety Management Techniques • March 15, 2024</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                      <div>
                        <p className="font-medium">Group Session: Study Stress</p>
                        <p className="text-sm text-muted-foreground">Weekly Support Circle • March 12, 2024</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support Groups */}
          <TabsContent value="groups">
            <div className="space-y-6">
              {supportGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription>Facilitated by {group.facilitator}</CardDescription>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">{group.participants} members</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Next session: {group.nextSession}</span>
                      </div>
                      <Button>Join Group</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Become a Supporter */}
          <TabsContent value="become">
            <Card>
              <CardHeader>
                <CardTitle>Become a Peer Supporter</CardTitle>
                <CardDescription>Help other students by sharing your experiences and providing support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Requirements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Currently enrolled university student</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Complete peer support training (8 hours)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Maintain good academic standing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Commit to 4 hours per week minimum</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Earn community service hours</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Develop counseling and listening skills</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Make a meaningful impact</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Access to advanced wellness resources</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1">Apply to Become a Supporter</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
