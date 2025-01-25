import React, { useState, useEffect, useRef } from "react";
import { getQuotes } from "../services";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

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

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollPosition = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth;
    const cards = scrollRef.current.children;

    Array.from(cards).forEach((card, index) => {
      const cardCenter =
        card.offsetLeft + card.offsetWidth / 2 - scrollPosition;
      const distance = Math.abs(cardCenter - cardWidth / 2);

      const scale = Math.max(0.85, 1 - distance / 500); // Adjust zoom effect
      card.style.transform = `scale(${scale})`;
      card.style.opacity = `${Math.max(0.5, scale)}`;
    });
  };

  useEffect(() => {
    // Trigger scroll effect on initial render
    if (scrollRef.current) {
      handleScroll();
    }
  }, [quotes]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading quotes...</p>;
  }

  if (!quotes.length) {
    return <p className="text-center text-gray-500">No quotes available.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white inline-block relative pb-2">
          Quotes
          <span className="absolute bottom-0 left-1/2 w-full h-1 bg-white opacity-50 transform -translate-x-1/2 hover:opacity-75 hover:bg-black transition-all duration-300"></span>
        </h2>
      </div>

      {/* Quote Carousel */}
      <div
        className="flex gap-4 overflow-x-scroll no-scrollbar scroll-smooth"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[300px] h-[400px] bg-black bg-opacity-50 text-white p-6 rounded-3xl shadow-lg transform transition-transform duration-300 flex items-center justify-center"
            style={{
              transform: index === 0 ? "scale(1)" : "scale(0.85)", // Initial zoom effect
              opacity: index === 0 ? 1 : 0.5,
            }}
          >
            <p className="text-3xl font-semibold italic text-center">
              "{quote.quote}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
