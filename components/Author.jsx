import React from "react";
import Image from "next/image"; // Import Next.js Image component

import { graphCMSImageLoader } from "../util"; // Custom loader for GraphCMS images

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 transition duration-500">
    {/* Author Image */}
    <div className="absolute left-1/2 transform -translate-x-1/2 -top-14">
      <Image
        loader={graphCMSImageLoader} // Custom loader for GraphCMS images
        alt={`Photo of ${author.name}`} // Improved alt text for accessibility
        width={100}
        height={100}
        className="rounded-full object-cover shadow-lg" // Added shadow for better UI
        src={author.photo.url}
      />
    </div>

    {/* Author Name */}
    <h3 className="text-white mt-16 mb-4 text-xl font-bold">{author.name}</h3>

    {/* Author Bio */}
    <p className="text-white text-lg">{author.bio}</p>
  </div>
);

export default Author;
