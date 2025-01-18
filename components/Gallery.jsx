import React, { useEffect, useState } from "react";
import { getGalleryData } from "../../services"; // Import the function to fetch gallery data

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);

  // Fetch gallery data on component mount
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-4">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="relative flex-shrink-0 w-64 h-64 bg-gray-200 rounded-lg overflow-hidden"
            >
              <img
                src={gallery.imageUrl}
                alt={gallery.name}
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
    </div>
  );
};

export default Gallery;
