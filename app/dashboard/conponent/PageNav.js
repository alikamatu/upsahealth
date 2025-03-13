"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUserContext } from "../context/userContext";
import { FaArrowRight, FaBook, FaBrain, FaComments, FaHeart, FaRobot, FaUserMd, FaPen } from "react-icons/fa";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      mass: 0.8,
      duration: 0.6,
    },
  },
  hover: {
    scale: 1.05,
    rotateY: 10,
    boxShadow: "0 15px 30px rgba(45, 212, 191, 0.3)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.6 },
  },
};

export default function PageNav() {
  const { user } = useUserContext();

  const cards = [
    {
      href: "/dashboard/self-assessment",
      icon: <FaBrain />,
      title: "Self-Assessment",
      description: "Tune into your inner world.",
      color: "bg-gradient-to-br from-teal-500 to-teal-700", // Teal: Introspection, calm
    },
    {
      href: "/dashboard/blog",
      icon: <FaComments />,
      title: "Write to the World",
      description: "Let your voice ripple out.",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-700", // Indigo: Expression, depth
    },
    {
      href: "/dashboard/chatroom",
      icon: <FaHeart />,
      title: "Join the Community",
      description: "Feel the heartbeat of support.",
      color: "bg-gradient-to-br from-purple-500 to-purple-700", // Purple: Connection, empathy
    },
    {
      href: "/dashboard/library",
      icon: <FaBook />,
      title: "Mindful Reads",
      description: "Dive into a sea of calm.",
      color: "bg-gradient-to-br from-pink-500 to-pink-700", // Pink: Comfort, knowledge
    },
    {
      href: "/dashboard/ai",
      icon: <FaRobot />,
      title: "AI Companion",
      description: "A friend who’s always here.",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-700", // Cyan: Tech, reliability
    },
    {
      href: "/dashboard/professionals",
      icon: <FaUserMd />,
      title: "Find Experts",
      description: "Guidance from the heart.",
      color: "bg-gradient-to-br from-blue-500 to-blue-700", // Blue: Trust, expertise
    },
    {
      href: "/dashboard/journal",
      icon: <FaPen />,
      title: "Journal Your Thoughts",
      description: "Reflect and find peace within.",
      color: "bg-gradient-to-br from-indigo-600 to-indigo-800", // Indigo: Reflection, depth
    },
    {
      href: "/dashboard/goals",
      icon: <FaBook />,
      title: "Set Your Goals",
      description: "Take small steps to thrive.",
      color: "bg-gradient-to-br from-teal-600 to-teal-800", // Teal: Growth, calm
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50 py-12 px-6 md:px-12 overflow-hidden relative">
      {/* Header */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
          Welcome, {user.username}
        </h1>
        <p className="mt-3 text-lg text-gray-600 font-medium leading-relaxed">
          Step into your sanctuary—where will you begin?
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {cards.map((card, index) => (
          <Link key={index} href={card.href} className="group">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className={`relative ${card.color} backdrop-blur-xl rounded-3xl shadow-xl h-[320px] md:h-[340px] flex flex-col overflow-hidden transform-gpu perspective-1000`}
            >
              {/* Glowing Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                animate={{ scale: [1, 1.02, 1], transition: { duration: 3, repeat: Infinity } }}
              >
                <motion.div
                  className="absolute inset-0 border border-white/20 rounded-3xl animate-glow"
                  animate={{ opacity: [0.5, 1, 0.5], transition: { duration: 2, repeat: Infinity } }}
                />
              </motion.div>

              {/* Icon */}
              <motion.div
                className="relative z-10 h-2/3 flex items-center justify-center"
              >
                <span className="text-white text-5xl md:text-6xl drop-shadow-lg">{card.icon}</span>
              </motion.div>

              {/* Content */}
              <div className="relative z-10 p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm text-gray-100 leading-relaxed">{card.description}</p>
                </div>
                <motion.div
                  className="flex items-center gap-2 text-white font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  Dive In <FaArrowRight size={16} />
                </motion.div>
              </div>

              {/* Hover Particle Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, transition: { duration: 0.2 } }}
              >
                <div className="absolute w-1 h-1 bg-white rounded-full animate-particle top-1/4 left-1/4" />
                <div className="absolute w-1 h-1 bg-white rounded-full animate-particle top-3/4 right-1/4 delay-200" />
                <div className="absolute w-1 h-1 bg-white rounded-full animate-particle bottom-1/4 left-3/4 delay-400" />
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Calming Animated Decorations */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <motion.div
          className="absolute top-10 left-10 w-56 h-56 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{ y: [-25, 25, -25], transition: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-56 h-56 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{ y: [25, -25, 25], transition: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ scale: [1, 1.15, 1], transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
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

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.4); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.7); }
        }

        @keyframes particle {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { transform: translate(20px, -20px); opacity: 1; }
          100% { transform: translate(0, 0); opacity: 0; }
        }

        .animate-glow {
          animation: glow 2s infinite ease-in-out;
        }

        .animate-particle {
          animation: particle 1.5s infinite ease-in-out;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-gpu {
          transform-style: preserve-3d;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}