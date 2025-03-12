"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useUserProfile } from "../context/UserProfileContext";
import { UserContext, useUserContext } from "../dashboard/context/userContext";
import UserPosts from "./UserPost";
import Link from "next/link";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const UserProfile = () => {
  const { avatar, profileName, age, gender } = useUserProfile();
  const userContext = React.useContext(UserContext);
  const userAvatar = userContext?.userAvatar;
  const {user} = useUserContext();

  // Enhanced user data
  const displayName = user.username || user?.profileName || "User";
  const publicName = profileName || user?.profileName || "User";
  const displayAvatar = avatar || userAvatar || "/default-avatar.jpg";
  const displayAge = age || user?.age || "Not specified";
  const displayGender = gender || user?.gender || "Not specified";
  const bio = user?.bio || "Living the digital dream...";
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "Unknown";
  const postCount = user?.postCount || 0;
  const followers = user?.followers || 542;
  const following = user?.following || 128;

  return (
    <div className="relative w-full overflow-x-hidden bg-gray-900 text-white">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-teal-100 via-indigo-100 to-purple-100"
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-start p-6 md:p-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 mb-12"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative w-48 h-48 md:w-64 md:h-64"
          >
            <Image
              src={displayAvatar}
              alt={`${displayName}'s avatar`}
              layout="fill"
              objectFit="cover"
              className="rounded-full border-8 border-purple-700/50 shadow-2xl"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-600/30"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-800 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              {displayName}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-800 mt-2"
              variants={itemVariants}
            >
              {publicName}
            </motion.p>
            <motion.p
              className="text-md md:text-lg text-gray-400 italic mt-2 max-w-md"
              variants={itemVariants}
            >
              {bio}
            </motion.p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          variants={itemVariants}
        >
          <div className="bg-teal-900 p-4 rounded-xl shadow-lg backdrop-blur-md">
            <p className="text-sm text-teal-300">Posts</p>
            <p className="text-2xl font-bold">{postCount}</p>
          </div>
          <div className="bg-indigo-900 p-4 rounded-xl shadow-lg backdrop-blur-md">
            <p className="text-sm text-indigo-300">Followers</p>
            <p className="text-2xl font-bold">{followers}</p>
          </div>
          <div className="bg-purple-900 p-4 rounded-xl shadow-lg backdrop-blur-md">
            <p className="text-sm text-purple-300">Following</p>
            <p className="text-2xl font-bold">{following}</p>
          </div>
          <div className="bg-blue-900 p-4 rounded-xl shadow-lg backdrop-blur-md">
            <p className="text-sm text-blue-300">Age/Gender</p>
            <p className="text-2xl font-bold">
              {displayAge} / {displayGender}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="w-full max-w-5xl flex justify-start gap-6 mb-12"
          variants={itemVariants}
        >
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 188, 212, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-teal-500 text-white rounded-full font-semibold shadow-lg hover:bg-teal-600 transition-all"
          >
            <Link href="/dashboard/edit">Edit Profile</Link>
          </motion.button>
        </motion.div>

        {/* User Posts */}
        <motion.div className="w-full max-w-5xl" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-teal-900 mb-6">Recent Posts</h2>
          <UserPosts />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserProfile;