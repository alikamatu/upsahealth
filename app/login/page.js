"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../icons/CompanyLogo.png";
import GoogleLogin from "../components/login";


// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("http://localhost:5000/api/auth/login", {
      const response = await fetch("https://healthbackend.vercel.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        setError("");
        window.location.href = "/loader";
      } else {
        const errData = await response.json();
        setError(errData.message || "Login failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    // Send credentialResponse.credential (JWT) to your backend for verification
    // Example: fetch("http://localhost:5000/api/auth/google", { method: "POST", body: JSON.stringify({ token: credentialResponse.credential }) })
    // For now, simulate success
    setError("");
    window.location.href = "/loader";
  };

  const handleGoogleFailure = () => {
    setError("Google Login failed. Please try again.");
  };

  return (
      <div className="w-screen h-screen bg-gradient-to-br from-teal-900 via-indigo-900 to-purple-900 flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('./assets/happy.jpg')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-teal-900/70 z-0" />

        {/* Main Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-teal-500/20 z-10"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="absolute -top-16 left-1/2 -translate-x-1/2">
            <Image
              src={Logo}
              alt="Mental Health Platform Logo"
              width={120}
              height={40}
              className="object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* Header */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-6 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-center mb-8 text-lg"
          >
            Sign in to your safe space.
          </motion.p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-white rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all shadow-inner"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-white rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all shadow-inner"
              />
            </motion.div>

            {/* Forgot Password */}
            <motion.div variants={itemVariants} className="text-right">
              <Link href="/recovery">
                <span className="text-teal-400 hover:text-teal-300 transition-colors text-sm">
                  Forgot Password?
                </span>
              </Link>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg font-semibold transition-all"
            >
              Sign In
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 my-6"
          >
            <div className="flex-1 h-px bg-teal-500/30" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-teal-500/30" />
          </motion.div>

          {/* Google Login */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <GoogleLogin />
          </motion.div>
        </motion.div>
      </div>
  );
}