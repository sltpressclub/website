import React from "react";
import Head from "next/head"; // Import for setting meta tags and page title

const Mission = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Head section to define meta tags, title, and favicon */}
        <Head>
          <title>Our Mission - SLT School</title> {/* Set page title */}
          <link rel="icon" href="/slt_school_logo.png" /> {/* Set favicon */}
        </Head>

        {/* Main content wrapper with padding and centered text */}
        <div className="flex-grow container mx-auto px-6 py-12 text-white">
          <div className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 rounded-3xl shadow-2xl p-8">
            {/* Title of the Mission page */}
            <h1 className="text-3xl text-white font-bold text-center mb-8">
              Our Mission
            </h1>

            {/* Mission Statement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Our Purpose</h2>
              <p>
                At SLT School, our mission is to empower every student with the
                knowledge, skills, and values necessary to achieve their full
                potential and contribute meaningfully to the world. We are
                dedicated to fostering a love for lifelong learning, innovation,
                and global citizenship.
              </p>
            </section>

            {/* Core Values */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Core Values</h2>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Integrity:</strong> Cultivating honesty and strong
                  moral principles in all we do.
                </li>
                <li>
                  <strong>Excellence:</strong> Striving for the highest
                  standards in education and beyond.
                </li>
                <li>
                  <strong>Inclusivity:</strong> Embracing diversity and ensuring
                  every student feels valued.
                </li>
                <li>
                  <strong>Innovation:</strong> Encouraging creativity and
                  critical thinking to solve global challenges.
                </li>
                <li>
                  <strong>Community:</strong> Building a culture of
                  collaboration and mutual respect.
                </li>
              </ul>
            </section>

            {/* Educational Approach */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Our Approach</h2>
              <p>
                SLT School combines rigorous academics with a holistic approach
                to education, focusing on personal growth, leadership, and
                social responsibility. Our curriculum is designed to inspire
                curiosity, critical thinking, and a drive for innovation.
              </p>
            </section>

            {/* Commitment to the Future */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Commitment to the Future
              </h2>
              <p>
                As we prepare our students to meet the challenges of tomorrow,
                SLT School is committed to integrating sustainability,
                technology, and ethics into every aspect of education. We aim to
                nurture compassionate leaders who will shape a better future.
              </p>
            </section>

            {/* Community Involvement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Community Involvement
              </h2>
              <p>
                We believe in the power of community. SLT School actively
                partners with local organizations and families to create
                opportunities for growth, service, and meaningful connections.
              </p>
            </section>

            {/* Call to Action */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Join Us in Our Mission
              </h2>
              <p>
                Together, we can make a difference. Be a part of SLT School's
                journey to empower future generations through education and
                innovation. Contact us today to learn more about our mission and
                programs.
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

export default Mission;
