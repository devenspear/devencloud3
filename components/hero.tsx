"use client"

import { motion } from "framer-motion"
import { Code } from "lucide-react"

export default function Hero() {
  return (
    <motion.div
      className="py-20 text-center grid-background relative overflow-hidden"
      style={{
        padding: '5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.2
        }}
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <motion.div
        className="relative z-10"
        style={{
          position: 'relative',
          zIndex: 10,
          margin: '0 auto',
          width: '100%',
          maxWidth: '900px'
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div 
          className="flex justify-center mb-4" 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginBottom: '1rem',
            width: '100%' 
          }}
        >
          <Code className="h-16 w-16 text-primary" style={{ height: '4rem', width: '4rem', color: '#8fffaa' }} />
        </div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-glow"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#8fffaa',
            textShadow: '0 0 10px rgba(142, 255, 170, 0.5)',
            padding: '0 1rem',
            margin: '0 auto 1rem auto',
            maxWidth: '100%',
            textAlign: 'center'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          deven.cloud
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
            color: '#d1d1d1',
            maxWidth: '42rem',
            margin: '0 auto',
            padding: '0 1rem',
            textAlign: 'center'
          }}
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
