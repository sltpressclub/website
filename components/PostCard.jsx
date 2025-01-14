import React from "react";
import moment from "moment"; // For date formatting
import Link from "next/link"; // For navigating between pages in Next.js

// PostCard component - Displays a card for each blog post
const PostCard = ({ post }) => {
  return (
    // Wrapper for each post card with background, padding, and hover effects
    <div className="bg-black bg-opacity-30 shadow-lg rounded-3xl p-0 lg:p-8 pb-12 mb-8 hover:bg-opacity-60 transition duration-700 hover:-translate-y-1">
      {/* Container for the featured image with a fixed height */}
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        {/* Featured image for the post */}
        <img
          src={post.featuredImage.url} // The URL of the featured image
          alt={post.title} // Alt text for the image (post title)
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-2xl rounded-2xl" // Styling for the image
        />
      </div>

      {/* Post title with a link to the full post page */}
      <h1 className="transition duration-500 text-center mb-8 cursor-pointer text-white text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>
          <a>{post.title}</a>
        </Link>{" "}
      </h1>

      {/* Container for post member and date */}
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        {/* Member details section */}
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          {/* Member photo */}
          <img
            src={post.member.photo.url} // URL of the member's photo
            alt={post.member.name} // Alt text for the photo
            height="30px" // Fixed height for the image
            width="30px" // Fixed width for the image
            className="align-middle rounded-full" // Styling to make the photo circular
          />
          {/* Member name */}
          <p className="inline align-middle text-white ml-2 text-lg">
            {post.member.name} {/* Display member's name */}
          </p>
        </div>

        {/* Post creation date */}
        <div className="font-medium text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg" // SVG for a calendar icon
            className="h-6 w-6 inline mr-2 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" // Path for the calendar icon
            />
          </svg>
          <span>{moment(post.createdAt).format("DD MMMM YYYY")}</span>{" "}
          {/* Display post creation date in a formatted string */}
        </div>
      </div>

      {/* Post excerpt (a brief summary of the post) */}
      <p className="text-center text-white font-normal px-4 lg:px-20 mb-8">
        {post.excerpt} {/* Display the excerpt */}
      </p>

      {/* Button to navigate to the full post */}
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <a className="transition duration-700 transform hover:-translate-y-0.5 hover:bg-white inline-block bg-white bg-opacity-50 text-lg font-medium rounded-full px-5 py-2 shadow-lg">
            Continue Reading...
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
