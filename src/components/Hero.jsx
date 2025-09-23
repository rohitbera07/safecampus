import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";
import side from "../assets/side.png";

export default function Hero() {
  return (
    <div className="w-screen flex flex-col md:flex-row min-h-screen">
      {/* Left Text Section */}
      <section className="relative md:w-[50vw] h-full flex flex-col justify-center items-center ">
        
        {/* Navigation Bar
        <nav className="w-full flex justify-center items-center  mb-8">
          <ul className="flex gap-6 text-gray-700 font-medium border-solid border-[1px] border-zinc-500 rounded-xl px-2">
            <li><a href="#contact" className="hover:text-black transition px-2">Contact</a></li>
            <li><a href="#work" className="hover:text-black transition px-2">Work</a></li>
            <li><a href="#benefits" className="hover:text-black transition px-2">Benefits</a></li>
          </ul>
        </nav> */}

        {/* Logo */}
        <div className="mb-4">
          <img src={logo} alt="" className="w-[150px] h-[150px] mx-2"/>
        </div>

        {/* Pill banner */}
        <div className="mb-2">
          <a
            href="#"
            className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Get yourself login 
            <ArrowRight className="ml-1 h-3 w-3" />
          </a>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-4xl mt-4 text-center">
          Your Voice for a Safer Campus
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 text-center">
          A set of beautifully designed components that you can customize, extend,
          and build on. Start here then make it your own. Open Source. Open Code.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="bg-black text-white hover:bg-black/90">
            Get Started
          </Button>
        </div>
      </section>

      {/* Right Image Section */}
      <div className="relative md:w-[50vw] h-screen">
        {/* Image */}
        <img src={side} alt="" className="h-full w-full object-cover" />
        
        {/* White Gradient Overlay */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-40 bg-gradient-to-r from-white to-transparent"></div>
      </div>
    </div>
  );
}
