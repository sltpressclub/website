import React from "react";
import { useRouter } from "next/router"; // Importing useRouter for routing and dynamic paths
import { getCategories, getCategoryPost } from "../../services"; // Importing functions to fetch categories and posts for a specific category
import { PostCard, Loader } from "../../components"; // Importing components for displaying post cards, categories, and a loading indicator

const CategoryPost = ({ posts }) => {
  // Get the Next.js router object to manage routes and dynamic behavior
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
            <p>No posts available for this category</p> // Display message if no posts found
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;

// Fetch data at build time using getStaticProps
export async function getStaticProps({ params }) {
  try {
    // Fetch the posts for a specific category using the slug from params
    const posts = await getCategoryPost(params.slug);
    return { props: { posts } }; // Return the posts as props
  } catch (error) {
    console.error("Error fetching posts for category:", error);
    // If there's an error fetching posts, return an empty array
    return { props: { posts: [] } };
  }
}

// Fetch dynamic routes at build time using getStaticPaths
export async function getStaticPaths() {
  try {
    // Fetch the categories from the API
    const categories = await getCategories();
    return {
      paths: categories.map(({ slug }) => ({ params: { slug } })), // Map each category's slug to a path
      fallback: false, // Disable fallback, as we want to pre-render all categories at build time
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    // If there's an error fetching categories, return empty paths
    return { paths: [], fallback: true }; // Fallback to true so the page will be generated in the background
  }
}
