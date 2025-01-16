import React from "react";
import Head from "next/head";
import { getPostsByMember } from "../../services";
import { PostCard } from "../../components";

const MemberProfile = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold">No Posts Found</h1>
        <p className="mt-4 text-lg">
          There are no posts available for this member.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>Member Posts | SLT Pressclub</title>
        <meta
          name="description"
          content="Browse posts by member on SLT Pressclub"
        />
        <meta property="og:title" content="Member Posts" />
        <meta property="og:description" content="Read posts on SLT Pressclub" />
      </Head>

      {/* Display Posts */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    // Fetch posts by the member using their slug
    const posts = await getPostsByMember(slug);

    if (!posts || posts.length === 0) {
      console.warn("No posts found for slug:", slug);
    }

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching posts by member:", error.message);
    return { notFound: true };
  }
}
