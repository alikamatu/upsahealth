"use client";
import './Landing.scss';
import { useEffect } from 'react';

const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    citation: "Franklin D. Roosevelt",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    citation: "Eleanor Roosevelt",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    citation: "Martin Luther King Jr.",
  },
  // Add more quotes as needed
];

export default function Landing() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');

    if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      setTimeout(() => {
        window.location.href = '/loader';
      }, 3000); 
    }
  }, []);

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="landing-container h-screen w-screen bg-[url('./dashboard/assets/wallpaper.png')] bg-cover">
      <div className="quote-texts">
        <h1 className="quote-text">&quot;{randomQuote.text}&quot;</h1>
        <p className="quote-citation">- {randomQuote.citation}</p>
      </div>
    </div>
  );
}
