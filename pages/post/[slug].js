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

export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  // If no post is found, return notFound to trigger 404
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
}

// Specify dynamic routes to pre-render pages based on data
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true, // Fallback to loading state if the page isn't generated
  };
}
