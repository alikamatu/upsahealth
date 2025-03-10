"use client";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

// Animation Variants
const buttonVariants = {
  rest: { scale: 1, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.06,
    boxShadow: "0 6px 20px rgba(45, 212, 191, 0.3)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: { scale: 0.96, transition: { duration: 0.2 } },
};

function GoogleLogin() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <motion.div
      className="flex w-full justify-center items-center px-4 md:px-0"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.button
        variants={buttonVariants}
        onClick={handleGoogleLogin}
        className="relative flex items-center justify-center gap-4 px-8 py-4 bg-teal-900/20 backdrop-blur-lg border border-teal-400/40 rounded-full text-white font-semibold text-base shadow-lg hover:bg-teal-900/30 transition-all overflow-hidden w-full max-w-xs"
      >
        {/* Google Icon */}
        <FcGoogle size={28} className="drop-shadow-md z-10" />

        {/* Text */}
        <span className="relative z-10 tracking-wide">Sign in with Google</span>

        {/* Animated Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Subtle Glow Ring */}
        <div className="absolute inset-0 rounded-full border border-teal-400/20 animate-glow" />
      </motion.button>
    </motion.div>
  );
}

export default GoogleLogin;

// Custom CSS Animation
const customStyles = `
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 8px rgba(45, 212, 191, 0.2); }
    50% { box-shadow: 0 0 16px rgba(45, 212, 191, 0.4); }
  }
  .animate-glow {
    animation: glow 3s infinite ease-in-out;
  }
`;

export function GoogleLoginWithStyles() {
  return (
    <>
      <GoogleLogin />
      <style jsx global>{customStyles}</style>
    </>
  );
}