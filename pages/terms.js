import React from "react";
import Head from "next/head"; // Import for setting meta tags and page title

const TermsAndConditions = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Head section to define meta tags, title, and favicon */}
        <Head>
          <title>Terms and Conditions - SLT Pressclub</title>{" "}
          {/* Set page title */}
          <link rel="icon" href="/slt_pressclub_logo.png" /> {/* Set favicon */}
        </Head>

        {/* Main content wrapper with padding and centered text */}
        <div className="flex-grow container mx-auto lg:p-8 p-2 py-12 text-white">
          <div className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 rounded-3xl shadow-2xl p-8">
            {/* Title of the Terms and Conditions page */}
            <h1 className="text-3xl text-white font-bold text-center mb-8">
              Terms and Conditions
            </h1>

            {/* Introduction section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
              <p>
                Welcome to the SLT Press Club website (“Site”). By accessing or
                using our website, you agree to comply with and be bound by the
                following Terms and Conditions. If you do not agree with any
                part of these terms, please do not use our website.
              </p>
            </section>

            {/* Use of Website */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Use of Website</h2>
              <p>
                - The Site is intended for students, staff, and the general
                public to read, share, and interact with content related to the
                SLT Press Club.
                <br />
                - You must be at least 13 years old to use the Site.
                <br />- You agree to use the Site only for lawful purposes and
                in a way that does not infringe on the rights of others.
              </p>
            </section>

            {/* User-Generated Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                User-Generated Content (Comments and Posts)
              </h2>
              <p>
                Users may submit comments on posts. By submitting a comment, you
                grant SLT Press Club a non-exclusive, royalty-free license to
                use, reproduce, and display your content on the Site.
              </p>
              <p>Users must not:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Share false, misleading, or defamatory information.</li>
                <li>Post content that is offensive or discriminatory.</li>
                <li>Violate any laws or regulations.</li>
              </ul>
              <p>
                We reserve the right to remove any comments that violate these
                terms.
              </p>
            </section>

            {/* Privacy and Data Collection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Privacy and Data Collection
              </h2>
              <p>
                - By using our website, you agree to our{" "}
                <a href="/privacy-policy" className="text-blue-600">
                  Privacy Policy
                </a>
                .
                <br />
                - We collect names and email addresses when users post comments.
                <br />
                - We do not sell, rent, or share this information with third
                parties.
                <br />- We use industry-standard security measures to protect
                user data but cannot guarantee absolute security.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Intellectual Property
              </h2>
              <p>
                The content published on this Site, including articles, images,
                and logos, is the intellectual property of SLT Press Club unless
                otherwise stated. You may not copy, distribute, or reproduce any
                content without permission.
              </p>
            </section>

            {/* External Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">External Links</h2>
              <p>
                The Site may contain links to third-party websites. We do not
                control or endorse these external sites and are not responsible
                for their content or privacy policies.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Limitation of Liability
              </h2>
              <p>
                The information on this Site is for general purposes only. We do
                not guarantee the accuracy, completeness, or reliability of any
                content. SLT Press Club is not responsible for any direct or
                indirect damages resulting from your use of the Site.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Termination</h2>
              <p>
                We may suspend or terminate your access to our website or
                services at any time, without notice, for any reason, including
                violation of these terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
              <p>
                These Terms and Conditions will be governed by and construed in
                accordance with the laws of our jurisdiction. Any disputes
                arising from the use of our website or services will be subject
                to the exclusive jurisdiction of the courts in our location.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Changes to These Terms
              </h2>
              <p>
                We reserve the right to update or modify these Terms and
                Conditions at any time. Any changes will be posted on this page,
                and the date at the top of the page will be updated to reflect
                the latest revision. We encourage you to review these terms
                periodically.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p>
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:sltpressclub@gmail.com"
                  className="text-blue-600"
                >
                  sltpressclub@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
