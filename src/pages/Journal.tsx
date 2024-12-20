import React, { useState } from "react";
import axios from 'axios';

const JournalForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    place: string;
    state: string;
    country: string;
    description: string;
    images: File[];
  }>({
    place: "",
    state: "",
    country: "",
    description: "",
    images: [],
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getAuthToken = () => {
    return localStorage.getItem('fddd912691dd71a45f0287146a8e5c3658b6d8944150c6028fbb416469ef7313b1a1d7504418235ca9e48c5184b3d0970cc0358da059665833078355c2e7dc9beab007f636dc643c06502683ea9f55cb3ad0809aee71515dd8ab7fa81ff1e66c08a32924d1ade60b097ecd8e54bc70e9e66ad43288d685814ea480eade17d471');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    } else {
      console.log('No files selected');
    }
  };
  


  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      // Upload the images
      let imageUrls = [];
      for (const image of formData.images) {
        const imageFormData = new FormData();
        imageFormData.append('files', image);

        const imageResponse = await axios.post(
          "http://localhost:1337/api/upload",
          imageFormData,
          {
            headers: {
              'Key': getAuthToken(),
            },
          }
        );

        if (imageResponse.data && imageResponse.data[0]) {
          imageUrls.push(imageResponse.data[0].id);
        }
      }

      // Create the journal entry
      const journalData = {
        data: {
          place: formData.place,
          state: formData.state,
          country: formData.country,
          description: formData.description,
          images: imageUrls.length > 0 ? imageUrls : undefined,
        },
      };

      const response = await axios.post(
        "http://localhost:1337/api/journals",
        journalData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Journal entry created:", response.data);

      // Reset form after successful submission
      setFormData({
        place: "",
        state: "",
        country: "",
        description: "",
        images: [],
      });
      setCurrentStep(1);

      // Optional: Show success message
      alert("Journal entry created successfully!");
    } catch (error) {
      console.error("Error creating journal entry:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error?.message || "Error creating journal entry");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Basic validation
    if (currentStep === 1 && (!formData.place || !formData.country)) {
      setError("Please fill in all required fields");
      return;
    }
    if (currentStep === 2 && !formData.description) {
      setError("Please add a description");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
      setError("");
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setError("");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: 'url(/bgg.jpg)' }}
    >
      <h1 className="text-3xl font-bold mb-6">
        {currentStep === 1
          ? "Step 1: Place, State, Country"
          : currentStep === 2
          ? "Step 2: Description"
          : "Step 3: Add Images"}
      </h1>

      {error && (
        <div className="w-full max-w-md mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
        {currentStep === 1 && (
          <>
            <div className="text-black">
              <label htmlFor="place" className="block text-gray-700 font-medium mb-2">
                Place *
              </label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleInputChange}
                placeholder="Enter the place name"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="text-black">
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

            <div className="text-black">
              <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Enter the country"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <div className="text-black">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write a short description"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <label
              htmlFor="images"
              className="block text-gray-700 font-medium mb-2"
            >
              Add Images
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected preview ${index}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
              disabled={isSubmitting}
            >
              Previous
            </button>
          )}

          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : currentStep < 3
              ? "Next"
              : "Save Entry"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;
