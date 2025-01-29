import React, { useState, useEffect } from "react";
import { getQuotes } from "../services";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuotes();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading quotes...</p>;
  }

  if (!quotes.length) {
    return <p className="text-center text-gray-500">No quotes available.</p>;
  }

  return (
    <div
      className="relative w-full  flex flex-col justify-center items-center bg-transparent" // Reduced vertical padding
    >
      {/* Title Section */}
      <div className="relative text-center mb-4 z-10">
        {" "}
        {/* Reduced margin-bottom */}
        <h4 className="text-4xl font-bold text-white inline-block pb-2">
          Quotes
        </h4>
      </div>

      {/* Quote Carousel (Horizontal Scroll) */}
      <div className="relative w-full overflow-x-auto px-4 py-2 z-10">
        {" "}
        {/* Reduced padding */}
        <div className="flex gap-4">
          {" "}
          {/* Reduced gap between quotes */}
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[250px] h-[250px] bg-cover bg-center text-white p-4 rounded-2xl transform transition-transform duration-300 flex items-center justify-center"
              style={{ backgroundImage: "url('/quote.jpg')" }} // Each quote background
            >
              <p className="text-xl font-semibold italic text-center">
                "{quote.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
