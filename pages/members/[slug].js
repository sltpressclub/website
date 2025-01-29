import React from "react";
import { useRouter } from "next/router";
import { getMemberPosts } from "../../services";
import { PostCard, Loader } from "../../components";

const MemberPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const member = posts.length > 0 ? posts[0].member : null;

  return (
    <div className="container mx-auto px-5 md:px-10 mb-8">
      {member && (
        <div className="flex flex-col md:flex-row items-center md:items-start bg-gray-100 p-6 rounded-lg shadow-md mb-8">
          <img
            src={member.photo.url}
            alt={member.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-semibold">{member.name}</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {member.role.name}
            </p>
            <p className="text-gray-700 mt-2">{member.bio}</p>
            <p className="text-gray-600 mt-2 font-medium">
              Posts: {posts.length}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post, index) => <PostCard key={index} post={post} />)
        ) : (
          <p>No posts available for this member</p>
        )}
      </div>
    </div>
  );
};

export default MemberPost;

export async function getServerSideProps({ params }) {
  try {
    const posts = await getMemberPosts(params.slug);
    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching posts for member:", error);
    return { props: { posts: [] } };
  }
}
