import React, { useState, useEffect } from "react";
import Link from "next/link"; // Importing Next.js Link component for client-side navigation

import { getCategories } from "../services"; // Importing a service function to fetch categories

// Categories Component
const Categories = () => {
  // State to store the list of categories
  const [categories, setCategories] = useState([]);

  // useEffect to fetch categories from the backend when the component mounts
  useEffect(() => {
    getCategories().then((newCategories) => {
      // Updating the state with the fetched categories
      setCategories(newCategories);
    });
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div className="bg-black bg-opacity-30 shadow-lg rounded-3xl p-5 mb-8 hover:bg-opacity-50 transition duration-700 hover:-translate-y-1">
      {/* Container for the categories list with styles for shadow, rounded corners, and hover effects */}

      <h3 className="text-xl mb-4 font-semibold border-b pb-4 text-white">
        {/* Section title for categories with bottom border for separation */}
        Categories
      </h3>

      <div className="">
        {/* Mapping through categories to render each category as a link */}
        {categories.map((category, index) => (
          <Link
            key={index} // Unique key for each list item based on index
            href={`/category/${category.slug}`} // Dynamic link to navigate to the specific category page
            className="inline-block" // Styling to make the link inline-block
          >
            <span
              className={`block p-1 text-gray-300 ml-3 font-semibold cursor-pointer hover:-translate-y-0.5 hover:text-white border-b-2 border-transparent hover:border-white`}
            >
              {/* Individual category name with hover effects for translation, text color, and border */}
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
