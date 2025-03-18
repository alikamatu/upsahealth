"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function CheckProfile() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      router.push("/"); // Redirect to login if token or userId is missing
      return;
    }

    const checkUserProfile = async () => {
      try {
        console.log(`Fetching username for user ID: ${userId}`);
        const response = await axios.get(`http://localhost:5000/api/auth/avatar/${userId}`);
        // const response = await axios.get(`https://healthbackend.vercel.app/api/auth/avatar/${userId}`);
        console.log("Response:", response.data);
        localStorage.setItem("avatar", response.data.avatar);

        if (!response.data.avatar) {
          router.push("/profile"); // Redirect to profile setup if avatar is empty
        } else {
          setTimeout(() => {
            router.push("/dashboard"); // Redirect to dashboard if avatar exists
          }, 2500); // Delay to enjoy animation
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    checkUserProfile();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 via-teal-200 to-cyan-300 overflow-hidden">
      {/* Background floating effect */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(128,222,234,0.2),transparent)]"
        animate={{
          x: [0, 20, 0],
          y: [0, 20, 0],
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Main loader content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Spinner */}
        <motion.div
          className="w-16 h-16 mx-auto mb-6 border-4 border-t-cyan-500 border-teal-200 rounded-full"
          animate={{
            rotate: 360,
            y: [-10, 10, -10],
            transition: {
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            },
          }}
        />

        {/* Main message */}
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-teal-800"
          animate={{ opacity: [0.5, 1], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } }}
        >
          Tuning your mind’s frequency...
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-sm md:text-base text-teal-600 mt-2 opacity-80"
          animate={{ scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        >
          A moment of calm chaos is brewing.
        </motion.p>
      </motion.div>
    </div>
  );
}