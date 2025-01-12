import React from "react";
import Head from "next/head";

const About = () => {
  return (
    <div>
      {/* Main container for the "About Us" page */}
      <div className="flex flex-col min-h-screen bg-black bg-opacity-30 hover:bg-opacity-50 transition duration-500 rounded-3xl m-8">
        <div className="container mx-auto px-10 mb-8 flex-grow">
          {/* Add meta information for the page */}
          <Head>
            <title>About Us - SLT Pressclub</title> {/* Page title */}
            <link rel="icon" href="/slt_pressclub_logo.png" /> {/* Favicon */}
          </Head>

          {/* About Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
            {/* Text Section */}
            <div className="col-span-1">
              <h1 className="text-4xl font-semibold text-white mb-4">
                About Us
              </h1>
              {/* Description of the platform */}
              <p className="text-lg text-white">
                Welcome to SLT Pressclub! We are a community-driven platform
                where passionate individuals come together to share ideas,
                stories, and news on various topics ranging from technology to
                social issues.
              </p>
              <p className="text-lg text-white mt-4">
                Our goal is to provide a space for everyone to contribute their
                thoughts, whether it’s through blog posts, discussions, or
                events. We believe in the power of collaboration and collective
                learning.
              </p>
            </div>

            {/* Image Section */}
            <div className="col-span-1">
              {/* Replace with an actual image that represents the platform */}
              <img
                src="/slt_pressclub_logo.png" // Logo or placeholder image
                alt="SLT Pressclub" // Alt text for the image
                height={500} // Fixed height for the image
                width={500} // Fixed width for the image
                className="rounded-lg" // Apply rounded corners to the image
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
