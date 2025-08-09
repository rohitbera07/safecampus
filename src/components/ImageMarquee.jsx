import React from "react";

const images = [
  "./4.png",
  "./4.png",
  "./4.png",
  "./4.png",
  "./4.png",
  "./4.png",
  "./4.png", // repeat to simulate infinite
  "./4.png",
   "./4.png",
  "./4.png",
  "./4.png",
  "./4.png",
  "./4.png",
  "./4.png",
  "./4.png", // repeat to simulate infinite
  "./4.png",
];

const ImageMarquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-10 px-8 bg-white group">
      <div className="inline-block animate-marquee group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`logo-${idx}`}
            className="inline-block h-16 mx-6"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageMarquee;
