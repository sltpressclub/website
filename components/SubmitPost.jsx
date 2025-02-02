import React, { useState } from "react";
import { submitPost } from "../services";

const SubmitPost = () => {
  const [formData, setFormData] = useState({
    nameOfStudent: "",
    class: "",
    email: "",
    phoneNumber: "",
    whatsapp: "",
    title: "",
    slug: "",
    excerpt: "",
    featuredImage: null, // ✅ File instead of text
    content: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: e.target.files[0], // ✅ Store file object
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    const {
      nameOfStudent,
      class: studentClass,
      email,
      title,
      slug,
      excerpt,
      featuredImage,
      content,
    } = formData;
    if (
      !nameOfStudent ||
      !studentClass ||
      !email ||
      !title ||
      !slug ||
      !excerpt ||
      !featuredImage ||
      !content
    ) {
      setError(true);
      return;
    }

    try {
      await submitPost({
        ...formData,
        content: { raw: formData.content }, // ✅ Wrap content in { raw: content }
      });
      setSuccess(true);
      setFormData({
        nameOfStudent: "",
        class: "",
        email: "",
        phoneNumber: "",
        whatsapp: "",
        title: "",
        slug: "",
        excerpt: "",
        featuredImage: null,
        content: "",
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
      {error && <p className="text-red-500">All fields are required.</p>}
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
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          placeholder="Your Class"
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Your Phone Number (Optional)"
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />
        <input
          type="text"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="Your WhatsApp (Optional)"
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Post Title"
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug (Unique identifier, e.g., post-title)"
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />
        <input
          type="text"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Short Summary of the Post"
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />

        {/* ✅ Image Upload Field */}
        <input
          type="file"
          name="featuredImage"
          onChange={handleChange}
          className="p-2 rounded bg-black bg-opacity-50 text-white"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your post content here..."
          className="p-2 rounded bg-black bg-opacity-50 text-white h-40"
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
