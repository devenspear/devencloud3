"use client"

import { motion } from "framer-motion"
import { Code } from "lucide-react"

export default function Hero() {
  return (
    <motion.div
      className="py-20 text-center grid-background relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <motion.div
        className="relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="flex justify-center mb-4">
          <Code className="h-16 w-16 text-primary" />
        </div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-glow"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          deven.cloud
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Building at the intersection of innovation and impact
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
