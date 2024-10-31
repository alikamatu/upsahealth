"use client"
import { useState } from "react";
import SideNav from "./SideNav";

export default function DashboardLayout({ children }) {


  return (
    <div className="flex w-screen h-screen">
      <SideNav />
      <div className="flex-grow mt-2 mr-2 mb-2 rounded-lg p-8 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
