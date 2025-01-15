import React from "react";
import Head from "next/head";
import { getMemberPosts } from "../services"; // Import the service for fetching posts by member
import { PostCard } from "../components"; // Assuming you have a PostCard component

const MemberProfile = ({ member, posts }) => {
  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>{member.name} | SLT Pressclub</title>
        <meta
          name="description"
          content={`Profile and posts by ${member.name}`}
        />
        <meta property="og:title" content={member.name} />
        <meta
          property="og:description"
          content={`Read posts by ${member.name} on SLT Pressclub`}
        />
      </Head>

      {/* Member Info */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold">{member.name}</h1>
        <p className="text-lg text-gray-600">{member.bio}</p>
        <h3 className="text-xl font-bold mt-8">Posts by {member.name}</h3>
      </div>

      {/* Display Posts */}
      {posts.length === 0 ? (
        <p>No posts found by this member.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

// Fetch member and posts on every request based on the slug
export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Fetch member by slug
  const member = await getMemberBySlug(slug); // Fetch member data by slug
  if (!member) {
    return {
      notFound: true, // Show 404 if no member is found
    };
  }

  // Fetch posts by the member's id or slug
  const posts = await getMemberPosts(slug); // Fetch posts by member

  return {
    props: {
      member,
      posts,
    },
  };
}

export default MemberProfile;
