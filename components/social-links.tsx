"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Youtube, Rss, Github, Twitter, Linkedin, BookOpen } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  {
    name: "YouTube",
    url: "https://youtube.com/@deven",
    icon: <Youtube className="mr-2 h-5 w-5" style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} />,
    color: "bg-red-600 hover:bg-red-700",
    styles: { backgroundColor: '#dc2626', color: 'white' },
    hoverStyles: { backgroundColor: '#b91c1c' }
  },
  {
    name: "Blog",
    url: "https://blog.deven.cloud",
    icon: <BookOpen className="mr-2 h-5 w-5" style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} />,
    color: "bg-blue-600 hover:bg-blue-700",
    styles: { backgroundColor: '#2563eb', color: 'white' },
    hoverStyles: { backgroundColor: '#1d4ed8' }
  },
  {
    name: "Substack",
    url: "https://deven.substack.com",
    icon: <Rss className="mr-2 h-5 w-5" style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} />,
    color: "bg-orange-600 hover:bg-orange-700",
    styles: { backgroundColor: '#ea580c', color: 'white' },
    hoverStyles: { backgroundColor: '#c2410c' }
  },
  {
    name: "GitHub",
    url: "https://github.com/deven",
    icon: <Github className="mr-2 h-5 w-5" style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} />,
    color: "bg-gray-700 hover:bg-gray-800",
    styles: { backgroundColor: '#374151', color: 'white' },
    hoverStyles: { backgroundColor: '#1f2937' }
  },
  {
    name: "Twitter",
    url: "https://twitter.com/deven",
    icon: <Twitter className="mr-2 h-5 w-5" style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} />,
    color: "bg-sky-500 hover:bg-sky-600",
    styles: { backgroundColor: '#0ea5e9', color: 'white' },
    hoverStyles: { backgroundColor: '#0284c7' }
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/deven",
    icon: <Linkedin className="mr-2 h-5 w-5" style={{ marginRight: '0.5rem', height: '1.25rem', width: '1.25rem' }} />,
    color: "bg-blue-700 hover:bg-blue-800",
    styles: { backgroundColor: '#1d4ed8', color: 'white' },
    hoverStyles: { backgroundColor: '#1e40af' }
  },
]

export default function SocialLinks() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <section className="py-16" style={{ padding: '4rem 0' }}>
      <div className="max-w-4xl mx-auto" style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#8fffaa'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Connect With Me
        </motion.h2>

        <Card className="bg-gray-900/50 border-gray-800" style={{ 
          backgroundColor: 'rgba(17, 17, 17, 0.5)',
          borderColor: '#333',
          borderRadius: '0.5rem',
          overflow: 'hidden'
        }}>
          <CardContent className="p-6" style={{ padding: '1.5rem' }}>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              style={{ 
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1rem'
              }}
              variants={container}
              initial="hidden"
              animate="show"
            >
              {socialLinks.map((link, index) => (
                <motion.div key={index} variants={item}>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" className="block w-full" style={{ display: 'block', width: '100%' }}>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-white ${link.color} border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                      style={{ 
                        width: '100%',
                        justifyContent: 'flex-start',
                        color: 'white',
                        ...link.styles,
                        border: 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.375rem',
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = link.hoverStyles.backgroundColor;
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = link.styles.backgroundColor;
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {link.icon}
                      {link.name}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
