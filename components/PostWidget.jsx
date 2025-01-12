import React, { useState, useEffect } from "react";
import moment from "moment"; // For date formatting
import Link from "next/link"; // For navigation between pages in Next.js
import Image from "next/image"; // For optimized images in Next.js

import { getRecentPosts } from "../services"; // Importing the service to fetch recent posts

const PostWidget = () => {
  const [recentPosts, setRecentPosts] = useState([]); // State to store recent posts
  const [loading, setLoading] = useState(true); // State to track loading status
  const [dots, setDots] = useState(""); // State to track dots animation

  // useEffect to fetch recent posts when the component is mounted
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getRecentPosts();
      setRecentPosts(result); // Set the fetched posts to the state
      setLoading(false); // Set loading to false once data is fetched
    };
    fetchPosts();
  }, []);

  // useEffect to animate the dots in "Loading..."
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="bg-black bg-opacity-30 rounded-3xl p-5 mb-8 hover:-translate-y-1 hover:bg-opacity-50 transition duration-700">
      {/* Widget header */}
      <h3 className="text-white text-xl mb-8 font-semibold border-b pb-4">
        Recent Posts
      </h3>

      {/* Loading state */}
      {loading ? (
        <div className="text-center text-white text-lg">
          Loading{dots} {/* Animated dots */}
        </div>
      ) : (
        // Loop through the recent posts and display them once loading is done
        recentPosts.map((post) => (
          <div
            key={post.title} // Unique key for each post
            className="flex items-center w-full mb-4 bg-black bg-opacity-30 hover:-translate-y-1 hover:bg-opacity-50 transition duration-200 rounded-xl p-4"
          >
            {/* Featured image section */}
            <div className="w-16 flex-none">
              <Image
                src={post.featuredImage.url} // URL of the post's featured image
                alt={post.title} // Alt text for the image (post title)
                width={60} // Fixed width for the image
                height={60} // Fixed height for the image
                className="rounded-full" // Styling to make the image circular
              />
            </div>
            {/* Post details section */}
            <div className="flex-grow ml-4">
              {/* Post creation date */}
              <p className="text-white text-sm">
                {moment(post.createdAt).format("DD MMM YYYY")}{" "}
                {/* Format the post date */}
              </p>
              {/* Link to the individual post */}
              <Link
                href={`/post/${post.slug}`} // Navigate to the post details page
                className="text-lg text-white"
              >
                {post.title} {/* Display the post title */}
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostWidget;
