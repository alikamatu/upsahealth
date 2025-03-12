"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { UserContext } from "../dashboard/context/userContext";

// Animation Variants
const postVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.2, rotate: 5 },
  tap: { scale: 0.9 },
};

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userContext = React.useContext(UserContext);
  const userId = localStorage.getItem("userId") || userContext?.user?._id;

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://healthbackend.vercel.app/api/posts/user/${userId}/posts`);
        setPosts(response.data); // Already filtered by userId in backend
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`https://healthbackend.vercel.app/api/posts/${postId}/like`, {
        userId,
      });
      setPosts(posts.map(post =>
        post._id === postId ? { ...post, likes: response.data.likes } : post
      ));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  if (loading) return (
    <div className="text-center text-teal-300 text-xl animate-pulse">Loading your cosmic posts...</div>
  );
  if (error) return (
    <div className="text-center text-red-400 text-xl">{error}</div>
  );
  if (posts.length === 0) return (
    <div className="text-center text-gray-400 text-xl italic">No posts yet—start sharing your universe!</div>
  );

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <motion.div
          key={post._id}
          variants={postVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 188, 212, 0.3)" }}
          className="relative bg-gradient-to-br from-teal-900 via-indigo-900 to-purple-900 rounded-2xl p-6 shadow-2xl border border-teal-400/20 backdrop-blur-md overflow-hidden"
        >
          {/* Decorative Element */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-500"
            animate={{ scaleX: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="relative w-12 h-12"
            >
              <Image
                src={post.avatarUrl || "/default-avatar.jpg"}
                alt={`${post.userName}'s avatar`}
                layout="fill"
                objectFit="cover"
                className="rounded-full border-2 border-teal-300/50"
              />
            </motion.div>
            <div>
              <p className="font-semibold text-lg text-teal-200">{post.userName}</p>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Content */}
          <p className="text-gray-100 text-lg mb-6 leading-relaxed font-light">
            {post.caption}
          </p>

          {/* Actions */}
          <div className="flex gap-6">
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleLike(post._id)}
              className="flex items-center gap-2 text-teal-300 hover:text-teal-400 transition-colors"
            >
              <AiFillHeart size={24} />
              <span className="text-lg font-medium">{post.likes || 0}</span>
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition-colors"
            >
              <AiOutlineComment size={24} />
              <span className="text-lg font-medium">{post.comments?.length || 0}</span>
            </motion.button>
          </div>

          {/* Subtle Glow Effect */}
          <motion.div
            className="absolute inset-0 border border-teal-400/10 rounded-2xl pointer-events-none"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default UserPosts;