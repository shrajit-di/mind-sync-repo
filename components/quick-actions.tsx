import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, Gamepad2, MessageCircle, Phone, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"

interface QuickActionsProps {
  user: {
    isAnonymous: boolean
  }
}

export function QuickActions({ user }: QuickActionsProps) {
  const actions = [
    {
      title: "Take Assessment",
      description: "Check your current mental health status",
      icon: ClipboardList,
      href: "/assessment",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Play Games",
      description: "Relax with stress-relief activities",
      icon: Gamepad2,
      href: "/games",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Join Community",
      description: "Connect with peer support",
      icon: MessageCircle,
      href: "/community",
      color: "from-purple-500 to-purple-600",
      disabled: user.isAnonymous,
    },
    {
      title: "Get Help",
      description: "Speak with professionals",
      icon: Phone,
      href: "/counseling",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Resources",
      description: "Mental health articles & tips",
      icon: BookOpen,
      href: "/resources",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Schedule",
      description: "Plan your wellness activities",
      icon: Calendar,
      href: "/schedule",
      color: "from-teal-500 to-teal-600",
      disabled: user.isAnonymous,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access your most-used features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon

            return (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                  action.disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
                }`}
                asChild={!action.disabled}
                disabled={action.disabled}
              >
                {action.disabled ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-xs">{action.title}</p>
                      <p className="text-xs text-gray-500">Requires account</p>
                    </div>
                  </div>
                ) : (
                  <Link href={action.href} className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-xs">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                  </Link>
                )}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
