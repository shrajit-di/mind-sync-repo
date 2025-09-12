import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeatureCards } from "@/components/feature-cards"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <main>
        <Hero />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  )
}
