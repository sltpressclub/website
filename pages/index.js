import React from "react";
import Head from "next/head";
import {
  PostCard,
  Upcoming,
  Gallery,
  History,
  Quotes,
  PostWidget,
  Mission,
  Clubs,
} from "../components"; // Importing required components
import { getPost } from "../services"; // Importing API call for fetching posts

export default function Home({ posts }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Content Wrapper */}
      <div className="w-full px-4 md:px-10 mb-8 flex-grow">
        {/* Page Head Section */}
        <Head>
          <title>SLT Pressclub</title> {/* Page title */}
          <link rel="icon" href="/slt_pressclub_logo.png" /> {/* Favicon */}
        </Head>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          {/* Blog Posts Section */}
          <div className="lg:col-span-8 col-span-1">
            {/* Display each post */}
            {posts.map((post) => (
              <PostCard post={post.node} key={post.node.id} />
            ))}
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4 col-span-1">
            <div className="relative top-8">
              <Upcoming /> {/* Component to display upcoming events or posts */}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-12">
          <h2 className="text-center text-3xl font-semibold mb-6">Gallery</h2>
          <Gallery />
        </div>
        <div className="mt-12">
          <h2 className="text-center text-3xl font-semibold mb-6">History</h2>
          <History />
        </div>
        <div className="mt-12">
          <h2 className="text-center text-3xl font-semibold mb-6">Quotes</h2>
          <Quotes />
        </div>
        <div className="mt-12">
          <h2 className="text-center text-3xl font-semibold mb-6">
            Recent Posts
          </h2>
          <PostWidget />
        </div>
      </div>
    </div>
  );
}

// Fetch posts data at request time using getServerSideProps
export async function getServerSideProps() {
  // Fetch posts from the service
  const posts = (await getPost()) || []; // Fallback to an empty array if no posts are available

  return {
    props: { posts }, // Pass posts as props to the component
  };
}
