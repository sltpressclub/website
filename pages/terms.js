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
        <div className="flex-grow container mx-auto px-6 py-12 text-white">
          <div className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 rounded-3xl shadow-2xl p-8">
            {/* Title of the Terms and Conditions page */}
            <h1 className="text-3xl text-white font-bold text-center mb-8">
              Terms and Conditions
            </h1>

            {/* Introduction section of the terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
              <p>
                Welcome to SLT Pressclub! By using our website and services, you
                agree to comply with and be bound by the following Terms and
                Conditions. If you do not agree to these terms, please do not
                use our website.
              </p>
            </section>

            {/* Acceptable Use section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Acceptable Use</h2>
              <p>
                You agree to use our website and services only for lawful
                purposes and in a manner that does not infringe upon the rights
                of others or restrict their use and enjoyment of the website.
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Do not engage in any illegal activity.</li>
                <li>
                  Do not upload harmful content, such as malware or viruses.
                </li>
                <li>
                  Respect other users' privacy and intellectual property rights.
                </li>
              </ul>
            </section>

            {/* User Account and Registration section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">User Account</h2>
              <p>
                To access certain features of our website, you may need to
                register for an account. You are responsible for maintaining the
                confidentiality of your account credentials and for all
                activities that occur under your account.
              </p>
            </section>

            {/* Intellectual Property section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Intellectual Property
              </h2>
              <p>
                The content and materials available on our website, including
                text, images, logos, and other intellectual property, are
                protected by copyright and other intellectual property laws. You
                may not use, reproduce, or distribute any content without proper
                authorization.
              </p>
            </section>

            {/* Limitation of Liability section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Limitation of Liability
              </h2>
              <p>
                SLT Pressclub will not be liable for any direct, indirect,
                incidental, special, or consequential damages arising from your
                use of our website or services, including but not limited to
                loss of data, loss of profits, or other damages resulting from
                the use or inability to use our services.
              </p>
            </section>

            {/* Termination section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Termination</h2>
              <p>
                We may suspend or terminate your access to our website or
                services at any time, without notice, for any reason, including
                violation of these terms.
              </p>
            </section>

            {/* Governing Law section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
              <p>
                These Terms and Conditions will be governed by and construed in
                accordance with the laws of your jurisdiction. Any disputes
                arising from the use of our website or services will be subject
                to the exclusive jurisdiction of the courts in your location.
              </p>
            </section>

            {/* Changes to Terms section */}
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

            {/* Contact Us section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p>
                If you have any questions or concerns regarding these Terms and
                Conditions, please contact us at:
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
