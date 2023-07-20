import {React,useEffect,useState} from 'react';
import {VictoryLine , VictoryChart, VictoryTheme} from 'victory';
//import { fetchDevice } from '../../api'; 
//import { w3cwebsocket as W3CWebSocket } from "websocket";
//import { border } from '@mui/system';
//import { useData } from '../../Context/context';

export default function CizgiGrafik() {

  /*const {data,veri} =useData();
  if(data==null)
  {
    veri.splice(0,1);
  }*/

    return(
        <div>

            <VictoryChart height={290} width={500} maxDomain={{y:100}}  domainPadding={120}
            theme ={VictoryTheme.material}
        >
         <VictoryLine
         animate={{duration:1000}}
          style={{
            data: {stroke: "#336699",strokeWidth:1},
            parent:{border:"1px solid #ccc"},
          }}
          /*data={
            veri
          }*/
          />
          </VictoryChart>

          </div>
    )
}