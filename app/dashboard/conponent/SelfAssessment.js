"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSmile, FaSadTear, FaMeh, FaHeart, FaArrowRight, FaCheckCircle, FaBook, FaPhone, FaLeaf } from "react-icons/fa";
import VeryCalm from "./moodcomponents/VeryCalm";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
    question: "How do you feel today?",
    options: ["Anxiety", "Depression", "Stress", "Confused", "Low Energy", "Mood Swing", "Happy", "Irritated", "Sad", "Calm"],
    type: "multiple-choice",
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
    icon: <FaSadTear className="w-10 h-10 text-purple-500" />,
  },
];

// Result Page Component
function ResultPage({ mood, onRestart }) {
  const recommendations = {
    "Very Calm": [
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Practice mindfulness or meditation to maintain your calm state." },
      { icon: <FaBook className="w-6 h-6 text-indigo-500" />, text: "Read a book on personal growth to keep nurturing your well-being." },
      { icon: <FaSmile className="w-6 h-6 text-pink-500" />, text: "Share your positivity with others—connect with a friend!" },
    ],
    "Calm": [
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Try a short breathing exercise to stay grounded." },
      { icon: <FaHeart className="w-6 h-6 text-pink-500" />, text: "Engage in a hobby you love to sustain your calm mood." },
      { icon: <FaBook className="w-6 h-6 text-indigo-500" />, text: "Explore mental health resources to build resilience." },
    ],
    "Moderate": [
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Take a 10-minute walk to clear your mind." },
      { icon: <FaBook className="w-6 h-6 text-indigo-500" />, text: "Journal your thoughts to process your feelings." },
      { icon: <FaPhone className="w-6 h-6 text-purple-500" />, text: "Talk to a trusted friend or family member for support." },
    ],
    "High Stress": [
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Try deep breathing or progressive muscle relaxation." },
      { icon: <FaPhone className="w-6 h-6 text-purple-500" />, text: "Reach out to a therapist or counselor for guidance." },
      { icon: <FaBook className="w-6 h-6 text-indigo-500" />, text: "Set small, achievable goals to reduce overwhelm." },
    ],
    "Severe Stress": [
      { icon: <FaPhone className="w-6 h-6 text-purple-500" />, text: "Contact a mental health professional immediately." },
      { icon: <FaLeaf className="w-6 h-6 text-teal-500" />, text: "Find a quiet space and focus on slow, deep breaths." },
      { icon: <FaHeart className="w-6 h-6 text-pink-500" />, text: "Reach out to a loved one—you don’t have to face this alone." },
    ],
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center relative overflow-hidden"
    >
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-purple-50 opacity-30 rounded-3xl" />
      <div className="relative z-10">
        <FaCheckCircle className="w-16 h-16 text-teal-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Mood: {mood}</h2>
        <p className="text-gray-600 mb-6">
          {mood === "Severe Stress" || mood === "High Stress"
            ? "We’re here for you. Take a moment to prioritize your well-being."
            : "Thanks for checking in! Here’s how you can nurture yourself next."}
        </p>

        {/* Recommendations */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-800">What You Can Do Next</h3>
          {recommendations[mood].map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl shadow-sm"
            >
              <div className="p-2 bg-white rounded-full shadow-md">{rec.icon}</div>
              <p className="text-gray-700 text-sm">{rec.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Restart Button */}
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {
    const updatedAnswers = { ...answers, [questions[currentQuestionIndex].id]: value };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (responses) => {
    const totalScore = Object.values(responses).reduce((acc, curr) => {
      if (typeof curr === "number") return acc + curr;
      if (typeof curr === "string") {
        if (curr === "Calm" || curr === "Happy") return acc + 1;
        if (curr === "Anxiety" || curr === "Depression" || curr === "Stress") return acc + 3;
        if (curr === "Yes" || curr === "Always") return acc + 10;
      }
      return acc;
    }, 0);

    let mood;
    if (totalScore <= 5) mood = "Very Calm";
    else if (totalScore <= 10) mood = "Calm";
    else if (totalScore <= 15) mood = "Moderate";
    else if (totalScore <= 20) mood = "High Stress";
    else mood = "Severe Stress";

    setResult(mood);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (result === "Very Calm" && false) { // Disable VeryCalm redirect for now
    return <VeryCalm />;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultPage key="result" mood={result} onRestart={() => window.location.reload()} />
        ) : (
          <motion.div
            key={currentQuestion.id}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative overflow-hidden"
          >
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-purple-50 opacity-30 rounded-3xl" />
            <div className="relative z-10">
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Question Content */}
              <div className="flex flex-col items-center gap-8">
                <div className="p-4 bg-gradient-to-r from-teal-100 to-purple-100 rounded-full shadow-md">
                  {currentQuestion.icon}
                </div>
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
                      className="relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-purple-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
                      <span className="relative text-gray-700 font-medium text-sm md:text-base">
                        {option}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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