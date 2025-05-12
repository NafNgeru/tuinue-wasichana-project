import React from "react";

const AboutPage = () => {
  return (
    <section className="bg-blue-100 text-gray-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h1
          className="text-4xl font-bold text-center mb-8 lg:mb-12"
          style={{ color: "black" }}
        >
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

          {/* ... rest of your content ... */}

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
