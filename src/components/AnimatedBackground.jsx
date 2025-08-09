import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  let oldX = 0;
  let oldY = 0;
  let deltaX = 0;
  let deltaY = 0;

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = (e) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };

    container.addEventListener("mousemove", handleMouseMove);

    imageRefs.current.forEach((img) => {
      img.addEventListener("mouseenter", () => {
        const tl = gsap.timeline({ onComplete: () => tl.kill() });

        tl.timeScale(1.2);

        tl.to(img, {
          inertia: {
            x: { velocity: deltaX * 30, end: 0 },
            y: { velocity: deltaY * 30, end: 0 },
          },
        });

        tl.fromTo(
          img,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      });
    });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 👇 Replace with your actual paths
  const emojis = ["/1.png", "/2.png", "/3.png"];

  return (
    <div
      ref={containerRef}
      className=" flex-col hidden md:flex sm:flex-row items-center justify-center gap-8 p-8"
    >
      {emojis.map((src, index) => (
        <div
          key={index}
          className="w-42 h-42 sm:w-64 sm:h-64 shadow-neutral-500 shadow-sm rounded-2xl flex items-center justify-center"
        >
          <img
            ref={(el) => (imageRefs.current[index] = el)}
            src={src}
            alt={`emoji-${index}`}
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain pointer-events-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
