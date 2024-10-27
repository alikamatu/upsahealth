"use client"
import { useEffect, useState } from "react";

export default function Landing() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Assuming the name is stored in local storage after login
    const user = localStorage.getItem("name")
      setUserName(user);
  }, []);

  return (
    <h1 className="text-7xl text-blue-900">
      Hello {userName ? userName : "Guest"}
    </h1>
  );
}
