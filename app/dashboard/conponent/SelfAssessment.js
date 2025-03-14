"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSmile, FaSadTear, FaMeh, FaHeart, FaArrowRight, FaCheckCircle, FaBook, FaPhone, FaLeaf, FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.8, duration: 0.6 },
  },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const questions = [
  {
    id: 1,
    question: "How would you rate your current well-being?",
    options: [1, 2, 3, 4, 5],
    type: "rating",
    icon: <FaSmile className="w-10 h-10 text-teal-500" />,
  },
  {
    id: 2,
    question: "How do you feel today? (Select all that apply)",
    options: ["Anxiety", "Depression", "Stress", "Confused", "Low Energy", "Mood Swing", "Happy", "Irritated", "Sad", "Calm"],
    type: "multiple-choice",
    multiple: true,
    icon: <FaSadTear className="w-10 h-10 text-indigo-500" />,
  },
  {
    id: 3,
    question: "Have you experienced any mental health issues in the past?",
    options: ["Yes", "No"],
    type: "multiple-choice",
    icon: <FaMeh className="w-10 h-10 text-gray-500" />,
  },
  {
    id: 4,
    question: "How often do you feel overwhelmed or burned out?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "rating",
    icon: <FaHeart className="w-10 h-10 text-pink-500" />,
  },
  {
    id: 5,
    question: "Have you ever faced a suicidal decision in your life?",
    options: ["Yes", "No", "Not Sure"],
    type: "multiple-choice",
    icon: <FaSadTear className="w-10 h-10 text-purple-500" />,
  },
];

// Result Component
function ResultPage({ mood, responses, onRestart }) {
  const router = useRouter();

  const recommendations = {
    "Very Calm": [
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Practice mindfulness to stay grounded.", link: "/journal" },
      { icon: <FaBook className="w-6 h-6 text-indigo-500" />, text: "Set small goals.", link: "/dashboard/goals" },
      { icon: <FaUserFriends className="w-6 h-6 text-pink-500" />, text: "Connect with friends.", link: "/chatroom" },
    ],
    "Calm": [
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Try a breathing exercise.", link: "/breathing" },
      { icon: <FaHeart className="w-6 h-6 text-pink-500" />, text: "Reach out the world.", link: "/blog" },
      { icon: <FaBook className="w-6 h-6 text-indigo-500" />, text: "Read mental health resources.", link: "/library" },
    ],
    "Moderate": [
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Read mental health resources.", link: "/library" },
      { icon: <FaBook className="w-6 h-6 text-indigo-500" />, text: "Journal your thoughts.", link: "/dashboard/journal" },
      { icon: <FaPhone className="w-6 h-6 text-purple-500" />, text: "Talk to a friend.", link: "/chatroom" },
    ],
    "High Stress": [
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Try relaxation techniques.", link: "/chatroom" },
      { icon: <FaPhone className="w-6 h-6 text-purple-500" />, text: "Contact a therapist.", link: "/professionals" },
      { icon: <FaBook className="w-6 h-6 text-indigo-500" />, text: "Set small goals.", link: "/dashboard/goals" },
    ],
    "Severe Stress": [
      { icon: <FaPhone className="w-6 h-6 text-purple-500" />, text: "Seek professional help now.", link: "/professionals" },
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Reach out the world", link: "/blog" },
      { icon: <FaHeart className="w-6 h-6 text-pink-500" />, text: "Reach out to a loved one.", link: "/chatroom" },
    ],
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-purple-50 opacity-30 rounded-3xl" />
      <div className="relative z-10">
        <FaCheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Mood: {mood.mood}</h2>
        <p className="text-gray-600 mb-6">
          {mood.mood === "Severe Stress" || mood.mood === "High Stress"
            ? "You’re not alone—let’s take care of you."
            : "Here’s how to nurture your mind today."}
        </p>
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-800">Suggestions for You</h3>
          {recommendations[mood.mood].map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm cursor-pointer hover:bg-gray-100"
              onClick={() => router.push(rec.link)}
            >
              <div className="p-2 bg-white rounded-full shadow-md">{rec.icon}</div>
              <p className="text-gray-700 text-sm">{rec.text}</p>
              <FaArrowRight className="ml-auto text-teal-500" />
            </motion.div>
          ))}
        </div>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onRestart}
          className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2 mx-auto"
        >
          Restart Assessment <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function SelfAssessment() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnswer = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.multiple) {
      const currentAnswers = answers[currentQuestion.id] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((ans) => ans !== option)
        : [...currentAnswers, option];
      setAnswers({ ...answers, [currentQuestion.id]: newAnswers });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: option });
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateResult({ ...answers, [currentQuestion.id]: option });
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(answers);
    }
  };

  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID not found in localStorage");
    router.push("/login"); // Redirect to login page
    return null; // Stop rendering the component
  }

  const calculateResult = async (responses) => {
    let totalScore = 0;

    Object.entries(responses).forEach(([questionId, response]) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (question.type === "rating" && typeof response === "number") {
        totalScore += response;
      } else if (question.type === "multiple-choice") {
        if (Array.isArray(response)) {
          response.forEach((res) => {
            if (["Anxiety", "Depression", "Stress", "Irritated", "Sad"].includes(res)) totalScore += 3;
            if (["Happy", "Calm"].includes(res)) totalScore -= 1;
            if (res === "Mood Swing" || res === "Confused" || res === "Low Energy") totalScore += 2;
          });
        } else {
          if (response === "Yes" || response === "Always") totalScore += 10;
          if (response === "Sometimes" || response === "Often") totalScore += 5;
        }
      }
    });

    let mood = "Moderate";
    if (totalScore <= 5) mood = "Very Calm";
    else if (totalScore <= 10) mood = "Calm";
    else if (totalScore <= 20) mood = "Moderate";
    else if (totalScore <= 30) mood = "High Stress";
    else mood = "Severe Stress";

    const moodEmoji = {
      "Very Calm": "😊",
      "Calm": "🙂",
      "Moderate": "😐",
      "High Stress": "😟",
      "Severe Stress": "😢",
    };

    // Include userId from localStorage in the request body
    const userData = { userId, mood, emoji: moodEmoji[mood], responses };

    try {
      const response = await fetch("https://healthbackend.vercel.app/api/auth/user-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save mood data: ${response.status} - ${errorText}`);
      }
      console.log("Mood data saved successfully!");
    } catch (error) {
      console.error("Error posting data:", error.message);
      setError(error.message); // Store error for display
    }

    setResult({ mood, responses });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen w-screen bg-[url('/calm-wallpaper.jpg')] bg-cover bg-center flex items-center justify-center p-6 relative">
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20" />

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 p-4 rounded-xl shadow-md z-20"
        >
          {error}
        </motion.div>
      )}

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <AnimatePresence mode="wait">
          {result ? (
            <ResultPage
              key="result"
              mood={result}
              responses={answers}
              onRestart={() => {
                setAnswers({});
                setResult(null);
                setCurrentQuestionIndex(0);
                setError(null); // Clear error on restart
              }}
            />
          ) : (
            <motion.div
              key={currentQuestion.id}
              variants={itemVariants}
              className="bg-white/90 rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative overflow-hidden backdrop-blur-md border border-teal-200/50"
            >
              <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex flex-col items-center gap-8">
                <motion.div
                  className="p-4 bg-gradient-to-r from-teal-100 to-purple-100 rounded-full shadow-md"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentQuestion.icon}
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center leading-tight">
                  {currentQuestion.question}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={`relative p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border ${
                        currentQuestion.multiple && answers[currentQuestion.id]?.includes(option)
                          ? "bg-teal-100 border-teal-400"
                          : "bg-white border-gray-100"
                      } group`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-purple-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
                      <span className="relative text-gray-700 font-medium text-sm md:text-base">{option}</span>
                    </motion.button>
                  ))}
                </div>
                {currentQuestion.multiple && (
                  <motion.button
                    onClick={handleNext}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="mt-4 bg-teal-500 text-white px-6 py-3 rounded-full shadow-md"
                  >
                    {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
}