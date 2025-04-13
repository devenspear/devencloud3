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
    icon: <Youtube className="mr-2 h-5 w-5" />,
    color: "bg-red-600 hover:bg-red-700",
  },
  {
    name: "Blog",
    url: "https://blog.deven.cloud",
    icon: <BookOpen className="mr-2 h-5 w-5" />,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "Substack",
    url: "https://deven.substack.com",
    icon: <Rss className="mr-2 h-5 w-5" />,
    color: "bg-orange-600 hover:bg-orange-700",
  },
  {
    name: "GitHub",
    url: "https://github.com/deven",
    icon: <Github className="mr-2 h-5 w-5" />,
    color: "bg-gray-700 hover:bg-gray-800",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/deven",
    icon: <Twitter className="mr-2 h-5 w-5" />,
    color: "bg-sky-500 hover:bg-sky-600",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/deven",
    icon: <Linkedin className="mr-2 h-5 w-5" />,
    color: "bg-blue-700 hover:bg-blue-800",
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
    <section className="py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Connect With Me
        </motion.h2>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {socialLinks.map((link, index) => (
                <motion.div key={index} variants={item}>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-white ${link.color} border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
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
