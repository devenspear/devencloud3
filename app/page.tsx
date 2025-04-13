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
    <div 
      className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white grid-background"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f0f0f, #1a1a1a)',
        color: 'white',
        backgroundImage: 'linear-gradient(to right, rgba(142, 255, 170, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(142, 255, 170, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    >
      <div 
        className="container mx-auto px-4 py-8"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem'
        }}
      >
        <Hero />
        <Bio />
        <SocialLinks />
        <Footer />
      </div>
    </div>
  )
}
