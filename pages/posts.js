import React from "react";
import { getPosts } from "../services"; // Importing function to fetch all posts
import { PostCard, Loader } from "../components"; // Import PostCard and Loader components

const AllPosts = ({ posts }) => {
  // Display loader if no posts are fetched yet
  if (!posts || posts.length === 0) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">All Posts</h1>
      {/* Display number of posts */}
      <p className="text-white text-center mb-8">
        {posts.length} Posts Available
      </p>
      {/* Main grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Render posts with white text */}
        {posts.map((post) => (
          <PostCard post={post.node} key={post.node.id} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;

// Fetch data for the page using getServerSideProps
export async function getServerSideProps() {
  try {
    // Fetch all posts using the getPosts query
    const posts = await getPosts();
    return { props: { posts } }; // Return posts as props
  } catch (error) {
    console.error("Error fetching all posts:", error);
    // If there's an error, return an empty posts array
    return { props: { posts: [] } };
  }
}
