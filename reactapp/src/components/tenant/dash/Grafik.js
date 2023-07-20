import  {React, useEffect, useState} from 'react';
import {VictoryLine,VictoryChart,VictoryTheme, VictoryScatter,VictoryAxis,VictoryLabel} from 'victory';
import { useTenant } from '../../../Context/TenantContext';

function getDataSet(data){
  const set=[];
  for(let i=0;i<10;i++){
    set[i]={x:i,y:parseInt(data)}
  }
  return set;
  
};
let h=320;

function CizgiGrafik() {

  const {veri,low,big} =useTenant();
  


  if(veri.length>10){
    veri.splice(0,1);
  }

  const getLow=getDataSet(low);
  const getMax=getDataSet(big);
  
  if(veri[veri.length-1]>120 || veri[veri.length-1]< 0){
    h=450;
  }

console.log(veri);
  return (
    <div>
       
  <VictoryChart  height={h} width={550} maxDomain={h===320 ? {x:10,y:120 } : {x:10} } > 


<VictoryLine
    style={{
      data :{stroke: "#ff0000", strokeWidth:3}
    }}
    data={
      getLow
    }
  />
  <VictoryLine
    style={{
      data :{stroke: "#ff0000", strokeWidth:3}
    }}
    data={
      getMax
    }
  />

  <VictoryLine 
 
    style={{
      data: { stroke: "#336699",strokeWidth:5 },
      parent: { border: "2px solid #ccc"},
   //   labels:{ fontSize:12 ,fill: ({ veri })=> veri===0 ? "#FFF" : "#336699",fontWeight:0.2,strokeWidth:0.5}
    
    }}
  
    data={
      veri
      
    }

    
  />
  
  <VictoryScatter data={veri}
            size={5}
            style={{ data: { fill: (datum) => (datum >= big || datum <= low ? "#b30000" : "#336699") } }}

    />



  
</VictoryChart>
  
    </div>
  )
}


export default CizgiGrafik
