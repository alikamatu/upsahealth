"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaUserMd, FaSpinner, FaComment, FaTimes } from "react-icons/fa";
import AddPost from "../conponent/AddPost";
import Post from "../conponent/Post";

// Enhanced BlogProfessionals Component
const BlogProfessionals = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);

  // Sample expert data (replace with real data from an API)
  const experts = [
    {
      id: 1,
      name: "Dr. Jane Smith",
      specialty: "Cognitive Behavioral Therapy",
      avatar: "/avatar1.jpg",
      bio: "Dr. Smith has 15 years of experience helping clients manage anxiety and depression.",
      email: "jane.smith@example.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "Dr. Mark Johnson",
      specialty: "Trauma Recovery",
      avatar: "/avatar2.jpg",
      bio: "Specializing in PTSD and trauma, Dr. Johnson offers compassionate care.",
      email: "mark.johnson@example.com",
      phone: "+1 (555) 987-6543",
    },
  ];

  return (
    <>
      <div className="space-y-4">
        {experts.map((expert) => (
          <motion.div
            key={expert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200 shadow-sm"
            />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">{expert.name}</h3>
              <p className="text-xs text-gray-600">{expert.specialty}</p>
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setSelectedExpert(expert)}
              className="p-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-full shadow-md"
            >
              <FaComment size={16} />
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Expert Popup */}
      <AnimatePresence>
        {selectedExpert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedExpert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedExpert(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
              <div className="flex flex-col items-center text-center">
                <img
                  src={selectedExpert.avatar}
                  alt={selectedExpert.name}
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-200 shadow-md mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{selectedExpert.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{selectedExpert.specialty}</p>
                <p className="text-gray-700 text-sm mb-6">{selectedExpert.bio}</p>
                <div className="space-y-3 w-full">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span>{" "}
                    <a href={`mailto:${selectedExpert.email}`} className="text-teal-500 hover:underline">
                      {selectedExpert.email}
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {selectedExpert.phone}
                  </p>
                </div>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-full shadow-md"
                >
                  Start Chat
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const sidebarVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/post/fetchpost");
      if (response.ok) {
        const postData = await response.json();
        const formattedData = postData.map((post) => ({
          ...post,
          likes: Number(post.likes) || 0,
          comments: post.comments || [],
        }));
        setPosts(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-indigo-100 to-purple-100 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8 p-6 md:p-12 max-w-7xl mx-auto">
        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-2/3 flex flex-col gap-8"
        >
          {/* Add Post Section */}
          <motion.section
            variants={childVariants}
            className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-gray-100 overflow-hidden add-post-section"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-200/20 to-purple-200/20 opacity-50" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <FaPlus className="text-teal-500 w-6 h-6" />
                <h2 className="text-2xl font-bold text-gray-900">Create a Post</h2>
              </div>
              <AddPost fetchPosts={fetchPosts} />
            </div>
          </motion.section>

          {/* Posts Section */}
          <motion.section variants={childVariants} className="w-full">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Community Feed</h2>
              {isLoading && <FaSpinner className="w-5 h-5 text-indigo-500 animate-spin" />}
            </div>
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 bg-white/90 backdrop-blur-md rounded-3xl shadow-md"
                >
                  <FaSpinner className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading posts...</p>
                </motion.div>
              ) : posts.length > 0 ? (
                <Post post={posts} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 bg-white/90 backdrop-blur-md rounded-3xl shadow-md"
                >
                  <p className="text-gray-600">No posts yet. Share your thoughts to get started!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </motion.div>

        {/* Sidebar (Professionals) */}
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:block w-1/3 h-screen fixed right-0 top-0 p-8 bg-white/80 backdrop-blur-xl border-l border-gray-200 shadow-2xl overflow-y-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaUserMd className="text-purple-500 w-6 h-6" />
            <h2 className="text-xl font-bold text-gray-900">Connect with Experts</h2>
          </div>
          <BlogProfessionals />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-purple-400 opacity-50" />
        </motion.div>
      </div>

      {/* Floating Action Button (Mobile Only) */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="md:hidden fixed bottom-6 right-6 bg-gradient-to-r from-teal-500 to-indigo-500 text-white p-4 rounded-full shadow-lg z-50"
        onClick={() => document.querySelector(".add-post-section")?.scrollIntoView({ behavior: "smooth" })}
      >
        <FaPlus className="w-6 h-6" />
      </motion.button>

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

        .add-post-section {
          scroll-margin-top: 20px;
        }
      `}</style>
    </div>
  );
}