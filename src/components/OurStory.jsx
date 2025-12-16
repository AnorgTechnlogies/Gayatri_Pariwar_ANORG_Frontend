// src/components/OurStory.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import shantikunj from "../assets/shantikunj.jpg";

const OurStory = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-12 px-6 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold text-orange-800 text-center mb-10">
          Our Shantikunj Story
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text */}
  
          <div className="text-gray-700 text-lg leading-6 pl-6 md:pl-10 lg:pl-12 text-justify">
            <p className="mb-6">
              Under the divine and subtle presence of
              <span className="block text-2xl font-bold text-orange-600 mt-3">
                Param Pujya Gurudev Pt. Shriram Sharma Acharya
              </span>
              <span className="text-orange-600 font-medium">
                (Founder – अखिल विश्व गायत्री परिवार)
              </span>
              , we established All World Gayatri Pariwar in San Antonio, Texas.
            </p>

            <p className="mb-6">
              Our mission is to promote <strong>Scientific Spirituality</strong> through Gayatri Mantra Japa,
              Yagyopathy, Meditation, Yoga, and Pranayama.
            </p>

            <p className="mb-8">
              This divine path brightens intellect, nurtures compassion, and deepens reverence for Nature.
            </p>

            <button
              onClick={() => navigate("/divine-guides")}
              className="xl:text-2xl xl:px-12 xl:py-5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl px-10 py-4 rounded-full shadow-2xl transition transform hover:scale-105"
            >
              Meet Our Guiding Souls
            </button>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={shantikunj}
              alt="Shantikunj Haridwar"
              className="rounded-2xl shadow-2xl w-full max-w-lg border-8 border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;