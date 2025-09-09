import React from "react";
import { Link } from "react-router-dom";

const HeroWithNav = () => {
  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wide">SafeCampus</div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#work" className="hover:underline">How it works</a>
            <a href="#info" className="hover:underline">Measures</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
          <button className="bg-white text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-green-100 transition">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row h-[90vh] items-center justify-center"
      >
        {/* Left Side - Image */}
        <div className="w-4/5 m-2 md:w-1/2 h-4/5 ">
          <img
            src="./logo.jpeg" // replace with your uploaded image path
            alt="Campus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Text */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-white px-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Campus Voice
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-md">
            Your Safety, Our Priority. Report, track, and stay informed about
            campus safety anytime.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition">
            Explore Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroWithNav;
