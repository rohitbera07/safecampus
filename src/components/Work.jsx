import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import animationData from '../assets/animations/Thinking.json';

const steps = [
  "Register on the SafeCampus website with your college ID.",
  "Report the complaint and select the affected area.",
  "Your report is forwarded to the campus admin.",
];

const Work = () => {
  return (
    <div className="h-full w-10/12 p-4 md:p-6 bg-zinc-700 rounded-xl m-1">
      <h2 className="text-zinc-50 font-jua text-3xl md:text-5xl  tracking-wide">
        HOW IT WORKS ?
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Lottie Animation */}
        <Lottie 
          animationData={animationData} 
          autoplay 
          className="w-4/5 md:w-[400px] lg:w-[500px]" 
        />

        {/* Animated Steps */}
        <div className="w-[90%] md:w-[50%] space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="text-zinc-100 text-xl md:text-2xl bg-zinc-800 p-4 rounded-lg shadow-lg border border-zinc-700"
            >
              <span className="text-lime-400 font-semibold mr-2">Step {index + 1}:</span>
              {step}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

