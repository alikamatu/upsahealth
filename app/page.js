"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./icons/CompanyLogo.png";
import HeroImage from "./assets/happy.jpg"; // Rename for clarity

// Animation Variants
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const quoteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

export default function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    "Healing begins with a single step—yours.",
    "You are enough, just as you are.",
    "Every day is a new chance to nurture your mind.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 6000); // Slower rotation for calm pacing
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50 flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 py-20 bg-[url('./assets/happy.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-teal-900/60 overflow-x-hidden"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.6 } }}
          className="absolute top-8 left-8 md:left-12"
        >
          <Image src={Logo} alt="Mental Health Platform Logo" width={150} height={50} className="object-contain" />
        </motion.div>

        {/* Main Content */}
        <div className="max-w-3xl z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            Your Safe Space for Mental Wellness
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-sm">
            Discover a community and tools to support your journey toward peace and resilience.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold transition-colors"
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/signup">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-transparent border-2 border-teal-400 hover:bg-teal-400/20 text-teal-400 px-8 py-3 rounded-full shadow-lg text-lg font-semibold transition-colors"
              >
                Join Us
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Overlay for Readability */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.section>

      {/* Quote Carousel */}
      <section className="w-full py-16 bg-white/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center px-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuoteIndex}
              variants={quoteVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-lg md:text-2xl text-gray-700 italic"
            >
              “{quotes[currentQuoteIndex]}”
            </motion.p>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-4">
            {quotes.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuoteIndex ? "bg-teal-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-teal-900 text-white text-center">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6">
          <p className="text-sm">© 2025 Mental Health Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/recovery" className="text-teal-300 hover:text-teal-200 transition-colors">
              Forgot Password?
            </Link>
            <Link href="/support" className="text-teal-300 hover:text-teal-200 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        body {
          font-family: "Inter", sans-serif;
          margin: 0;
          padding: 0;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(136, 136, 136, 0.5);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(85, 85, 85, 0.7);
        }
      `}</style>
    </div>
  );
}