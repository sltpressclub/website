import React from "react";
import Head from "next/head"; // Import for setting meta tags and page title

const History = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        {/* Head section to define meta tags, title, and favicon */}
        <Head>
          <title>Our History - Sir Leckraz Teelock SSS</title>
          <link rel="icon" href="/slt_school_logo.png" />
        </Head>

        {/* Main content wrapper with padding and centered text */}
        <div className="flex-grow container mx-auto lg:p-8 p-2 py-12 text-white">
          <div className="bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-500 rounded-3xl shadow-2xl p-8">
            {/* Title of the History page */}
            <h1 className="text-3xl text-white font-bold text-center mb-8">
              Our History
            </h1>

            {/* Founding and Establishment */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Origins and Establishment
              </h2>
              <p>
                Sir Leckraz Teelock State Secondary School (SLT SSS), located in
                Central Flacq, Mauritius, was established in 1972 as the Junior
                Technical School. It initially admitted 70 students (35 boys and
                35 girls). By 1974, the first Form III classes were introduced,
                and in 1978, the school was converted into a Junior Secondary
                School.
              </p>
              <p>
                On May 3, 1985, the school was renamed{" "}
                <strong>Sir Leckraz Teelock State Secondary School</strong> in
                honor of <strong>Sir Leckraz Teelock, CBE (1909–1982)</strong>,
                a prominent Mauritian leader who served as an MLA and later as
                High Commissioner in London.
              </p>
            </section>

            {/* Academic Excellence and Growth */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Academic Excellence and Growth
              </h2>
              <p>
                The school has maintained a legacy of academic distinction,
                producing multiple laureates who excelled at the national level:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>1997:</strong> First Laureate – Sandhoo Navin
                </li>
                <li>
                  <strong>1999:</strong> Second Laureate – Chicoree Youdish
                </li>
                <li>
                  <strong>2006:</strong> Third Laureate – Ramdoyal Arvind
                </li>
                <li>
                  <strong>2012:</strong> Fourth Laureate – Seechurn Girish
                  (Science Side with Additional Scholarship)
                </li>
                <li>
                  <strong>2015:</strong> Fifth Laureate – Badaye Hemant Kumar
                  (Economics Side with Additional Scholarship)
                </li>
                <li>
                  <strong>2018:</strong> Sixth Laureate – Suntoo Priktish
                  (Science Side with Additional Scholarship)
                </li>
                <li>
                  <strong>2019:</strong> Seventh Laureate – Dulloo Muhammad
                  Altaff (Science Side with Additional Scholarship)
                </li>
                <li>
                  <strong>2022:</strong> Eighth Laureate – Hurry Yashil
                  (Economics Side with Additional Scholarship)
                </li>
              </ul>
            </section>

            {/* Infrastructure Development */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Infrastructure Development
              </h2>
              <p>
                Over the years, SLT SSS has undertaken major infrastructure
                projects:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>2008:</strong> Renovation and transformation into a
                  National School
                </li>
                <li>
                  <strong>2010-2011:</strong> Construction of the Recreational
                  Corner
                </li>
                <li>
                  <strong>2012:</strong> Introduction of an Activity Room
                </li>
                <li>
                  <strong>2013:</strong> Establishment of a new canteen
                </li>
                <li>
                  <strong>2019-2023:</strong> Construction of a new Science
                  Block
                </li>
              </ul>
            </section>

            {/* Extracurricular Activities */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Extracurricular Activities
              </h2>
              <p>
                The school offers a wide range of extracurricular programs,
                including the SLT Press Club, inter-school competitions, science
                fairs, cultural events, and environmental awareness initiatives
                such as the GLOBE Program.
              </p>
            </section>

            {/* Online Presence and Media Coverage */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                Online Presence and Media Coverage
              </h2>
              <p>
                SLT SSS actively engages with students and alumni through social
                media platforms. The school has also been featured in the{" "}
                <em>Mauritius Times</em> and on <em>TOP FM Mauritius</em>,
                highlighting its achievements and contributions to education.
              </p>
            </section>

            {/* Looking Ahead */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Looking Ahead</h2>
              <p>
                As SLT SSS continues to grow, it remains committed to
                innovation, digital transformation, and academic excellence.
                Investments in infrastructure and technology will ensure that
                students are well-prepared for the challenges of the modern
                world.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p>For more information about SLT SSS, please contact us:</p>
              <p>
                Email:{" "}
                <a href="mailto:sltrector@govmu.org" className="text-blue-600">
                  sltrector@govmu.org
                </a>
              </p>
              <p>Phone: 413 2740</p>
              <p>
                Website:{" "}
                <a href="http://sltsss.edu.gov.mu" className="text-blue-600">
                  sltsss.edu.gov.mu
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
