import React from "react";
import Head from "next/head";
import { getMemberBySlug, getPostsByMember } from "../../services";
import { PostCard } from "../../components";

const MemberProfile = ({ member, posts }) => {
  if (!member) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold">Member Not Found</h1>
        <p className="mt-4 text-lg">The requested profile does not exist.</p>
      </div>
    );
  }

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
        <p className="text-lg text-gray-600 mt-2">{member.bio}</p>
        {member.role?.name && (
          <p className="text-sm text-gray-500">{member.role.name}</p>
        )}
      </div>

      {/* Display Posts */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Posts by {member.name}</h2>
        {posts.length === 0 ? (
          <p>No posts found for this member.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberProfile;

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const member = await getMemberBySlug(slug);
    if (!member) {
      return { notFound: true }; // Trigger a 404 if no member is found
    }

    // Now we pass the slug to getPostsByMember instead of member.id
    const posts = await getPostsByMember(slug);

    return {
      props: {
        member,
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching member or posts:", error);
    return { notFound: true };
  }
}
