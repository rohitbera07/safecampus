import React from 'react' 
import measure1 from '../assets/measure1.png'
import measures from '../assets/measures.jpeg'
const How = () => {
  return (
    <div className='bg-zinc-200   flex flex-col h-screen w-full justify-center items-center p-4'>
      <div className='text-3xl md:mb-2 font-mono'>Safety Measures</div>
      <img src={measures} alt="" className=' hidden md:block shadow-lg h-[90%] w-full rounded-2xl' />
      <div className='md:hidden h-[50%] w-[80%] border-solid '>
       <img src={measure1} alt="" className='h-full w-[100%]'/>
      </div>
      <div className='h-[60%] w-[95%] md:hidden '>
       <ul className=' mb-1 text-center'>
        <li className=' font-jua p-1 shadow-xl bg-zinc-100 m-1 rounded-xl'>Stay aware of your surroundings </li>
        <li className='font-jua p-1 shadow-xl bg-zinc-100 m-1 rounded-xl'>Keep belongings safe and secure</li>
        <li className='font-jua p-1 shadow-xl bg-zinc-100 m-1 rounded-xl'>Remember your campus emergency number</li>
        <li className='font-jua p-1 shadow-xl bg-zinc-100 m-1 rounded-xl'>Follow safety drills and safe routes</li>
       </ul>
      </div>
    </div>
  )
}

export default How
