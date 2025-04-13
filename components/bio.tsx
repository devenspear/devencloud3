"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Bio() {
  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <Card className="bg-gray-900/50 border-gray-800 overflow-hidden">
          <CardContent className="p-0">
            <div className="md:flex">
              <motion.div
                className="md:w-1/3 relative h-64 md:h-auto"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Image
                  src="/images/deven-portrait.png"
                  alt="Deven Spear"
                  width={300}
                  height={400}
                  className="object-cover h-full w-full"
                />
              </motion.div>

              <motion.div
                className="p-6 md:w-2/3"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  Deven Spear | Visionary Builder of Communities, Companies & Consciousness
                </h3>
                <p className="text-gray-300 mb-4">
                  I'm a polymath entrepreneur with 30+ years shaping industries across real estate, software,
                  exponential tech, and data-driven marketing. I've launched six companies and hundreds of
                  initiatives—each at the intersection of innovation and impact.
                </p>
                <p className="text-gray-300 mb-4">
                  My superpower? Seeing around corners. I translate complex ideas—AI, Web3, wellness science—into clear,
                  actionable ventures that connect people, place, and purpose.
                </p>
                <p className="text-gray-300 mb-4">
                  Whether building master-planned communities, leading tech innovation, or exploring the future of
                  wellness and human potential, I stay driven by one goal:
                </p>
                <p className="text-gray-300 mb-4 font-medium">
                  To transform disruption into design—and design into legacy.
                </p>
                <p className="text-primary font-bold">Let's build something exponential.</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}
