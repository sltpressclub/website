import React, { useState } from "react";
import { submitPost } from "../services";

const SubmitPost = () => {
  const [formData, setFormData] = useState({
    nameOfStudent: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    const { nameOfStudent } = formData;
    if (!nameOfStudent) {
      setError(true);
      return;
    }

    try {
      await submitPost({
        nameOfStudent,
      });
      setSuccess(true);
      setFormData({
        nameOfStudent: "",
      });
    } catch (error) {
      console.error("Error submitting post:", error);
      setError(true);
    }
  };

  return (
    <div className="rounded-xl bg-black bg-opacity-50 hover:bg-opacity-75 p-8 mb-8">
      <h3 className="text-xl text-white mb-6 font-semibold border-b pb-4">
        Submit Your Post
      </h3>
      {error && <p className="text-red-500">Name of student is required.</p>}
      {success && (
        <p className="text-green-500">Post submitted successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="nameOfStudent"
          value={formData.nameOfStudent}
          onChange={handleChange}
          placeholder="Your Name"
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />

        <button
          type="submit"
          className="bg-pink-600 text-white p-3 rounded hover:bg-pink-700"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default SubmitPost;
