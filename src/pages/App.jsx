
import React from 'react'
import Hero from '../components/Hero'
import Nav from '../components/Nav'

import Work from '../components/Work'

import Bottom from '../components/Bottom'
import Footer from '../components/Footer'

import ImageMarquee from '../components/ImageMarquee'
import Safety from '../components/Safety'




const App = () => {
  return (
    <div className="  overflow-hidden min-h-screen">
        <Hero/>
        <Work/>
        <Safety/>
        <Bottom/>
        <Footer/>
    </div>
  )
}

export default App
