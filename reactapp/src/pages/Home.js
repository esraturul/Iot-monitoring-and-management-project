import React from 'react'
import AlarmCard from '../components/AlarmCard';
import CihazCard from '../components/CihazCard';
function Home() {
  return (
    <div className='homeCard'>
      <AlarmCard/>
      <CihazCard/>
    </div>
  )
}

export default Home