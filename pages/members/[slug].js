import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getMemberPosts, getMemberBySlug } from "../../services";
import { PostCard, Loader } from "../../components";

const MemberPost = ({ posts, member }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const pageTitle = member
    ? `${member.name} - Member Profile | SLT Press Club`
    : "Member Not Found | SLT Press Club";
  const pageDescription = member
    ? `${member.name} is a valued member of SLT Press Club. Learn more about their role and contributions.`
    : "Member details not available.";
  const pageImage = member?.photo?.url || "/default-profile.png";
  const pageUrl = `https://sltpressclub.vercel.app/members/${
    member?.slug || "unknown"
  }`;

  return (
    <>
      {/* Metadata */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Head>

      <div className="container mx-auto px-5 md:px-10 mb-8 text-white">
        {/* Always render member info */}
        {member ? (
          <div className="flex flex-col md:flex-row items-center md:items-start bg-black bg-opacity-30 rounded-3xl p-6 shadow-md mb-8">
            <img
              src={member.photo?.url}
              alt={member.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h2 className="text-2xl font-semibold">{member.name}</h2>
              <p className="text-sm md:text-base">{member.role?.name}</p>
              <p className="mt-2">{member.bio}</p>
              <p className="mt-2 font-medium">Posts: {posts.length}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Member not found</p>
        )}

        {/* Render posts if available */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post, index) => <PostCard key={index} post={post} />)
          ) : (
            <p className="text-center text-white">
              No posts available for this member
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MemberPost;

export async function getServerSideProps({ params }) {
  try {
    // Fetch posts
    const posts = await getMemberPosts(params.slug);

    // Fetch member details separately if no posts exist
    let member =
      posts.length > 0 ? posts[0].member : await getMemberBySlug(params.slug);

    return { props: { posts, member } };
  } catch (error) {
    console.error("Error fetching data for member:", error);
    return { props: { posts: [], member: null } };
  }
}
