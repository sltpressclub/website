import React, { useState, useEffect } from "react";
import { submitPost } from "../services"; // Service function to handle post submission

const SubmitPost = () => {
  // State to manage form error state
  const [error, setError] = useState(false);

  // State to display a success message upon post submission
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // State to manage form input values
  const [formData, setFormData] = useState({
    nameOfStudent: "",
    storeData: false, // Whether to save data in localStorage
  });

  // useEffect to initialize localStorage and retrieve stored data if available
  useEffect(() => {
    const initialFormData = {
      nameOfStudent: window.localStorage.getItem("nameOfStudent") || "",
      storeData: !!window.localStorage.getItem("nameOfStudent"),
    };
    setFormData(initialFormData); // Populate the form with initial data
  }, []);

  // Handler to update formData state when inputs change
  const onInputChange = (e) => {
    const { target } = e;
    // Handle checkbox input separately
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  // Handler to validate and submit the post form
  const handlePostSubmission = () => {
    setError(false); // Reset error state
    const { nameOfStudent, storeData } = formData;

    // Validate required fields
    if (!nameOfStudent) {
      setError(true); // Show error if name is missing
      return;
    }

    // Create a post object to be submitted
    const postObj = {
      nameOfStudent,
    };

    // Save or remove data from localStorage based on checkbox state
    if (storeData) {
      window.localStorage.setItem("nameOfStudent", nameOfStudent);
    } else {
      window.localStorage.removeItem("nameOfStudent");
    }

    // Submit the post using the service function
    submitPost(postObj).then((res) => {
      if (res.createPost) {
        setFormData({
          nameOfStudent: "",
          storeData: false,
        });
        setShowSuccessMessage(true); // Display success message
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after 3 seconds
        }, 3000);
      }
    });
  };

  return (
    <div className="rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 duration-500 p-8 pb-12 mb-8">
      {/* Container for the post submission form with styling */}
      <h3 className="text-xl text-white mb-8 font-semibold border-b pb-4">
        Submit Your Post
      </h3>
      {/* Name input field */}
      <div className="grid grid-cols-1 mb-4">
        <input
          type="text"
          value={formData.nameOfStudent}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 duration-500 text-white"
          placeholder="Your Name"
          name="nameOfStudent"
        />
      </div>
      {/* Checkbox to store data in localStorage */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            checked={formData.storeData}
            onChange={onInputChange}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className="text-white cursor-pointer ml-2" htmlFor="storeData">
            Save my name for next time I submit a post.
          </label>
        </div>
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
            Post submitted successfully!
          </span>
        )}
      </div>
    </div>
  );
};

export default SubmitPost;
