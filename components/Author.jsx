import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import { graphCMSImageLoader } from "../util";

const Member = ({ member }) => (
  <div className="text-center mt-20 mb-8 p-12 rounded-3xl bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500">
    {/* Member Image */}
    <div className="mb-6">
      <Image
        loader={graphCMSImageLoader}
        alt={`Photo of ${member.name}`}
        width={120}
        height={120}
        className="rounded-full object-cover shadow-lg mx-auto" // Centered and shadow for better UI
        src={member.photo.url}
      />
    </div>

    {/* Member Name */}
    <h3 className="text-white text-2xl font-bold mb-2">{member.name}</h3>

    {/* Member Role */}
    <p className="text-gray-300 text-lg mb-4">{member.role}</p>

    {/* Member Bio */}
    <p className="text-white text-lg mb-6">{member.bio}</p>

    {/* Button to Member Page */}
    <Link href={`/members/${member.slug}`}>
      <a className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-600 transition duration-300">
        View Profile
      </a>
    </Link>
  </div>
);

export default Member;
