import React from "react";

const Mission = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/mission.png')`, // Update the image to a relevant mission-themed image
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative text-center text-white p-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">OUR MISSION</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Empowering individuals through education, innovation, and values to
          shape a brighter future for our community and the world.
        </p>
        <a
          href="/mission"
          className="inline-block bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-6 rounded transition duration-300"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Mission;
