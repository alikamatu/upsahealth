"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import "./Home.scss";
import Logo from "./icons/CompanyLogo.png";
import Photo from './assets/wallpaper.jpg';
import Link from "next/link";
import Login from "./components/login";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Quotes array
  const quotes = [
    "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
    "Self-care is how you take your power back.",
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
  ];


  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectQuote = (index) => {
    setCurrentQuoteIndex(index);
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://healthbackend.vercel.app/api/auth/login", {
      // const response = await fetch("https://healthbackend.vercel.app/api/auth/login", {
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

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center py-4 gap-20">
      <div className="hidden md:flex flex-col items-start justify-between bg-[url('./assets/wallpaper.jpg')] bg-cover bg-left bg-no-repeat bg-blend-hard-light text-white p-3 px-8 mx-6 rounded-3xl h-full w-[21%]">
        <div className="mt-10">
          <Image src={Logo} alt="Logo here" />
        </div>
        <div className="text mt-20">
          <p className="text-5xl">Begin Your Healing Journey with Us</p>
        </div>
        <div className="quotes flex items-end">
          <div key={currentQuoteIndex} className="quote-slide bg-blue-800 p-4 rounded-xl">
            <p className="text-sm">{quotes[currentQuoteIndex]}</p>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col items-center md:items-start md:justify-center">
        <div className="header-image">
          <Image className="md:hidden mb-4 rounded-b-2xl" src={Photo} alt="Image here!" />
        </div>
        <h1 className="text-2xl font-bold md:text-4xl mb-2">Sign In to Your Account</h1>
        <p className="mb-4">Welcome to Your Safe Space</p>
        <form onSubmit={handleSubmit} className="flex-col items-start gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="p-2 text-gray-500">Email</label>
            <input
              className="border-2 border-gray-400 w-96 rounded-xl px-2 py-2 text-1xl focus:outline-none bg-transparent"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="p-2 text-gray-500">Password</label>
            <input
              className="border-2 border-gray-400 w-96 rounded-xl px-2 py-2 text-1xl focus:outline-none bg-transparent"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link href='/recovery'>
            <p className="text-blue-500 my-4">Forgot Password?</p>
          </Link>
          {error && <p className="text-red-500">{error}</p>}
          <button className="bg-blue-700 mb-4 text-white px-20 py-2 rounded-xl" type="submit">
            Submit
          </button>
          <Login />
        </form>
      </div>
    </div>
  );
}
