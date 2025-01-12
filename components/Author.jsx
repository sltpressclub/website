import React from "react";
import Image from "next/image"; // Import Next.js Image component

import { grpahCMSImageLoader } from "../util"; // Assuming this loader is custom for GraphCMS images

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 duration-500">
    {/* Author image */}
    <div className="absolute left-1/2 transform -translate-x-1/2 -top-14">
      <Image
        loader={grpahCMSImageLoader} // Custom loader for GraphCMS images
        alt={author.name} // Alt text for accessibility
        width={100} // Set appropriate width for the image
        height={100} // Set appropriate height for the image (keep it square for a circular effect)
        className="align-middle rounded-full" // Style to make the image circular
        src={author.photo.url} // Source URL for the image
      />
    </div>
    {/* Author name and bio */}
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-lg">{author.bio}</p>{" "}
    {/* Correct the typo in "text-ls" to "text-lg" */}
  </div>
);

export default Author;
