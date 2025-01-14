import React from "react";
import Head from "next/head";
import { PostCard, Categories, PostWidget, Upcoming } from "../components/";
import { getPosts } from "../services";
import Loader from "../components/Loader"; // Import your Loader component

export default function Home({ posts }) {
  // Display loader if no posts are available
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
            {posts.map((post) => (
              <PostCard post={post.node} key={post.node.id} />
            ))}
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4 col-span-1">
            <div className="relative top-8">
              <Upcoming />
              <PostWidget />
              <Categories />
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
  return {
    props: { posts },
  };
}
