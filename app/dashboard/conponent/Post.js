"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLike, AiOutlineComment, AiFillLike } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/userContext";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

export default function Post({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const { user } = useUserContext();
  const router = useRouter();

  // Fetch all posts data if not provided
  useEffect(() => {
    if (!initialPosts.length) {
      const fetchPosts = async () => {
        try {
          const response = await fetch("https://healthbackend.vercel.app/api/post/fetchpost");
          if (response.ok) {
            const postData = await response.json();
            const formattedData = postData.map((post) => ({
              ...post,
              likes: Number(post.likes) || 0,
              comments: post.comments || [],
              isLiked: false, // Track like state locally
            }));
            setPosts(formattedData);
          }
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      };
      fetchPosts();
    }
  }, [initialPosts]);

  // Handle like action for a specific post
  const handleLike = async (postId, index) => {
    try {
      const response = await fetch(`https://healthbackend.vercel.app/api/post/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      if (response.ok) {
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          updatedPosts[index] = {
            ...updatedPosts[index],
            likes: updatedPosts[index].isLiked ? updatedPosts[index].likes - 1 : updatedPosts[index].likes + 1,
            isLiked: !updatedPosts[index].isLiked,
          };
          return updatedPosts;
        });
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Navigate to the comment page
  const handleGoToComments = (postId) => {
    router.push(`/dashboard/blog/comment/${postId}`);
  };

  if (!posts.length) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12 bg-white/90 backdrop-blur-md rounded-3xl shadow-md text-gray-600 text-lg"
    >
      Loading...
    </motion.div>
  );

  return (
    <div className="w-full mt-6 space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center mb-3">
            <div className="mr-4">
              <Image
                src={post.avatarUrl}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-teal-100 shadow-sm"
                alt="avatar"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{post.userName}</h3>
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

          <div className="mb-3">
            <p className="text-gray-800 text-sm leading-relaxed">{post.caption}</p>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-3">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleLike(post._id, index)}
              className="flex items-center space-x-1 text-gray-600 hover:text-teal-500 transition-colors duration-200"
            >
              {post.isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
              <span className="text-xs font-medium">{post.likes || 0}</span>
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleGoToComments(post._id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-500 transition-colors duration-200"
            >
              <AiOutlineComment size={20} />
              <span className="text-xs font-medium">{post.comments.length || 0}</span>
            </motion.button>
          </div>
        </motion.div>
      ))}

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
      `}</style>
    </div>
  );
}