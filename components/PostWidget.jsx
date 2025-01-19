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
        <>
          {/* Posts grid: 3 columns, 2 rows */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {recentPosts.slice(0, 6).map((post) => (
              <div
                key={post.title} // Unique key for each post
                className="bg-black bg-opacity-30 hover:-translate-y-1 hover:bg-opacity-50 transition duration-200 rounded-xl p-4 flex flex-col justify-between"
              >
                {/* Featured image */}
                <div className="relative w-full aspect-square mb-4">
                  <Image
                    loader={graphCMSImageLoader}
                    src={post.featuredImage.url} // Post's featured image URL
                    alt={post.title} // Alt text for accessibility
                    layout="fill" // Ensure the image fills the square
                    objectFit="cover" // Make sure the image covers the square
                    className="rounded-lg"
                  />
                </div>
                {/* Post details */}
                <div>
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
            ))}
          </div>

          {/* Button to go to all posts */}
          <div className="text-center mt-6">
            <Link href="/posts">
              <button className="bg-white text-black px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition duration-200">
                View All Posts
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PostWidget;
