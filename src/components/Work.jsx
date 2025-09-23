import React from "react";
import { motion } from "framer-motion";
import ImageMarque from "../components/ImageMarquee"
const stepsData = [
  {
    title: "Register",
    description: "Sign up on the SafeCampus website using your college ID.",
  },
  {
    title: "Report",
    description: "Submit a complaint and indicate the affected area.",
  },
  {
    title: "Forward",
    description: "Your report is securely forwarded to the campus administrator.",
  },
];

const Work = () => {
  return (
   <div className="min-h-screen">
     <section className="bg-gray-50 py-16 px-6 md:px-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          How It Works
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          A simple 3-step process to ensure campus safety and accountability.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stepsData.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6">
              {/* Badge + Title */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-600 text-white font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-700 text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    <ImageMarque/>
   </div>
  
  );
};

export default Work;
