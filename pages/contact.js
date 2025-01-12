import React, { useState } from "react";
import Head from "next/head"; // Import for setting meta tags and title
import emailjs from "emailjs-com"; // For sending emails

const Contact = () => {
  // State to manage form input data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to track submission status and messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Indicate submission in progress
    setSuccessMessage(""); // Clear previous success message
    setErrorMessage(""); // Clear previous error message

    // Validate form fields
    if (!formData.name || !formData.email || !formData.message) {
      setIsSubmitting(false);
      setErrorMessage("Please fill in all fields."); // Show error if fields are empty
      return;
    }

    try {
      // Send email using emailjs
      const response = await emailjs.send(
        "service_n7zsp9d", // Your emailjs service ID
        "template_9vt97tx", // Your emailjs template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "xH2VahfK-p1_ntOM2" // Your emailjs public key
      );

      if (response.status === 200) {
        setSuccessMessage("Your message has been sent successfully!"); // Display success message
        setFormData({ name: "", email: "", message: "" }); // Reset form fields
      } else {
        setErrorMessage("Failed to send message. Please try again later."); // Handle failure response
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage(`Failed to send message: ${error.message}`); // Handle error in sending email
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  return (
    <div>
      {/* Page container */}
      <div className="flex flex-col min-h-screen bg-transparent">
        {/* Page Head Section */}
        <Head>
          <title>Contact Us - SLT Pressclub</title> {/* Page title */}
          <link rel="icon" href="/slt_pressclub_logo.png" /> {/* Favicon */}
        </Head>

        {/* Contact Content Section */}
        <div className="container mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Contact Us</h2>
            <p className="text-lg text-white mt-4">
              We'd love to hear from you! Please fill out the form below.
            </p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-500 p-8 rounded-3xl space-y-6"
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-white mb-4"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-white w-full p-4 border border-transparent rounded-2xl bg-black bg-opacity-30 hover:bg-opacity-75 hover:-translate-y-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-4"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-white w-full p-4 border border-transparent rounded-2xl bg-black bg-opacity-30 hover:bg-opacity-75 hover:-translate-y-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white mb-4"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="text-white w-full p-4 border border-transparent rounded-2xl bg-black bg-opacity-30 hover:bg-opacity-75 hover:-translate-y-1 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600"
                } text-white py-2 px-8 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-6 text-green-600 text-center">
                {successMessage}
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-6 text-red-600 text-center">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
