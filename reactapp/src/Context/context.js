import  React,{ useContext, useEffect} from 'react'
import { fetchDeviceProperties ,fetchData, fetchDevice, fetchDashs, fetchAlarmCount, fetchVeriler, postVeri} from '../api';
import { useState } from 'react';
import { w3cwebsocket as W3CWebSocket, client } from "websocket";
import mqtt,{setPayload} from "mqtt/dist/mqtt";
import { useAuth } from './AuthContext';
import { useLocation, useParams ,useRouteMatch} from 'react-router-dom';


const DataContext=React.createContext();
const websocketUrl = "mqtt://172.24.192.1:9001";
var options={
  username:"elif",
  password:"123456"
};


function createData(zaman, cihazIsmi, tip, deger) {
  return { zaman, cihazIsmi, tip, deger};
}

function urlSplit(location,setName,cihazlar){
  location=location.slice(1);
  location=location.split("/");
  if(location.length===2 && location[0]==='gostergeler'){
    localStorage.setItem("cihaz-name",location[1]);
    setName(location[1]);

    return location[1];

  }
  if(location[0]==='tenant'){
    return "tenant";
  }
  return false;
}


export function DataProvider({children}) {




  const [data,setData]=useState(null);
  const [name,setName]=useState(localStorage.getItem("cihaz-name") || "");
  const [veri,setVeri]=useState([0]);
  const [alarm,setAlarm]=useState([]);
  const [cihazlar,setCihazlar]=useState([]);
  const [gostergeler,setGostergeler]=useState([]);
  const [tip,setTip]=useState("default");
  const [time,setTime]=useState([0]);
  const [enlem,setEnlem]=useState(localStorage.getItem("enlem") || false);
  const [boylam,setBoylam]=useState(localStorage.getItem("boylam") || false);
  const [alarmCount,setAlarmCount]=useState();
  const [veriTabaniVeri,setVeriTabaniveri]=useState([]);
  const [cihazId,setCihazId]=useState();

  const {user}=useAuth();
  const [low,setLow]=useState(localStorage.getItem("low-alarm") || false);
  const [big,setBig]=useState(localStorage.getItem("max-alarm") || false);
  const [selectedChart,setSelectedChart]=useState(3);

  const location=useLocation();

  const client = mqtt.connect(websocketUrl,options);

  

  useEffect(()=>{
    const sonuc=urlSplit(location.pathname,setName);
    localStorage.setItem("cihaz-id",0);



    console.log(user);
      fetchDevice(user.id).then(devices=>{
        setCihazlar(devices);
        
      });
      fetchAlarmCount(user.id).then((data)=>{
        setAlarmCount(data)
      })

       
    client.stream.on("error", (err) => {
      console.log("error");
      client.end();
    });
    client.on('connect', function () {
      console.log('Connected');
    });
   client.subscribe("v1/gateway/telemetry",1,(error)=>{
      if (error) {
        console.log('Subscribe to topics error', error)
        return
      }
    });

    client.on('message', (topic,message) => {
      console.log(localStorage.getItem("low-alarm"));
      localStorage.setItem("veri",true);

      
      const payload = { topic,message: message.toString() };
      const mesaj=JSON.parse(payload.message);
      const verii=mesaj[localStorage.getItem("cihaz-name")][0].values.temperature;

      const unixTime=mesaj[localStorage.getItem("cihaz-name")][0].ts;
      const date = new Date(unixTime);
      setTime((current)=>[...current,date.toLocaleTimeString()]);
      const datee= date.toLocaleDateString() +" "+ date.toLocaleTimeString();
      const newVeri={x:date.toLocaleDateString(),y:verii};
      console.log(newVeri);
      const id=parseInt(localStorage.getItem("cihaz-id"));
      

          if(verii>parseInt(localStorage.getItem("low-alarm")) && verii<parseInt(localStorage.getItem("max-alarm"))){
            console.log(verii);
            setData(verii);
            setVeri((current)=>[...current,verii]);
            console.log(cihazId+" "+verii+" ")
            
            const post = async () => {
              await postVeri(id, verii, 0);
            }
          
            post();
          }
      
          else{
            setData(verii);
            setVeri((current)=>[...current,verii]);
            let newRow;
            
            if(verii<localStorage.getItem("low-alarm")){
              newRow = createData(datee,localStorage.getItem("cihaz-name"),"Düşük Sıcaklık",verii);
            }
            else{
              newRow = createData(datee,localStorage.getItem("cihaz-name"),"Yüksek Sıcaklık",verii);
            }
            
            setAlarm((current)=>[...current,newRow]);
            const post = async () => {
              await postVeri(id, verii, 1);
            }
            post();
          
      }
      console.log(veri);
 

    });



},[]);

  useEffect(()=>{

    const getGostergeler = async () => {
      const allGostergeler = [];
      for (let i = 0; i < cihazlar.length; i++) {
        const cihaz = cihazlar[i];
        const dash = await fetchDashs(cihaz.id);
        allGostergeler.push(dash);

        
        if(cihaz.isim===name){
          localStorage.setItem("cihaz-id",cihaz.id);
          localStorage.setItem("low-alarm",cihaz.alarm_alt_sinir);
          localStorage.setItem("max-alarm",cihaz.alarm_ust_sinir);
          setLow(cihaz.alarm_alt_sinir);
          setBig(cihaz.alarm_ust_sinir);
          localStorage.setItem("enlem",cihaz.enlem);
          localStorage.setItem("boylam",cihaz.boylam);
          setEnlem(cihaz.enlem);
          setBoylam(cihaz.boylam);
          
          setCihazId(cihaz.id);
          

        }
 
      }
      setGostergeler(allGostergeler);

     

    };
    getGostergeler();

    


  },[cihazlar]);
  

console.log(veri);
  useEffect(()=>{
    const sonuc=urlSplit(location.pathname,setName);
 

    for(let i=0;i<cihazlar.length;i++)
     {
      let cihaz=cihazlar[i];
      
      
      if(cihaz.isim===sonuc){
        localStorage.setItem("cihaz-id",cihaz.id);
        localStorage.setItem("low-alarm",cihaz.alarm_alt_sinir);
        localStorage.setItem("max-alarm",cihaz.alarm_ust_sinir);
        localStorage.setItem("enlem",cihaz.enlem);
        localStorage.setItem("boylam",cihaz.boylam);
        setLow(cihaz.alarm_alt_sinir);
        setBig(cihaz.alarm_ust_sinir);
        setEnlem(cihaz.enlem);
        setBoylam(cihaz.boylam);
        
        setCihazId(cihaz.id);
      }
    }
    
    

  },[location.pathname]);


  useEffect(()=>{
    gostergeler.map((g)=>{
      let cihaz=parseInt(localStorage.getItem("cihaz-id"));
      console.log(g);
      if(cihaz===g[0].cihaz_id){
        setSelectedChart(g[0].widget_no);
        
      }

    })

  },[gostergeler,location.pathname])






useEffect(()=>{
  setVeri([0]);
  setAlarm([]);
  setData(null);
  const getVeriler=async()=>{
    if(!parseInt(localStorage.getItem("cihaz-id"))==0){
    await fetchVeriler(parseInt(localStorage.getItem("cihaz-id"))).then((data)=>{
      const temp=data;
      if(parseInt(localStorage.getItem("cihaz-id")) ===cihazId){
        for(let i=0;i<data.length;i++){
          setVeri((current)=>[...current,data[i].deger]);
          if(data[i].alarm===1){
            let newRow;
            
            if(data[i].deger<localStorage.getItem("low-alarm")){
              newRow = createData(data[i].created_at,localStorage.getItem("cihaz-name"),"Düşük Sıcaklık",data[i].deger);
            }
            else{
              newRow = createData(data[i].created_at,localStorage.getItem("cihaz-name"),"Yüksek Sıcaklık",data[i].deger);
            }
            
            setAlarm((current)=>[...current,newRow]);

          }
          if(i===(data.length-1)){
            setData(data[i].deger);
          }
          
        }
      }
      
    })
  }
  }
  getVeriler();

},[localStorage.getItem("cihaz-id")]);

  const deviceData={
    name,
    setName,
    data,
    veri,
    alarm,
    setAlarm,
    cihazlar,
    setCihazlar,
    tip,
    setTip, 
    gostergeler,
    setGostergeler,
    low,
    big,
    enlem,
    boylam,
    alarmCount,
    veriTabaniVeri,
    cihazId,
    selectedChart




  }
  return(
        <DataContext.Provider value={deviceData}>
            {children}
        </DataContext.Provider>
    )

  }
export const useData = ()=> useContext(DataContext);
