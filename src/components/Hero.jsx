import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: "Ensuring Safety, One Campus at a Time",
    subtitle: "Track, report, and prevent unsafe activities in your college.",
    image: "./11.png",
  },
  {
    title: "Anonymous Reporting. Instant Action.",
    subtitle: "Students can freely voice concerns without fear.",
    image: "./12.png",
  },
  {
    title: "Red Zones? Stay Informed.",
    subtitle: "Live updates on unsafe zones in your institution.",
    image: "./14.png",
  },
];

const HeroWithNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-green-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wide">SafeCampus</div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Zones</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <button className="bg-white text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition">
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="relative h-[90vh] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
              <h2 className="text-4xl md:text-5xl text-white font-bold">
                {slide.title}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
                {slide.subtitle}
              </p>
              <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition">
                Explore Dashboard
              </button>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                idx === activeIndex
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white"
              }`}
            ></span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroWithNav;
