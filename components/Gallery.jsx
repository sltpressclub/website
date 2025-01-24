import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getGalleryData } from "../services";

// Modal component to display the full-screen image
const Modal = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="relative">
        {/* Full-screen image */}
        <img
          src={image}
          alt="Full screen"
          className="max-w-full max-h-screen rounded-lg"
        />
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

// Gallery component
const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image for the modal
  const [dots, setDots] = useState(""); // State for animated dots

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const data = await getGalleryData();
        setGalleries(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // useEffect to animate the dots in "Loading..."
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="container mx-auto p-8 rounded-3xl bg-black bg-opacity-30 hover:bg-opacity-50 hover:-translate-y-1">
      <h1 className="text-white text-xl mb-5 font-semibold">Gallery</h1>
      {loading ? (
        <div className="text-center text-white text-lg">
          Loading{dots} {/* Animated dots */}
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">
          Error loading gallery data: {error}
        </div>
      ) : galleries.length > 0 ? (
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex gap-4">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gray-200 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(gallery.photo.url)} // Open modal with the selected image
              >
                <img
                  src={gallery.photo.url}
                  alt={`Gallery image of ${gallery.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm p-2 rounded">
                  <p>{gallery.name}</p>
                  <p>{new Date(gallery.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-white">No galleries available.</div>
      )}
      <Modal
        isOpen={!!selectedImage}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default Gallery;
