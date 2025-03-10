"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useUserContext } from "@/app/dashboard/context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLike, AiOutlineComment, AiFillLike } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const commentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

export default function CommentPage() {
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false); // Local like state
  const textareaRef = useRef(null);
  const { user, userAvatar } = useUserContext();
  const params = useParams();
  const postId = params?.id;

  // Fetch post data
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`https://healthbackend.vercel.app/api/post/fetchpost/${postId}`);
          if (response.ok) {
            const postData = await response.json();
            setPost({ ...postData, isLiked: false }); // Add isLiked to post
          } else {
            console.error("Failed to fetch post data");
          }
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };
      fetchPost();
    }
  }, [postId]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newComment]);

  // Handle comment submission
  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`https://healthbackend.vercel.app/api/post/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl: userAvatar, userName: user.profileName, text: newComment }),
      });
      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost);
        setNewComment("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Handle like action
  const handleLike = async () => {
    try {
      const response = await fetch(`https://healthbackend.vercel.app/api/post/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      if (response.ok) {
        setPost((prevPost) => ({
          ...prevPost,
          likes: isLiked ? prevPost.likes - 1 : prevPost.likes + 1,
          isLiked: !isLiked,
        }));
        setIsLiked(!isLiked);
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Loading state
  if (!post)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 to-purple-50"
      >
        <FaSpinner className="w-8 h-8 text-indigo-500 animate-spin" />
      </motion.div>
    );

  return (
    <div className="w-full p-6 mt-6 space-y-6 bg-gradient-to-br from-teal-50 to-purple-50 min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-gray-100"
      >
        {/* Post Header */}
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <img
              src={post.avatarUrl}
              alt="avatar"
              className="rounded-full w-12 h-12 object-cover ring-2 ring-teal-100 shadow-sm"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base">{post.userName}</h3>
            <p className="text-gray-500 text-xs">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Post Caption */}
        <div className="mb-4">
          <p className="text-gray-800 text-sm leading-relaxed">{post.caption}</p>
        </div>

        {/* Like & Comment Buttons */}
        <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-3">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-500 transition-colors duration-200"
          >
            {post.isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
            <span className="text-xs font-medium">{post.likes || 0}</span>
          </motion.button>
          <div className="flex items-center gap-2 text-gray-600">
            <AiOutlineComment size={20} />
            <span className="text-xs font-medium">{post.comments.length || 0}</span>
          </div>
        </div>

        {/* Comment Input */}
        <div className="mt-6">
          <textarea
            ref={textareaRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 text-sm border text-black border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-300 bg-white/80 backdrop-blur-md resize-none overflow-hidden placeholder-gray-400"
            placeholder="Share your thoughts..."
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          />
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleCommentSubmit}
            className="mt-3 px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-full shadow-md"
          >
            Post Comment
          </motion.button>
        </div>

        {/* Comments Section */}
        <p className="mt-6 text-gray-700 font-medium border-b border-gray-200 pb-2">Replies</p>
        <div className="space-y-4 mt-6">
          <AnimatePresence>
            {post.comments.map((comment, index) => (
              <motion.div
                key={index}
                variants={commentVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-4"
              >
                <img
                  src={comment.avatarUrl}
                  alt="avatar"
                  className="rounded-full w-10 h-10 object-cover ring-2 ring-purple-100 shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{comment.userName}</p>
                  <p className="text-gray-700 text-xs leading-relaxed">{comment.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

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

        textarea::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}