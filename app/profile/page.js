"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./Profile.scss"; // Ensure this path points to your CSS file

const avatars = [
  "/avatars/avatar1.jpg",
  "/avatars/avatar2.avif",
  "/avatars/avatar4.avif",
  "/avatars/avatar5.png",
];

const questions = [
  { label: "Choose an Avatar", type: "avatar" },
  { label: "Profile Name", type: "text" },
  { label: "Age", type: "number" },
  { label: "Gender", type: "select" },
];

export default function ProfileSetup() {
  const [avatar, setAvatar] = useState(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profileName, setProfileName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    setFadeClass("fade-in");
  }, [currentQuestionIndex]);

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
    <form onSubmit={(e) => e.preventDefault()} className="p-4 w-screen h-screen overflow-hidden flex flex-col justify-center gap-4 bg-[url('./dashboard/assets/wallpaper.png')] bg-cover">
      <h2 className="text-2xl font-bold mb-4">Set Up Your Profile</h2>

      {currentQuestionIndex === 0 && (
        <div className={`mb-4 ${fadeClass}`}>
          <label className="block">{questions[currentQuestionIndex].label}</label>
          <div className="flex gap-2 mt-2 justify-center">
            {avatars.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Avatar ${index + 1}`}
                onClick={() => setAvatar(img)}
                className={`cursor-pointer w-16 h-16 md:w-32 md:h-32 rounded-full border-2 ${avatar === img ? "border-blue-500" : "border-transparent"}`}
                width={200}
                height={200}
                required
              />
            ))}
          </div>
          <button type="button" onClick={handleNext} className="w-full py-4 bg-blue-600 rounded-xl mt-10">
            Next
          </button>
        </div>
      )}

      {currentQuestionIndex === 1 && (
        <div className={`mb-4 ${fadeClass}`}>
          <label className="block">{questions[currentQuestionIndex].label}</label>
          <p className="text-red-600">Please do not use your real name. This name will be displayed publicly on the platform</p>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="border-2 border-gray-400 w-full mt-4 rounded-xl px-2 py-2 text-1xl focus:outline-none bg-transparent"
            required
          />
          <div className="flex gap-2 mt-10">
            <button type="button" onClick={handlePrevious} className="w-full py-4 bg-gray-600 rounded-xl text-white">
              Back
            </button>
            <button type="button" onClick={handleNext} className="w-full py-4 bg-blue-600 rounded-xl text-white">
              Next
            </button>
          </div>
        </div>
      )}

      {currentQuestionIndex === 2 && (
        <div className={`mb-4 ${fadeClass}`}>
          <label className="block">{questions[currentQuestionIndex].label}</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border-2 border-gray-400 w-full mt-4 rounded-xl px-2 py-2 text-1xl focus:outline-none bg-transparent"
            required
          />
          <div className="flex gap-2 mt-10">
            <button type="button" onClick={handlePrevious} className="w-full py-4 bg-gray-600 rounded-xl text-white">
              Back
            </button>
            <button type="button" onClick={handleNext} className="w-full py-4 bg-blue-600 rounded-xl text-white">
              Next
            </button>
          </div>
        </div>
      )}

      {currentQuestionIndex === 3 && (
        <div className={`mb-4 ${fadeClass}`}>
          <label className="block">{questions[currentQuestionIndex].label}</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <div className="flex gap-2 mt-10">
            <button type="button" onClick={handlePrevious} className="w-full py-4 bg-gray-600 rounded-xl text-white">
              Back
            </button>
            <button type="button" onClick={handleNext} className="w-full py-4 bg-blue-600 rounded-xl text-white">
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
