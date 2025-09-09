import React from "react";
import { Shield, ClipboardCheck, BellRing } from "lucide-react";

const SafetyMeasures = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
       Benifits
      </h2>

      <div className="grid md:grid-cols-3 gap-16 max-w-6xl">
        {/* First Card */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-green-100">
            <Shield className="w-14 h-14 text-blue-600" />
          </div>
          <p className="text-lg text-sky-600 font-medium">
            College students can enhance their safety by being aware of their
            surroundings, utilizing campus resources, and taking preventative
            measures against potential risks.
          </p>
        </div>

        {/* Second Card */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-green-100">
            <ClipboardCheck className="w-14 h-14 text-blue-600" />
          </div>
          <p className="text-lg text-sky-600 font-medium">
            Staying alert, walking in well-lit areas, and sharing travel plans
            with someone trusted can significantly improve personal safety.
          </p>
        </div>

        {/* Third Card */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-green-100">
            <BellRing className="w-14 h-14 text-blue-600" />
          </div>
          <p className="text-lg text-sky-600 font-medium">
            Always keep emergency contacts accessible and use campus alert
            systems to quickly notify authorities during urgent situations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyMeasures;
