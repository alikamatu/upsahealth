"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./Home.scss";
import Logo from "./icons/CompanyLogo.png";
import Photo from './assets/wallpaper.jpg';
import Link from "next/link";
import Login from "./components/login";
import MaterialUISwitch from "./dashboard/conponent/MaterialUISwitch ";
import { useTheme } from "./ThemeContext";

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

  const { darkMode, toggleTheme } = useTheme();


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        setError("");
        window.location.href = "/home";
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
      <div className="side-bar md:flex flex-col items-start justify-center bg-[url('./assets/wallpaper.jpg')] bg-cover bg-left bg-no-repeat bg-blend-hard-light text-white p-3 px-8 mx-6 rounded-3xl h-full w-[21%]">
        <div className="mt-10">
          <Image src={Logo} alt="Logo here" />
        </div>
        <div className="text mt-20">
          <p className="text-5xl">Start your Journey with Us</p>
          <p className="text-xs mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            excepturi repudiandae est.
          </p>
        </div>
        <div className="quotes flex mt-40 items-end">
          <div key={currentQuoteIndex} className="quote-slide bg-blue-800 p-4 rounded-xl">
            <p className="text-sm">{quotes[currentQuoteIndex]}</p>
          </div>
        </div>
        <div className="controls mt-4 flex gap-2 justify-center">
          {quotes.map((_, index) => (
            <span
              key={index}
              onClick={() => handleSelectQuote(index)}
              className={`control-bar ${index === currentQuoteIndex ? "active" : ""}`}
            />
          ))}
        </div>
        <MaterialUISwitch onChange={toggleTheme} />
      </div>
      <div className="right">
        <div className="header-image">
          <Image className="image" src={Photo} alt="Image here!" />
        </div>
        <h1 className="text-4xl">SignIn</h1>
        <p className="mb-16">Welcome to your health plug</p>
        <form onSubmit={handleSubmit} className="flex-col items-start gap-4">
          <div className="flex-col">
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
          <div className="flex-col">
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
            <p className="text-blue-500">Forgot Password?</p>
          </Link>
          {error && <p className="text-red-500">{error}</p>}
          <button className="bg-blue-700 mb-4 text-white px-20 py-2 rounded-xl" type="submit">
            Submit
          </button>
        </form>
        <Login />
      </div>
    </div>
  );
}
