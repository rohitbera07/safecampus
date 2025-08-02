import React from 'react'
import Lottie from 'lottie-react';
import animationData from '../assets/animations/1MpOlcwm93.json'
import AnimatedBackground from './Animatedbackground';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate()
      const handleGetStarted = () => {
    navigate('/signup'); // or wherever you want to route
  };
  return (
    
      <div className='flex  md:flex-row flex-col md:justify-center items-center h-screen'>
        <div className='flex  gap-2 justify-center items-center flex-col w-full h-full'>
        <div className='text-slate-50  font-jua text-4xl md:text-9xl'> 
      Safe Campus
    </div>
    <div className='text-md text-cyan-50 font-jua'>Students' safety is our topmost priority</div>
    <div><button className='m-2 w-32 h-9 bg-zinc-800 text-zinc-50 hover:bg-zinc-600  rounded-2xl' onClick={handleGetStarted}>GET STARTED</button></div>
      </div>
     {/* <img src="/1.png" className='w-[30%] hidden md:block h-[80%]' alt="" /> */}
      </div>
    
  )
}

export default Hero 