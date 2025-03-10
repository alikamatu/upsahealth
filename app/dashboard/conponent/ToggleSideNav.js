"use client";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa"; // Using a hamburger icon for toggle

// Animation Variants for the Toggle Button
const toggleVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 10, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

export default function ToggleSideNav({ isVisible, toggleSidebar }) {
  return (
    <motion.div
      className="fixed top-4 left-4 z-20"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.button
        variants={toggleVariants}
        onClick={toggleSidebar}
        className="p-3 bg-teal-900/50 backdrop-blur-md border border-teal-400/40 rounded-full shadow-lg text-teal-300 hover:bg-teal-900/70 transition-all flex items-center justify-center"
      >
        <FaBars size={24} className={isVisible ? "rotate-90" : ""} />
      </motion.button>
    </motion.div>
  );
}