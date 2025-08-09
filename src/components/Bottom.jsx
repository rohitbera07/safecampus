import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const Bottom = () => {
  return (
    <div className="bg-zinc-100 text-gray-800 rounded-lg shadow-2xl w-full mt-8 mx-auto min-h-screen px-6 py-12">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-green-700">Contact Us</h2>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12">
        {/* Form Section */}
        <form className="w-11/12 md:w-2/5 border-slate-100 border-solid border-[2px] shadow-2xl rounded bg-slate-100 p-4 space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              id="name"
              required
              className="peer w-full border-b-2  border-gray-300 focus:border-green-600 outline-none py-7 px-1 bg-transparent placeholder-transparent"
              placeholder="Your Name"
            />
            <label
              htmlFor="name"
              className="absolute left-1 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-700"
            >
              Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-green-600 outline-none py-7 px-1 bg-transparent placeholder-transparent"
              placeholder="you@example.com"
            />
            <label
              htmlFor="email"
              className="absolute left-1 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-700"
            >
              Email
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              rows="4"
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-green-600 outline-none py-7 px-1 bg-transparent placeholder-transparent resize-none"
              placeholder="Your message..."
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-1 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-green-700"
            >
              Message
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 font-semibold shadow-md"
          >
            Send Message
          </button>
        </form>

        {/* Animation */}
        <div className="w-full md:w-1/2">
          <AnimatedBackground />
        </div>
      </div>
    </div>
  );
};

export default Bottom;
