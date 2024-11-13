"use client"
import axios from "axios";
import { useState } from "react";

export default function Recovery() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('https://healthbackend.vercel.app//api/auth/password-recovery', { email });
        alert('Recovery email sent!');
      } catch (error) {
        alert('Error sending recovery email');
      }
    };
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
  <form className="flex flex-col gap-4 items-start p-6" onSubmit={handleSubmit}>
    <label htmlFor="email" className="text-lg">Email</label>
    <input
      className="border-2 border-gray-400 w-80 rounded-xl px-2 py-2 text-lg focus:outline-none"
      type="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <button className="bg-blue-700 text-white w-full py-2 rounded-xl mt-4" type="submit">
      Recover Password
    </button>
  </form>
</div>
      );
}