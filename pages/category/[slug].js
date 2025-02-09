import React from "react";
import { useRouter } from "next/router";
import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Loader } from "../../components";

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.length > 0 ? (
            posts.map((post, index) => <PostCard key={index} post={post} />)
          ) : (
            <p>No posts available for this category</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;

// Fetch data at request time using getServerSideProps
export async function getServerSideProps({ params }) {
  try {
    const posts = await getCategoryPost(params.slug);
    return { props: { posts } };
  } catch (error) {
    console.error("Error fetching posts for category:", error);
    return { props: { posts: [] } };
  }
}
