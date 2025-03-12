"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useUserProfile } from "../context/UserProfileContext";
import { UserContext } from "../dashboard/context/userContext";

// Animation variants for the profile card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  }
};

export default function UserProfile() {
  // Get data from UserProfileContext
  const { avatar, profileName, age, gender } = useUserProfile();
  
  // Get data from UserContext (from DashboardLayout)
  const userContext = React.useContext(UserContext);
  const user = userContext?.user;
  const userAvatar = userContext?.userAvatar;

  // Combine data from both contexts, prioritizing UserProfileContext if available
  const displayName = profileName || user?.profileName || "User";
  const displayAvatar = avatar || userAvatar;
  const displayAge = age || user?.age || "Not specified";
  const displayGender = gender || user?.gender || "Not specified";

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-700"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32"
        >
          <Image
            src={displayAvatar}
            alt={`${displayName}'s avatar`}
            layout="fill"
            objectFit="cover"
            className="rounded-full border-4 border-teal-400/40 shadow-md"
          />
        </motion.div>

        {/* User Info */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {displayName}
          </h2>
          
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Age:</span> {displayAge}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Gender:</span> {displayGender}
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition-colors"
        >
          Edit Profile
        </motion.button>
      </div>
    </motion.div>
  );
};