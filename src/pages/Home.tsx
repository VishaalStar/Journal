import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import NavbarDemo from "./Navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const photos = ["/bg-1.jpg", "/bg-2.jpg", "/bg-3.jpg", "/bg-4.jpg", "/bg-1.jpg"];

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState<any>(null); // State to hold user data
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set the user data from localStorage
    }

    return () => clearInterval(interval);
  }, []);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <Button onClick={handleSignupClick}>Signup/Login</Button>
      </div>

      <div className="relative z-40">
        <NavbarDemo />
      </div>

      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
        <div className="relative w-full h-96 overflow-hidden">
          {photos.map((photo, index) => (
            <motion.img
              key={index}
              src={photo}
              alt={`Carousel image ${index + 1}`}
              className="absolute w-full h-full object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={
                index === currentIndex
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ zIndex: index === currentIndex ? 1 : 0 }}
            />
          ))}
        </div>
        <h1 className="text-4xl mt-4">Welcome to the Home Page!</h1>

        {/* User button with hover effect */}
        {user && (
          <div className="relative mt-8">
            <Button className="relative group">
              User Info
              <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <p className="text-white">{user.email}</p>
                <p className="text-white">{user.documentary}</p>
                <div className="flex space-x-2 mt-2">
                  {user.photos.map((photo: string, index: number) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`User photo ${index + 1}`}
                      className="w-10 h-10 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
