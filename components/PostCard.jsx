import React from "react";
import moment from "moment"; // For date formatting
import Link from "next/link"; // For navigating between pages in Next.js

// PostCard component - Displays a card for each blog post
const PostCard = ({ post }) => {
  return (
    <div className="bg-black bg-opacity-30 shadow-lg rounded-3xl p-0 lg:p-8 pb-12 mb-8 hover:bg-opacity-60 transition duration-700 hover:-translate-y-1">
      {/* Featured Image */}
      <div className="relative overflow-hidden rounded-3xl shadow-md pb-[56.25%] mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title} // Better alt text for accessibility
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        />
      </div>

      {/* Post Title */}
      <h1 className="transition duration-500 text-center mb-8 cursor-pointer text-white text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>
          <a className="hover:underline">{post.title}</a>
        </Link>
      </h1>

      {/* Post Author and Date */}
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        {/* Author Details */}
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            src={post.author.photo.url}
            alt={`Photo of ${post.author.name}`} // Improved accessibility
            className="w-10 h-10 rounded-full object-cover" // Rounded and consistent size
          />
          <p className="inline align-middle text-white ml-2 text-lg">
            {post.author.name}
          </p>
        </div>

        {/* Post Date */}
        <div className="font-medium text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{moment(post.createdAt).format("DD MMMM YYYY")}</span>
        </div>
      </div>

      {/* Post Excerpt */}
      <p className="text-center text-white font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>

      {/* Read More Button */}
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <a className="transition duration-700 transform hover:-translate-y-0.5 hover:bg-white inline-block bg-white bg-opacity-50 text-lg font-medium rounded-full px-5 py-2 cursor-pointer shadow-lg">
            Continue Reading...
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
