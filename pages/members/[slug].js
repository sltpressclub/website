import React from "react";
import { useRouter } from "next/router"; // Importing useRouter for routing and dynamic paths
import { getMemberPosts } from "../../services"; // Importing functions to fetch members and posts by a specific member
import { PostCard, Loader } from "../../components"; // Importing components for displaying post cards and a loading indicator

const MemberPost = ({ posts }) => {
  const router = useRouter();

  // Show loading state while the page is being generated in the background (for fallback pages)
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      {/* Main container for the page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Grid layout for posts */}
        {posts.length > 0 ? (
          // If there are posts, display each post using the PostCard component
          posts.map((post, index) => <PostCard key={index} post={post} />)
        ) : (
          <p>No posts available for this member</p> // Display message if no posts found
        )}
      </div>
    </div>
  );
};

export default MemberPost;

// Fetch data on each request using getServerSideProps
export async function getServerSideProps({ params }) {
  try {
    // Fetch the posts for a specific member using the slug from params
    const posts = await getMemberPosts(params.slug);
    return { props: { posts } }; // Return the posts as props
  } catch (error) {
    console.error("Error fetching posts for member:", error);
    // If there's an error fetching posts, return an empty array
    return { props: { posts: [] } };
  }
}
