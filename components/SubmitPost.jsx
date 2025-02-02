import React, { useState } from "react";
import { submitPost } from "../services"; // Service function to handle post submission

// SubmitPost Component
const SubmitPost = () => {
  // State to manage form error state
  const [error, setError] = useState(false);

  // State to display success message upon post submission
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // State to manage form input value
  const [formData, setFormData] = useState({
    nameOfStudent: "",
  });

  // Handler to update formData state when input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler to validate and submit the form
  const handlePostSubmission = () => {
    setError(false); // Reset error state
    const { nameOfStudent } = formData;

    // Validate required fields
    if (!nameOfStudent) {
      setError(true); // Show error if field is missing
      return;
    }

    // Create post object to be submitted
    const postObj = {
      nameOfStudent,
    };

    // Submit the post using the service function
    submitPost(postObj)
      .then((res) => {
        if (res.createPost) {
          setFormData({ nameOfStudent: "" }); // Clear input field upon successful submission
          setShowSuccessMessage(true); // Display success message
          setTimeout(() => {
            setShowSuccessMessage(false); // Hide success message after 3 seconds
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Post submission failed:", error);
      });
  };

  return (
    <div className="rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 duration-500 p-8 pb-12 mb-8">
      <h3 className="text-xl text-white mb-8 font-semibold border-b pb-4">
        Submit Your Post
      </h3>
      {/* Name input field */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          value={formData.nameOfStudent}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 duration-500 text-white"
          placeholder="Student Name"
          name="nameOfStudent"
        />
      </div>

      {/* Error message if validation fails */}
      {error && <p className="text-xs text-red-500">Name is required</p>}

      {/* Submit button and success message */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Submit Post
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Post submitted successfully
          </span>
        )}
      </div>
    </div>
  );
};

export default SubmitPost;
