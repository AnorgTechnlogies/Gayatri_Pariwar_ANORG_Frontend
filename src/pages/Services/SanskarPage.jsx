import React, { useState, useRef } from "react";
import { Sun } from "lucide-react";

const sanskarDetails = {
  "Annaprashan Sanskar": {
    title: "Annaprashan Sanskar",
    desc: "The sacred ceremony of first feeding of solid food to the child, usually performed in the 6th or 8th month.",
    significance: "Symbolizes the beginning of nourishment beyond mother's milk and introduction to worldly tastes with divine blessings.",
    mantra: "ॐ अन्नपतेन्नस्य नो देहि अनमीवस्य शतिनः..."
  },
  "Antyeshti Sanskar": {
    title: "Antyeshti Sanskar",
    desc: "The final sacrament performed after death, guiding the soul towards liberation.",
    significance: "Helps the departed soul attain peace and merge with the divine consciousness.",
    mantra: "ॐ अग्नये स्वाहा इदं न मम ॥"
  },
  "Birthday Marriage Anniversary": {
    title: "Birthday & Marriage Anniversary",
    desc: "Celebrating life milestones with gratitude, Gayatri mantra jaap, and Yajna.",
    significance: "Renewing commitment to dharma, family, and spiritual growth."
  },
  "Deeksha Sanskar": {
    title: "Deeksha Sanskar",
    desc: "Initiation into Gayatri Sadhana and spiritual discipline under Guru guidance.",
    significance: "Marks the beginning of conscious spiritual journey."
  },
  "Janna Divas Sanskar": {
    title: "Janna Divas Sanskar",
    desc: "Celebration of birth anniversary with reflection, gratitude, and sankalp for better living.",
    significance: "Turning every birthday into a spiritual renewal day."
  },
  "Mundan Sanskar": {
    title: "Mundan Sanskar",
    desc: "The ritual of first hair-cutting of the child, usually at a holy place.",
    significance: "Removal of past life impressions and beginning of new spiritual phase."
  },
  "Namkaran Sanskar": {
    title: "Namkaran Sanskar",
    desc: "Naming ceremony performed on the 11th or 21st day after birth.",
    significance: "Giving a meaningful name based on Vedic astrology and spiritual values."
  },
  "Punsavan Sanskar": {
    title: "Punsavan Sanskar",
    desc: "Performed in the 3rd month of pregnancy for healthy development of the child.",
    significance: "Prayers for physical, mental, and spiritual well-being of the unborn child."
  },
  "Vanaprastha Sanskar": {
    title: "Vanaprastha Sanskar",
    desc: "Transition into retired life focused on spirituality and service.",
    significance: "Detachment from worldly duties, deeper sadhana, and guiding the next generation."
  },
  "Vidyarambh Sanskar": {
    title: "Vidyarambh Sanskar",
    desc: "Initiation into education and learning, usually at age 5.",
    significance: "Beginning formal education with the blessings of Maa Saraswati and Gayatri."
  },
  "Vivah Divas Sanskar": {
    title: "Vivah Divas Sanskar",
    desc: "Marriage anniversary celebrated with Yajna and renewal of sacred vows.",
    significance: "Strengthening marital bond through spiritual commitment."
  },
  "Yajnopaveet Sanskar": {
    title: "Yajnopaveet Sanskar",
    desc: "The sacred thread ceremony marking entry into Brahmacharya ashram.",
    significance: "Acceptance of responsibility to follow dharma and pursue knowledge."
  }
};

const SanskarPage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  const naamkaranRef = useRef(null);
  const vivahRef = useRef(null);
  const mundanRef = useRef(null);

  const pauseOtherVideos = (currentKey) => {
    const refs = { naamkaran: naamkaranRef, vivah: vivahRef, mundan: mundanRef };
    Object.keys(refs).forEach((key) => {
      if (key !== currentKey && refs[key].current) {
        refs[key].current.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    });
  };

  const handleVideoClick = (videoKey) => {
    if (playingVideo === videoKey) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoKey);
      pauseOtherVideos(videoKey);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      {/* Header */}
      <header className="text-orange-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="py-2 text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-orange-700">
            Sacred Vedic Life Ceremonies
          </p>
          <p className="mt-4 text-lg sm:text-xl text-orange-700 font-bold">
            All World Gayatri Pariwar • San Antonio, Texas
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-10 sm:space-y-12">
            {/* Google Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-300">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-900 mb-6 text-center">
                Book a Sanskar Ceremony
              </h3>
              <div className="w-full bg-white rounded-2xl overflow-hidden border-4 border-amber-200 shadow-lg">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdUb7H-Q3U7q773OUAibjyTnz9yIqq4jJuamldsS7IfeTQgJA/viewform?embedded=true"
                  className="w-full h-[1200px] sm:h-[1400px] md:h-[1500px] border-0"
                  title="Sanskar Booking Form"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
                Fill out the form to schedule any Vedic Sanskar with Gayatri Pariwar, San Antonio.
              </p>
            </div>

            {/* Quote */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-amber-200">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-amber-900 font-medium">
                The 16 Vedic Sanskars purify every stage of life — from conception to the final journey —
                building cultured families and a divine society.
              </p>
            </div>

            {/* 16 Sanskars List */}
            <div className="space-y-4">
              {[
                { name: "Garbhadhan", desc: "Conception – Prayer for a virtuous child" },
                { name: "Punsavan", desc: "Early pregnancy – Protection of fetus" },
                { name: "Simantonayan", desc: "Baby shower – Mental peace for mother & child" },
                { name: "Jatakarma", desc: "Birth – Welcome with mantras" },
                { name: "Naamkaran", desc: "Naming ceremony with spiritual meaning" },
                { name: "Nishkraman", desc: "First outing to nature & sunlight" },
                { name: "Annaprashan", desc: "First solid food with prayers" },
                { name: "Mundan", desc: "Head shaving for purity & health" },
                { name: "Karnavedh", desc: "Ear piercing for intellect & immunity" },
                { name: "Vidyarambh", desc: "Start of education – Saraswati blessing" },
                { name: "Upanayan", desc: "Sacred thread & student life initiation" },
                { name: "Vedarambh", desc: "Beginning of Vedic studies" },
                { name: "Samavartan", desc: "Graduation – Entry into adulthood" },
                { name: "Vivah", desc: "Sacred Vedic marriage" },
                { name: "Vanaprastha", desc: "Retirement & spiritual service" },
                { name: "Antyeshti", desc: "Last rites – Peaceful journey of soul" }
              ].map((s, i) => (
                <details key={i} open={i < 6} className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
                  <summary className="flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 cursor-pointer hover:bg-amber-50 transition text-base sm:text-lg font-semibold text-orange-800">
                    <span>{i + 1}. {s.name} Sanskar</span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-gray-700 text-sm sm:text-base leading-relaxed bg-amber-50/70">
                    {s.desc}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {/* Live Sanskar Videos */}
            <div className="space-y-6">

              {/* Naamkaran Sanskar */}
              <div
                onClick={() => handleVideoClick("naamkaran")}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-300 cursor-pointer group"
              >
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-center py-3">
                  <p className="font-bold text-lg sm:text-xl">Naamkaran Sanskar</p>
                </div>
                {playingVideo === "naamkaran" ? (
                  <div className="aspect-video">
                    <iframe
                      ref={naamkaranRef}
                      src="https://www.youtube-nocookie.com/embed/YXkD9jmvxuQ?autoplay=1&rel=0&enablejsapi=1"
                      title="Naamkaran Sanskar"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-black">
                    <img
                      src="https://img.youtube.com/vi/YXkD9jmvxuQ/maxresdefault.jpg"
                      alt="Naamkaran Sanskar Thumbnail"
                      className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 p-4 rounded-full shadow-2xl group-hover:scale-125 transition-transform">
                        <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Vedic Vivah Sanskar */}
              <div
                onClick={() => handleVideoClick("vivah")}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-300 cursor-pointer group"
              >
                <div className="bg-gradient-to-r from-pink-600 to-amber-600 text-white text-center py-3">
                  <p className="font-bold text-lg sm:text-xl">Vedic Vivah Sanskar</p>
                </div>
                {playingVideo === "vivah" ? (
                  <div className="aspect-video">
                    <iframe
                      ref={vivahRef}
                      src="https://www.youtube-nocookie.com/embed/sMibhy2lyGM?autoplay=1&rel=0&enablejsapi=1"
                      title="Adarsh Vivah Sanskar - Ideal Marriage @ Gayatri Pariwar"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-black">
                    <img
                      src="https://img.youtube.com/vi/sMibhy2lyGM/maxresdefault.jpg"
                      alt="Vedic Vivah Sanskar Thumbnail"
                      className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 p-4 rounded-full shadow-2xl group-hover:scale-125 transition-transform">
                        <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mundan Sanskar */}
              <div
                onClick={() => handleVideoClick("mundan")}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-300 cursor-pointer group"
              >
                <div className="bg-gradient-to-r from-teal-600 to-amber-600 text-white text-center py-3">
                  <p className="font-bold text-lg sm:text-xl">Mundan Sanskar</p>
                </div>
                {playingVideo === "mundan" ? (
                  <div className="aspect-video">
                    <iframe
                      ref={mundanRef}
                      src="https://www.youtube-nocookie.com/embed/2F34x57oucU?autoplay=1&rel=0&enablejsapi=1"
                      title="Mundan Sanskar"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-black">
                    <img
                      src="https://img.youtube.com/vi/2F34x57oucU/maxresdefault.jpg"
                      alt="Mundan Sanskar Thumbnail"
                      className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 p-4 rounded-full shadow-2xl group-hover:scale-125 transition-transform">
                        <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* About Gayatri Pariwar */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 sm:p-8 shadow-2xl border-t-8 border-amber-700">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-900 mb-6 text-center flex items-center justify-center flex-wrap gap-3">
                <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-600" />
                About All World Gayatri Pariwar
              </h3>
              <div className="space-y-5 text-gray-800 text-base sm:text-lg leading-relaxed">
                <p>
                  All World Gayatri Pariwar is a global spiritual organization founded by Pandit Shriram Sharma Acharya (Yug Rishi) dedicated to moral and spiritual awakening through the revival of Vedic culture and Gayatri Mantra sadhana.
                </p>
                <p>
                  With millions of devotees worldwide, the mission focuses on individual transformation, family upliftment, and creation of a divine society based on truth, love, and compassion.
                </p>
                <p className="text-center mt-6">
                  <span className="font-bold text-orange-700">San Antonio Chapter</span><br />
                  Serving the community with authentic Vedic rituals, spiritual discourses, and cultural programs.
                </p>
              </div>
            </div>

            {/* More Articles Section */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-6 sm:p-8 shadow-xl border-t-8 border-orange-600">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-900 mb-8 text-center flex items-center justify-center flex-wrap gap-3">
                <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" /> More Articles
              </h3>

              {!selectedArticle ? (
                <ul className="space-y-4">
                  {Object.keys(sanskarDetails).map((article, i) => (
                    <li key={article}>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="w-full group flex items-center justify-between p-4 sm:p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:bg-orange-50 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md">
                            {i + 1}
                          </div>
                          <span className="text-left text-base sm:text-lg font-semibold text-gray-800 group-hover:text-orange-700">
                            {article}
                          </span>
                        </div>
                        <div className="text-orange-600 group-hover:translate-x-2 transition">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-300">
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
                      {sanskarDetails[selectedArticle].title}
                    </h2>
                    <button onClick={() => setSelectedArticle(null)} className="text-red-600 hover:scale-125 transition text-3xl sm:text-4xl font-bold">
                      ×
                    </button>
                  </div>

                  <div className="space-y-6 sm:space-y-8 text-gray-700 text-base sm:text-lg">
                    <p className="leading-relaxed bg-amber-50 p-5 sm:p-6 rounded-2xl border-l-8 border-orange-600">
                      {sanskarDetails[selectedArticle].desc}
                    </p>

                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 sm:p-6 rounded-2xl">
                      <p className="font-bold text-orange-800 text-lg sm:text-xl mb-3">Spiritual Significance:</p>
                      <p className="italic leading-relaxed">
                        {sanskarDetails[selectedArticle].significance}
                      </p>
                    </div>

                    {sanskarDetails[selectedArticle].mantra && (
                      <div className="bg-orange-50 p-6 sm:p-8 rounded-2xl text-center text-xl sm:text-2xl text-orange-900 font-bold border-4 border-dashed border-amber-600">
                        {sanskarDetails[selectedArticle].mantra}
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-8 sm:mt-10">
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-lg sm:text-xl py-3 sm:py-4 px-8 sm:px-12 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                    >
                      ← Back to All Articles
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanskarPage;