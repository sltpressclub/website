import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { getCategories } from "../services"; // Import the function to fetch categories

const Footer = () => {
  // State to store the list of categories
  const [categories, setCategories] = useState([]);

  // useEffect to fetch categories when the component mounts
  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <footer className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 text-white mt-8 p-8 rounded-t-3xl">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Column 1 - Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/slt_pressclub_logo.png"
                alt="SLT Pressclub Logo"
                width={48}
                height={48}
                className="rounded-full"
              />
              <h2 className="text-2xl font-semibold">SLT Pressclub</h2>
            </div>
            <p>The Voice of SLTIANS</p>
            <p>Since 1972</p>
            <p>Pride Passion Glory</p>
            <p>We blaze the trail for others to follow.</p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" passHref>
                  <a className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/posts" passHref>
                  <a className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300">
                    All Posts
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/members" passHref>
                  <a className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300">
                    Members
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <a className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <a className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300">
                    Contact Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy" passHref>
                  <a className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms" passHref>
                  <a className="text-gray-400 border-b-2 border-transparent hover:border-white hover:text-white transition duration-300">
                    Terms and Conditions
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <div>
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.slug}`}
                  className="inline-block"
                >
                  <span className="block p-1 text-gray-300 ml-3 font-semibold cursor-pointer hover:-translate-y-0.5 hover:text-white border-b-2 border-transparent hover:border-white">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4 - Follow Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/slt_pressclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.instagram.com/sirleckraz_teelock_academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
