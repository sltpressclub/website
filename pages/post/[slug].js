import React from "react";
import { useRouter } from "next/router";
import {
  PostDetail,
  Member, // Assuming 'Author' is renamed to 'Member'
  Comments,
  CommentsForm,
  Loader,
} from "../../components";
import { getPosts, getPostDetails } from "../../services";

const PostDetails = ({ post }) => {
  const router = useRouter();

  // Show loading state while the page is being generated
  if (router.isFallback) {
    return <Loader />;
  }

  // If no post is found, show a 404 page
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold">404 - Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-8">
      {/* Post Detail */}
      <PostDetail post={post} />

      {/* Member Details */}
      {post.member && <Member member={post.member} />}

      {/* Comments Section */}
      <Comments slug={post.slug} />
      <CommentsForm slug={post.slug} />
    </div>
  );
};

// Use getServerSideProps instead of getStaticProps for SSR
export async function getServerSideProps({ params }) {
  try {
    const data = await getPostDetails(params.slug);

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    console.error(
      `Error in getServerSideProps for slug: ${params.slug}`,
      error
    );
    return {
      notFound: true,
    };
  }
}

// Fetch dynamic paths for SSR (optional, depending on your use case)
export async function getServerSidePaths() {
  try {
    const posts = await getPosts();

    if (!posts || posts.length === 0) {
      return {
        paths: [],
        fallback: true,
      };
    }

    return {
      paths: posts.map(({ slug }) => ({ params: { slug } })),
      fallback: true,
    };
  } catch (error) {
    console.error("Error in getServerSidePaths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export default PostDetails;
