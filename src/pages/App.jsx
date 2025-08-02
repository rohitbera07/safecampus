
import React from 'react'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import How from '../components/How'
import Work from '../components/Work'

import Bottom from '../components/Bottom'
import Footer from '../components/Footer'
import Logo from '../components/Logo'



const App = () => {
  return (
    <div className="overflow-hidden min-h-screen bg-[url('./assets/bg.jpg')] bg-cover bg-center">
  <Nav />

  {/* Hero Section with Dark Overlay */}
  <div
    id="home"
    className="mb-4 h-screen relative bg-[url('/10.jpg')] bg-cover bg-center flex flex-col opacity-0 animate-fadeIn animate-fill-forwards"
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

    {/* Content goes above the overlay */}
    <div className="relative z-20 flex justify-center items-center">
      <Hero />
    </div>
  </div>


       <div id='work' className='flex justify-center py-1 min-h-screen'>
        <Work/>
       </div>
      <div id='safety' className=" w-11/12 min-h-screen m-auto p-1 md:h-screen ">
        <How/>
       </div>
       <div id='contact' className='min-h-screen '>
        <Bottom/>
       </div>
       <Footer/>
    </div>
  )
}

export default App
