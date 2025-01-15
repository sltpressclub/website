import React from "react";
import Head from "next/head";
import { PostCard, Upcoming } from "../components/"; // Removed PostWidget and Categories
import { getPosts } from "../services";
import Loader from "../components/Loader"; // Import your Loader component

export default function Home({ posts }) {
  // Display loader if no posts are available or posts data is still empty
  if (!posts || posts.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="w-full px-4 md:px-10 mb-8 flex-grow">
        <Head>
          <title>SLT Pressclub</title>
          <meta name="description" content="SLT Pressclub Blog and Updates" />
          <link rel="icon" href="/slt_pressclub_logo.png" />
        </Head>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          {/* Main Content Section */}
          <div className="lg:col-span-8 col-span-1">
            {/* Text above the posts */}
            <h2 className="text-3xl font-semibold mb-6 text-white">
              Latest Posts
            </h2>
            {posts.map((post) => (
              <PostCard post={post.node} key={post.node.id} />
            ))}
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4 col-span-1">
            <div className="relative top-8">
              <Upcoming /> {/* Only Upcoming Events here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch posts on every request
export async function getServerSideProps() {
  let posts = [];
  try {
    posts = (await getPosts()) || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  // If no posts were fetched, the Loader will show until posts are available
  return {
    props: { posts },
  };
}
