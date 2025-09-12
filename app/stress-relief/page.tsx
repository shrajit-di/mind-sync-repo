"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Volume2, VolumeX, Clock, Heart, Leaf, Waves, Mountain, User, Star } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from "@react-three/drei"

function FloatingOrb({ color }: { color: string }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere args={[0.8, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  )
}

export default function StressReliefPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [volume, setVolume] = useState([50])
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const meditationSessions = [
    {
      id: 1,
      title: "Breathing for Anxiety",
      instructor: "Dr. Sarah Chen",
      duration: "10 min",
      difficulty: "Beginner",
      description: "Simple breathing techniques to calm anxiety and reduce stress",
      audioUrl: "/audio/breathing-meditation.mp3",
      category: "Breathing",
    },
    {
      id: 2,
      title: "Body Scan Relaxation",
      instructor: "Michael Rodriguez",
      duration: "15 min",
      difficulty: "Intermediate",
      description: "Progressive muscle relaxation to release physical tension",
      audioUrl: "/audio/body-scan.mp3",
      category: "Body Scan",
    },
    {
      id: 3,
      title: "Mindful Study Break",
      instructor: "Emma Thompson",
      duration: "5 min",
      difficulty: "Beginner",
      description: "Quick mindfulness practice perfect for study breaks",
      audioUrl: "/audio/study-break.mp3",
      category: "Mindfulness",
    },
    {
      id: 4,
      title: "Sleep Preparation",
      instructor: "Dr. James Wilson",
      duration: "20 min",
      difficulty: "Beginner",
      description: "Gentle meditation to prepare your mind and body for sleep",
      audioUrl: "/audio/sleep-meditation.mp3",
      category: "Sleep",
    },
  ]

  const yogaVideos = [
    {
      id: 1,
      title: "Desk Yoga for Students",
      instructor: "Lisa Park",
      duration: "12 min",
      difficulty: "Beginner",
      description: "Simple stretches you can do at your desk to relieve study tension",
      thumbnail: "/yoga-desk-stretches.jpg",
      videoUrl: "/videos/desk-yoga.mp4",
      category: "Desk Yoga",
    },
    {
      id: 2,
      title: "Morning Energy Flow",
      instructor: "Alex Kumar",
      duration: "18 min",
      difficulty: "Intermediate",
      description: "Energizing yoga sequence to start your day with clarity and focus",
      thumbnail: "/morning-yoga-flow.jpg",
      videoUrl: "/videos/morning-flow.mp4",
      category: "Morning",
    },
    {
      id: 3,
      title: "Stress Relief Sequence",
      instructor: "Maria Santos",
      duration: "25 min",
      difficulty: "Beginner",
      description: "Gentle yoga poses specifically designed to reduce stress and anxiety",
      thumbnail: "/stress-relief-yoga.jpg",
      videoUrl: "/videos/stress-relief.mp4",
      category: "Stress Relief",
    },
    {
      id: 4,
      title: "Evening Wind Down",
      instructor: "David Chen",
      duration: "15 min",
      difficulty: "Beginner",
      description: "Calming yoga practice to help you unwind after a long day",
      thumbnail: "/evening-yoga-relaxation.jpg",
      videoUrl: "/videos/evening-yoga.mp4",
      category: "Evening",
    },
  ]

  const brownNoiseOptions = [
    {
      id: 1,
      name: "Classic Brown Noise",
      description: "Deep, rumbling sound for focus and relaxation",
      icon: Waves,
      audioUrl: "/audio/brown-noise.mp3",
      color: "#8B4513",
    },
    {
      id: 2,
      name: "Rain on Leaves",
      description: "Gentle rainfall with natural brown noise frequencies",
      icon: Leaf,
      audioUrl: "/audio/rain-leaves.mp3",
      color: "#228B22",
    },
    {
      id: 3,
      name: "Ocean Waves",
      description: "Deep ocean sounds with calming brown noise",
      icon: Waves,
      audioUrl: "/audio/ocean-waves.mp3",
      color: "#4682B4",
    },
    {
      id: 4,
      name: "Mountain Wind",
      description: "Steady wind through mountains with brown noise undertones",
      icon: Mountain,
      audioUrl: "/audio/mountain-wind.mp3",
      color: "#696969",
    },
  ]

  const stressTherapists = [
    {
      id: 1,
      name: "Dr. Jennifer Walsh",
      specialty: "Stress & Anxiety Management",
      experience: "12 years",
      rating: 4.9,
      reviews: 156,
      approach: "Cognitive Behavioral Therapy, Mindfulness-Based Stress Reduction",
      availability: "Available this week",
      sessionRate: "$120-150",
    },
    {
      id: 2,
      name: "Dr. Robert Kim",
      specialty: "Academic Stress & Performance",
      experience: "8 years",
      rating: 4.8,
      reviews: 89,
      approach: "Solution-Focused Therapy, Stress Inoculation Training",
      availability: "Next available: March 28",
      sessionRate: "$100-130",
    },
    {
      id: 3,
      name: "Dr. Maria Rodriguez",
      specialty: "Trauma-Informed Stress Treatment",
      experience: "15 years",
      rating: 4.9,
      reviews: 203,
      approach: "EMDR, Somatic Experiencing, Mindfulness",
      availability: "Available today",
      sessionRate: "$140-180",
    },
  ]

  const playAudio = (audioUrl: string, trackId: string) => {
    if (audioRef.current) {
      if (currentTrack === trackId && isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.src = audioUrl
        audioRef.current.play()
        setIsPlaying(true)
        setCurrentTrack(trackId)
      }
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100)
        }
      }

      const updateDuration = () => {
        setDuration(audio.duration)
      }

      audio.addEventListener("timeupdate", updateProgress)
      audio.addEventListener("loadedmetadata", updateDuration)
      audio.addEventListener("ended", () => {
        setIsPlaying(false)
        setProgress(0)
      })

      return () => {
        audio.removeEventListener("timeupdate", updateProgress)
        audio.removeEventListener("loadedmetadata", updateDuration)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <audio ref={audioRef} />

      <div className="container mx-auto px-4 py-8">
        {/* Header with 3D Animation */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
          <div className="absolute inset-0 opacity-30">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FloatingOrb color="#10b981" />
              <FloatingOrb color="#3b82f6" />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Stress Relief & Treatment</h1>
            </div>
            <p className="text-green-100 text-lg mb-4">
              Comprehensive tools and resources to manage stress and find inner peace
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>Guided Meditation</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                <span>Calming Sounds</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Expert Therapists</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="meditation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="yoga">Yoga Videos</TabsTrigger>
            <TabsTrigger value="sounds">Brown Noise</TabsTrigger>
            <TabsTrigger value="therapists">Therapists</TabsTrigger>
            <TabsTrigger value="exercises">Quick Relief</TabsTrigger>
          </TabsList>

          {/* Meditation */}
          <TabsContent value="meditation">
            <div className="space-y-6">
              {/* Audio Player */}
              {currentTrack && (
                <Card className="bg-gradient-to-r from-blue-50 to-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Button onClick={togglePlayPause} size="lg" className="rounded-full">
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                      <div className="flex-1">
                        <h4 className="font-semibold">Now Playing</h4>
                        <p className="text-sm text-muted-foreground">
                          {meditationSessions.find((s) => s.id.toString() === currentTrack)?.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <VolumeX className="h-4 w-4" />
                        <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-20" />
                        <Volume2 className="h-4 w-4" />
                      </div>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </CardContent>
                </Card>
              )}

              {/* Meditation Sessions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meditationSessions.map((session) => (
                  <Card key={session.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {session.instructor}</p>
                          <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{session.category}</Badge>
                            <Badge variant="secondary">{session.difficulty}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{session.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => playAudio(session.audioUrl, session.id.toString())}
                        className="w-full"
                        variant={currentTrack === session.id.toString() && isPlaying ? "secondary" : "default"}
                      >
                        {currentTrack === session.id.toString() && isPlaying ? (
                          <>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Play Session
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Yoga Videos */}
          <TabsContent value="yoga">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yogaVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-t-lg">
                      <Button size="lg" className="rounded-full">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black bg-opacity-70">{video.duration}</Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">with {video.instructor}</p>
                    <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline">{video.category}</Badge>
                        <Badge variant="secondary">{video.difficulty}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Brown Noise */}
          <TabsContent value="sounds">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brown Noise for Focus & Relaxation</CardTitle>
                  <CardDescription>
                    Deep, calming sounds that help mask distractions and promote relaxation
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {brownNoiseOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <Card key={option.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="p-3 rounded-full"
                            style={{ backgroundColor: `${option.color}20`, color: option.color }}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{option.name}</h3>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => playAudio(option.audioUrl, `noise-${option.id}`)}
                          className="w-full"
                          variant={currentTrack === `noise-${option.id}` && isPlaying ? "secondary" : "default"}
                        >
                          {currentTrack === `noise-${option.id}` && isPlaying ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Play
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          {/* Stress Therapists */}
          <TabsContent value="therapists">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stress Management Specialists</CardTitle>
                  <CardDescription>
                    Licensed therapists specializing in stress, anxiety, and academic pressure
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-4">
                {stressTherapists.map((therapist) => (
                  <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{therapist.name}</h3>
                          <p className="text-muted-foreground mb-2">{therapist.specialty}</p>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{therapist.rating}</span>
                              <span className="text-sm text-muted-foreground">({therapist.reviews} reviews)</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{therapist.experience} experience</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            <strong>Approach:</strong> {therapist.approach}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-green-600">{therapist.availability}</span>
                            <span className="text-muted-foreground">{therapist.sessionRate}/session</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button>Book Consultation</Button>
                          <Button variant="outline">View Profile</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Quick Relief Exercises */}
          <TabsContent value="exercises">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">4-7-8 Breathing</h3>
                  <p className="text-sm text-gray-600 mb-4">Inhale for 4, hold for 7, exhale for 8. Repeat 4 times.</p>
                  <Button className="w-full">Start Exercise</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Progressive Muscle Relaxation</h3>
                  <p className="text-sm text-gray-600 mb-4">Tense and release muscle groups from toes to head.</p>
                  <Button className="w-full">Start Exercise</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">5-4-3-2-1 Grounding</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.
                  </p>
                  <Button className="w-full">Start Exercise</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Mindful Walking</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Take a slow, mindful walk focusing on each step and breath.
                  </p>
                  <Button className="w-full">Start Exercise</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-50 to-pink-100">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Visualization</h3>
                  <p className="text-sm text-gray-600 mb-4">Imagine a peaceful place and engage all your senses.</p>
                  <Button className="w-full">Start Exercise</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-50 to-teal-100">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Gratitude Practice</h3>
                  <p className="text-sm text-gray-600 mb-4">List 3 things you're grateful for right now.</p>
                  <Button className="w-full">Start Exercise</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
