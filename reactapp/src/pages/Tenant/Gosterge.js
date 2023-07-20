import React, { useEffect, useState } from 'react'
import Card from '../../components/tenant/dash/Card';
import Barometer from '../../components/tenant/dash/Barometer';
import Grafik from '../../components/tenant/dash/Grafik';
import Table from '../../components/tenant/dash/Table';
import Map from '../../components/tenant/dash/Map';
import SidebarGosterge from '../../components/tenant/SidebarGosterge';
import Dial from '../../components/dash/dial';
import Temp from '../../components/dash/temp';
import { useTenant } from '../../Context/TenantContext';
import { useLocation } from 'react-router-dom';
import { Background } from 'victory';
import { useAuth } from '../../Context/AuthContext';


function Gosterge() {
  const {selectedChart,sonData} =useTenant();
  const [cihaz,setCihaz]=useState({});
  const [gosterge,setGosterge]=useState({});




  const renderChart=()=>{
    switch (selectedChart) {
      case 1:
        return <Dial value={sonData} title="Sıcaklık" />;
      case 2:
        return <Temp value={sonData}/>;
      case 3:
        return <Barometer id="dial9" value={sonData} title="Sıcaklık" />;
      default:
        return null;
    };
  }; 


  return (
    <div className='home'>
      <div className='dashboard'>
      <div className='dials'>
      <Card className='info' />
      {renderChart()}
      <SidebarGosterge/>
      <Map className='leaflet-container'/>
      </div>
      <div className='grafik' >
      <div className='grafik2'>
        <Grafik />
      </div>
       <Table/>
      </div>
      </div>
    </div>
  )
}

export default Gosterge