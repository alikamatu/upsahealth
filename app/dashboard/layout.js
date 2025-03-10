"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "./SideNav";
import { UserContext } from "./context/userContext";
import LoadingAnimation from "../components/LoadingAnimation";
import TopNav from "./conponent/TopNav";
import MobileNav from "./conponent/MobileNav";
import ToggleSideNav from "./conponent/ToggleSideNav";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedAvatar = localStorage.getItem("avatar");
    setUserId(storedUserId);
    setUserAvatar(storedAvatar);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://healthbackend.vercel.app/api/user/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  if (loading) return <div><LoadingAnimation /></div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <UserContext.Provider value={{ user, userAvatar }}>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Toggle Button */}
        <ToggleSideNav isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

        {/* SideNav with Animation */}
        <SideNav user={user} userAvatar={userAvatar} isVisible={isSidebarVisible} />

        {/* Main Content */}
        <div className="flex-grow p-0 justify-center items-center overflow-x-hidden">
          {/* TopNav for Mobile */}
          <div className="md:hidden p-4">
            <TopNav toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
          </div>
          {/* Content Area */}
          <div className={`${isSidebarVisible ? "block" : "block"}`}>
            {children}
          </div>
        </div>

        {/* MobileNav (if needed) */}
        {isSidebarVisible && (
          <MobileNav
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            user={user}
            userAvatar={userAvatar}
          />
        )}
      </div>
    </UserContext.Provider>
  );
}