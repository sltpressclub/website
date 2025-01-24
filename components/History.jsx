import React from "react";

const History = () => {
  return (
    <div
      className="relative w-screen bg-cover bg-center flex items-center justify-center rounded-3xl"
      style={{
        backgroundImage: `url('/history.png')`,
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative text-center text-white p-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">OUR HISTORY</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Discover the journey of our institution and how we grew to become a
          cornerstone of excellence in education.
        </p>
        <a
          href="/history"
          className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-3xl transition duration-300"
        >
          View History
        </a>
      </div>
    </div>
  );
};

export default History;
