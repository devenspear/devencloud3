import type { Metadata } from "next"
import Hero from "@/components/hero"
import Bio from "@/components/bio"
import SocialLinks from "@/components/social-links"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "deven.cloud | Personal Hub",
  description: "Connect with Deven across all platforms - blog, YouTube, social media, and more.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Hero />
        <Bio />
        <SocialLinks />
        <Footer />
      </div>
    </div>
  )
}
