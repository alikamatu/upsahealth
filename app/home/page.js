"use client"
// Example component
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/action/userAction';

export default function Landing() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleSetUser = () => {
    const userData = { name: 'John Doe' }; // Example user data
    dispatch(setUser(userData));
  };

  return (
    <div>
      <h1>Hello {user?.name || 'Guest'}</h1>
      <button onClick={handleSetUser}>Set User</button>
    </div>
  );
}
