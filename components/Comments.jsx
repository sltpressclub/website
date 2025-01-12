import React, { useEffect, useState } from "react";
import moment from "moment"; // Library for formatting dates
import parse from "html-react-parser"; // Library to safely parse HTML strings into React components

import { getComments } from "../services"; // Importing a service function to fetch comments

// Comments Component
const Comments = ({ slug }) => {
  // State to store the list of comments
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Function to fetch comments
    const fetchComments = async () => {
      const result = await getComments(slug); // Fetch comments for the given slug
      setComments(result); // Update the state with fetched comments
    };

    // Fetch comments only once when the component is mounted
    fetchComments();
  }, [slug]); // Re-run the effect if the slug changes

  return (
    <>
      {/* Render the comments section only if there are comments */}
      {comments.length > 0 && (
        <div className="rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 duration-500 text-white p-8 pb-12 mb-8">
          {/* Section container with styling for background, padding, and hover effects */}
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {/* Header showing the number of comments */}
            {comments.length} Comments
          </h3>
          {/* Loop through the comments and render each one */}
          {comments.map((comment, index) => (
            <div
              key={index} // Unique key for each comment item
              className="rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 hover:-translate-y-1 duration-500 pt-4 pl-4 mb-4 pb-4"
            >
              {/* Container for individual comment with hover effects */}
              <p className="mb-4 text-gray-300">
                {/* Comment author name and formatted date */}
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("DD / MM / YY [at] HH:mm")}
              </p>
              <p className="whitespace-pre-line text-white w-full ml-3">
                {/* Parsed comment text (supports HTML) */}
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
