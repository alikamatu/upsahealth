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
    // Trigger the fade animation on every question change
    setFadeClass("fade-in");
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const data = { userId, avatar, age, gender, profileName };

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
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
    <form onSubmit={(e) => e.preventDefault()} className="p-4 max-w-xl mx-auto w-screen h-screen overflow-hidden flex flex-col justify-center gap-4">
      <h2 className="text-2xl mb-4">Set Up Your Profile</h2>

      {currentQuestionIndex === 0 && (
        <div className={`mb-4 ${fadeClass}`}>
          <label className="block">{questions[currentQuestionIndex].label}</label>
          <div className="flex gap-2 mt-2">
            {avatars.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Avatar ${index + 1}`}
                onClick={() => setAvatar(img)}
                className={`cursor-pointer w-32 h-32 rounded-full border-2 ${avatar === img ? "border-blue-500" : "border-transparent"}`}
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
          <button type="button" onClick={handleNext} className="w-full py-4 bg-blue-600 rounded-xl mt-10 text-white">
            Next
          </button>
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
          <button type="button" onClick={handleNext} className="w-full py-4 bg-blue-600 rounded-xl mt-10 text-white">
            Next
          </button>
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
          <button type="button" onClick={handleNext} className="w-full py-4 bg-blue-600 rounded-xl mt-10 text-white">
            Submit
          </button>
        </div>
      )}
    </form>
  );
}
