import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Author } from "../components"; // Import the Author component
import { getAuthors } from "../services"; // Import service to fetch authors
import Loader from "../components/Loader"; // Import the Loader component

const Authors = ({ authors }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Use effect to set loading state when authors data is available
  useEffect(() => {
    if (authors.length > 0) {
      setIsLoading(false); // Hide loader when data is loaded
    }
  }, [authors]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-white">
      <Head>
        <title>Authors | SLT Pressclub</title>
        <link rel="icon" href="/slt_pressclub_logo.png" />
      </Head>

      {/* Author Grid */}
      <div className="w-full px-4 md:px-10 mb-8 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-12">Our Authors</h1>

        {/* Display loader if data is still loading */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {authors.map((author) => (
              <Author key={author.id} author={author} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Fetch all authors from GraphCMS
export async function getStaticProps() {
  const authors = (await getAuthors()) || []; // Fetch authors
  return {
    props: { authors },
  };
}

export default Authors;
