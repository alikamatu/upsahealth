"use client"
import axios from "axios";
import { useState } from "react";

export default function Recovery() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/api/auth/password-recovery', { email });
        alert('Recovery email sent!');
      } catch (error) {
        alert('Error sending recovery email');
      }
    };
    return (
       <div>

<form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Recover Password</button>
        </form>
       </div>
      );
}