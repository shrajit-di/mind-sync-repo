"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, MapPin, Clock, AlertTriangle, Heart, Shield, MessageCircle, Navigation, Zap } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"

function PulsingAlert() {
  return (
    <Float speed={3} rotationIntensity={0} floatIntensity={3}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  )
}

export default function EmergencyPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [sosActive, setSosActive] = useState(false)
  const [sosCountdown, setSosCountdown] = useState(0)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied")
        },
      )
    }
  }, [])

  const emergencyContacts = [
    {
      id: 1,
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      type: "Crisis Hotline",
      availability: "24/7",
      languages: ["English", "Spanish"],
      priority: "high",
    },
    {
      id: 2,
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free 24/7 crisis support via text message",
      type: "Text Support",
      availability: "24/7",
      languages: ["English"],
      priority: "high",
    },
    {
      id: 3,
      name: "Campus Security",
      number: "(555) 123-HELP",
      description: "University campus emergency services",
      type: "Campus Emergency",
      availability: "24/7",
      languages: ["English", "Spanish"],
      priority: "medium",
    },
    {
      id: 4,
      name: "Local Emergency Services",
      number: "911",
      description: "Police, fire, and medical emergencies",
      type: "Emergency Services",
      availability: "24/7",
      languages: ["English"],
      priority: "high",
    },
    {
      id: 5,
      name: "University Counseling Center",
      number: "(555) 234-CARE",
      description: "Campus mental health crisis support",
      type: "Mental Health",
      availability: "Mon-Fri 8AM-6PM",
      languages: ["English", "Spanish", "Mandarin"],
      priority: "medium",
    },
  ]

  const nearbyHospitals = [
    {
      id: 1,
      name: "University Medical Center",
      address: "123 Campus Drive",
      distance: "0.8 miles",
      phone: "(555) 789-0123",
      services: ["Emergency Room", "Mental Health Crisis", "Psychiatric Services"],
      waitTime: "15-30 minutes",
    },
    {
      id: 2,
      name: "City General Hospital",
      address: "456 Main Street",
      distance: "2.3 miles",
      phone: "(555) 456-7890",
      services: ["Emergency Room", "Trauma Center", "Crisis Intervention"],
      waitTime: "30-45 minutes",
    },
    {
      id: 3,
      name: "Mental Health Crisis Center",
      address: "789 Wellness Blvd",
      distance: "1.5 miles",
      phone: "(555) 321-9876",
      services: ["Crisis Stabilization", "Psychiatric Emergency", "24/7 Support"],
      waitTime: "10-20 minutes",
    },
  ]

  const handleSOSActivation = () => {
    setSosActive(true)
    setSosCountdown(10)

    const countdown = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdown)
          // Trigger emergency services
          console.log("SOS activated - contacting emergency services")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const cancelSOS = () => {
    setSosActive(false)
    setSosCountdown(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Emergency Header with 3D Animation */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 p-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <PulsingAlert />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Emergency Support</h1>
            </div>
            <p className="text-red-100 text-lg mb-4">Immediate help and crisis support when you need it most</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>24/7 Crisis Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Confidential Help</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>You're Not Alone</span>
              </div>
            </div>
          </div>
        </div>

        {/* SOS Alert */}
        {sosActive && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span className="text-red-800 font-semibold">
                SOS Alert Active - Emergency services will be contacted in {sosCountdown} seconds
              </span>
              <Button onClick={cancelSOS} variant="outline" size="sm">
                Cancel
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick SOS Button */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-bold text-red-800">Emergency SOS</h2>
              </div>
              <p className="text-red-700 mb-4">Press and hold for 3 seconds to activate emergency services</p>
              <Button
                onClick={handleSOSActivation}
                disabled={sosActive}
                className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-6 rounded-full"
                size="lg"
              >
                <AlertTriangle className="mr-2 h-6 w-6" />
                SOS - GET HELP NOW
              </Button>
              <p className="text-sm text-red-600">This will contact emergency services and your emergency contacts</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="crisis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="crisis">Crisis Support</TabsTrigger>
            <TabsTrigger value="hospitals">Nearby Help</TabsTrigger>
            <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="safety">Safety Planning</TabsTrigger>
          </TabsList>

          {/* Crisis Support */}
          <TabsContent value="crisis">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Immediate Crisis Support</CardTitle>
                  <CardDescription>
                    If you're having thoughts of suicide or self-harm, please reach out immediately
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-4">
                {emergencyContacts
                  .filter((contact) => contact.priority === "high")
                  .map((contact) => (
                    <Card key={contact.id} className="border-red-200 hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{contact.name}</h3>
                              <Badge variant="destructive">{contact.type}</Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{contact.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{contact.availability}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{contact.languages.join(", ")}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button className="bg-red-600 hover:bg-red-700">
                              <Phone className="mr-2 h-4 w-4" />
                              {contact.number}
                            </Button>
                            {contact.number.includes("Text") && (
                              <Button variant="outline">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Send Text
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Immediate Coping Strategies */}
              <Card>
                <CardHeader>
                  <CardTitle>Immediate Coping Strategies</CardTitle>
                  <CardDescription>Quick techniques to help you through a crisis moment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <h4 className="font-semibold mb-2">5-4-3-2-1 Grounding</h4>
                      <p className="text-sm text-gray-600">
                        Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold mb-2">Box Breathing</h4>
                      <p className="text-sm text-gray-600">
                        Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                      <h4 className="font-semibold mb-2">Cold Water</h4>
                      <p className="text-sm text-gray-600">
                        Splash cold water on your face or hold ice cubes to reset your nervous system
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                      <h4 className="font-semibold mb-2">Reach Out</h4>
                      <p className="text-sm text-gray-600">
                        Call a friend, family member, or crisis line. You don't have to be alone.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Nearby Hospitals */}
          <TabsContent value="hospitals">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nearby Mental Health Facilities</CardTitle>
                  <CardDescription>Emergency rooms and crisis centers near your location</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-4">
                {nearbyHospitals.map((hospital) => (
                  <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{hospital.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {hospital.address} • {hospital.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Estimated wait: {hospital.waitTime}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {hospital.services.map((service) => (
                              <Badge key={service} variant="outline">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button>
                            <Phone className="mr-2 h-4 w-4" />
                            Call {hospital.phone}
                          </Button>
                          <Button variant="outline">
                            <Navigation className="mr-2 h-4 w-4" />
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {location && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Current Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        Location detected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </span>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Navigation className="mr-2 h-4 w-4" />
                      Share Location with Emergency Services
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Emergency Contacts */}
          <TabsContent value="contacts">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Emergency Contacts</CardTitle>
                  <CardDescription>Complete list of crisis support and emergency services</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-4">
                {emergencyContacts.map((contact) => (
                  <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{contact.name}</h3>
                            <Badge variant={contact.priority === "high" ? "destructive" : "secondary"}>
                              {contact.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{contact.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{contact.availability}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{contact.languages.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant={contact.priority === "high" ? "destructive" : "default"}>
                          <Phone className="mr-2 h-4 w-4" />
                          {contact.number}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Safety Planning */}
          <TabsContent value="safety">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Safety Plan</CardTitle>
                  <CardDescription>Create a personalized plan for managing crisis situations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Warning Signs</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Recognize early signs that you might be entering a crisis
                      </p>
                      <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                        <p className="text-sm">
                          Examples: Feeling hopeless, isolating from friends, sleep changes, increased anxiety
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Coping Strategies</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Activities that help you feel better when you're struggling
                      </p>
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <p className="text-sm">
                          Examples: Call a friend, listen to music, take a walk, practice breathing exercises
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Support Network</h4>
                      <p className="text-sm text-muted-foreground mb-2">People you can reach out to for support</p>
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                        <p className="text-sm">Add trusted friends, family members, counselors, or mentors</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Professional Contacts</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Mental health professionals and crisis services
                      </p>
                      <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                        <p className="text-sm">Therapist, psychiatrist, crisis hotline, emergency services</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Create My Safety Plan</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
