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
  FeaturedPost,
  Awards,
} from "../components"; // Importing required components
import { getPost } from "../services"; // Importing API call for fetching posts

export default function Home({ posts }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Content Wrapper */}
      <div className="w-full px-2 md:px-10 mb-8 flex-grow">
        {/* Page Head Section */}
        <Head>
          <title>SLT Pressclub</title> {/* Page title */}
          <link rel="icon" href="/slt_pressclub_logo.png" /> {/* Favicon */}
          {/* Meta tags for SEO */}
          <meta
            name="description"
            content="SLT Pressclub: The Voice of SLTIANS. Stay updated with the latest news, events, and more."
          />
          <meta
            name="keywords"
            content="SLT Pressclub, SLTIANS, news, events, SLT, student club, press club, student media"
          />
          <meta name="author" content="SLT Pressclub" />
          {/* Open Graph metadata for better sharing on social media */}
          <meta property="og:title" content="SLT Pressclub" />
          <meta
            property="og:description"
            content="Stay updated with the latest news and events from SLT Pressclub, the voice of SLTIANS."
          />
          <meta
            property="og:image"
            content="https://sltpressclub.vercel.app/sltsss.jpg"
          />{" "}
          {/* Updated absolute image URL */}
          <meta
            property="og:url"
            content="https://sltpressclub.vercel.app"
          />{" "}
          {/* Actual site URL */}
          <meta property="og:type" content="website" />{" "}
          {/* Ensuring it's treated as a website */}
          {/* WhatsApp specific metadata */}
          <meta name="twitter:title" content="SLT Pressclub" />
          <meta
            name="twitter:description"
            content="Stay updated with the latest news and events from SLT Pressclub, the voice of SLTIANS."
          />
          <meta
            name="twitter:image"
            content="https://sltpressclub.vercel.app/sltsss.jpg"
          />{" "}
          {/* Updated absolute image URL */}
          <meta name="twitter:card" content="summary_large_image" />
          {/* Additional WhatsApp Open Graph Meta Tags (they rely on og:image too) */}
          <meta name="twitter:creator" content="@sltpressclub" />{" "}
          {/* Handle or username */}
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
            <div className="relative">
              <Upcoming /> {/* Component to display upcoming events or posts */}
            </div>
          </div>
        </div>
        {/* Gallery Section */}
        <div className="mt-8">
          <Gallery />
        </div>
        <div className="mt-12">
          <Quotes />
        </div>
        <div className="mt-8">
          <History />
        </div>

        <div className="mt-8">
          <Mission />
        </div>
        <div className="mt-8">
          <Clubs />
        </div>
        <div className="mt-8">
          <FeaturedPost />
        </div>
        <div className="mt-8">
          <Awards />
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
