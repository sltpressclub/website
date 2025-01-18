import Head from "next/head"; // Import for setting meta tags and page title
import { PostCard, Upcoming, Gallery, History } from "../components/"; // Importing required components
import { getPosts, getGalleryData } from "../services"; // Importing API calls for fetching posts and gallery data

export default function Home({ posts, gallery }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Content Wrapper */}
      <div className="w-full px-4 md:px-10 mb-8 flex-grow">
        {/* Page Head Section */}
        <Head>
          <title>SLT Pressclub</title> {/* Page title */}
          <link rel="icon" href="/slt_pressclub_logo.png" /> {/* Favicon */}
        </Head>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 gap-12 w-full">
          {/* Top Section: PostCards and Upcoming Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Blog Posts Section */}
            <div className="lg:col-span-8 col-span-1">
              {/* Display each post */}
              {posts.map((post) => (
                <PostCard post={post.node} key={post.node.id} />
              ))}
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-4 col-span-1">
              <div className="relative top-8">
                <Upcoming />{" "}
                {/* Component to display upcoming events or posts */}
              </div>
            </div>
          </div>

          {/* Gallery Section: Full-width */}
          <div className="w-full">
            <Gallery gallery={gallery} /> {/* Full-width gallery */}
          </div>
          <div className="w-full">
            <History /> {/* Full-width gallery */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch data at request time using getServerSideProps
export async function getServerSideProps() {
  try {
    // Fetch posts and gallery data
    const posts = (await getPosts()) || []; // Fallback to an empty array if no posts are available
    const gallery = (await getGalleryData()) || []; // Fallback to an empty array if no gallery data is available

    return {
      props: { posts, gallery }, // Pass posts and gallery as props to the component
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { posts: [], gallery: [] }, // Return empty arrays in case of an error
    };
  }
}
