"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "./SideNav";
import { UserContext } from "./context/userContext";
import LoadingAnimation from "../components/LoadingAnimation";
import TopNav from "./conponent/TopNav";
import MobileNav from "./conponent/MobileNav";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

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

  
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
  };

  if (loading) return <div><LoadingAnimation /></div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <UserContext.Provider value={{ user, userAvatar }}>
      <div className="flex w-screen h-screen">
        <SideNav user={user} userAvatar={userAvatar} />
        {isSidebarVisible?<MobileNav isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} user={user} userAvatar={userAvatar} />:""}
        <div className="flex-grow p-0 justify-center items-center overflow-x-hidden">
          <div className="md:hidden p-8">
          <TopNav toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible}  />
          </div>
         <div className={`${isSidebarVisible? 'hidden': 'block'}`}>
         {children}
         </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}
