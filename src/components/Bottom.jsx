import React from 'react';
import AnimatedBackground from './AnimatedBackground';

const Bottom = () => {
  return (
    <div className="bg-zinc-100 text-gray-800 rounded-lg shadow-2xl w-full mt-5 mx-auto min-h-screen px-6 py-12">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-blue-500">Feedback</h2>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12">
        {/* Form Section */}
      <form className="w-full max-w-sm border border-slate-200 shadow-md rounded-lg bg-white p-4 md:p-6 space-y-4">
  {/* Name */}
  <div className="flex flex-col space-y-1">
    <label htmlFor="name" className="text-xs font-medium text-gray-700">
      Name
    </label>
    <input
      type="text"
      id="name"
      required
      className="w-full rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-green-200 outline-none py-2 px-3 bg-white text-sm"
      placeholder="Enter your name"
    />
  </div>

  {/* Email */}
  <div className="flex flex-col space-y-1">
    <label htmlFor="email" className="text-xs font-medium text-gray-700">
      Email
    </label>
    <input
      type="email"
      id="email"
      required
      className="w-full rounded-md border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-green-200 outline-none py-2 px-3 bg-white text-sm"
      placeholder="you@example.com"
    />
  </div>

  {/* Message */}
  <div className="flex flex-col space-y-1">
    <label htmlFor="message" className="text-xs font-medium text-gray-700">
      Message
    </label>
    <textarea
      id="message"
      rows="3"
      required
      className="w-full rounded-md border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-200 outline-none py-2 px-3 bg-white text-sm resize-none"
      placeholder="Your message..."
    ></textarea>
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 font-medium shadow-sm text-sm"
  >
    Send
  </button>
</form>





        {/* Animation */}
        
      </div>
    </div>
  );
};

export default Bottom;
