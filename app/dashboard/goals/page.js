"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaCheckCircle, FaPlus, FaTrash, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

const goalCategories = [
  "Mindfulness",
  "Self-Care",
  "Social",
  "Physical Health",
  "Emotional Well-Being",
];

const GoalsPage = () => {
  const router = useRouter();
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState(goalCategories[0]);
  const [reminderGoals, setReminderGoals] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://healthbackend.vercel.app/api/goals?userId=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch goals");
        const data = await response.json();
        setGoals(data.active || []);
        setCompletedGoals(data.completed || []);
        setReminderGoals(new Set(data.reminders || []));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const saveGoals = async (updatedGoals, updatedCompleted, updatedReminders) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await fetch("https://healthbackend.vercel.app/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          active: updatedGoals,
          completed: updatedCompleted,
          reminders: Array.from(updatedReminders),
        }),
      });
      if (!response.ok) throw new Error("Failed to save goals");
    } catch (err) {
      setError(err.message);
    }
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      const updatedGoals = [...goals, { id: Date.now(), text: newGoal, category: newGoalCategory, completed: false }];
      setGoals(updatedGoals);
      setNewGoal("");
      saveGoals(updatedGoals, completedGoals, reminderGoals);
    }
  };

  const toggleGoalCompletion = (id) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      const updatedGoals = goals.filter((g) => g.id !== id);
      const updatedCompleted = [...completedGoals, { ...goal, completed: true }];
      setGoals(updatedGoals);
      setCompletedGoals(updatedCompleted);
      const updatedReminders = new Set(reminderGoals);
      updatedReminders.delete(id);
      setReminderGoals(updatedReminders);
      saveGoals(updatedGoals, updatedCompleted, updatedReminders);
    }
  };

  const removeGoal = (id, isCompleted = false) => {
    if (isCompleted) {
      const updatedCompleted = completedGoals.filter((g) => g.id !== id);
      setCompletedGoals(updatedCompleted);
      saveGoals(goals, updatedCompleted, reminderGoals);
    } else {
      const updatedGoals = goals.filter((g) => g.id !== id);
      setGoals(updatedGoals);
      const updatedReminders = new Set(reminderGoals);
      updatedReminders.delete(id);
      setReminderGoals(updatedReminders);
      saveGoals(updatedGoals, completedGoals, updatedReminders);
    }
  };

  const toggleReminder = (id) => {
    const updatedReminders = new Set(reminderGoals);
    if (updatedReminders.has(id)) {
      updatedReminders.delete(id);
    } else {
      updatedReminders.add(id);
    }
    setReminderGoals(updatedReminders);
    saveGoals(goals, completedGoals, updatedReminders);
  };

  if (loading) return <div className="text-white text-center">Loading your goals...</div>;
  if (error) return <div className="text-red-400 text-center">Error: {error}</div>;

  const totalGoals = goals.length + completedGoals.length;
  const progress = totalGoals > 0 ? (completedGoals.length / totalGoals) * 100 : 0;

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
          <h1 className="text-3xl font-bold text-gray-900">Your Goals</h1>
        </div>

        {/* Progress Tracking */}
        <div className="mb-8">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Progress</span>
            <span>{completedGoals.length}/{totalGoals} Completed</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Goal Input */}
        <div className="flex flex-col gap-4 mb-8">
          <motion.input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a small, achievable goal..."
            className="p-3 bg-teal-50/50 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800 placeholder-gray-500"
            whileFocus={{ scale: 1.02 }}
            onKeyPress={(e) => e.key === "Enter" && addGoal()}
            aria-label="Add new goal"
          />
          <div className="flex gap-4">
            <motion.select
              value={newGoalCategory}
              onChange={(e) => setNewGoalCategory(e.target.value)}
              className="flex-1 p-3 bg-teal-50/50 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800"
              whileFocus={{ scale: 1.02 }}
              aria-label="Select goal category"
            >
              {goalCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </motion.select>
            <motion.button
              onClick={addGoal}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-teal-500 text-white p-3 rounded-xl shadow-md"
              disabled={!newGoal.trim()}
              aria-label="Add goal"
            >
              <FaPlus className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Active Goals */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Active Goals</h2>
          <AnimatePresence>
            {goals.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-600 italic text-center"
              >
                No goals yet—start small and build momentum!
              </motion.p>
            ) : (
              goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm"
                >
                  <motion.button
                    onClick={() => toggleGoalCompletion(goal.id)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 bg-white rounded-full shadow-md text-teal-500"
                    aria-label={`Mark ${goal.text} as completed`}
                  >
                    <FaCheckCircle className="w-5 h-5" />
                  </motion.button>
                  <div className="flex-1">
                    <p className="text-gray-700">{goal.text}</p>
                    <p className="text-sm text-gray-500">{goal.category}</p>
                  </div>
                  <motion.button
                    onClick={() => toggleReminder(goal.id)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`p-2 rounded-full shadow-md ${
                      reminderGoals.has(goal.id) ? "bg-teal-200 text-teal-600" : "bg-white text-gray-500"
                    }`}
                    aria-label={`Toggle reminder for ${goal.text}`}
                  >
                    <FaBook className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => removeGoal(goal.id)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 bg-white rounded-full shadow-md text-red-500"
                    aria-label={`Remove ${goal.text}`}
                  >
                    <FaTrash className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Completed Goals</h2>
            <AnimatePresence>
              {completedGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-3 bg-teal-100 rounded-xl shadow-sm"
                >
                  <FaCheckCircle className="w-6 h-6 text-teal-500" />
                  <div className="flex-1">
                    <p className="text-gray-700 line-through">{goal.text}</p>
                    <p className="text-sm text-gray-500">{goal.category}</p>
                  </div>
                  <motion.button
                    onClick={() => removeGoal(goal.id, true)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="p-2 bg-white rounded-full shadow-md text-red-500"
                    aria-label={`Remove completed ${goal.text}`}
                  >
                    <FaTrash className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

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

export default GoalsPage;