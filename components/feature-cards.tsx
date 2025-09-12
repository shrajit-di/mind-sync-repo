import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, BarChart3, Gamepad2, MessageCircle, Phone, Coins, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: ClipboardList,
    title: "Self-Assessment",
    description:
      "Take scientifically-backed quizzes to understand your current mental health status and track your progress over time.",
    href: "/assessment",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: BarChart3,
    title: "Progress Dashboard",
    description:
      "Visualize your mental health journey with beautiful charts and insights that help you understand your patterns.",
    href: "/dashboard",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Gamepad2,
    title: "Stress Relief Games",
    description: "Engage in calming, interactive games designed to reduce stress and anxiety while earning rewards.",
    href: "/games",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: MessageCircle,
    title: "Peer Support",
    description:
      "Connect with other students in a safe, moderated environment to share experiences and support each other.",
    href: "/community",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Phone,
    title: "Professional Help",
    description: "Access qualified counselors and mental health professionals when you need additional support.",
    href: "/counseling",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Coins,
    title: "Reward System",
    description:
      "Earn coins through activities and assessments to unlock premium features and motivate your wellness journey.",
    href: "/rewards",
    color: "from-yellow-500 to-yellow-600",
  },
]

export function FeatureCards() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything You Need for Mental Wellness</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and support designed specifically for university students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="group-hover:bg-gray-50 w-full justify-between" asChild>
                    <Link href={feature.href}>
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
