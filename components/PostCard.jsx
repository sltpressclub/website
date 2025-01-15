import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { graphCMSImageLoader } from "../util"; // Assuming a custom loader for GraphCMS images

const PostCard = ({ post }) => {
  // Ensure all required data exists
  if (!post) {
    return null; // Avoid rendering if post is undefined or null
  }

  const { member, featuredImage, title, slug, createdAt, excerpt } = post;

  // Log post data to the console
  console.log("Post Data: ", post);

  return (
    <div className="bg-black bg-opacity-30 shadow-lg rounded-3xl p-0 lg:p-8 pb-12 mb-8 hover:bg-opacity-60 transition duration-700 hover:-translate-y-1">
      {/* Featured Image */}
      {featuredImage?.url ? (
        <div className="relative overflow-hidden rounded-3xl shadow-md pb-[56.25%] mb-6">
          <Image
            loader={graphCMSImageLoader} // Use custom GraphCMS image loader
            src={featuredImage.url}
            alt={title || "Featured Image"} // Improved alt text for accessibility
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
      ) : (
        <div className="relative pb-[56.25%] mb-6 bg-gray-300 rounded-3xl">
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            No Image Available
          </span>
        </div>
      )}

      {/* Post Title */}
      <h1 className="transition duration-500 text-center mb-8 cursor-pointer text-white text-3xl font-semibold">
        <Link href={`/post/${slug}`}>
          <a className="hover:underline">{title || "Untitled Post"}</a>{" "}
          {/* Fallback for title */}
        </Link>
      </h1>

      {/* Post Member and Date */}
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        {/* Member Details */}
        {member?.name && member?.photo?.url ? (
          <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <Image
              loader={graphCMSImageLoader}
              src={member.photo.url}
              alt={`Photo of ${member.name}`} // Improved accessibility
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <p className="inline align-middle text-white ml-2 text-lg">
              {member.name}
            </p>
          </div>
        ) : (
          <div className="mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <span className="text-white text-lg">Unknown Member</span>
          </div>
        )}

        {/* Post Date */}
        {createdAt ? (
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
            <span>{moment(createdAt).format("DD MMMM YYYY")}</span>
          </div>
        ) : (
          <div className="font-medium text-white">Date Unknown</div>
        )}
      </div>

      {/* Post Excerpt */}
      <p className="text-center text-white font-normal px-4 lg:px-20 mb-8">
        {excerpt || "No excerpt available."}
      </p>

      {/* Read More Button */}
      <div className="text-center">
        <Link href={`/post/${slug}`}>
          <a className="transition duration-700 transform hover:-translate-y-0.5 hover:bg-white inline-block bg-white bg-opacity-50 text-lg font-medium rounded-full px-5 py-2 cursor-pointer shadow-lg">
            Continue Reading...
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
