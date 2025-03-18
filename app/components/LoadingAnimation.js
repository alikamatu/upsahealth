"use client"; // Required for Next.js client-side components
import React from "react";
import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 via-teal-200 to-cyan-300">
      {/* Background floating effect */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(128,222,234,0.2),transparent)]"
        animate={{
          x: [0, 20, 0],
          y: [0, 20, 0],
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Main loader content */}
      <motion.div
        className="flex flex-col items-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Circle */}
        <motion.div
          className="h-16 w-16 rounded-full bg-teal-800 mb-4"
          animate={{
            scale: [1, 1.2, 1], // Pulse effect
            y: [-10, 10, -10], // Wobble effect
            rotate: [0, 15, -15, 0], // Slight tilt for "insanity"
            transition: {
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            },
          }}
        />

        {/* Animated Text */}
        <motion.p
          className="text-teal-900 font-semibold text-lg md:text-xl"
          animate={{
            opacity: [0.6, 1],
            transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          Loading, please relax...
        </motion.p>
      </motion.div>
    </div>
  );
}