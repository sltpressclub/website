import React from "react";
import { useRouter } from "next/router"; // Importing useRouter for routing and dynamic paths
import { getClubPosts } from "../../services"; // Importing function to fetch posts by a specific club
import { PostCard, Loader } from "../../components"; // Importing components for displaying post cards and a loading indicator

const ClubPost = ({ posts }) => {
  const router = useRouter();

  // Show loading state while the page is being generated in the background (for fallback pages)
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      {/* Main container for the page */}
      <h1 className="text-2xl font-semibold mb-6">Posts for this Club</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Grid layout for posts */}
        {posts.length > 0 ? (
          // If there are posts, display each post using the PostCard component
          posts.map((post, index) => <PostCard key={index} post={post} />)
        ) : (
          <p>No posts available for this club</p> // Display message if no posts found
        )}
      </div>
    </div>
  );
};

export default ClubPost;

// Fetch data on each request using getServerSideProps
export async function getServerSideProps({ params }) {
  try {
    // Fetch the posts for a specific club using the slug from params
    const posts = await getClubPosts(params.slug); // get posts by the club's slug
    return { props: { posts } }; // Return the posts as props
  } catch (error) {
    console.error("Error fetching posts for club:", error);
    // If there's an error fetching posts, return an empty array
    return { props: { posts: [] } };
  }
}
