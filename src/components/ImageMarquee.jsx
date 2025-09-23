import React from "react";

const bulletPoints = [
  "Stay alert and aware of surroundings",
  "Walk in well-lit areas at night",
  "Share travel plans with trusted friends",
  "Use campus security resources",
  "Take preventative safety measures",
  "Trust your instincts and avoid risky areas",
  "Report suspicious activity immediately",
];

const InfoMarquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-3 px-8 bg-gray-50 group">
      <div className="inline-block animate-marquee group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
        {bulletPoints.map((point, idx) => (
          <span
            key={idx}
            className="inline-flex items-center text-4xl text-zinc-600 font-mono mx-6"
          >
            |   {point}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfoMarquee;
