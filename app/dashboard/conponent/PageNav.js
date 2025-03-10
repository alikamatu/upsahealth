"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUserContext } from "../context/userContext";
import AsessmentPhoto from "../assets/ass.jpg";
import BlogPhoto from "../assets/community.jpg";
import ChatPhoto from "../assets/chatcom.jpg";
import BotPhoto from "../assets/aih.jpg";
import LibraryPhoto from "../assets/lib.jpg";
import ProfessionalPhoto from "../assets/professionals.png";
import { FaArrowRight } from "react-icons/fa";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PageNav() {
  const { user } = useUserContext();

  const cards = [
    {
      href: "/dashboard/self-assessment",
      image: AsessmentPhoto,
      title: "Self-Assessment",
      description: "Check in with yourself and track your journey.",
      color: "from-teal-500 to-indigo-500",
    },
    {
      href: "/dashboard/blog",
      image: ChatPhoto,
      title: "Write to the World",
      description: "Share your story and spark inspiration.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      href: "/dashboard/chatroom",
      image: BlogPhoto,
      title: "Join the Community",
      description: "Connect with others who get it.",
      color: "from-purple-500 to-pink-500",
    },
    {
      href: "/dashboard/library",
      image: LibraryPhoto,
      title: "Mindful Reads",
      description: "Explore resources to lift your spirit.",
      color: "from-pink-500 to-teal-500",
    },
    {
      href: "/dashboard/ai",
      image: BotPhoto,
      title: "AI Companion",
      description: "Instant support, anytime you need it.",
      color: "from-teal-500 to-purple-500",
    },
    {
      href: "/dashboard/professionals",
      image: ProfessionalPhoto,
      title: "Find Experts",
      description: "Reach out to pros who care.",
      color: "from-indigo-500 to-pink-500",
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Hey <span className="text-teal-600">{user.username}</span>, what’s on your mind today?
        </h1>
        <p className="mt-3 text-lg text-gray-600 font-medium">Let’s make today count—pick your path.</p>
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
              className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden border border-gray-100 h-[300px] md:h-[350px] flex flex-col"
            >
              {/* Image */}
              <div className="relative h-2/3">
                <Image
                  src={card.image}
                  alt={card.title}
                  className="object-cover w-full h-full brightness-75 transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{card.description}</p>
                </div>
                <motion.div
                  className="flex items-center gap-2 text-teal-600 font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                >
                  Explore <FaArrowRight size={16} />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

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

        @keyframes blob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-blob {
          animation: blob 8s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}