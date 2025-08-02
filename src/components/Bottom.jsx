import React from 'react';
import contact from '../assets/contact.png';
import AnimatedBackground from './AnimatedBackground';

const Bottom = () => {
  return (
    <div className="bg-zinc-900 bg-opacity-90  rounded-lg shadow-lg w-full mt-2 mx-auto min-h-screen p-6 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-100">Contact Us</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Image Section */}
       

        {/* Form Section */}
        <form className="w-full md:w-2/6 space-y-5 z-99">
          <div>
            <label className="block text-gray-100 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-100 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-100 mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Your message..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-100 text-black py-3 rounded-md hover:bg-zinc-200 transition duration-300"
          >
            Send Message
          </button>
        </form>
         <div className="w-full md:w-1/2 ">
        <AnimatedBackground/>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
