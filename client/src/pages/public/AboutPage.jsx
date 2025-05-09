import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-white text-gray-800 px-6 py-16 font-sans leading-relaxed">
      <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 drop-shadow-sm">
        About Us: <span className="text-pink-600">Tuinue Wasichana</span>
      </h1>

      <div className="flex flex-col items-center space-y-10">
        {/* Intro */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 transition hover:shadow-2xl">
          <p className="text-xl text-gray-700 text-center">
            <strong className="text-pink-600">Tuinue Wasichana</strong> is a
            movement to uplift, empower, and protect the dignity of school-going
            girls in Sub-Saharan Africa. No girl should miss school due to her
            period.
          </p>
        </div>

        {/* Mission */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            🎯 Our Mission
          </h2>
          <p className="text-xl text-gray-700 text-center">
            We create a support system where menstrual hygiene is accessible,
            education continues, and girls thrive with dignity and confidence.
          </p>
        </div>

        {/* Why We Exist */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            ❗ Why We Exist
          </h2>
          <p className="text-xl text-gray-700 text-center">
            Many girls miss school or drop out entirely due to lack of menstrual
            products. We exist to challenge this injustice and rewrite their
            future.
          </p>
        </div>

        {/* Core Values (Animated with framer-motion) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 transition hover:shadow-2xl mt-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🌱 Our Core Values
          </h2>
          <div className="text-xl text-gray-700 space-y-4 text-center">
            <p>
              💪 <strong>Empowerment:</strong> Supporting girls to lead and
              thrive.
            </p>
            <p>
              💖 <strong>Dignity:</strong> Encouraging pride and confidence in
              womanhood.
            </p>
            <p>
              ⚖️ <strong>Equity:</strong> Closing gender and economic gaps.
            </p>
            <p>
              🔍 <strong>Transparency:</strong> Making donations impactful and
              visible.
            </p>
            <p>
              🤝 <strong>Community:</strong> Building change with local
              partners.
            </p>
          </div>
        </motion.div>

        {/* Our Approach */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            🔧 Our Approach
          </h2>
          <p className="text-xl text-gray-700 text-center">
            We blend innovation and empathy — from sanitary pad delivery to
            leadership programs — all designed and delivered with community
            collaboration.
          </p>
        </div>

        {/* Impact */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            📊 Our Impact
          </h2>
          <p className="text-xl text-gray-700 text-center">
            We’ve reached thousands of girls, improved school attendance, and
            opened conversations around menstruation. But this is just the
            beginning.
          </p>
        </div>

        {/* Join Us */}
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10 transition hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            🤝 Join Us
          </h2>
          <p className="text-xl text-gray-700 text-center">
            Whether you’re a donor, teacher, volunteer, or advocate — your
            support can transform lives. Let’s uplift girls together.
          </p>
        </div>

        {/* Tagline */}
        <p className="text-2xl font-semibold text-pink-600 mt-12 text-center tracking-wide">
          Tuinue Wasichana — Uplifting Her Today. Empowering the Future Forever.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
