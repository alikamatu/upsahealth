"use client"
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Import `useSearchParams`
import axios from 'axios';

export default function Reset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Retrieve `token` from the URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`https://healthbackend.vercel.app//api/auth/reset-password/${token}`, { password });
      setMessage(response.data.message);
      setTimeout(() => router.push('/login'), 2000); // Redirect to login after success
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
    <form className="flex flex-col gap-4 items-center w-96 p-8" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <label className="w-full text-left">New Password</label>
      <input
        type="password"
        className="border-2 border-gray-400 w-full rounded-xl px-2 py-2 focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label className="w-full text-left">Confirm Password</label>
      <input
        type="password"
        className="border-2 border-gray-400 w-full rounded-xl px-2 py-2 focus:outline-none"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button className="bg-blue-700 text-white px-6 py-2 rounded-xl mt-4" type="submit">
        Reset Password
      </button>
      {message && <p className="text-red-600 mt-2">{message}</p>}
    </form>
  </div>
  );
}
