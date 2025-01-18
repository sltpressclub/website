import React, { useEffect, useState } from "react";
import { getQuote } from "../services"; // Import the function to fetch quote data

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
      <div className="space-y-4">
        {quotes.map((quote) => (
          <div key={quote.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-xl font-semibold italic">"{quote.quote}"</p>
            <p className="text-sm text-gray-600">- {quote.name}</p>
            <p className="text-xs text-gray-400">
              {new Date(quote.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quote;
