import React from "react";
import Head from "next/head"; // Import for setting meta tags and page title

const History = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Head section to define meta tags, title, and favicon */}
        <Head>
          <title>Our History - SLT School</title> {/* Set page title */}
          <link rel="icon" href="/slt_school_logo.png" /> {/* Set favicon */}
        </Head>

        {/* Main content wrapper with padding and centered text */}
        <div className="flex-grow container mx-auto px-6 py-12 text-white">
          <div className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 rounded-3xl shadow-2xl p-8">
            {/* Title of the History page */}
            <h1 className="text-3xl text-white font-bold text-center mb-8">
              Our History
            </h1>

            {/* Founding section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Founding</h2>
              <p>
                SLT School was established in 1950 with a vision to provide
                quality education to students in our community. What began as a
                small schoolhouse with just 50 students has grown into a
                vibrant, diverse educational institution that serves over 2,000
                students each year.
              </p>
            </section>

            {/* Growth and Milestones section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Growth and Milestones
              </h2>
              <p>
                Over the decades, SLT School has continuously evolved to meet
                the changing needs of our students and society. Here are some of
                our notable milestones:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>1965:</strong> Introduction of science and arts
                  laboratories to enhance hands-on learning.
                </li>
                <li>
                  <strong>1980:</strong> Launch of the school's first computer
                  lab, making us one of the pioneers in tech-enabled education
                  in the region.
                </li>
                <li>
                  <strong>1995:</strong> Expansion of our campus to include a
                  state-of-the-art sports complex.
                </li>
                <li>
                  <strong>2010:</strong> Initiation of environmental awareness
                  programs and a student-led recycling initiative.
                </li>
                <li>
                  <strong>2020:</strong> Transition to hybrid learning during
                  the global pandemic, ensuring uninterrupted education.
                </li>
              </ul>
            </section>

            {/* Values and Vision section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Values and Vision</h2>
              <p>
                At SLT School, we are guided by our core values of integrity,
                respect, and excellence. Our mission is to foster a love of
                learning, critical thinking, and social responsibility in every
                student. We envision a future where our students contribute
                meaningfully to their communities and the world.
              </p>
            </section>

            {/* Alumni section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Our Alumni</h2>
              <p>
                SLT School takes pride in its alumni, many of whom have gone on
                to achieve remarkable success in various fields, including
                education, science, arts, business, and public service. Our
                alumni network remains active, mentoring current students and
                contributing to the school's ongoing growth.
              </p>
            </section>

            {/* Looking Ahead section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Looking Ahead</h2>
              <p>
                As we look to the future, SLT School remains committed to
                innovation and excellence. With ongoing investments in
                infrastructure, technology, and professional development, we aim
                to prepare our students to thrive in an ever-changing world.
              </p>
            </section>

            {/* Contact Us section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p>
                For more information about SLT School's history and programs,
                please contact us:
              </p>
              <p>
                Email:{" "}
                <a href="mailto:info@sltschool.com" className="text-blue-600">
                  info@sltschool.com
                </a>
              </p>
              <p>Phone: +1-555-123-4567</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
