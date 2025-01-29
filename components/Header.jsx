import React, { useState } from "react";
import Link from "next/link"; // Importing Link for client-side navigation
import Image from "next/image"; // Importing Image for optimized loading
import { FaBars } from "react-icons/fa"; // Importing the hamburger icon from react-icons
import { AiOutlineClose } from "react-icons/ai"; // Close icon for the menu
import SearchBar from "../components/SearchBar"; // Importing the SearchBar component

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      // Disable body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable body scroll when menu is closed
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div className="container mx-auto px-10 mb-8">
      {/* Header container */}
      <div className="w-full inline-block border-b border-gray-100 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center">
            {/* Logo - Hidden on small screens */}
            <Link href="/" passHref>
              <a className="hidden sm:flex items-center">
                <Image
                  src="/slt_pressclub_logo.png"
                  alt="SLT Press Club Logo"
                  width={50}
                  height={50}
                  className="mr-2 rounded-full"
                  priority
                />
              </a>
            </Link>
            {/* Title */}
            <Link href="/" passHref>
              <a className="cursor-pointer font-bold text-3xl text-white">
                SLT PRESSCLUB
              </a>
            </Link>
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              {isMenuOpen ? <AiOutlineClose /> : <FaBars />}
            </button>
          </div>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden sm:block ml-4">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-black bg-opacity-90 text-white w-full h-full flex flex-col items-center justify-start pt-6">
            {/* Close Button and Search Bar */}
            <div className="w-full px-4 flex justify-between items-center mb-6">
              <button onClick={toggleMenu} className="text-white text-3xl">
                <AiOutlineClose />
              </button>
              {/* Search Bar at the top */}
              <div className="w-full">
                <SearchBar />
              </div>
            </div>

            {/* Menu Links */}
            <ul className="w-full text-center space-y-6">
              <li>
                <Link href="/" passHref>
                  <a
                    onClick={toggleMenu}
                    className="text-xl font-bold hover:text-gray-400"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/members" passHref>
                  <a
                    onClick={toggleMenu}
                    className="text-xl font-bold hover:text-gray-400"
                  >
                    Members
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <a
                    onClick={toggleMenu}
                    className="text-xl font-bold hover:text-gray-400"
                  >
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <a
                    onClick={toggleMenu}
                    className="text-xl font-bold hover:text-gray-400"
                  >
                    Contact Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy" passHref>
                  <a
                    onClick={toggleMenu}
                    className="text-xl font-bold hover:text-gray-400"
                  >
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms" passHref>
                  <a
                    onClick={toggleMenu}
                    className="text-xl font-bold hover:text-gray-400"
                  >
                    Terms and Conditions
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
