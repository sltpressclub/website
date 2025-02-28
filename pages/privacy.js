import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Head>
          <title>Privacy Policy - SLT Pressclub</title>
          <link rel="icon" href="/slt_pressclub_logo.png" />
        </Head>

        <div className="flex-grow container mx-auto lg:p-8 p-2 py-12 text-white">
          <div className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 rounded-3xl shadow-2xl p-8">
            <h1 className="text-3xl text-white font-bold text-center mb-8">
              Privacy Policy
            </h1>

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

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Information We Collect
              </h2>
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

              <h3 className="text-xl font-semibold mt-4">2. Usage Data</h3>
              <p>
                We automatically collect data about how you interact with our
                website, such as:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited, time spent, and navigation paths</li>
                <li>
                  Device information (e.g., operating system, screen resolution)
                </li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  To provide, operate, and improve our services and content.
                </li>
                <li>
                  To personalize your experience and recommend relevant content.
                </li>
                <li>
                  To communicate with you, respond to inquiries, and address
                  concerns.
                </li>
                <li>
                  To send newsletters, updates, and promotional material (if you
                  opt-in).
                </li>
                <li>To monitor and analyze website usage for optimization.</li>
                <li>
                  To ensure security, prevent fraud, and enforce terms and
                  conditions.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Data Protection and Security
              </h2>
              <p>
                We implement technical and organizational measures to protect
                your personal data from unauthorized access, alteration, and
                disclosure. However, no online platform can guarantee complete
                security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Your Rights and Control
              </h2>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Access:</strong> Request access to your personal data.
                </li>
                <li>
                  <strong>Correction:</strong> Request updates or corrections to
                  inaccurate data.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of personal data
                  (subject to legal obligations).
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of
                  processing under certain conditions.
                </li>
                <li>
                  <strong>Objection:</strong> Object to data processing for
                  specific purposes.
                </li>
                <li>
                  <strong>Data Portability:</strong> Request a copy of your data
                  in a structured format.
                </li>
              </ul>
              <p>
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:sltpressclub@gmail.com"
                  className="text-blue-600"
                >
                  sltpressclub@gmail.com
                </a>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy periodically. Any changes will
                be reflected on this page, and the "Effective Date" will be
                updated.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy,
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

export default PrivacyPolicy;
