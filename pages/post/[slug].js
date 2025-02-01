import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  PostDetail,
  Member,
  Comments,
  CommentsForm,
  PostWidget,
  Loader,
} from "../../components";
import { getPostDetails, getComments } from "../../services";

const PostDetails = ({ post }) => {
  const router = useRouter();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (post?.slug) {
      const fetchComments = async () => {
        const fetchedComments = await getComments(post.slug);
        console.log("Fetched Comments:", fetchedComments);
        setComments(fetchedComments);
      };
      fetchComments();
    }
  }, [post?.slug]);

  if (router.isFallback) {
    return <Loader />;
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold">404 - Post Not Found</h1>
      </div>
    );
  }

  return (
    <>
      {/* Metadata for SEO */}
      <Head>
        <title>{post.title} | SLT Press Club</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featuredImage?.url} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://yourwebsite.com/posts/${post.slug}`}
        />
      </Head>

      <div className="min-h-screen w-full text-white lg:p-8 p-2">
        <PostDetail post={post} />
        {post.member && <Member member={post.member} />}
        <Comments slug={post.slug} />
        <CommentsForm slug={post.slug} />
        <PostWidget />
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const data = await getPostDetails(params.slug);

    if (!data) {
      return { notFound: true };
    }

    return { props: { post: data } };
  } catch (error) {
    console.error(
      `Error in getServerSideProps for slug: ${params.slug}`,
      error
    );
    return { notFound: true };
  }
}

export default PostDetails;
