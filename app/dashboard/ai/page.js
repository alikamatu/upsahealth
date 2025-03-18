"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "../context/userContext";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { FaPaperPlane, FaSpinner, FaExclamationCircle, FaRedo } from "react-icons/fa";

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
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Hey ${user?.username || "friend"}! I’m your AI companion here to support you with mental health topics. How can I assist you today?`,
        isAI: true,
      },
    ]);
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    setError(null);

    const userMessage = { id: messages.length + 1, text: input, isAI: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCBf8xA-B0orrcFrFCUnMaQ4kSgJCMYNJU");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: messages.filter(m => m.id !==1).map(m => ({
          role: m.isAI ? "model" : "user",
          parts: m.text
        })),
        generationConfig: {
          maxOutputTokens: 200,
        },
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      const aiMessage = {
        id: messages.length + 2,
        text: text || "I’m here—how can I help?",
        isAI: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setError("Something went wrong with the Gemini API.");
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 2, text: "Oops, I hit a snag. Try again?", isAI: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
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
          background: rgba(136, 136, 0.5);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(85, 85, 85, 0.7);
        }
      `}</style>
    </div>
  );
}