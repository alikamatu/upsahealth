// Password recovery form example (React)
import { useState } from 'react';
import axios from 'axios';

const PasswordRecovery = () => {
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
  );
};

export default PasswordRecovery;
