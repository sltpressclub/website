import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable"; // Import swipeable hook
import { getQuotes } from "../services"; // Import the function to fetch quote data

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current visible quote
  const [isSwiping, setIsSwiping] = useState(false); // Animation lock during swipe

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
    if (!isSwiping) {
      setIsSwiping(true);
      setTimeout(() => setIsSwiping(false), 300);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (!isSwiping) {
      setIsSwiping(true);
      setTimeout(() => setIsSwiping(false), 300);
      setCurrentIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Handlers for swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) {
    return <p className="text-center text-gray-500">Loading quotes...</p>;
  }

  if (!quotes.length) {
    return <p className="text-center text-gray-500">No quotes available.</p>;
  }

  return (
    <div
      className="container mx-auto px-4 py-8 flex justify-center items-center"
      {...handlers} // Apply swipe handlers to the main container
    >
      <div className="relative w-[400px] h-[500px]">
        {/* Arrow Buttons for Desktop */}
        <button
          onClick={handlePrev}
          className="hidden md:block absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full opacity-70 hover:opacity-100 z-10"
        >
          &lt;
        </button>

        {/* Quote Card */}
        <div
          className={`absolute inset-0 bg-gray-800 bg-opacity-50 text-white p-6 rounded-lg shadow-md flex justify-center items-center text-center transition-transform duration-300 ${
            isSwiping ? "transform scale-95 opacity-50" : ""
          }`}
          style={{
            transform: `translateX(${isSwiping ? "-50%" : "0"})`,
          }}
        >
          <p className="text-3xl font-semibold italic">
            "{quotes[currentIndex].quote}"
          </p>
        </div>

        {/* Arrow Buttons for Desktop */}
        <button
          onClick={handleNext}
          className="hidden md:block absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full opacity-70 hover:opacity-100 z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Quotes;
