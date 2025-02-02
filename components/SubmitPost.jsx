import { useState } from "react";

const SubmitPost = () => {
  const [formData, setFormData] = useState({
    nameOfStudent: "",
    class: "",
    email: "",
    phoneNumber: "",
    whatsapp: "",
    title: "",
    slug: "",
    content: "",
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Upload the featured image first
      const imageUploadResponse = await uploadFeaturedImage(featuredImage);

      // Check if image upload response contains URL
      if (!imageUploadResponse.url) {
        throw new Error("Failed to upload image");
      }

      const { url: imageUrl } = imageUploadResponse;

      // Send the post data with the image URL
      const response = await fetch("/api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, featuredImage: imageUrl }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error creating post");
      }

      const result = await response.json();

      setSuccess(true);
      setFormData({
        nameOfStudent: "",
        class: "",
        email: "",
        phoneNumber: "",
        whatsapp: "",
        title: "",
        slug: "",
        content: "",
      });
      setFeaturedImage(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadFeaturedImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Replace with your preset

    try {
      const response = await fetch("YOUR_IMAGE_UPLOAD_URL", {
        // Replace with your upload URL
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error("Failed to upload image: " + err.message);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nameOfStudent"
          value={formData.nameOfStudent}
          onChange={handleChange}
          placeholder="Name of Student"
          required
        />
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          placeholder="Class"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp"
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug"
          required
        />
        <input
          type="file"
          name="featuredImage"
          onChange={handleImageChange}
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          required
        ></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Post"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Post created successfully!</p>}
    </div>
  );
};

export default SubmitPost;
