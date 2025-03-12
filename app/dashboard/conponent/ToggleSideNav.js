"use client";
import { motion } from "framer-motion";
import { FaBars, FaCross, FaWindowClose } from "react-icons/fa";

const toggleVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.1, rotate: 10, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

export default function ToggleSideNav({ isVisible, toggleSidebar }) {
  return (
    <motion.div
      className="fixed top-4 left-4 z-50"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.button
        variants={toggleVariants}
        onClick={toggleSidebar}
        className="p-3 bg-teal-900/50 backdrop-blur-md border border-teal-400/40 rounded-full shadow-lg text-teal-300 hover:bg-teal-900/70 transition-all flex items-center justify-center"
      >
        {
          isVisible? <FaWindowClose size={24} />:<FaBars size={24} />
        }
      </motion.button>
    </motion.div>
  );
}