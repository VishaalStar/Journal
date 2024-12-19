"use client";
import React from "react";

const NavbarDemo: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white py-4 shadow-md fixed inset-x-0 top-0 z-50">
      <div className="flex justify-center items-center w-full space-x-8">
        {/* Logo */}
        <div className="absolute left-8">
          <img src="/logo1.png" alt="Logo" className="h-14" />
        </div>

        {/* Navbar Items in the center */}
        <Navbar />
      </div>
    </div>
  );
};

function Navbar() {
  return (
    <div className="flex space-x-8">
      {/* Simplified navigation items */}
      <span className="text-lg font-medium cursor-pointer hover:underline">
        Journal
      </span>
      <span className="text-lg font-medium cursor-pointer hover:underline">
        Photos
      </span>
      <span className="text-lg font-medium cursor-pointer hover:underline">
        Map
      </span>
    </div>
  );
}

export default NavbarDemo;
