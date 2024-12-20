import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setPhoneNumber(userData.phoneNumber || ""); // Fetching existing phone number if available
    }
  }, []);

  const handleEditPhone = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (user) {
      // Here you can handle saving the updated phone number to a backend or database
      const updatedUser = { ...user, phoneNumber };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // Redirect to home after logout
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center pt-16">
      {/* User Avatar and Email */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user.avatar || "/default-avatar.jpg"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <h1 className="text-2xl">{user.email}</h1>
      </div>

      {/* Phone Number Edit Section */}
      <div className="mt-8">
        <h2 className="text-xl mb-2">Phone Number:</h2>
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter phone number"
            />
            <Button onClick={handleSave} className="bg-blue-500 text-white">
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-lg">{phoneNumber || "No phone number set"}</span>
            <Button onClick={handleEditPhone} className="bg-yellow-500 text-white">
              Edit
            </Button>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="mt-8">
        <Button onClick={handleLogout} className="bg-red-500 text-white">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
