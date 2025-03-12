"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { UserContext } from "../dashboard/context/userContext";

// Animation variants
const postVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3 }
  }
};

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userContext = React.useContext(UserContext);
  const userId = localStorage.getItem("userId") || userContext.user?.id;
  console.log(userId);
  

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) return;

      try {
      const response = await axios.get("http://localhost:5000/api/post//user/:userId/posts");
        // Filter posts by userId
        const userPosts = response.data.filter(post => post.userId === userId);
        setPosts(userPosts);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {
        userId
      });
      setPosts(posts.map(post => 
        post._id === postId ? { ...post, likes: response.data.likes } : post
      ));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  if (loading) return <div className="text-center">Loading posts...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (posts.length === 0) return <div className="text-center">No posts yet</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {posts.map(post => (
        <motion.div
          key={post._id}
          variants={postVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-3">
            <Image
              src={post.avatarUrl || defaultAvatar}
              alt={`${post.userName}'s avatar`}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{post.userName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <p className="text-gray-800 dark:text-gray-200 mb-4">{post.caption}</p>
          
          <div className="flex gap-4">
            <button
              onClick={() => handleLike(post._id)}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-teal-500"
            >
              <AiFillHeart size={20} />
              <span>{post.likes || 0}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-teal-500">
              <AiOutlineComment size={20} />
              <span>{post.comments?.length || 0}</span>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UserPosts;