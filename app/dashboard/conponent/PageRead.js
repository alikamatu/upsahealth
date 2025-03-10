"use client";
import { useState } from "react";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import Image from "next/image";
import { motion } from "framer-motion";
import BookOne from "../assets/book1.png";
import BookTwo from "../assets/book2.png";
import BookThree from "../assets/book3.png";
import BookFour from "../assets/book4.png"; // Fixed typo "BookFoir"
import BookFive from "../assets/book5.png";
import BookSix from "../assets/book6.png";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
  },
};

// Book data (replace with real titles/descriptions if available)
const books = [
  { id: 1, src: BookOne, title: "Mindful Living", alt: "Mindful Living book" },
  { id: 2, src: BookTwo, title: "Calm Your Mind", alt: "Calm Your Mind book" },
  { id: 3, src: BookThree, title: "Inner Peace", alt: "Inner Peace book" },
  { id: 4, src: BookFour, title: "Stress Relief", alt: "Stress Relief book" },
  { id: 5, src: BookFive, title: "Emotional Balance", alt: "Emotional Balance book" },
  { id: 6, src: BookSix, title: "Healing Words", alt: "Healing Words book" },
];

export default function PageRead() {
  const [hoveredBook, setHoveredBook] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50 py-12 px-6 md:px-12 flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl"
      >
        {/* Header */}
        <div className="flex w-full justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Mental Health Reads
          </h2>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="text-teal-500 cursor-pointer"
          >
            <ArrowCircleRightOutlined sx={{ fontSize: 40 }} />
          </motion.div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <motion.div
              key={book.id}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredBook(book.id)}
              onHoverEnd={() => setHoveredBook(null)}
              className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden cursor-pointer border border-gray-100"
            >
              <Image
                src={book.src}
                alt={book.alt}
                width={200}
                height={300}
                className="w-full h-48 object-cover"
                placeholder="blur" // Optional: adds a blur effect while loading
              />
              <div className="p-4">
                <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">
                  {book.title}
                </h3>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredBook === book.id ? 1 : 0,
                    y: hoveredBook === book.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-teal-500 text-xs mt-2"
                >
                  Read Now
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
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