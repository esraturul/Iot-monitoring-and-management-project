import  {React, useEffect} from 'react';
import Dial from '../components/dash/dial.js';
import Card from '../components/dash/OutlinedCard.js';
import Temp from '../components/dash/temp.js';
import Barometer from '../components/dash/barometer.js';
import Grafik from '../components/dash/cizgiGrafik.js';
import Table from '../components/dash/table.js';
import  { useData } from '../Context/context';


function Dash() {

  const{data,veri}= useData();


return (
  <div className='dash'>
    <div className="dials">
      <Card className='info' />
      <Barometer id="dial9" value={data} title="Sıcaklık" />
    </div>
    <div className='grafik' >
      <div className='grafik2'>
        <Grafik />
      </div>

      <Table/>

    </div> 
  </div>

  )
}

export default Dash