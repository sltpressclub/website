import React from "react";
import Head from "next/head"; // Import for setting meta tags and page title

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Head section to define meta tags, title, and favicon */}
        <Head>
          <title>Privacy Policy - SLT Pressclub</title> {/* Set page title */}
          <link rel="icon" href="/slt_pressclub_logo.png" /> {/* Set favicon */}
        </Head>

        {/* Main content wrapper with padding and centered text */}
        <div className="flex-grow container mx-auto px-6 py-12 text-white">
          <div className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 rounded-3xl shadow-2xl p-8">
            {/* Title of the Privacy Policy page */}
            <h1 className="text-3xl text-white font-bold text-center mb-8">
              Privacy Policy
            </h1>

            {/* Introduction section of the policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
              <p>
                At SLT Pressclub, we prioritize your privacy and are committed
                to safeguarding your personal information. This Privacy Policy
                describes the types of information we collect, how we use it,
                and how we protect your data. By using our website and services,
                you agree to the practices outlined in this Privacy Policy.
              </p>
            </section>

            {/* Information Collection section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Information We Collect
              </h2>
              <p>
                We collect several types of information to enhance your
                experience on our platform. These include both personal data you
                provide directly and data collected automatically through the
                use of our services.
              </p>

              {/* Personal Information section */}
              <h3 className="text-xl font-semibold mt-4">
                1. Personal Information
              </h3>
              <p>
                We may collect personal information that you provide to us,
                including:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number (if provided)</li>
                <li>Any other information you voluntarily submit</li>
              </ul>

              {/* Usage Data section */}
              <h3 className="text-xl font-semibold mt-4">2. Usage Data</h3>
              <p>
                We automatically collect data about how you interact with our
                website and services, such as:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited, time spent, and navigation paths</li>
                <li>
                  Device information (e.g., operating system, screen resolution)
                </li>
                <li>Cookies and tracking technologies (explained below)</li>
              </ul>

              {/* Cookies and Tracking Technologies section */}
              <h3 className="text-xl font-semibold mt-4">
                3. Cookies and Tracking Technologies
              </h3>
              <p>
                Our website uses cookies, web beacons, and other tracking
                technologies to enhance your experience and analyze website
                traffic. You can control cookies through your browser settings,
                but please note that disabling certain cookies may affect your
                ability to use some features of our site.
              </p>
            </section>

            {/* How we use the collected information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                How We Use Your Information
              </h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  To provide, operate, and improve our services and content.
                </li>
                <li>
                  To personalize your experience and recommend relevant content.
                </li>
                <li>
                  To communicate with you, respond to inquiries, and address
                  your concerns.
                </li>
                <li>
                  To send newsletters, updates, and promotional material (only
                  if you opt-in).
                </li>
                <li>
                  To monitor and analyze usage and trends on the website for
                  optimization.
                </li>
                <li>
                  To ensure security, prevent fraud, and enforce our terms and
                  conditions.
                </li>
              </ul>
            </section>

            {/* Data Protection and Security section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Data Protection and Security
              </h2>
              <p>
                We take your data security seriously and implement a variety of
                technical and organizational measures to protect your personal
                information from unauthorized access, alteration, and
                disclosure. These include encryption, secure servers, and
                regular security audits. However, no method of data transmission
                or storage can guarantee 100% security, and we cannot ensure the
                absolute security of your data.
              </p>
            </section>

            {/* Your Rights and Control over data */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Your Rights and Control
              </h2>
              <p>
                As a user, you have several rights regarding the personal data
                we hold about you:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Access:</strong> You have the right to request access
                  to the personal data we store about you.
                </li>
                <li>
                  <strong>Correction:</strong> You can request that we update or
                  correct any inaccurate information.
                </li>
                <li>
                  <strong>Deletion:</strong> You may request that we delete your
                  personal data, subject to legal obligations.
                </li>
                <li>
                  <strong>Restriction:</strong> You can request that we restrict
                  the processing of your personal data in certain circumstances.
                </li>
                <li>
                  <strong>Objection:</strong> You can object to our processing
                  of your data for certain purposes.
                </li>
                <li>
                  <strong>Data Portability:</strong> You have the right to
                  request a copy of your personal data in a structured,
                  machine-readable format.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:sltpressclub@gmail.com"
                  className="text-blue-600"
                >
                  sltpressclub@gmail.com
                </a>
                .
              </p>
            </section>

            {/* Changes to Privacy Policy section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page, and the date at the top of the
                policy will be updated to reflect the latest revision. We
                encourage you to review this Privacy Policy periodically for any
                changes.
              </p>
            </section>

            {/* Contact Us section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or concerns
                about how we handle your personal data, please contact us at:
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

export default PrivacyPolicy;
