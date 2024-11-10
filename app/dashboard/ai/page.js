"use client"
import { useState } from 'react';
import axios from 'axios';

export default function AI() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I’m here to assist with mental health topics.', isAI: true },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message to the chat
    const userMessage = { id: messages.length + 1, text: input, isAI: false };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: input }],
        }, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
        });
    
        const aiMessage = {
            id: messages.length + 2,
            text: response.data.choices[0].message.content,
            isAI: true,
        };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        if (error.response?.status === 429) {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: prevMessages.length + 2, text: "Too many requests. Please wait a moment before trying again.", isAI: true }
            ]);
        } else {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: prevMessages.length + 2, text: "An error occurred. Please try again later.", isAI: true }
            ]);
        }
    }}
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Mental Health AI Assistance</h1>

      <div className="w-full max-w-md h-3/4 bg-white rounded-lg shadow-md overflow-y-auto p-4 space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${message.isAI ? 'bg-blue-200 text-black' : 'bg-blue-500 text-white'}`}>
              {message.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-500">AI is typing...</div>}
      </div>

      <div className="w-full max-w-md flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
