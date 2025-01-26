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

  // Log posts data to see what is being passed into the component
  console.log("Posts data received:", posts);

  return (
    <div className="container mx-auto px-10 mb-8">
      <h1 className="text-2xl font-semibold mb-6">Posts for this Club</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Check if posts are available */}
        {posts.length > 0 ? (
          posts.map((post, index) => {
            // Log each individual post to see its structure
            console.log("Post details:", post);
            return <PostCard key={index} post={post} />;
          })
        ) : (
          <p>No posts available for this club</p>
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
    const posts = await getClubPosts(params.slug); // Get posts by the club's slug

    // Log the fetched posts data before returning it to the page
    console.log("Fetched posts for club:", posts);

    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching posts for club:", error);
    return { props: { posts: [] } }; // Return an empty array in case of an error
  }
}
