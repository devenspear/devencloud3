"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"

export default function Bio() {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.section
      className="py-16"
      style={{
        padding: '4rem 0'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
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
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          About Me
        </motion.h2>

        <Card className="bg-gray-900/50 border-gray-800 overflow-hidden" style={{ 
          backgroundColor: 'rgba(17, 17, 17, 0.5)',
          borderColor: '#333',
          overflow: 'hidden',
          borderRadius: '0.5rem',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)'
        }}>
          <CardContent className="p-0" style={{ padding: 0 }}>
            <div className="md:flex" style={{ display: 'flex', flexDirection: 'column', '@media (min-width: 768px)': { flexDirection: 'row' } }}>
              <motion.div
                className="md:w-1/3 relative h-64 md:h-auto"
                style={{ 
                  position: 'relative',
                  height: '16rem',
                  '@media (min-width: 768px)': { 
                    width: '33.333333%',
                    height: 'auto'
                  }
                }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {imageError ? (
                  <div style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8fffaa',
                    fontSize: '1.25rem'
                  }}>
                    Deven Spear
                  </div>
                ) : (
                  <>
                    <img
                      src="/images/deven-portrait.png"
                      alt="Deven Spear"
                      onError={() => setImageError(true)}
                      style={{ 
                        objectFit: 'cover',
                        height: '100%', 
                        width: '100%',
                        display: 'block'
                      }}
                    />
                    <noscript>
                      <img
                        src="/images/deven-portrait.png"
                        alt="Deven Spear"
                        style={{ 
                          objectFit: 'cover',
                          height: '100%', 
                          width: '100%',
                          display: 'block'
                        }}
                      />
                    </noscript>
                  </>
                )}
              </motion.div>

              <motion.div
                className="p-6 md:w-2/3"
                style={{ 
                  padding: '1.5rem',
                  '@media (min-width: 768px)': { 
                    width: '66.666667%'
                  }
                }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-primary" style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#8fffaa'
                }}>
                  Deven Spear | Visionary Builder of Communities, Companies & Consciousness
                </h3>
                <p className="text-gray-300 mb-4" style={{ color: '#d1d1d1', marginBottom: '1rem' }}>
                  I'm a polymath entrepreneur with 30+ years shaping industries across real estate, software,
                  exponential tech, and data-driven marketing. I've launched six companies and hundreds of
                  initiatives—each at the intersection of innovation and impact.
                </p>
                <p className="text-gray-300 mb-4" style={{ color: '#d1d1d1', marginBottom: '1rem' }}>
                  My superpower? Seeing around corners. I translate complex ideas—AI, Web3, wellness science—into clear,
                  actionable ventures that connect people, place, and purpose.
                </p>
                <p className="text-gray-300 mb-4" style={{ color: '#d1d1d1', marginBottom: '1rem' }}>
                  Whether building master-planned communities, leading tech innovation, or exploring the future of
                  wellness and human potential, I stay driven by one goal:
                </p>
                <p className="text-gray-300 mb-4 font-medium" style={{ color: '#d1d1d1', marginBottom: '1rem', fontWeight: '500' }}>
                  To transform disruption into design—and design into legacy.
                </p>
                <p className="text-primary font-bold" style={{ color: '#8fffaa', fontWeight: 'bold' }}>
                  Let's build something exponential.
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}
