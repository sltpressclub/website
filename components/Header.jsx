import React from "react";
import Link from "next/link"; // Importing Link from Next.js for client-side navigation
<<<<<<< HEAD
import Image from "next/image"; // Importing Image from Next.js for optimized image loading
=======
>>>>>>> aa30bf4946ae6a7d022f666372deb979c004d831
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
<<<<<<< HEAD
            <Link href="/" passHref>
              <a className="flex items-center">
                {/* Logo image */}
                <Image
                  src="/slt_pressclub_logo.png" // Path to the logo image
                  alt="SLT Press Club Logo" // Alt text for accessibility
                  width={50} // Explicit width for the image
                  height={50} // Explicit height for the image
                  className="mr-2 rounded-full" // Optional styling for the image
                  priority // Ensures the image loads quickly as it's in the header
                />
              </a>
            </Link>
            {/* Title with link to the home page */}
            <Link href="/" passHref>
              <a className="cursor-pointer font-bold text-3xl text-white">
                {/* Title text */}
                SLT PRESSCLUB
              </a>
=======
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
>>>>>>> aa30bf4946ae6a7d022f666372deb979c004d831
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
