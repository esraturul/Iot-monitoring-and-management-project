
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';


export const fetchData = async ()=>{
  try{
      const response = await axios.get('http://localhost:9000/api/product');
      return response.data;
  }
  catch(error){}
 }

export const fetchDeviceProperties= async ()=>{
  try{
      const response =await axios.get('http://localhost:1337/devices');
      return response.data;
  }catch(e){}
}
 
export const fetchLogin=async (username,password)=>{

  try{
    
    let item={username,password};
    let result = await fetch('http://localhost:9000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    result=await result.json();
    localStorage.setItem("user-type",JSON.stringify(result.type))
    localStorage.setItem("user-info",JSON.stringify(result.data));
  
  }catch(e){
    console.log(e);
  }
  }

export const fetchDevice=async(id)=>{
  const response= await axios.get(`http://localhost:9000/api/musteri_cihaz/${id}`);
  return response.data;
}

export const updateAlarm=async(cihazId,newKural)=>{
  const response=await axios.put(`http://localhost:9000/api/alarm/${cihazId}`,newKural);
  return response.data;
}

export const fetchDashs=async(cihazId)=>{
  const response=await axios.get(`http://localhost:9000/api/dashboard/${cihazId}`);
  return response.data;

}
export const fetchAlarmCount=async(musteriId)=>{
  const response= await axios.get(`http://localhost:9000/api/alarm_count/${musteriId}`);
  return response.data;
}
export const fetchVeriler=async(cihazId)=>{
  const response =await axios.get(`http://localhost:9000/api/data/${cihazId}`);
  return response.data;
}
 
export const postVeri = async (cihaz_id, deger, alarm) => {
  try {
    const response = await axios.post('http://localhost:9000/api/data', {
      cihaz_id:cihaz_id,
      deger:deger,
      alarm:alarm
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchMusteriler= async(tenantId)=>{
  const response=await axios.get(`http://localhost:9000/api/musteriler/${tenantId}`);
  return response.data;
}

export const postMusteri=async (tenant_id,email,password,isim,sehir_ulke)=>{

  try{
    const response =await axios.post('http://localhost:9000/api/musteri',{
      tenant_id:tenant_id,
      email:email,
      password:password,
      isim_soyisim:isim,
      sehir_ulke:sehir_ulke


    });
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export const deleteMusteri=async (musteri_id)=>{
  const response=await axios.delete(`http://localhost:9000/api/musteri/${musteri_id}`);
}

export const updateMusteri=async (musteriId,data)=>{
  const response=await axios.put(`http://localhost:9000/api/musteri/${musteriId}`,data);

}

export const fetchCihazlar =async (tenantId)=>{
  const response=await axios.get(`http://localhost:9000/api/cihazlar/${tenantId}`);
  return response.data;

}

export const postCihaz=async (data)=>{
  try{
    const response =await axios.post('http://localhost:9000/api/cihaz',data);
  }catch(error){
    console.log(error);
  }

}

export const putCihaz=async (data,cihazId)=>{
  try{
    const response=await axios.put(`http://localhost:9000/api/cihaz/${cihazId}`,data);
  }catch(error){
    console.log(error);
  }
}

export const deleteCihaz=async(cihazId)=>{
  try{
    const response=await axios.delete(`http://localhost:9000/api/cihaz/${cihazId}`);
  }catch(error){
    console.log(error);
  }
}

export const fetchGostergeler=async (tenantId)=>{
  try{
    const response=await axios.get(`http://localhost:9000/api/gostergeler/${tenantId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }

}

export const postGosterge= async(data)=>{
  try{
    const response =await axios.post('http://localhost:9000/api/gosterge',data);
  }catch(error){
    console.log(error);
  }


}

export const putGosterge=async (data,gostergeId)=>{
  try{
    const response=await axios.put(`http://localhost:9000/api/gosterge/${gostergeId}`,data);
  }catch(error){
    console.log(error);
  }
}

export const deleteGosterge=async(gostergeId)=>{
  try{
    const response=await axios.delete(`http://localhost:9000/api/gosterge/${gostergeId}`);
  }catch(error){
    console.log(error);
  }
}

export const musteriCount=async(tenantId)=>{
  try{
    const response=await axios.get(`http://localhost:9000/api/musteri_sayisi/${tenantId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export const cihazCount=async(tenantId)=>{
  try{
    const response=await axios.get(`http://localhost:9000/api/cihaz_sayisi/${tenantId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export const alarmCount = async (tenantId)=>{
  try{
    const response=await axios.get(`http://localhost:9000/api/alarm/${tenantId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }

}

export const fetchTenants= async (adminId)=>{
  try{
    const response=await axios.get(`http://localhost:9000/api/tenantlar/${adminId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }

}

export const putTenant= async (tenantId,data)=>{
  try{
    const response=await axios.put(`http://localhost:9000/api/tenant/${tenantId}`,data);
  }catch(error){
    console.log(error);
  }

}

export const postTenant= async (data)=>{
  try{
    const response =await axios.post('http://localhost:9000/api/tenant',data);
  }catch(error){
    console.log(error);
  }


}

export const deleteTenant= async (tenantId)=>{
  try{
    const response=await axios.delete(`http://localhost:9000/api/tenant/${tenantId}`);
  }catch(error){
    console.log(error);
  }

}