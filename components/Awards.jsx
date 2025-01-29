import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getAwardsData } from "../services"; // Import the query function

// Modal component to display the full-screen image and more details
const Modal = ({ isOpen, onClose, award }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="relative p-6 bg-white rounded-3xl w-11/12 max-w-4xl">
        {/* Full-screen image */}
        <img
          src={award.photo.url}
          alt={award.name}
          className="w-full h-[400px] object-cover rounded-3xl"
        />
        <div className="text-center mt-4">
          <h3 className="text-2xl font-bold">{award.name}</h3>
          <p className="text-lg text-gray-600 mt-2">{award.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            Date: {new Date(award.date).toLocaleDateString()}
          </p>
        </div>
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

// Awards component
const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null); // Track the selected award for the modal

  useEffect(() => {
    const fetchAwardsData = async () => {
      try {
        const data = await getAwardsData(); // Fetch data using the query function
        setAwards(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAwardsData();
  }, []);

  const closeModal = () => setSelectedAward(null);

  if (loading) {
    return <p className="text-center text-gray-500">Loading awards...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">{`Error loading awards: ${error}`}</p>
    );
  }

  if (!awards.length) {
    return <p className="text-center text-gray-500">No awards available.</p>;
  }

  return (
    <div className="container mx-auto p-4 rounded-3xl">
      {/* Title Section */}
      <div className="text-center mb-6">
        <h4 className="text-4xl font-bold text-white inline-block relative pb-2">
          Awards
        </h4>
      </div>

      {/* Award Carousel */}
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-6 lg:gap-10">
          {awards.map((award) => (
            <div
              key={award.slug}
              className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gray-200 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedAward(award)} // Open modal with the selected award details
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${award.photo.url})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-bold">{award.name}</h3>
                  <p className="text-white text-sm">
                    {new Date(award.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedAward}
        onClose={closeModal}
        award={selectedAward}
      />
    </div>
  );
};

export default Awards;
