import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setPhoneNumber(JSON.parse(storedUser)?.phoneNumber || ""); // Set the stored phone number if available
    }
  }, []);

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSave = () => {
    // Update user data with the new phone number
    const updatedUser = { ...user, phoneNumber };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser); // Update state
    alert("Phone number updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Settings</h2>

        {/* Avatar and email */}
        <div className="flex items-center mb-6">
          <img
            src={user?.avatar || "/default-avatar.jpg"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <p className="text-lg font-medium">{user?.email}</p>
            <p className="text-sm text-gray-600">Email</p>
          </div>
        </div>

        {/* Phone number editing */}
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="block text-lg font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full bg-blue-600 text-white py-2 rounded-md">
          Save
        </Button>
      </div>
    </div>
  );
};

export default Settings;
