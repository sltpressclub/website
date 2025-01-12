import React from "react";
import Head from "next/head";
import { PostCard, Categories, PostWidget, Upcoming } from "../components/";
import { getPosts } from "../services";

export default function Home({ posts }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="w-full px-4 md:px-10 mb-8 flex-grow">
        <Head>
          <title>SLT Pressclub</title>
          <link rel="icon" href="/slt_pressclub_logo.png" />
        </Head>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post) => (
              <PostCard post={post.node} key={post.node.id} />
            ))}
          </div>

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

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}
