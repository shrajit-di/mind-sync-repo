"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Settings, Bell, Shield, Download, Trash2, Coins, History, Camera } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Sphere>
  )
}

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    university: "",
    yearOfStudy: "",
  })
  const [notifications, setNotifications] = useState({
    assessmentReminders: true,
    gameRewards: true,
    weeklyReports: true,
    emergencyAlerts: true,
  })
  const [privacy, setPrivacy] = useState({
    shareProgress: false,
    allowPeerSupport: true,
    dataCollection: true,
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Required</CardTitle>
            <CardDescription>Please sign in to access your profile</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const handleSave = () => {
    // Update user data
    setIsEditing(false)
  }

  const handleExportData = () => {
    // Export user data functionality
    console.log("Exporting user data...")
  }

  const handleDeleteAccount = () => {
    // Delete account functionality
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account...")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with 3D Animation */}
        <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <AnimatedSphere />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white/20">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback className="bg-white/20 text-2xl font-bold">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white text-blue-600 hover:bg-blue-50"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-blue-100">Manage your Mind-Sync experience</p>
              <div className="mt-2 flex items-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {user.isAnonymous ? "Anonymous User" : "Registered User"}
                </Badge>
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4" />
                  <span className="font-semibold">{user.coins} coins</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Your university name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearOfStudy">Year of Study</Label>
                    <Input
                      id="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                      disabled={!isEditing}
                      placeholder="e.g., 2nd Year, Graduate"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="assessmentReminders">Assessment Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminded to complete your mental health assessments
                      </p>
                    </div>
                    <Switch
                      id="assessmentReminders"
                      checked={notifications.assessmentReminders}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, assessmentReminders: checked })
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="gameRewards">Game Rewards</Label>
                      <p className="text-sm text-muted-foreground">Notifications about coins earned and achievements</p>
                    </div>
                    <Switch
                      id="gameRewards"
                      checked={notifications.gameRewards}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, gameRewards: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyReports">Weekly Progress Reports</Label>
                      <p className="text-sm text-muted-foreground">Summary of your mental health journey</p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emergencyAlerts">Emergency Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Critical mental health resources and crisis support
                      </p>
                    </div>
                    <Switch
                      id="emergencyAlerts"
                      checked={notifications.emergencyAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emergencyAlerts: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data</CardTitle>
                <CardDescription>Control how your data is used and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="shareProgress">Share Progress with Peers</Label>
                      <p className="text-sm text-muted-foreground">Allow other users to see your wellness journey</p>
                    </div>
                    <Switch
                      id="shareProgress"
                      checked={privacy.shareProgress}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, shareProgress: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowPeerSupport">Enable Peer Support</Label>
                      <p className="text-sm text-muted-foreground">Participate in community support features</p>
                    </div>
                    <Switch
                      id="allowPeerSupport"
                      checked={privacy.allowPeerSupport}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowPeerSupport: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dataCollection">Anonymous Data Collection</Label>
                      <p className="text-sm text-muted-foreground">Help improve Mind-Sync with anonymous usage data</p>
                    </div>
                    <Switch
                      id="dataCollection"
                      checked={privacy.dataCollection}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, dataCollection: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity History */}
          <TabsContent value="activity">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions with Mind-Sync</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-50">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="font-medium">Completed Breathing Exercise</p>
                        <p className="text-sm text-muted-foreground">Earned 10 coins • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="font-medium">Mental Health Assessment</p>
                        <p className="text-sm text-muted-foreground">Earned 25 coins • 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-purple-50">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <div className="flex-1">
                        <p className="font-medium">Meditation Session</p>
                        <p className="text-sm text-muted-foreground">Earned 15 coins • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Coin History</CardTitle>
                  <CardDescription>Track your earned and spent coins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                      <span className="text-sm">Assessment Completion</span>
                      <span className="font-medium text-green-600">+25 coins</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                      <span className="text-sm">Game Completion</span>
                      <span className="font-medium text-blue-600">+10 coins</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                      <span className="text-sm">Premium Feature</span>
                      <span className="font-medium text-red-600">-50 coins</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Account Management */}
          <TabsContent value="account">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your account data and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={handleExportData} variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export My Data
                  </Button>
                  <Button onClick={logout} variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>

              {!user.isAnonymous && (
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleDeleteAccount} variant="destructive" className="w-full justify-start">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
