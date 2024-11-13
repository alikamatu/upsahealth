"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/userContext';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://healthbackend.vercel.app',
  withCredentials: true // Important for cookies/sessions if you're using them
});

export default function AI() {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMessages([
      { id: 1, text: `Hello ${user?.username || 'User'}! I am Claude, an AI assistant here to help with mental health topics.`, isAI: true },
    ]);

    // Test backend connection
    const testConnection = async () => {
      try {
        const response = await api.get('/api/chat/test');
        console.log('Backend connection test:', response.data);
      } catch (err) {
        console.error('Backend connection test failed:', err);
        setError('Unable to connect to server. Please check if the backend is running.');
      }
    };

    testConnection();
  }, [user]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setError(null);

    const userMessage = { id: messages.length + 1, text: input, isAI: false };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      console.log('Sending message to backend:', input);
      
      const response = await api.post('/api/chat', {
        messages: [
          {
            role: 'user',
            content: input
          }
        ]
      });

      console.log('Received response:', response.data);

      const aiMessage = {
        id: messages.length + 2,
        text: response.data.content[0].text,
        isAI: true,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('API Error:', error);
      setError(error.response?.data?.error || error.message || 'An error occurred while sending your message.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 2, text: "An error occurred. Please try again later.", isAI: true },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Mental Health AI Assistance</h1>

      {error && (
        <div className="w-full max-w-md mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="w-full max-w-md h-3/4 bg-white rounded-lg shadow-md overflow-y-auto p-4 space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${message.isAI ? 'bg-blue-200 text-black' : 'bg-blue-500 text-white'}`}>
              {message.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-500">Claude is thinking...</div>}
      </div>

      <div className="w-full max-w-md flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 disabled:bg-gray-400"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}