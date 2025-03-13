// app/journal/page.js
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaPlus, FaTrash, FaArrowRight, FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const JournalPage = () => {
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch journal entries on load
  useEffect(() => {
    const fetchEntries = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/journal?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch journal entries");
        const data = await response.json();
        setEntries(data.entries || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  // Save journal entries to backend
  const saveEntries = async (updatedEntries) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await fetch("http://localhost:5000/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, entries: updatedEntries }),
      });
      if (!response.ok) throw new Error("Failed to save journal entries");
    } catch (err) {
      setError(err.message);
    }
  };

  const addEntry = () => {
    if (newEntry.trim()) {
      const updatedEntries = [
        ...entries,
        { id: Date.now(), text: newEntry, createdAt: new Date().toISOString() },
      ];
      setEntries(updatedEntries);
      setNewEntry("");
      saveEntries(updatedEntries);
    }
  };

  const removeEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  if (loading) return <div className="text-white text-center">Loading your journal...</div>;
  if (error) return <div className="text-red-400 text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen w-screen bg-[url('/calm-wallpaper.jpg')] bg-cover bg-center flex flex-col items-center justify-center p-6 relative">
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20" />

      <motion.div
        className="relative z-10 w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-8 backdrop-blur-md border border-teal-200/50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="p-4 bg-gradient-to-r from-teal-100 to-purple-100 rounded-full shadow-md"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaBook className="w-10 h-10 text-indigo-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">Your Journal</h1>
        </div>

        {/* New Entry Input */}
        <div className="flex gap-4 mb-8">
          <motion.textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="flex-1 p-3 bg-teal-50/50 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800 placeholder-gray-500 resize-none h-32"
            whileFocus={{ scale: 1.02 }}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), addEntry())}
            aria-label="Write a new journal entry"
          />
          <motion.button
            onClick={addEntry}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-teal-500 text-white p-3 rounded-xl shadow-md"
            disabled={!newEntry.trim()}
            aria-label="Add journal entry"
          >
            <FaPlus className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Your Entries</h2>
          <AnimatePresence>
            {entries.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-600 italic text-center"
              >
                No entries yet—start journaling to reflect and unwind!
              </motion.p>
            ) : (
              entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col gap-2 p-4 bg-gray-50 rounded-xl shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <motion.button
                      onClick={() => removeEntry(entry.id)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="p-2 bg-white rounded-full shadow-md text-red-500"
                      aria-label={`Remove journal entry from ${new Date(entry.createdAt).toLocaleDateString()}`}
                    >
                      <FaTrash className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <p className="text-gray-700">{entry.text}</p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.button
          onClick={() => router.push("/dashboard")}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 mx-auto"
          aria-label="Back to dashboard"
        >
          Back to Dashboard <FaArrowRight />
        </motion.button>
      </motion.div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default JournalPage;