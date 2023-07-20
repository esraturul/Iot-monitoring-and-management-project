import React from 'react'
import Card from '../../components/tenant/TenantCard';
import AlarmCard from '../../components/tenant/AlarmCard';
import { useTenant } from '../../Context/TenantContext';

function Home() {

  return (
    <div className='home'>
        <div className='cardTenant'>
        <Card icerik={'Müşteri'} /> 
        <Card icerik={'Cihaz'} />
        <AlarmCard/>
        
        </div>
        
        
        
      
    </div>
  )
}

export default Home
