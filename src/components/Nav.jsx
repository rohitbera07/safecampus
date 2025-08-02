import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setShowMenu(false); // close menu after clicking
    }
  };

  return (
    <div className="relative z-50">
      {/* Backdrop when menu is open */}
      {showMenu && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Floating Toggle Button */}
      <div className="fixed top-2 left-2 z-50">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-700 hover:bg-zinc-600 transition-colors duration-300 shadow-lg"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      {/* Slide-In Menu from Left */}
      <div
        className={`fixed top-14 left-2 z-50 bg-transparent transform transition-transform duration-300 ${
          showMenu ? "translate-x-0 opacity-100" : "-translate-x-64 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2">
          <button
            onClick={() => scrollToSection("home")}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 shadow-md w-fit"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 shadow-md w-fit"
          >
            How it works?
          </button>
          <button
            onClick={() => scrollToSection("safety")}
            className="px-4 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-600 shadow-md w-fit"
          >
            Safety Measures
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md w-fit"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
