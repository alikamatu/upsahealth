"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUserContext } from "../context/userContext";
import { FaArrowRight, FaBook, FaBrain, FaComments, FaHeart, FaRobot, FaUserMd } from "react-icons/fa";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.04, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", transition: { duration: 0.3 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3, type: "spring", stiffness: 200 } },
};

export default function PageNav() {
  const { user } = useUserContext();

  const cards = [
    {
      href: "/dashboard/self-assessment",
      icon: <FaBrain />,
      title: "Self-Assessment",
      description: "Take a moment to reflect and grow.",
      color: "bg-gradient-to-br from-teal-400 to-indigo-400",
    },
    {
      href: "/dashboard/blog",
      icon: <FaComments />,
      title: "Write to the World",
      description: "Express yourself and inspire others.",
      color: "bg-gradient-to-br from-indigo-400 to-purple-400",
    },
    {
      href: "/dashboard/chatroom",
      icon: <FaHeart />,
      title: "Join the Community",
      description: "Find your circle of support.",
      color: "bg-gradient-to-br from-purple-400 to-pink-400",
    },
    {
      href: "/dashboard/library",
      icon: <FaBook />,
      title: "Mindful Reads",
      description: "Discover peace through knowledge.",
      color: "bg-gradient-to-br from-pink-400 to-teal-400",
    },
    {
      href: "/dashboard/ai",
      icon: <FaRobot />,
      title: "AI Companion",
      description: "Your friend for any moment.",
      color: "bg-gradient-to-br from-teal-400 to-purple-400",
    },
    {
      href: "/dashboard/professionals",
      icon: <FaUserMd />,
      title: "Find Experts",
      description: "Connect with caring professionals.",
      color: "bg-gradient-to-br from-indigo-400 to-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50 py-12 px-6 md:px-12 overflow-hidden">
      {/* Header */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
          Welcome, <span className="text-teal-600">{user.username}</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600 font-medium leading-relaxed">
          Take a deep breath—your journey starts here.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {cards.map((card, index) => (
          <Link key={index} href={card.href} className="group">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-md border border-teal-100/50 h-[300px] md:h-[320px] flex flex-col overflow-hidden"
            >
              {/* Gradient Icon Placeholder */}
              <div className="relative h-2/3 flex items-center justify-center">
                <motion.div
                  variants={iconVariants}
                  initial="rest"
                  whileHover="hover"
                  className={`${card.color} w-24 h-24 rounded-full flex items-center justify-center shadow-inner`}
                >
                  <span className="text-white text-4xl">{card.icon}</span>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{card.description}</p>
                </div>
                <motion.div
                  className="flex items-center gap-2 text-teal-500 font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                >
                  Let’s Go <FaArrowRight size={16} />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Calming Animated Decorations */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <motion.div
          className="absolute top-10 left-10 w-48 h-48 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [-20, 20, -20], transition: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [20, -20, 20], transition: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{ scale: [1, 1.1, 1], transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        />
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        body {
          font-family: "Inter", sans-serif;
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