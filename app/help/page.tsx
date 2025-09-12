"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Phone, MapPin, Clock, AlertTriangle, Search, Navigation, Shield, MessageCircle } from "lucide-react"

export default function HelpPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

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

  const crisisHotlines = [
    {
      id: 1,
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      availability: "24/7",
      languages: ["English", "Spanish"],
      type: "Crisis Support",
      priority: "emergency",
    },
    {
      id: 2,
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free 24/7 crisis support via text message",
      availability: "24/7",
      languages: ["English"],
      type: "Text Support",
      priority: "emergency",
    },
    {
      id: 3,
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral and information service",
      availability: "24/7",
      languages: ["English", "Spanish"],
      type: "Treatment Referral",
      priority: "high",
    },
    {
      id: 4,
      name: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "Support for domestic violence situations",
      availability: "24/7",
      languages: ["English", "Spanish", "200+ languages via interpreter"],
      type: "Domestic Violence",
      priority: "emergency",
    },
    {
      id: 5,
      name: "LGBT National Hotline",
      number: "1-888-843-4564",
      description: "Support for LGBTQ+ individuals",
      availability: "Mon-Fri 4PM-12AM, Sat 12PM-5PM EST",
      languages: ["English"],
      type: "LGBTQ+ Support",
      priority: "high",
    },
    {
      id: 6,
      name: "RAINN National Sexual Assault Hotline",
      number: "1-800-656-4673",
      description: "Support for sexual assault survivors",
      availability: "24/7",
      languages: ["English", "Spanish"],
      type: "Sexual Assault Support",
      priority: "emergency",
    },
  ]

  const nearbyResources = [
    {
      id: 1,
      name: "University Medical Center",
      type: "Hospital",
      address: "123 Campus Drive",
      distance: "0.8 miles",
      phone: "(555) 789-0123",
      services: ["Emergency Room", "Mental Health Crisis", "Psychiatric Services"],
      hours: "24/7",
      waitTime: "15-30 minutes",
    },
    {
      id: 2,
      name: "Campus Counseling Center",
      type: "Counseling",
      address: "456 Student Union Building",
      distance: "0.3 miles",
      phone: "(555) 234-CARE",
      services: ["Individual Therapy", "Group Therapy", "Crisis Support"],
      hours: "Mon-Fri 8AM-6PM",
      waitTime: "Same day appointments available",
    },
    {
      id: 3,
      name: "City Mental Health Crisis Center",
      type: "Crisis Center",
      address: "789 Wellness Boulevard",
      distance: "1.5 miles",
      phone: "(555) 321-9876",
      services: ["Crisis Stabilization", "Psychiatric Emergency", "24/7 Support"],
      hours: "24/7",
      waitTime: "10-20 minutes",
    },
    {
      id: 4,
      name: "Community Health Clinic",
      type: "Clinic",
      address: "321 Main Street",
      distance: "2.1 miles",
      phone: "(555) 654-3210",
      services: ["Primary Care", "Mental Health Services", "Sliding Scale Fees"],
      hours: "Mon-Fri 8AM-5PM, Sat 9AM-1PM",
      waitTime: "Next day appointments",
    },
  ]

  const quickActions = [
    {
      id: 1,
      title: "Call 911",
      description: "For immediate medical emergencies",
      action: "tel:911",
      color: "bg-red-600 hover:bg-red-700",
      icon: AlertTriangle,
    },
    {
      id: 2,
      title: "Crisis Text Line",
      description: "Text HOME to 741741",
      action: "sms:741741",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: MessageCircle,
    },
    {
      id: 3,
      title: "Campus Security",
      description: "Call campus emergency services",
      action: "tel:555-123-HELP",
      color: "bg-orange-600 hover:bg-orange-700",
      icon: Shield,
    },
    {
      id: 4,
      title: "Share Location",
      description: "Send your location to emergency contacts",
      action: "#",
      color: "bg-green-600 hover:bg-green-700",
      icon: MapPin,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Crisis Support</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Immediate access to crisis support, emergency services, and mental health resources
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => {
            const IconComponent = action.icon
            return (
              <Button
                key={action.id}
                asChild
                className={`${action.color} text-white p-6 h-auto flex-col gap-2 text-center`}
              >
                <a href={action.action}>
                  <IconComponent className="h-8 w-8" />
                  <div>
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-sm opacity-90">{action.description}</div>
                  </div>
                </a>
              </Button>
            )
          })}
        </div>

        <Tabs defaultValue="hotlines" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hotlines">Crisis Hotlines</TabsTrigger>
            <TabsTrigger value="nearby">Nearby Resources</TabsTrigger>
            <TabsTrigger value="maps">Maps & Directions</TabsTrigger>
          </TabsList>

          {/* Crisis Hotlines */}
          <TabsContent value="hotlines">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Emergency Crisis Support</CardTitle>
                  <CardDescription>
                    If you're in immediate danger or having thoughts of self-harm, please call one of these numbers
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-4">
                {crisisHotlines.map((hotline) => (
                  <Card
                    key={hotline.id}
                    className={`hover:shadow-lg transition-shadow ${
                      hotline.priority === "emergency" ? "border-red-200 bg-red-50" : ""
                    }`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{hotline.name}</h3>
                            <Badge variant={hotline.priority === "emergency" ? "destructive" : "secondary"}>
                              {hotline.type}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{hotline.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{hotline.availability}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{hotline.languages.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          asChild
                          className={hotline.priority === "emergency" ? "bg-red-600 hover:bg-red-700" : ""}
                        >
                          <a href={`tel:${hotline.number.replace(/[^\d]/g, "")}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            {hotline.number}
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Nearby Resources */}
          <TabsContent value="nearby">
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for specific services or locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {nearbyResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{resource.name}</h3>
                            <Badge variant="outline">{resource.type}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {resource.address} • {resource.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{resource.hours}</span>
                          </div>
                          <div className="mb-3">
                            <h4 className="font-medium mb-1">Services</h4>
                            <div className="flex flex-wrap gap-2">
                              {resource.services.map((service) => (
                                <Badge key={service} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-green-600 font-medium">{resource.waitTime}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button asChild>
                            <a href={`tel:${resource.phone}`}>
                              <Phone className="mr-2 h-4 w-4" />
                              Call
                            </a>
                          </Button>
                          <Button variant="outline">
                            <Navigation className="mr-2 h-4 w-4" />
                            Directions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Maps & Directions */}
          <TabsContent value="maps">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Services</CardTitle>
                  <CardDescription>Find nearby mental health resources and get directions</CardDescription>
                </CardHeader>
                <CardContent>
                  {location ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Location Detected</p>
                          <p className="text-sm text-green-600">
                            Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button className="w-full">
                          <Navigation className="mr-2 h-4 w-4" />
                          Find Nearest Hospital
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          <MapPin className="mr-2 h-4 w-4" />
                          Share My Location
                        </Button>
                      </div>

                      {/* Simulated Map Placeholder */}
                      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Interactive Map</p>
                          <p className="text-sm text-gray-400">Showing nearby mental health resources</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Enable Location Services</h3>
                      <p className="text-gray-600 mb-4">
                        Allow location access to find nearby mental health resources and emergency services
                      </p>
                      <Button
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition((position) => {
                              setLocation({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                              })
                            })
                          }
                        }}
                      >
                        Enable Location
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Emergency Instructions */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-600">Emergency Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <p className="text-sm">
                        If you're in immediate danger, call 911 or go to the nearest emergency room
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <p className="text-sm">Share your location with trusted contacts or emergency services</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <p className="text-sm">Stay on the line with emergency operators and follow their instructions</p>
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
