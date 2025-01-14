import React from "react";
import Head from "next/head";
import { getMemberBySlug, getPostsByMember } from "../../services"; // Service functions to fetch data
import { PostCard } from "../../components"; // Assuming you have a PostCard component to display posts
import Loader from "../../components/Loader"; // Assuming you have a Loader component

const MemberProfile = ({ member, posts }) => {
  if (!member || !posts) {
    return <Loader />; // Show a loader if no data is available
  }

  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>{member.name} | SLT Pressclub</title>
        <meta
          name="description"
          content={`Learn more about ${member.name} and their contributions to SLT Pressclub.`}
        />
        <link rel="icon" href="/slt_pressclub_logo.png" />
      </Head>

      {/* Member Profile */}
      <div className="text-center mb-12">
        <img
          src={member.photo?.url || "/default-avatar.png"}
          alt={`Photo of ${member.name}`}
          className="rounded-full object-cover shadow-lg mb-4"
          width={120}
          height={120}
        />
        <h1 className="text-4xl font-bold text-white">{member.name}</h1>
        <p className="text-lg text-gray-300">
          {member.role?.name || "No role specified"}
        </p>
        <p className="text-lg text-white mt-4">
          {member.bio || "No bio available"}
        </p>
      </div>

      {/* Member's Posts */}
      <div>
        <h2 className="text-3xl font-semibold text-white mb-6">
          Posts by {member.name}
        </h2>
        {posts.length === 0 ? (
          <p className="text-white">No posts found by this member.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} /> // Assuming PostCard component to render posts
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Fetch member and their posts based on slug
export async function getServerSideProps({ params }) {
  const { slug } = params;
  let member = null;
  let posts = [];

  try {
    // Fetch member by slug
    member = await getMemberBySlug(slug);

    // If member exists, fetch posts written by this member
    if (member) {
      posts = await getPostsByMember(member.id); // Assuming the member has an `id` field
    }
  } catch (error) {
    console.error("Error fetching member or posts:", error);
  }

  return {
    props: {
      member,
      posts,
    },
  };
}

export default MemberProfile;
