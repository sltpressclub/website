import React, { useEffect, useState } from "react";
import moment from "moment"; // Library for formatting dates
import parse from "html-react-parser"; // Library to safely parse HTML strings
import { getComments } from "../services"; // Import the new getComments function

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]); // State to store comments
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const result = await getComments(slug); // Fetch comments for the given slug
      setComments(result);
      setLoading(false);
    };

    fetchComments();
  }, [slug]);

  if (loading) {
    return <p>Loading comments...</p>; // Loading state
  }

  if (comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>; // No comments state
  }

  return (
    <div className="rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 duration-500 text-white p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {comments.length} Comments
      </h3>
      {comments.map((comment) => (
        <div
          key={comment.id} // Use a unique key for each comment
          className="rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 duration-500 p-4 mb-4"
        >
          <p className="mb-4 text-gray-300">
            <span className="font-semibold">{comment.name}</span> on{" "}
            {moment(comment.createdAt).format("DD/MM/YYYY [at] HH:mm")}
          </p>
          <p className="whitespace-pre-line text-white">
            {parse(comment.comment)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
