
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

       <div id='work' className='flex justify-center bg-zinc-50 py-1  min-h-screen'>
        <Work/>
       </div>
           <ImageMarquee/>
     
    
         <div id='info' className='w-screen min-h-screen'>
          <Safety/>
         </div>
       <div id='contact' className='  min-h-screen '>
        <Bottom/>
       </div>
       <Footer/>
    </div>
  )
}

export default App
