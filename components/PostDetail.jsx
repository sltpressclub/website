import React from "react";
import moment from "moment"; // For date formatting
<<<<<<< HEAD
import Image from "next/image"; // For optimized images in Next.js

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

=======

// PostDetail component - Displays detailed view of a single blog post
const PostDetail = ({ post }) => {
  // Helper function to render different types of content (headings, paragraphs, images, videos)
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    // Apply text formatting based on the object properties (bold, italic, underline)
>>>>>>> aa30bf4946ae6a7d022f666372deb979c004d831
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

<<<<<<< HEAD
=======
    // Return different content types based on the 'type' of fragment
>>>>>>> aa30bf4946ae6a7d022f666372deb979c004d831
    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4 text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8 text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4 text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
<<<<<<< HEAD
      case "image":
        return (
          <div key={index} className="rounded-3xl overflow-hidden mb-8">
            <Image
              alt={obj.title}
              src={obj.src}
              layout="responsive"
              width={obj.width || 800} // Default width if not provided
              height={obj.height || 450} // Default height if not provided
            />
          </div>
=======
      case "heading-five":
        return (
          <h5 key={index} className="text-md font-semibold mb-4 text-white">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h5>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="rounded-3xl"
          />
>>>>>>> aa30bf4946ae6a7d022f666372deb979c004d831
        );
      case "video":
        return (
          <video
            key={index}
            controls
            width={obj.width || "100%"}
            height={obj.height || "auto"}
            src={obj.src}
            className="rounded-3xl"
          >
            Your browser does not support the video tag.
          </video>
        );
      default:
        return modifiedText;
    }
  };

  return (
<<<<<<< HEAD
    <div className="bg-black hover:bg-opacity-75 hover:-translate-y-1 duration-500 bg-opacity-50 rounded-3xl lg:p-8 pb-12 mb-8">
      {/* Post featured image section */}
      <div className="relative overflow-hidden shadow-md mb-6 rounded-t-lg lg:rounded-lg">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          layout="responsive"
          width={800} // Default width for featured image
          height={450} // Default height for featured image
          className="object-cover"
        />
      </div>

      <div className="px-4 lg:px-0">
        {/* Author and Date Section */}
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            <Image
              alt={post.author.name}
              src={post.author.photo.url}
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className="inline align-middle text-white ml-2 font-medium text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>

        {/* Post Title */}
        <h1 className="mb-8 text-3xl font-semibold text-white">{post.title}</h1>

        {/* Post content */}
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) =>
            getContentFragment(itemindex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
=======
    <>
      <div className="bg-black hover:bg-opacity-75 hover:-translate-y-1 duration-500 bg-opacity-50  rounded-3xl lg:p-8 pb-12 mb-8">
        {/* Post featured image section */}
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post.featuredImage.url} // URL for the post's featured image
            alt=""
            className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          {/* Author and Date Section */}
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={post.author.name} // Author photo
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url} // URL of the author's photo
              />
              <p className="inline align-middle text-white ml-2 font-medium text-lg">
                {post.author.name} {/* Display author's name */}
              </p>
            </div>
            <div className="font-medium text-white">
              {/* Post creation date */}
              <svg
                xmlns="http://www.w3.org/2000/svg" // SVG for a calendar icon
                className="h-6 w-6 inline mr-2 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(post.createdAt).format("MMM DD, YYYY")}{" "}
                {/* Display post's creation date */}
              </span>
            </div>
          </div>
          {/* Post Title */}
          <h1 className="mb-8 text-3xl font-semibold text-white">
            {post.title} {/* Display the title of the post */}
          </h1>
          {/* Post content - Map through children and render accordingly */}
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) =>
              getContentFragment(itemindex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </>
>>>>>>> aa30bf4946ae6a7d022f666372deb979c004d831
  );
};

export default PostDetail;
