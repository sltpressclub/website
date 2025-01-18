import React, { useEffect, useState } from "react";
import { getQuotes } from "../services"; // Import the function to fetch quote data

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for data fetch

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading quotes...</p>;
  }

  if (!quotes.length) {
    return <p className="text-center text-gray-500">No quotes available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto whitespace-nowrap">
        {/* Container for the carousel */}
        <div className="flex gap-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="relative flex-shrink-0 w-64 h-64 bg-gray-100 rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <p className="text-xl font-semibold italic">"{quote.quote}"</p>
              <p className="text-sm text-gray-600">- {quote.name}</p>
              <p className="text-xs text-gray-400">
                {new Date(quote.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
