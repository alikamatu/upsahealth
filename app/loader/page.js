"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingAnimation from '../components/LoadingAnimation';

export default function CheckProfile() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      router.push('/'); // Redirect to login if token or userId is missing
      return;
    }

    const checkUserProfile = async () => {
      try {
        console.log(`Fetching username for user ID: ${userId}`);
        const response = await axios.get(`https://healthbackend-f1ev.onrender.com/api/auth/avatar/${userId}`);
        const response = await axios.get(`http://localhost:5000/api/auth/avatar/${userId}`);
        console.log('Response:', response.data);
        localStorage.setItem('avatar', response.data.avatar)

        if (!response.data.avatar) {
          router.push('/profile'); // Redirect to profile setup if avatar is empty
        } else {
          router.push('/dashboard')
          setTimeout(() => {
          router.push('/dashboard'); // Redirect to dashboard if avatar exists
          }, 2000);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Optionally, handle errors here (e.g., redirect to an error page or show a message)
      }
    };

    checkUserProfile();
  }, [router]);

  return (
    <div className="loading-screen">
      <LoadingAnimation />
    </div>
  );
}
