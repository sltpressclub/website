import React, { useState, useEffect } from "react";
import moment from "moment"; // For date formatting
import Link from "next/link"; // For navigation between pages in Next.js
import Image from "next/image"; // For optimized images in Next.js
import { getRecentPosts } from "../services"; // Service to fetch recent posts
import { graphCMSImageLoader } from "../util"; // Custom loader for GraphCMS images

const PostWidget = () => {
  const [recentPosts, setRecentPosts] = useState([]); // State to store recent posts
  const [loading, setLoading] = useState(true); // State to track loading status
  const [dots, setDots] = useState(""); // State to track dots animation

  // Fetch recent posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getRecentPosts();
      setRecentPosts(result); // Update state with fetched posts
      setLoading(false); // Stop loading
    };
    fetchPosts();
  }, []);

  // Animate dots in "Loading..."
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
        // Loop through recent posts
        recentPosts.map((post) => (
          <div
            key={post.title} // Unique key for each post
            className="flex items-center w-full mb-4 bg-black bg-opacity-30 hover:-translate-y-1 hover:bg-opacity-50 transition duration-200 rounded-xl p-4"
          >
            {/* Featured image */}
            <div className="w-16 h-16 flex-none relative">
              <Image
                loader={graphCMSImageLoader}
                src={post.featuredImage.url} // Post's featured image URL
                alt={post.title} // Alt text for accessibility
                width={60} // Set width for consistent size
                height={60} // Set height for consistent size
                className="rounded-full object-cover" // Ensure circular images
              />
            </div>
            {/* Post details */}
            <div className="flex-grow ml-4">
              {/* Post creation date */}
              <p className="text-white text-sm">
                {moment(post.createdAt).format("DD MMM YYYY")}
              </p>
              {/* Link to post */}
              <Link
                href={`/post/${post.slug}`}
                className="text-lg text-white hover:underline"
              >
                {post.title}
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostWidget;
