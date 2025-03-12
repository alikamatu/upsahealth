"use client";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "../context/userContext";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

const socket = io("https://upsamentalhealth.vercel.app");

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
};

const groupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const messageVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const inputVariants = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

export default function ChatRoom() {
  const [groups, setGroups] = useState(["General", "Sports", "Tech"]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { user, userAvatar } = useUserContext();
  const messagesEndRef = useRef(null);

  const groupPhotos = {
    General: "/avatars/avatar5.png",
    Sports: "/avatars/avatar5.png",
    Tech: "/avatars/avatar5.png",
  };

  // Socket setup and message handling
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected!");
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
      setIsConnected(false);
    });
    socket.on("connect_error", (err) => console.error("Connection Error:", err));
    socket.on("chatHistory", (history) => setMessages(history));
    socket.on("receiveMessage", (newMessage) =>
      setMessages((prev) => [...prev, newMessage])
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("chatHistory");
      socket.off("receiveMessage");
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinGroup = (group) => {
    if (currentGroup) socket.emit("leaveGroup", currentGroup);
    setCurrentGroup(group);
    setMessages([]); // Clear messages when switching groups
    socket.emit("joinGroup", group);
  };

  const sendMessage = () => {
    if (!currentGroup) {
      alert("Please join a group first!");
      return;
    }
    if (message && user?.profileName) {
      socket.emit("sendMessage", {
        group: currentGroup,
        user: user.profileName,
        profilePhoto: userAvatar,
        message,
      });
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50 p-6 md:p-12 flex flex-col md:flex-row gap-8">
      {/* Groups Sidebar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/4 bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-black mb-6">Chat Groups</h2>
        <div className="space-y-4">
          {groups.map((group) => (
            <motion.button
              key={group}
              variants={groupVariants}
              whileHover="hover"
              onClick={() => joinGroup(group)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors duration-300 ${
                group === currentGroup
                  ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-md"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <img
                src={groupPhotos[group]}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-gray-200 shadow-sm"
                alt={`${group} chat`}
              />
              <span className="text-sm font-medium">{group}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Chat Window */}
      <div className="w-full md:w-3/4 flex flex-col gap-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg p-6 border border-gray-100 flex-1 flex flex-col"
        >
          {/* Chat Header */}
          {currentGroup ? (
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-t-2xl text-white">
              <img
                src={groupPhotos[currentGroup]}
                width={48}
                height={48}
                className="rounded-full object-cover ring-2 ring-white shadow-sm"
                alt={`${currentGroup} chat`}
              />
              <h3 className="text-xl font-semibold">{currentGroup}</h3>
              <span className="ml-auto text-sm flex items-center gap-2">
                {isConnected ? "Online" : "Offline"}
                <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`} />
              </span>
            </div>
          ) : (
            <div className="p-4 bg-gray-100 rounded-t-2xl text-gray-600 text-center">
              <p className="text-lg font-medium">Join a group to start chatting!</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-300px)]">
            <AnimatePresence>
              {messages.length === 0 && currentGroup ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 py-8"
                >
                  No messages yet—start the conversation!
                </motion.p>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex items-start gap-4 mb-4 ${
                      msg.user === user.profileName ? "justify-end" : ""
                    }`}
                  >
                    {msg.user !== user.profileName && (
                      <img
                        src={msg.profilePhoto || "/default-avatar.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-100 shadow-sm"
                      />
                    )}
                    <div
                      className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-md ${
                        msg.user === user.profileName
                          ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white"
                          : "bg-gray-50 text-gray-900"
                      }`}
                    >
                      <p className="font-semibold text-sm">{msg.user}</p>
                      <p className="text-xs mt-1 leading-relaxed">{msg.message}</p>
                    </div>
                    {msg.user === user.profileName && (
                      <img
                        src={msg.profilePhoto || "/default-avatar.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-100 shadow-sm"
                      />
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {currentGroup && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 p-3 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-300 bg-white/80 backdrop-blur-md placeholder-gray-400"
                />
                <motion.button
                  variants={inputVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={sendMessage}
                  disabled={!isConnected}
                  className={`p-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-full shadow-md ${
                    !isConnected ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <FaPaperPlane size={18} />
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

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

        .messages::-webkit-scrollbar {
          width: 4px;
        }
      `}</style>
    </div>
  );
}