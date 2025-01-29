import React from "react";
import { useRouter } from "next/router";
import { getClubPosts } from "../../services";
import { PostCard, Loader } from "../../components";

const ClubPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const club = posts.length > 0 ? posts[0].club : null;

  return (
    <div className="container mx-auto px-5 md:px-10 mb-8">
      {club && (
        <div className="flex flex-col md:flex-row items-center md:items-start bg-black bg-opacity-30 p-6 rounded-3xl shadow-md mb-8">
          <img
            src={club.featuredImage.url}
            alt={club.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
          />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-semibold">{club.name}</h2>
            <p className="text-gray-700 mt-2">{club.description}</p>
            <p className="text-gray-600 mt-2 font-medium">
              Posts: {posts.length}
            </p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-6">Posts for this Club</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post, index) => <PostCard key={index} post={post} />)
        ) : (
          <p>No posts available for this club</p>
        )}
      </div>
    </div>
  );
};

export default ClubPost;

export async function getServerSideProps({ params }) {
  try {
    const posts = await getClubPosts(params.slug);
    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching posts for club:", error);
    return { props: { posts: [] } };
  }
}
