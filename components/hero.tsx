import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Users, Shield } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Your Mental Health Journey
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {" "}
              Starts Here
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
            Mind-Sync is a safe, supportive digital space designed specifically for university students. Take control of
            your mental well-being with personalized assessments, stress relief activities, and professional support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3" asChild>
              <Link href="/assessment">
                Start Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent" asChild>
              <Link href="/auth">
                <Shield className="w-5 h-5 mr-2" />
                Try Anonymously
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Peer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span>Evidence-Based</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
