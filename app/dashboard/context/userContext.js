"use client"
import { createContext, useContext } from "react";

// Create the context
export const UserContext = createContext(null);

// Custom hook for accessing the context
export const useUserContext = () => useContext(UserContext);
