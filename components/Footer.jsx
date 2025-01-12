import React from "react";
import { FaInstagram } from "react-icons/fa"; // Importing the Instagram icon from react-icons

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 text-white mt-8 p-8 rounded-t-3xl">
      {/* Outer container for the footer */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Grid layout for footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Column 1 - Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              {/* Logo image */}
              <img
                src="/slt_pressclub_logo.png" // Path to the logo image
                alt="Logo" // Alt text for accessibility
                className="w-12 h-12" // Logo dimensions
              />
              {/* Website name */}
              <h2 className="text-2xl font-semibold">SLT Pressclub</h2>
            </div>
            {/* Description about the press club */}
            <p>The Voice of SLTIANS</p>
            <p>Since 1972</p>
            <p>Pride Passion Glory</p>
            <p>We blaze the trail for others to follow.</p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            {/* List of navigation links */}
            <ul className="space-y-2">
              <li>
                <a
                  href="/" // Link to the Home page
                  className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about" // Link to the About Us page
                  className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact" // Link to the Contact Us page
                  className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy" // Link to the Privacy Policy page
                  className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Social Media Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            {/* Social media icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/slt_pressclub/" // Instagram profile link
                target="_blank" // Opens the link in a new tab
                rel="noopener noreferrer" // Improves security when using target="_blank"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
              >
                <FaInstagram size={24} /> {/* Instagram icon */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;