import React from "react";
import Head from "next/head"; // Import Head for SEO optimization
import Member from "../components/Member"; // Assuming Member component exists

// Fetch member data on every request
export async function getServerSideProps() {
  let memberData = [];

  try {
    // Example of fetching member data from an API or CMS
    const res = await fetch("https://your-api-endpoint.com/members"); // Replace with your API endpoint
    if (res.ok) {
      memberData = await res.json(); // Parse the member data
    } else {
      console.error("Error fetching member data:", res.statusText);
    }
  } catch (error) {
    console.error("Error fetching member data:", error);
  }

  return {
    props: { memberData }, // Return member data as props
  };
}

const MembersPage = ({ memberData }) => {
  return (
    <div className="container mx-auto p-8">
      <Head>
        <title>Meet Our Team | SLT Pressclub</title>
        <meta
          name="description"
          content="Learn more about the talented individuals in our SLT Pressclub team."
        />
        <meta property="og:title" content="Meet Our Team | SLT Pressclub" />
        <meta
          property="og:description"
          content="Get to know the members of the SLT Pressclub and their roles in shaping our content and projects."
        />
        <meta property="og:image" content="/default-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/members" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourwebsite.com/members" />
        <meta
          name="keywords"
          content="SLT Pressclub, team members, writers, content creators, press club"
        />
      </Head>

      <h1 className="text-white text-3xl font-semibold mb-12">Meet Our Team</h1>

      {/* Grid layout for displaying members in 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {memberData && memberData.length > 0 ? (
          memberData.map((member) => (
            <Member key={member.id} member={member} /> // Render the Member component
          ))
        ) : (
          <p className="text-white">No members found.</p>
        )}
      </div>
    </div>
  );
};

export default MembersPage;
