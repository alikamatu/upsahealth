"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "../context/userContext";
import { FaPaperPlane, FaSpinner, FaExclamationCircle, FaRedo, FaPlus } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

// Dynamic base URL
const BASE_URL = "https://healthbackend.vercel.app";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
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
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState([]);

  // Initial setup and connection test
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
        const response = await axios.post("https://healthbackend.vercel.app/api/gemini", { prompt: "Test connection" });
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

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userId = localStorage.getItem("userId") || "guest";
        const response = await axios.get(`https://healthbackend.vercel.app/api/conversations/${userId}`);
        console.log("Fetched conversations:", response.data);
        setConversations(response.data);
        if (response.data.length > 0) {
          setSelectedConversation(response.data[0].messages);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error.message);
      }
    };

    fetchConversations();
  }, []);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedConversation]);

  // Send message to AI
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    setError(null);

    const userMessage = { id: messages.length + 1, text: input, isAI: false };
    setMessages((prev) => [...prev, userMessage]);
    setSelectedConversation((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log("Sending message to Gemini AI:", input);
      const response = await axios.post("https://healthbackend.vercel.app/api/gemini", { prompt: input });
      console.log("Received response from Gemini AI:", response.data);

      const sanitizedContent = response.data.content.replace(/[*_~`]/g, "");
      const aiMessage = {
        id: messages.length + 2,
        text: sanitizedContent || "I’m here—how can I help?",
        isAI: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setSelectedConversation((prev) => [...prev, aiMessage]);

      const conversationData = {
        userId: localStorage.getItem("userId") || "guest",
        messages: [...selectedConversation, userMessage, aiMessage].map((msg) => ({
          text: msg.text,
          isAI: msg.isAI,
          timestamp: new Date(),
        })),
      };

      await axios.post("https://healthbackend.vercel.app/api/conversations", conversationData);
      console.log("Conversation saved successfully");

      const updatedConversations = await axios.get(`https://healthbackend.vercel.app/api/conversations/${localStorage.getItem("userId") || "guest"}`);
      setConversations(updatedConversations.data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      const errorMsg =
        error.code === "ECONNABORTED"
          ? "Request timed out—please try again."
          : error.response?.data?.error || error.message || "Something went wrong.";
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-200 to-cyan-300 flex items-center justify-center p-4 md:p-8">
      {/* Background floating effect */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(128,222,234,0.2),transparent)]"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row gap-6"
      >
        {/* Conversation Sidebar */}
        <div className="md:w-1/3 flex flex-col gap-4">
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-4 border border-teal-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-teal-900 mb-3">Your Conversations</h2>
            <div className="max-h-64 overflow-y-auto space-y-2">
              <AnimatePresence>
                {conversations.map((conv, index) => (
                  <motion.div
                  key={conv._id || `conversation-${index}`} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={() => setSelectedConversation(conv.messages)}
                    className={`p-3 rounded-xl cursor-pointer text-sm ${
                      selectedConversation === conv.messages
                        ? "bg-teal-500 text-white"
                        : "bg-teal-50 text-teal-900 hover:bg-teal-100"
                    }`}
                  >
                    Conversation {index + 1} - {new Date(conv.createdAt).toLocaleString()}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              setSelectedConversation([]);
              setMessages([
                {
                  id: 1,
                  text: `Hey ${user?.username || "friend"}! Ready for a fresh start?`,
                  isAI: true,
                },
              ]);
            }}
            className="flex items-center justify-center gap-2 p-3 bg-teal-600 text-white rounded-xl shadow-md"
          >
            <FaPlus size={16} /> New Chat
          </motion.button>
        </div>

        {/* Chat Area */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <motion.div
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-teal-100 flex-1 max-h-[70vh] overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence>
              {(selectedConversation.length > 0 ? selectedConversation : messages).map((message, index) => (
                <motion.div
                key={`${message.id || index}-${message.text}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.isAI ? "justify-start" : "justify-end"} mb-4`}
                >
                  <div
                    className={`p-4 rounded-xl max-w-xs md:max-w-md shadow-md ${
                      message.isAI
                        ? "bg-teal-100 text-teal-900"
                        : "bg-teal-500 text-white"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <p className="text-sm leading-relaxed" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                        em: ({ node, ...props }) => <em className="italic" {...props} />,
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center"
                >
                  <FaSpinner className="w-6 h-6 text-teal-500 animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </motion.div>

          {/* Input Area */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
              className="flex-1 p-3 text-sm border border-teal-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white/80 backdrop-blur-md placeholder-teal-400 disabled:opacity-50"
            />
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleSendMessage}
              disabled={loading}
              className="p-3 bg-teal-600 text-white rounded-full shadow-md disabled:opacity-50"
            >
              <FaPaperPlane size={16} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}