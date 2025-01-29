import React, { useState, useEffect, useRef } from "react";
import { getQuotes } from "../services";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(""); // State for animated dots
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

  // useEffect to animate the dots in "Loading..."
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

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
    if (scrollRef.current) {
      handleScroll();
    }
  }, [quotes]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading{dots}</p>;
  }

  if (!quotes.length) {
    return <p className="text-center text-gray-500">No quotes available.</p>;
  }

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/quote.jpg')" }} // Background Image
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Title Section */}
      <div className="relative text-center mb-6">
        <h4 className="text-4xl font-bold text-white inline-block pb-2">
          Quotes
        </h4>
      </div>

      {/* Quote Carousel */}
      <div
        className="relative flex gap-6 overflow-x-auto no-scrollbar scroll-smooth z-10 px-4 py-6"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gray-200 rounded-2xl overflow-hidden group cursor-pointer"
            style={{
              transform: index === 0 ? "scale(1)" : "scale(0.85)",
              opacity: index === 0 ? 1 : 0.6,
            }}
          >
            <div className="w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              {/* Quote Text */}
              <p className="text-xl font-semibold italic text-center text-white p-6">
                "{quote.quote}"
              </p>
            </div>
            <div className="absolute bottom-2 right-2 text-white text-sm p-2 rounded bg-black bg-opacity-50">
              <p>- {quote.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
