import React, { useState } from "react";

const JournalForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    place: string;
    state: string;
    country: string;
    description: string;
    image: File | null;
  }>({
    place: "",
    state: "",
    country: "",
    description: "",
    image: null,
  });

  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your submission logic here
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">
        {currentStep === 1
          ? "Step 1: Place, State, Country"
          : currentStep === 2
          ? "Step 2: Description"
          : "Step 3: Add Image"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4"
      >
        {currentStep === 1 && (
          <>
            {/* Place */}
            <div>
              <label htmlFor="place" className="block text-gray-700 font-medium mb-2">
                Place
              </label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                placeholder="Enter the place name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter the state"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Enter the country"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write a short description"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                Add an Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}

        <div className="flex justify-between items-center mt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
            >
              Previous
            </button>
          )}

          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            {currentStep < 3 ? "Next" : "Save Entry"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalForm;
