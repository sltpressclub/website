import React from "react";
import Image from "next/image"; // Next.js Image component for optimized image loading
import Link from "next/link"; // For navigation
import { graphCMSImageLoader } from "../util"; // Custom image loader for GraphCMS

const Member = ({ member }) => {
  // Fallback values for missing data
  const { name, role, bio, photo, slug } = member || {};
  const profileImageUrl = photo?.url || "/default-avatar.png"; // Fallback profile image
  const profileRole = role?.name || "No role specified"; // Fallback role
  const profileBio = bio || "No bio available."; // Fallback bio

  // Ensure the slug is available
  if (!slug) {
    console.error("Slug is missing for member:", member);
  }

  return (
    <div className="text-center mt-20 mb-8 p-12 rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500">
      {/* Member Image */}
      <div className="mb-6">
        <Image
          loader={graphCMSImageLoader}
          alt={`Photo of ${name || "Member"}`}
          width={120}
          height={120}
          className="rounded-full object-cover shadow-lg mx-auto"
          src={profileImageUrl} // Use the fallback if no image
        />
      </div>
      {/* Member Name */}
      <h3 className="text-white text-2xl font-bold mb-2">
        {name || "Unknown Member"}
      </h3>
      {/* Member Role */}
      {role && <p className="text-gray-300 text-lg mb-4">{profileRole}</p>}
      {/* Member Bio */}
      <p className="text-white text-lg mb-6">{profileBio}</p>
      {/* Button to Member Page */}
      {slug && (
        <Link href={`/members/${slug}`}>
          <a className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-600 transition duration-300">
            View Profile
          </a>
        </Link>
      )}
      {!slug && <p className="text-red-500">Slug missing for {name}</p>}{" "}
      {/* Display a message if no slug */}
    </div>
  );
};

export default Member;
