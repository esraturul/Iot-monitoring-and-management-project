import { createContext, useContext,useEffect,useState } from "react";
import { alarmCount, cihazCount, fetchCihazlar, fetchGostergeler, fetchMusteriler, fetchVeriler, musteriCount, postVeri } from "../api";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
import mqtt,{setPayload} from "mqtt/dist/mqtt";

const TenantContext=createContext();
const websocketUrl = "mqtt://172.24.192.1:9001";
var options={
  username:"elif",
  password:"123456"
};


function createData(zaman, cihazIsmi, tip, deger) {
    return { zaman, cihazIsmi, tip, deger};
  }

export function TenantProvider({children}){
    const [name,setName]=useState(localStorage.getItem("cihaz-name") || "");
    const [musteriler,setMusteriler]=useState([]);
    const [cihazlar,setCihazlar]=useState([]);
    const [gostergeler,setGostergeler]=useState([]);
    const [post,setPost]=useState("false");
    const [selectedChart, setSelectedChart] = useState(3);
    const [musteriSayisi,setMusteriSayisi]=useState(0);
    const [cihazSayisi,setCihazSayisi]=useState(0);
    const [alarmSayisi,setAlarmSayisi]=useState(0);

    const [enlem,setEnlem]=useState(localStorage.getItem("enlem") || "");
    const [boylam,setBoylam]=useState(localStorage.getItem("boylam") || "");
    const [low,setLow]=useState();
    const [big,setBig]=useState();
    const [tip,setTip]=useState();
    const [cihazId,setCihazId]=useState(0);
    const [gostergeId,setGostergeId]=useState();

    const [veri,setVeri]=useState([0]);
    const [alarm,setAlarm]=useState([]);
    const [sonData,setData]=useState(0);
    

    const {user}=useAuth();

    const location=useLocation();

    const client = mqtt.connect(websocketUrl,options);


  const getVeriler=async()=>{
    setVeri([0]);
    setAlarm([]);
    if(!parseInt(localStorage.getItem("cihaz-id"))==0){
    await fetchVeriler(parseInt(localStorage.getItem("cihaz-id"))).then((data)=>{
      console.log(cihazId);
        
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
    useEffect(()=>{
        if(post==="cihaz"){
            fetchCihazlar(user.id).then(cihazlar=>{
                setCihazlar(cihazlar);
            })
        }
        else if(post==="musteri"){
            fetchMusteriler(user.id).then(musteriler=>{
                setMusteriler(musteriler);
    
            })
        
        }
        else if(post==="gosterge"){
            fetchGostergeler(user.id).then(gostergeler=>{
                setGostergeler(gostergeler);
    
            })

        }
        setPost("false");
    },[post])

    
    useEffect(()=>{
      fetchMusteriler(user.id).then(musteriler=>{
          setMusteriler(musteriler);

      })

      fetchCihazlar(user.id).then(cihazlar=>{
          setCihazlar(cihazlar);
      })

      fetchGostergeler(user.id).then(gostergeler=>{
          setGostergeler(gostergeler);

      })

      musteriCount(user.id).then(sonuc=>{
          setMusteriSayisi(sonuc);
      })

      cihazCount(user.id).then(sonuc=>{
          setCihazSayisi(sonuc);
      })

      alarmCount(user.id).then(sonuc=>{
          setAlarmSayisi(sonuc);
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

          const payload = { topic,message: message.toString() };
          const mesaj=JSON.parse(payload.message);
          const verii=mesaj[localStorage.getItem("cihaz-name")][0].values.temperature;
    
          const unixTime=mesaj[localStorage.getItem("cihaz-name")][0].ts;
          const date = new Date(unixTime);
          const datee= date.toLocaleDateString() +" "+ date.toLocaleTimeString();
          const id=parseInt(localStorage.getItem("cihaz-id"));
          
    
              if(verii>parseInt(localStorage.getItem("low-alarm")) && verii<parseInt(localStorage.getItem("max-alarm"))){
                setData(verii);
                setVeri((current)=>[...current,verii]);
                
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
     
    
        });
    
    
          

  },[])


    useEffect(()=>{
        const url=location.pathname.split("/");
        let cihaz_name="";
        if(url.length===4){
            cihaz_name=url[3];
        }
        setName(cihaz_name);
        localStorage.setItem("cihaz-name",cihaz_name);

        cihazlar.map((c)=>{
            if(c.isim===localStorage.getItem("cihaz-name")){
                localStorage.setItem("cihaz-id",c.id);
                setCihazId(c.id);
                setEnlem(c.enlem);
                setBoylam(c.boylam);
                localStorage.setItem("enlem",c.enlem);
                localStorage.setItem("boylam",c.boylam);
                localStorage.setItem("max-alarm",c.alarm_ust_sinir);
                localStorage.setItem("low-alarm",c.alarm_alt_sinir);
                setLow(c.alarm_alt_sinir);
                setBig(c.alarm_ust_sinir);
                setTip(c.tip);
                
            }
        })
        gostergeler.map((gosterge)=>{
            let cihaz=parseInt(localStorage.getItem("cihaz-id"));
            if(cihaz===gosterge.cihaz_id){
              setSelectedChart(gosterge.widget_no);
              setGostergeId(gosterge.id);
            }
      
          })

    //    getVeriler();
        

    },[location.pathname, cihazlar])

    useEffect(()=>{
      getVeriler();
      console.log(sonData);

    },[localStorage.getItem("cihaz-id")])

    console.log(selectedChart);


   

    const data={
        name,
        setName,
        musteriler,
        setPost,
        cihazlar,
        gostergeler,
        selectedChart,
        setSelectedChart,
        enlem,
        boylam, 
        big,
        low,
        tip,
        veri,
        alarm,
        gostergeId, 
        musteriSayisi,
        cihazSayisi,
        alarmSayisi,
        sonData
    }



    return <TenantContext.Provider value={data}>{children}</TenantContext.Provider>
}

export const useTenant= ()=>useContext(TenantContext);