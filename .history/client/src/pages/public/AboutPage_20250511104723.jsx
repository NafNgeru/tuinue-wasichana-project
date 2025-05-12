import React from "react";

const AboutPage = () => {
  return (
    <section className="bg-blue-100 text-gray-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8 lg:mb-12">
          Who We Are: Tuinue Wasichana
        </h1>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg leading-relaxed mb-6">
            <strong className="font-semibold text-blue-600">
              Tuinue Wasichana
            </strong>{" "}
            is more than just a donation platform — it's a transformative
            movement that seeks to uplift, empower, and protect the dignity of
            school-going girls across Sub-Saharan Africa. At our core, we
            believe that no girl should miss out on an education because of her
            period, nor should she be forced into silence by stigma, poverty, or
            systemic inequality.
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              Our mission is to create a sustainable ecosystem of support where
              menstrual hygiene is accessible, education is uninterrupted, and
              girls can rise into their full potential with confidence and
              dignity. We harness the power of recurring donations and community
              partnerships to deliver menstrual health kits, educational
              programs, mentorship, and life skills training directly to schools
              and underserved communities.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Why We Exist
            </h2>
            <p className="text-lg leading-relaxed">
              In many parts of Sub-Saharan Africa, girls miss school for up to 5
              days each month due to a lack of menstrual products, eventually
              leading many to drop out entirely. This is not just a health issue
              — it's a human rights issue. Tuinue Wasichana exists to challenge
              this injustice and rewrite the future for thousands of young girls
              by breaking the silence, bridging the resource gap, and advocating
              for lasting change.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Our Values
            </h2>
            <ul
              className="list-disc ml-auto mr-auto text-lg space-y-3"
              style={{ maxWidth: "300px" }}
            >
              <li>
                <strong className="font-semibold text-blue-600">
                  Empowerment:
                </strong>{" "}
                We invest in girls’ potential as leaders, thinkers, and
                change-makers.
              </li>
              <li>
                <strong className="font-semibold text-blue-600">
                  Dignity:
                </strong>{" "}
                Every girl deserves to feel confident and unashamed of her body
                and her period.
              </li>
              <li>
                <strong className="font-semibold text-blue-600">Equity:</strong>{" "}
                We fight to close the opportunity gap caused by poverty and
                gender bias.
              </li>
              <li>
                <strong className="font-semibold text-blue-600">
                  Transparency:
                </strong>{" "}
                We ensure every donation is traceable and impactful.
              </li>
              <li>
                <strong className="font-semibold text-blue-600">
                  Community:
                </strong>{" "}
                We collaborate with schools, families, and local leaders to
                drive grassroots impact.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Our Approach
            </h2>
            <p className="text-lg leading-relaxed">
              Tuinue Wasichana combines technology and compassion. Donors can
              give through our platform knowing that every contribution directly
              funds meaningful interventions — from sanitary pad distribution to
              building girl-friendly sanitation facilities and hosting
              leadership camps. We work hand-in-hand with educators and
              community leaders to identify needs and ensure sustainable
              delivery of support.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Our Impact So Far
            </h2>
            <p className="text-lg leading-relaxed">
              Thanks to our growing network of donors and partners, we've
              reached thousands of girls across rural and peri-urban areas,
              improved school attendance, and helped open conversations around
              menstruation and gender. But this is just the beginning — the need
              is vast, and we are determined to scale our mission across the
              continent.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              Join Us
            </h2>
            <p className="text-lg leading-relaxed">
              Whether you're a donor, a volunteer, a teacher, or a passionate
              advocate, there is space for you in this mission. Let’s stand
              together to ensure that every girl is given the freedom to thrive
              — not in spite of her gender, but because of her strength.
            </p>
          </div>

          <p className="text-center text-xl font-semibold text-blue-500 mt-8">
            Tuinue Wasichana — Uplifting Her Today. Empowering the Future
            Forever.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
