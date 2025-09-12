"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, MapPin, Clock, Star, Phone, Calendar, Search, Heart, Shield } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Sphere } from "@react-three/drei"

function FloatingBrain() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 32, 32]} scale={1.5}>
        <meshStandardMaterial color="#6366f1" wireframe />
      </Sphere>
    </Float>
  )
}

export default function ProfessionalHelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedInsurance, setSelectedInsurance] = useState("all")

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      avatar: "/placeholder.svg?height=80&width=80",
      specialties: ["Anxiety Disorders", "Depression", "Cognitive Behavioral Therapy"],
      rating: 4.9,
      reviews: 127,
      experience: "12 years",
      location: "Downtown Medical Center",
      distance: "2.3 miles",
      availability: "Available this week",
      sessionTypes: ["In-Person", "Video Call", "Phone"],
      insurance: ["Blue Cross", "Aetna", "United Healthcare"],
      rate: "$150-200/session",
      bio: "Specializing in anxiety and depression treatment for college students. Evidence-based approaches including CBT and mindfulness techniques.",
      education: "PhD Psychology, Stanford University",
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Psychiatrist",
      avatar: "/placeholder.svg?height=80&width=80",
      specialties: ["ADHD", "Bipolar Disorder", "Medication Management"],
      rating: 4.8,
      reviews: 89,
      experience: "8 years",
      location: "University Health Services",
      distance: "0.8 miles",
      availability: "Next available: March 25",
      sessionTypes: ["In-Person", "Video Call"],
      insurance: ["Student Health Plan", "Cigna", "Blue Cross"],
      rate: "$200-250/session",
      bio: "Board-certified psychiatrist with expertise in student mental health and medication management.",
      education: "MD, Harvard Medical School",
      languages: ["English", "Mandarin"],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Licensed Marriage & Family Therapist",
      avatar: "/placeholder.svg?height=80&width=80",
      specialties: ["Relationship Issues", "Family Therapy", "Trauma Recovery"],
      rating: 4.9,
      reviews: 156,
      experience: "15 years",
      location: "Wellness Center Campus",
      distance: "1.2 miles",
      availability: "Available today",
      sessionTypes: ["In-Person", "Video Call"],
      insurance: ["Most Major Insurance", "Sliding Scale Available"],
      rate: "$120-180/session",
      bio: "Compassionate therapist specializing in relationship dynamics and trauma-informed care for young adults.",
      education: "MA Clinical Psychology, UCLA",
      languages: ["English", "Spanish", "Portuguese"],
    },
  ]

  const mentalHealthResources = [
    {
      id: 1,
      name: "University Counseling Center",
      type: "Campus Resource",
      services: ["Individual Therapy", "Group Therapy", "Crisis Support"],
      hours: "Mon-Fri 8AM-6PM",
      phone: "(555) 123-4567",
      emergency: true,
      cost: "Free for students",
    },
    {
      id: 2,
      name: "Student Wellness Clinic",
      type: "Medical Center",
      services: ["Psychiatric Services", "Medication Management", "Wellness Programs"],
      hours: "Mon-Fri 9AM-5PM",
      phone: "(555) 234-5678",
      emergency: false,
      cost: "Insurance accepted",
    },
    {
      id: 3,
      name: "24/7 Crisis Hotline",
      type: "Emergency Support",
      services: ["Crisis Intervention", "Suicide Prevention", "Immediate Support"],
      hours: "24/7 Available",
      phone: "988",
      emergency: true,
      cost: "Free",
    },
  ]

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSpecialty = selectedSpecialty === "all" || therapist.specialties.includes(selectedSpecialty)
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with 3D Animation */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FloatingBrain />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Professional Mental Health Support</h1>
            </div>
            <p className="text-indigo-100 text-lg mb-4">
              Connect with licensed mental health professionals who specialize in student wellness
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Licensed Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>Student-Focused Care</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="therapists" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="therapists">Find Therapists</TabsTrigger>
            <TabsTrigger value="resources">Campus Resources</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
          </TabsList>

          {/* Find Therapists */}
          <TabsContent value="therapists">
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search therapists or specialties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Specialties</SelectItem>
                        <SelectItem value="Anxiety Disorders">Anxiety Disorders</SelectItem>
                        <SelectItem value="Depression">Depression</SelectItem>
                        <SelectItem value="ADHD">ADHD</SelectItem>
                        <SelectItem value="Relationship Issues">Relationship Issues</SelectItem>
                        <SelectItem value="Trauma Recovery">Trauma Recovery</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="campus">On Campus</SelectItem>
                        <SelectItem value="nearby">Within 5 miles</SelectItem>
                        <SelectItem value="remote">Remote Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
                      <SelectTrigger>
                        <SelectValue placeholder="Insurance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Insurance</SelectItem>
                        <SelectItem value="student">Student Health Plan</SelectItem>
                        <SelectItem value="blue-cross">Blue Cross</SelectItem>
                        <SelectItem value="aetna">Aetna</SelectItem>
                        <SelectItem value="sliding-scale">Sliding Scale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Therapist Listings */}
              <div className="space-y-6">
                {filteredTherapists.map((therapist) => (
                  <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Therapist Info */}
                        <div className="lg:col-span-2">
                          <div className="flex items-start gap-4 mb-4">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={therapist.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {therapist.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold">{therapist.name}</h3>
                              <p className="text-muted-foreground mb-2">{therapist.title}</p>
                              <div className="flex items-center gap-4 mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{therapist.rating}</span>
                                  <span className="text-sm text-muted-foreground">({therapist.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {therapist.experience} experience
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {therapist.location} • {therapist.distance}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{therapist.bio}</p>

                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">Specialties</h4>
                              <div className="flex flex-wrap gap-2">
                                {therapist.specialties.map((specialty) => (
                                  <Badge key={specialty} variant="secondary">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Session Types</h4>
                              <div className="flex gap-2">
                                {therapist.sessionTypes.map((type) => (
                                  <Badge key={type} variant="outline">
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Education:</span>
                                <p className="text-muted-foreground">{therapist.education}</p>
                              </div>
                              <div>
                                <span className="font-medium">Languages:</span>
                                <p className="text-muted-foreground">{therapist.languages.join(", ")}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Booking Info */}
                        <div className="space-y-4">
                          <Card className="bg-gray-50">
                            <CardContent className="pt-4">
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-green-600" />
                                  <span className="text-sm font-medium text-green-600">{therapist.availability}</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Rate</p>
                                  <p className="text-lg font-semibold">{therapist.rate}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">Insurance Accepted</p>
                                  <div className="flex flex-wrap gap-1">
                                    {therapist.insurance.slice(0, 2).map((ins) => (
                                      <Badge key={ins} variant="outline" className="text-xs">
                                        {ins}
                                      </Badge>
                                    ))}
                                    {therapist.insurance.length > 2 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{therapist.insurance.length - 2} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="space-y-2">
                            <Button className="w-full">
                              <Calendar className="mr-2 h-4 w-4" />
                              Book Appointment
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent">
                              <Phone className="mr-2 h-4 w-4" />
                              Contact Office
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent">
                              View Full Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Campus Resources */}
          <TabsContent value="resources">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campus Mental Health Resources</CardTitle>
                  <CardDescription>Free and low-cost mental health services available to students</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-6">
                {mentalHealthResources.map((resource) => (
                  <Card key={resource.id} className={resource.emergency ? "border-red-200 bg-red-50" : ""}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{resource.name}</h3>
                          <Badge variant={resource.emergency ? "destructive" : "secondary"}>{resource.type}</Badge>
                        </div>
                        {resource.emergency && <Badge variant="destructive">Emergency</Badge>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium mb-2">Services</h4>
                          <ul className="space-y-1">
                            {resource.services.map((service) => (
                              <li key={service} className="text-sm text-muted-foreground">
                                • {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Hours</h4>
                          <p className="text-sm text-muted-foreground">{resource.hours}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Cost</h4>
                          <p className="text-sm text-muted-foreground">{resource.cost}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button variant={resource.emergency ? "destructive" : "default"}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call {resource.phone}
                        </Button>
                        <Button variant="outline">
                          <MapPin className="mr-2 h-4 w-4" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* My Appointments */}
          <TabsContent value="appointments">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Manage your scheduled therapy sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                          <p className="text-sm text-muted-foreground">Individual Therapy Session</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-blue-600">Today, 3:00 PM</span>
                            <Badge variant="outline">Video Call</Badge>
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

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">Dr. Michael Chen</h4>
                          <p className="text-sm text-muted-foreground">Medication Consultation</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-blue-600">March 25, 10:00 AM</span>
                            <Badge variant="outline">In-Person</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appointment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                      <div>
                        <p className="font-medium">Session with Dr. Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Anxiety Management • March 15, 2024</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                      <div>
                        <p className="font-medium">Initial Consultation</p>
                        <p className="text-sm text-muted-foreground">Dr. Emily Rodriguez • March 8, 2024</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
