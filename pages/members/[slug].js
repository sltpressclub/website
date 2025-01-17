import React from "react";
import { useRouter } from "next/router"; // Importing useRouter for routing and fallback detection
import { getMembers, getPostsByMember } from "../../services"; // Functions to fetch members and posts by a member
import { PostCard, Categories, Loader } from "../../components"; // Components for posts, categories, and loading indicator

const SlugPage = ({ posts }) => {
  const router = useRouter();

  // Display a loader while the fallback page is being generated
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {/* Display posts if available, else show a message */}
          {posts.length > 0 ? (
            posts.map((post, index) => <PostCard key={index} post={post} />)
          ) : (
            <p>No posts available for this member</p>
          )}
        </div>
        <div className="col-span-1 lg:col-span-4">
          {/* Sidebar */}
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlugPage;

// Fetch posts for a specific member at build time
export async function getStaticProps({ params }) {
  try {
    const posts = await getPostsByMember(params.slug);
    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching posts for member:", error);
    return { props: { posts: [] } }; // Return an empty array if there's an error
  }
}

// Generate dynamic paths for members at build time
export async function getStaticPaths() {
  try {
    const members = await getMembers(); // Fetch all members
    return {
      paths: members.map(({ slug }) => ({ params: { slug } })), // Generate paths from member slugs
      fallback: true, // Enable fallback for on-demand page generation
    };
  } catch (error) {
    console.error("Error fetching members:", error);
    return { paths: [], fallback: true }; // Return fallback as true to allow dynamic generation
  }
}
