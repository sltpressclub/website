import React, { useState, useEffect } from "react";
import { submitPost } from "../services"; // Service function to handle post submission

const SubmitPost = () => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    nameOfStudent: "",
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData = {
      nameOfStudent: window.localStorage.getItem("nameOfStudent") || "",
      storeData: !!window.localStorage.getItem("nameOfStudent"),
    };
    setFormData(initialFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handlePostSubmission = () => {
    setError(false);
    const { nameOfStudent, storeData } = formData;

    if (!nameOfStudent) {
      setError(true);
      return;
    }

    if (storeData) {
      localStorage.setItem("nameOfStudent", nameOfStudent);
    } else {
      localStorage.removeItem("nameOfStudent");
    }

    submitPost({ nameOfStudent }).then((res) => {
      if (res.createPost) {
        setFormData({ nameOfStudent: "", storeData: false });
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    });
  };

  return (
    <div className="rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 duration-500 p-8 pb-12 mb-8">
      <h3 className="text-xl text-white mb-8 font-semibold border-b pb-4">
        Submit Student Name
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          value={formData.nameOfStudent}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 duration-500 text-white"
          placeholder="Enter Student Name"
          name="nameOfStudent"
        />
      </div>
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
            Save this name for future submissions.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">Student name is required</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Submit Name
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Name submitted successfully!
          </span>
        )}
      </div>
    </div>
  );
};

export default SubmitPost;
