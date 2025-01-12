import React from "react";
import Link from "next/link"; // Importing Link from Next.js for client-side navigation
import SearchBar from "../components/SearchBar"; // Importing the SearchBar component

// Header Component
const Header = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      {/* Header container with spacing and styling */}
      <div className="w-full inline-block border-b border-gray-100 py-4">
        {/* Flexbox for aligning elements horizontally */}
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center">
            {/* Logo with link to the home page */}
            <Link href="/">
              {/* Logo image */}
              <img
                src="/slt_pressclub_logo.png" // Path to the logo image
                alt="SLT Press Club Logo" // Alt text for accessibility
                height="50px" // Explicit height for the image
                width="50px" // Explicit width for the image
                className="mr-2" // Margin to create space between the logo and title
              />
            </Link>
            {/* Title with link to the home page */}
            <Link href="/">
              <span className="cursor-pointer font-bold text-3xl text-white">
                {/* Title text */}
                SLT PRESSCLUB
              </span>
            </Link>
          </div>

          {/* Search Bar Section */}
          <div className="ml-4">
            {/* Including the SearchBar component */}
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
