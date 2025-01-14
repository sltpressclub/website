import React from "react";
import { useRouter } from "next/router";
import {
  PostDetail,
  Categories,
  PostWidget,
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
      <div className="container mx-auto px-10 mb-8">
        <h1>404 - Post Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          {/* Changed Author to Member here */}
          <Member member={post.member} />{" "}
          {/* Assuming 'member' is the correct property */}
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
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
