import React, { useEffect, useState } from "react";
import { getQuotes } from "../services"; // Import the function to fetch quote data

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current visible quote

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuotes();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading quotes...</p>;
  }

  if (!quotes.length) {
    return <p className="text-center text-gray-500">No quotes available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="relative flex items-center justify-center">
        {/* Button for Previous Quote */}
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-gray-800 text-white px-4 py-2 rounded-full opacity-70 hover:opacity-100"
        >
          &lt;
        </button>

        {/* Quote Display */}
        <div className="w-96 h-auto mx-4 bg-gray-800 bg-opacity-50 text-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold italic mb-4">
            "{quotes[currentIndex].quote}"
          </p>
          <p className="text-sm text-gray-300">- {quotes[currentIndex].name}</p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(quotes[currentIndex].createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Button for Next Quote */}
        <button
          onClick={handleNext}
          className="absolute right-0 bg-gray-800 text-white px-4 py-2 rounded-full opacity-70 hover:opacity-100"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Quotes;
