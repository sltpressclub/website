import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { getFeaturedPosts } from "../services";

const FeaturedPost = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Navigate to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredPosts.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
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

  const post = featuredPosts[currentIndex].node;

  return (
    <div className="relative container mx-auto p-8 bg-black bg-opacity-30 rounded-3xl">
      <h1 className="text-white text-2xl mb-5 font-semibold">Featured Posts</h1>
      <div className="relative">
        {/* Featured Post */}
        <div className="flex flex-col items-center">
          {/* Post Image */}
          <div
            className="w-full h-96 bg-cover bg-center rounded-3xl"
            style={{
              backgroundImage: `url(${post.featuredImage.url})`,
            }}
          ></div>

          {/* Post Details */}
          <div className="mt-4 text-center text-white">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm">
              By {post.member.name} on{" "}
              {moment(post.createdAt).format("DD MMMM YYYY")}
            </p>
            {/* Read More Button */}
            <Link href={`/post/${post.slug}`}>
              <a className="mt-4 inline-block bg-white text-black text-sm font-medium rounded-full px-6 py-2 shadow-lg hover:bg-gray-300 transition">
                Read More
              </a>
            </Link>
          </div>
        </div>

        {/* Carousel Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-300"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-300"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default FeaturedPost;
