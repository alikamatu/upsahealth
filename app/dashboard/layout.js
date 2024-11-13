"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "./SideNav";
import { UserContext } from "./context/userContext";
import LoadingAnimation from "../components/LoadingAnimation";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  // Get localStorage data only on the client side
  useEffect(() => {
      const storedUserId = localStorage.getItem("userId");
      const storedAvatar = localStorage.getItem("avatar");
      setUserId(storedUserId);
      setUserAvatar(storedAvatar);
  }, []);

  useEffect(() => {
      if (!userId) return; // Ensure `userId` is set before making the API call

      const fetchUser = async () => {
          try {
              const response = await axios.get(`https://healthbackend.vercel.app/api/user/${userId}`);
              setUser(response.data); // Assuming the response contains the user object
          } catch (err) {
              setError("Failed to fetch user data");
          } finally {
              setLoading(false);
          }
      };

      fetchUser();
  }, [userId]);

  if (loading) return <div><LoadingAnimation /></div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <UserContext.Provider value={{ user, userAvatar }}>
      <div className="flex w-screen h-screen">
        <SideNav user={user} userAvatar={userAvatar} />
        <div className="flex-grow p-0 overflow-x-hidden">
          {children}
        </div>
      </div>
    </UserContext.Provider>
  );
}
