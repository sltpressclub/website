import React, { useState, useEffect } from "react";
import { submitComment } from "../services"; // Service function to handle comment submission

// CommentsForm Component
const CommentsForm = ({ slug }) => {
  // State to manage form error state
  const [error, setError] = useState(false);

  // State to manage localStorage object
  const [localStorage, setLocalStorage] = useState(null);

  // State to display a success message upon comment submission
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // State to manage form input values
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false, // Whether to save data in localStorage
  });

  // useEffect to initialize localStorage and retrieve stored data if available
  useEffect(() => {
    setLocalStorage(window.localStorage); // Set the localStorage object
    const initalFormData = {
      name: window.localStorage.getItem("name"), // Retrieve stored name
      email: window.localStorage.getItem("email"), // Retrieve stored email
      storeData: !!(
        window.localStorage.getItem("name") ||
        window.localStorage.getItem("email")
      ), // Set checkbox state based on stored data
    };
    setFormData(initalFormData); // Populate the form with initial data
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

  // Handler to validate and submit the comment form
  const handlePostSubmission = () => {
    setError(false); // Reset error state
    const { name, email, comment, storeData } = formData;

    // Validate required fields
    if (!name || !email || !comment) {
      setError(true); // Show error if any field is missing
      return;
    }

    // Create a comment object to be submitted
    const commentObj = {
      name,
      email,
      comment,
      slug, // Associate the comment with the current post
    };

    // Save or remove data from localStorage based on checkbox state
    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    // Submit the comment using the service function
    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        // Clear the comment field upon successful submission
        formData.comment = "";
        if (!storeData) {
          formData.name = "";
          formData.email = "";
        }
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true); // Display success message
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after 3 seconds
        }, 3000);
      }
    });
  };

  return (
    <div className="rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 duration-500 p-8 pb-12 mb-8">
      {/* Container for the comments form with styling */}
      <h3 className="text-xl text-white mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      {/* Comment input field */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className="p-4 outline-none w-full h-40 focus:ring-2 focus:ring-gray-200 rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 text-white"
          name="comment"
          placeholder="Comment"
        />
      </div>
      {/* Name and Email input fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={formData.name}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 duration-500 text-white"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 duration-500 text-white"
          placeholder="Email"
          name="email"
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
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {/* Error message if validation fails */}
      {error && (
        <p className="text-xs text-red-500">All fields are mandatory</p>
      )}
      {/* Submit button and success message */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
