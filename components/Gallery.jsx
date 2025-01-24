import React, { useEffect, useState } from "react";
import { getGalleryData } from "../services"; // Import the function to fetch gallery data

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image for full-screen view

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGalleryData();
        setGalleries(data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchData();
  }, []);

  if (!galleries.length) {
    return <p className="text-center text-gray-500">No galleries available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 rounded-3xl bg-black bg-opacity-30 hover:bg-opacity-50 hover:-translate-y-1">
      {/* Gallery grid */}
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-4">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gray-200 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(gallery.photo.url)} // Set the selected image on click
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

      {/* Full-screen modal for the selected image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          {/* Full-screen image */}
          <div className="relative">
            <img
              src={selectedImage}
              alt="Full screen"
              className="max-w-full max-h-screen rounded-lg"
            />
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 shadow-lg hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
