import React from "react";
import moment from "moment"; // For date formatting
import { graphCMSImageLoader } from "../util"; // Custom image loader for GraphCMS

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

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
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            src={obj.src} // Directly use the URL for the src attribute
            height={obj.height}
            width={obj.width}
            className="rounded-3xl"
          />
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
    <div className="bg-black hover:bg-opacity-75 hover:-translate-y-1 duration-500 bg-opacity-50 rounded-3xl lg:p-8 pb-12 mb-8">
      {/* Post Featured Image */}
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt="Post featured image"
          className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          height={500}
          width={800}
        />
      </div>

      <div className="px-4 lg:px-0">
        {/* Member and Date */}
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
            <img
              alt={post.member.name}
              height={30}
              width={30}
              className="align-middle rounded-full"
              src={post.member.photo.url}
            />
            <p className="inline align-middle text-white ml-2 font-medium text-lg">
              {post.member.name}
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

        {/* Post Content */}
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) =>
            getContentFragment(itemindex, item.text, item)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
