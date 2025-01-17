import React from "react";
import { useRouter } from "next/router"; // Importing useRouter for routing and dynamic paths
import { getMembers, getMemberPosts } from "../../services"; // Importing functions to fetch members and posts by a specific member
import { PostCard, Categories, Loader } from "../../components"; // Importing components for displaying post cards, categories, and a loading indicator

const MemberPost = ({ posts }) => {
  const router = useRouter();

  // Show loading state while the page is being generated in the background (for fallback pages)
  if (router.isFallback) {
    return <Loader />; // Display a loading indicator while data is being fetched
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      {/* Main container for the page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Grid layout for main content and sidebar */}
        <div className="col-span-1 lg:col-span-8">
          {/* Column for displaying posts */}
          {posts.length > 0 ? (
            // If there are posts, display each post using the PostCard component
            posts.map((post, index) => <PostCard key={index} post={post} />)
          ) : (
            <p>No posts available for this member</p> // Display message if no posts found
          )}
        </div>
        <div className="col-span-1 lg:col-span-4">
          {/* Sidebar section */}
          <div className="relative lg:sticky top-8">
            <Categories />{" "}
            {/* Display the Categories component in the sidebar */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPost;

// Fetch data at build time using getStaticProps
export async function getStaticProps({ params }) {
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

// Fetch dynamic routes at build time using getStaticPaths
export async function getStaticPaths() {
  try {
    // Fetch the members from the API
    const members = await getMembers();
    return {
      paths: members.map(({ slug }) => ({ params: { slug } })), // Map each member's slug to a path
      fallback: true, // Enable fallback for dynamic member pages
    };
  } catch (error) {
    console.error("Error fetching members:", error);
    // If there's an error fetching members, return empty paths
    return { paths: [], fallback: true }; // Fallback to true for on-demand page generation
  }
}
