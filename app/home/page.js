"use client";
import './Landing.scss';
import Photo from '../assets/meditate.jpg';
import Image from 'next/image';
import { useEffect } from 'react';

const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    image: Photo,
    citation: "Franklin D. Roosevelt",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    image: Photo,
    citation: "Eleanor Roosevelt",
  },
  {
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    image: Photo,
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
    <div className="landing-container h-screen">
      <Image src={randomQuote.image} alt="Quote image" className="quote-image" />
      <div className="quote-texts">
        <h1 className="quote-text">&quot;{randomQuote.text}&quot;</h1>
        <p className="quote-citation">- {randomQuote.citation}</p>
      </div>
    </div>
  );
}
