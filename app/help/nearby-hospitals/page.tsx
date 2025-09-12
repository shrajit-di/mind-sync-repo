"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Clock, Navigation, Star, AlertTriangle } from "lucide-react"

export default function NearbyHospitalsPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchRadius, setSearchRadius] = useState("5")

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  const hospitals = [
    {
      id: 1,
      name: "University Medical Center",
      address: "123 Campus Drive, University City",
      distance: "0.8 miles",
      phone: "(555) 789-0123",
      rating: 4.6,
      reviews: 1247,
      services: ["Emergency Room", "Mental Health Crisis", "Psychiatric Services", "Trauma Center"],
      waitTime: "15-30 minutes",
      hasER: true,
      hasPsych: true,
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
    {
      id: 2,
      name: "City General Hospital",
      address: "456 Main Street, Downtown",
      distance: "2.3 miles",
      phone: "(555) 456-7890",
      rating: 4.4,
      reviews: 892,
      services: ["Emergency Room", "Trauma Center", "Crisis Intervention", "Cardiology"],
      waitTime: "30-45 minutes",
      hasER: true,
      hasPsych: true,
      coordinates: { lat: 40.7505, lng: -73.9934 },
    },
    {
      id: 3,
      name: "Mental Health Crisis Center",
      address: "789 Wellness Boulevard, Midtown",
      distance: "1.5 miles",
      phone: "(555) 321-9876",
      rating: 4.8,
      reviews: 456,
      services: ["Crisis Stabilization", "Psychiatric Emergency", "24/7 Support", "Detox Services"],
      waitTime: "10-20 minutes",
      hasER: false,
      hasPsych: true,
      coordinates: { lat: 40.7614, lng: -73.9776 },
    },
    {
      id: 4,
      name: "Regional Medical Center",
      address: "321 Health Plaza, Northside",
      distance: "3.7 miles",
      phone: "(555) 654-3210",
      rating: 4.5,
      reviews: 1089,
      services: ["Emergency Room", "Intensive Care", "Mental Health Unit", "Pediatric Care"],
      waitTime: "20-35 minutes",
      hasER: true,
      hasPsych: true,
      coordinates: { lat: 40.7831, lng: -73.9712 },
    },
    {
      id: 5,
      name: "Community Urgent Care",
      address: "654 Community Way, Southside",
      distance: "4.2 miles",
      phone: "(555) 987-6543",
      rating: 4.2,
      reviews: 234,
      services: ["Urgent Care", "Mental Health Screening", "Primary Care", "Lab Services"],
      waitTime: "45-60 minutes",
      hasER: false,
      hasPsych: false,
      coordinates: { lat: 40.7282, lng: -73.9942 },
    },
  ]

  const getDirections = (hospital: (typeof hospitals)[0]) => {
    if (location) {
      const url = `https://www.google.com/maps/dir/${location.lat},${location.lng}/${hospital.coordinates.lat},${hospital.coordinates.lng}`
      window.open(url, "_blank")
    } else {
      const url = `https://www.google.com/maps/search/${encodeURIComponent(hospital.address)}`
      window.open(url, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nearby Hospitals & Medical Centers</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Find emergency rooms, mental health crisis centers, and medical facilities near you
          </p>
        </div>

        {/* Location Status */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className={`h-5 w-5 ${location ? "text-green-600" : "text-gray-400"}`} />
                <div>
                  <p className="font-medium">{location ? "Location Detected" : "Location Not Available"}</p>
                  <p className="text-sm text-muted-foreground">
                    {location
                      ? `Showing results within ${searchRadius} miles of your location`
                      : "Enable location services for personalized results"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(e.target.value)}
                  className="w-20"
                  min="1"
                  max="50"
                />
                <span className="text-sm text-muted-foreground">miles</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Alert */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Emergency Situations</h3>
                <p className="text-sm text-red-700">
                  If you're experiencing a medical emergency or are in immediate danger, call 911 or go directly to the
                  nearest emergency room.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                All Facilities
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-red-50">
                Emergency Rooms
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                Mental Health Crisis
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
                Urgent Care
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-orange-50">
                Trauma Centers
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Hospital Listings */}
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{hospital.name}</h3>
                      <div className="flex gap-2">
                        {hospital.hasER && (
                          <Badge variant="destructive" className="text-xs">
                            Emergency Room
                          </Badge>
                        )}
                        {hospital.hasPsych && (
                          <Badge variant="secondary" className="text-xs">
                            Mental Health
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {hospital.address} • {hospital.distance}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>
                          {hospital.rating} ({hospital.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-medium mb-2">Services Available</h4>
                      <div className="flex flex-wrap gap-2">
                        {hospital.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Wait time: </span>
                        <span className="font-medium text-green-600">{hospital.waitTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Button asChild>
                      <a href={`tel:${hospital.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </a>
                    </Button>
                    <Button variant="outline" onClick={() => getDirections(hospital)}>
                      <Navigation className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Interactive Map</CardTitle>
            <CardDescription>View all nearby medical facilities on the map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map View</h3>
                <p className="text-gray-500 mb-4">
                  Map showing all nearby hospitals and medical centers with real-time directions
                </p>
                <Button>
                  <Navigation className="mr-2 h-4 w-4" />
                  Open Full Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
