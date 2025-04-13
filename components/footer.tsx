"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      className="py-8 text-center text-gray-400 border-t border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <p>© {new Date().getFullYear()} deven.cloud. All rights reserved.</p>
    </motion.footer>
  )
}
