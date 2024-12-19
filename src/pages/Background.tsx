import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Background : React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="min-h-screen bg-[#002233] text-white font-sans relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-60">
        <img src="bg.jpg" alt="Background" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-10 md:px-20">
        {/* Logo */}
        <div className="mb-6 flex justify-center items-center p-4 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-red-400 to-pink-400  " >
          {/* <img src="\logo1.png"  className="h-20 md:h-32 " alt="Logo" /> */}
          𝓣𝓻𝓪𝓿𝓮𝓵 𝓙𝓸𝓾𝓻𝓷𝓪𝓵
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-10">
          One travel app for all your <span className="bg-clip-text text-transparentt bg-gradient-to-r from-purple-500 via-blue-500  ">adventures</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Join us for a new Adventure Around The Globe
        </p>

        {/* Call to Action */}
        <div className="flex gap-4">
          <Button
            color="primary"
            className="bg-rose-500 hover:bg-rose-600 text-white text-sm px-5 "
            onClick={() => navigate("/home")} // Navigate to Home
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="absolute bottom-0 w-full flex justify-center items-center py-4 text-gray-400">
        <p>MyJournal &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Background;
