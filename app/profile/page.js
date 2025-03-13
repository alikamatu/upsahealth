"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Profile.scss"; // Keep your existing SCSS if needed

const avatars = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.avif",
  "/avatars/avatar4.avif",
  "/avatars/avatar5.png",
];

const questions = [
  { label: "Choose Your Avatar", type: "avatar" },
  { label: "Profile Name", type: "text" },
  { label: "Age", type: "number" },
  { label: "Gender", type: "select" },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ProfileSetup = () => {
  const [avatar, setAvatar] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profileName, setProfileName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const data = { userId, avatar, age, gender, profileName };

    try {
      const response = await fetch("https://healthbackend.vercel.app/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Error:", errorMessage);
        alert("Error: " + errorMessage.message);
        return;
      }

      const result = await response.json();
      console.log("Profile updated successfully:", result);
      window.location.href = "/loader";
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-100 overflow-hidden flex items-center justify-center">
      {/* Calm Wallpaper */}
      <motion.div
        className="absolute inset-0 z-0 bg-[url('/calm-wallpaper.jpg')] bg-cover bg-center opacity-70"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-xl backdrop-blur-md border border-teal-200/50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl font-bold text-teal-700 mb-6 text-center"
          variants={itemVariants}
        >
          Set Up Your Safe Space
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
            className="space-y-6"
          >
            {/* Avatar Selection */}
            {currentQuestionIndex === 0 && (
              <>
                <label className="block text-lg font-medium text-gray-700">
                  {questions[currentQuestionIndex].label}
                </label>
                <div className="flex gap-4 justify-center flex-wrap">
                  {avatars.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAvatar(img)}
                      className={`cursor-pointer w-20 h-20 rounded-full border-4 ${
                        avatar === img ? "border-teal-400" : "border-gray-300"
                      } shadow-md`}
                    >
                      <Image
                        src={img}
                        alt={`Avatar ${index + 1}`}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* Profile Name */}
            {currentQuestionIndex === 1 && (
              <>
                <label className="block text-lg font-medium text-gray-700">
                  {questions[currentQuestionIndex].label}
                </label>
                <p className="text-sm text-red-500 italic">
                  Please use a pseudonym—this will be public!
                </p>
                <motion.input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full p-3 bg-teal-50/50 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800 placeholder-gray-500"
                  placeholder="Enter your profile name"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </>
            )}

            {/* Age */}
            {currentQuestionIndex === 2 && (
              <>
                <label className="block text-lg font-medium text-gray-700">
                  {questions[currentQuestionIndex].label}
                </label>
                <motion.input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 bg-teal-50/50 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800 placeholder-gray-500"
                  placeholder="Enter your age"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </>
            )}

            {/* Gender */}
            {currentQuestionIndex === 3 && (
              <>
                <label className="block text-lg font-medium text-gray-700">
                  {questions[currentQuestionIndex].label}
                </label>
                <motion.select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 bg-teal-50/50 border border-teal-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-800"
                  required
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </motion.select>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentQuestionIndex > 0 && (
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 py-3 bg-gray-500 text-white rounded-xl shadow-md hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </motion.button>
              )}
              <motion.button
                type="button"
                onClick={handleNext}
                className="flex-1 py-3 bg-teal-500 text-white rounded-xl shadow-md hover:bg-teal-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <motion.div
          className="mt-6 flex justify-center gap-2"
          variants={itemVariants}
        >
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentQuestionIndex ? "bg-teal-500" : "bg-gray-300"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;