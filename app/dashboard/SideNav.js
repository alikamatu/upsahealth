"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../icons/CompanyLogo.png";
import ProfilePhoto from "../assets/profile.jpg";
import { AssistantRounded, SendRounded } from "@mui/icons-material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { AiFillHeart, AiOutlineMessage, AiOutlineRead } from "react-icons/ai";
import { useTheme } from "../ThemeContext";
import MaterialUISwitch from "./conponent/MaterialUISwitch ";

// Animation Variants for Apple Dock Effect
const iconVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.5,
    y: -10,
    transition: { type: "spring", stiffness: 320, damping: 12 },
  },
};

// Tooltip Variants
const tooltipVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

// Container Variants for Entry/Exit
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.5, ease: "easeIn" } },
};

export default function SideNav({ user, userAvatar, isVisible }) {
  const { darkMode, toggleTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { href: "/dashboard", icon: <GridViewRoundedIcon />, name: "Dashboard" },
    { href: "/dashboard/blog", icon: <SendRounded />, name: "Post" },
    { href: "/dashboard/chatroom", icon: <AiOutlineMessage />, name: "Community" },
    { href: "/dashboard/library", icon: <AiOutlineRead />, name: "Library" },
    { href: "/dashboard/ai", icon: <AssistantRounded />, name: "AI ChatBot" },
    {
      href: "/dashboard/professionals",
      icon: <AiFillHeart />,
      name: "Help & Support",
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="w-screen h-screen p-8 bg-transparent z-10  fixed flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-indigo-900/30 to-purple-900/30 backdrop-blur-2xl z-[-1]" />

          <div className="relative z-10 flex flex-col items-center justify-between h-full w-full max-w-4xl">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.6 } }}
              className="flex flex-col items-center gap-12"
            >
              <Image src={Logo} alt="Logo" width={150} height={50} className="object-contain drop-shadow-lg" />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, duration: 0.6 } }}
                className="flex flex-col items-center gap-4"
              >
                <Image
                  className="rounded-full object-cover border-4 border-teal-400/40 shadow-xl"
                  width={120}
                  height={120}
                  src={userAvatar || ProfilePhoto}
                  alt="User avatar"
                />
                <p className="text-lg font-semibold text-gray-100 tracking-wide">{user.profileName}</p>
                <Link href="/dashboard/edit">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(45, 212, 191, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 text-sm font-medium text-teal-300 bg-teal-900/50 border border-teal-400/60 rounded-full shadow-md transition-colors"
                  >
                    Edit Profile
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-12 mt-12"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={iconVariants}
                  initial="rest"
                  whileHover="hover"
                  onHoverStart={() => setHoveredItem(index)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="relative flex items-center justify-center"
                >
                  <Link href={item.href}>
                    <motion.div className="p-5 bg-teal-900/40 rounded-xl border border-teal-400/50 shadow-lg">
                      {React.cloneElement(item.icon, {
                        sx: { fontSize: 40 },
                        className: "text-teal-300 drop-shadow-md",
                      })}
                    </motion.div>
                  </Link>
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredItem === index && (
                      <motion.div
                        variants={tooltipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute bottom-[-40px] bg-teal-800/80 backdrop-blur-md text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md"
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Theme Switch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }}
              className="mt-auto"
            >
              <MaterialUISwitch onChange={toggleTheme} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}