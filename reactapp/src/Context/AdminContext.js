import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { fetchTenants } from "../api";

const Context=createContext();

export function AdminProvider({children}){
    const [tenants,setTenants]=useState([]);
    const [post,setPost]=useState();

    const {user}=useAuth();

    useEffect(()=>{
        if(post==="tenant"){
            fetchTenants(user.id).then(tenant=>{
                setTenants(tenant);
            })

        }
        setPost("false");
        

    },[post])

    useEffect(()=>{
        fetchTenants(user.id).then(tenant=>{
            setTenants(tenant);
        })

    },[])

    const data={
        tenants,
        setPost
    }



    return(
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )


}
export const useAdmin= ()=>useContext(Context);