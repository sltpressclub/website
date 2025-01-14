import React from "react";
import Head from "next/head";
import { Member } from "../components"; // Import the Member component
import { getMembers } from "../services"; // Import service to fetch members
import Loader from "../components/Loader"; // Import the Loader component

const Members = ({ members }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent text-white">
      <Head>
        <title>Members | SLT Pressclub</title>
        <link rel="icon" href="/slt_pressclub_logo.png" />
      </Head>

      {/* Member Grid */}
      <div className="w-full px-4 md:px-10 mb-8 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-12">Our Members</h1>

        {/* Member Cards */}
        {members.length === 0 ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {members.map((member) => (
              <Member key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Fetch members on every request
export async function getServerSideProps() {
  const members = (await getMembers()) || []; // Fetch members
  return {
    props: { members },
  };
}

export default Members;
