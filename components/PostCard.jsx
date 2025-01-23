import React from "react";
import moment from "moment"; // For date formatting
import Link from "next/link"; // For navigating between pages in Next.js

const PostCard = ({ post }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden m-4">
      {/* Background image for the post */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${post.featuredImage.url})`, // Set image as background
        }}
      ></div>

      {/* Overlay for dimming the image */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content container */}
      <div className="relative p-8 text-white flex flex-col justify-end h-full">
        {/* Post title */}
        <h1 className="text-3xl font-semibold mb-4">
          <Link href={`/post/${post.slug}`}>
            <a className="hover:underline">{post.title}</a>
          </Link>
        </h1>

        {/* Author and date */}
        <div className="flex items-center mb-4 text-sm">
          {/* Author's photo */}
          <img
            src={post.member.photo.url}
            alt={post.member.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          {/* Author's name */}
          <p className="mr-4">{post.member.name}</p>
          {/* Date */}
          <p>{moment(post.createdAt).format("DD MMMM YYYY")}</p>
        </div>

        {/* Excerpt */}
        <p className="mb-6">{post.excerpt}</p>

        {/* Read button */}
        <div>
          <Link href={`/post/${post.slug}`}>
            <a className="transition duration-300 transform hover:-translate-y-1 inline-block bg-white text-black text-sm font-medium rounded-full px-5 py-2 shadow-lg">
              Continue Reading...
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
