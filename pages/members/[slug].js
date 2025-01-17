import React from "react";
import Head from "next/head";
import { getPostsByCategory } from "../../services";
import { PostCard } from "../../components";

const SlugPage = ({ posts }) => {
  // Check if posts are empty or undefined
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold">No Posts Found</h1>
        <p className="mt-4 text-lg">
          There are no posts available for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>Posts by Category</title>
        <meta
          name="description"
          content="Posts under a specific category on SLT Pressclub"
        />
      </Head>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlugPage;

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    console.log("Fetching posts for category with slug:", slug); // Log slug
    const posts = await getPostsByCategory(slug);

    if (!posts || posts.length === 0) {
      console.warn("No posts found for category with slug:", slug); // Log if no posts
      return {
        props: {
          posts: [], // Return empty posts if none found
        },
      };
    }

    console.log("Fetched posts for category:", posts); // Log fetched posts

    return {
      props: {
        posts, // Pass posts to component
      },
    };
  } catch (error) {
    console.error("Error fetching posts for category slug:", slug, error); // Log error
    return { notFound: true }; // Trigger 404 if error occurs
  }
}
