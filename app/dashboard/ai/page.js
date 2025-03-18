"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "../context/userContext";
import { FaPaperPlane, FaSpinner, FaExclamationCircle, FaRedo } from "react-icons/fa";

// Dynamic base URL based on environment
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://healthbackend.vercel.app";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // For session cookies if needed
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // Increased timeout for AI response
});

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

export default function AI() {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const messagesEndRef = useRef(null);

  // Initial message and connection test
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Hey ${user?.username || "friend"}! I’m your AI companion here to support you with mental health topics. How can I assist you today?`,
        isAI: true,
      },
    ]);

    const testConnection = async () => {
      try {
        // Test the /api/gemini endpoint with a simple prompt
        const response = await api.post("/api/gemini", { prompt: "Test connection" });
        console.log("Gemini AI test response:", response.data.content);
        setError(null);
      } catch (err) {
        console.error("Backend connection test failed:", err);
        setError(
          err.code === "ECONNABORTED"
            ? "Server timed out—retrying soon!"
            : `Can’t reach the AI at ${BASE_URL}. Check the server!`
        );
        if (retryCount < 3) {
          setTimeout(() => setRetryCount((prev) => prev + 1), 3000);
        }
      }
    };

    testConnection();
  }, [user, retryCount]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to the backend /api/gemini endpoint
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    setError(null);

    const userMessage = { id: messages.length + 1, text: input, isAI: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log("Sending message to Gemini AI:", input);
      const response = await api.post("/api/gemini", { prompt: input });
      console.log("Received response from Gemini AI:", response.data);

      const aiMessage = {
        id: messages.length + 2,
        text: response.data.content || "I’m here—how can I help?",
        isAI: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      const errorMsg =
        error.code === "ECONNABORTED"
          ? "Request timed out—please try again."
          : error.response?.data?.error ||
            error.response?.data?.details ||
            error.message ||
            "Something went wrong with the AI.";
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 2, text: "Oops, I hit a snag. Try again?", isAI: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50 p-6 md:p-12 flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full flex flex-col gap-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Your AI Companion
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Chat with me about anything on your mind—I’m here to listen.
        </p>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-2xl flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <FaExclamationCircle size={20} />
                <span>{error}</span>
              </div>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleRetry}
                className="p-2 bg-red-500 text-white rounded-full"
              >
                <FaRedo size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-gray-100 flex-1 max-h-[70vh] overflow-y-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                className={`flex ${message.isAI ? "justify-start" : "justify-end"} mb-4`}
              >
                <div
                  className={`p-4 rounded-2xl max-w-xs md:max-w-md shadow-md ${
                    message.isAI
                      ? "bg-gradient-to-r from-teal-100 to-indigo-100 text-gray-900"
                      : "bg-gradient-to-r from-teal-500 to-indigo-500 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <FaSpinner className="w-6 h-6 text-indigo-500 animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={loading}
            className="flex-1 p-4 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-300 bg-white/80 backdrop-blur-md placeholder-gray-400 disabled:opacity-50"
          />
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleSendMessage}
            disabled={loading}
            className="p-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-full shadow-md disabled:opacity-50"
          >
            <FaPaperPlane size={18} />
          </motion.button>
        </div>
      </motion.div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

        body {
          font-family: "Inter", sans-serif;
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