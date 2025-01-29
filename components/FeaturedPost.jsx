import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { getFeaturedPosts } from "../services";

const FeaturedPost = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dots, setDots] = useState(""); // State for animated dots

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getFeaturedPosts();
        setFeaturedPosts(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) {
    return <div className="text-white text-center">Loading{dots}</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading featured posts: {error}
      </div>
    );
  }

  if (featuredPosts.length === 0) {
    return (
      <div className="text-white text-center">No featured posts available.</div>
    );
  }

  return (
    <div className="relative container mx-auto p-8 bg-black bg-opacity-30 rounded-3xl">
      <h1 className="text-white text-2xl mb-5 font-semibold">Featured Posts</h1>

      {/* Scrollable Carousel */}
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex gap-6 lg:gap-10">
          {featuredPosts.map(({ node: post }) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gray-200 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${post.featuredImage.url})` }}
              >
                {/* Overlay for dark effect */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition"></div>

                {/* Post Details */}
                <div className="absolute bottom-2 right-2 text-white text-sm p-2 rounded bg-black bg-opacity-50">
                  <h2 className="font-semibold text-lg">{post.title}</h2>
                  <p>By {post.member.name}</p>
                  <p>{moment(post.createdAt).format("DD MMM YYYY")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
