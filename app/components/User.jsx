import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!userId) return;

      try {
        console.log(`Fetching username for user ID: ${userId}`);
        const response = await axios.get(`http://localhost:5000/api/auth/username/${userId}`);
        console.log('Response:', response.data);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [userId]);

  return (
    <div>
      {username ? `Hello, ${username}` : 'Loading...'}
    </div>
  );
};

export default User;
