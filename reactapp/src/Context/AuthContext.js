import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context=createContext();

export function AuthProvider ({children}){
    const [user,setUser] =useState(JSON.parse(localStorage.getItem("user-info")) || false);
    const [type,setType]=useState(JSON.parse(localStorage.getItem("user-type")) || false);
    const [widget,setWidget]=useState("");

    const data={
        user,
        setUser,
        type,
        setType,
        widget,
        setWidget
    }
    const navigate=useNavigate();

    useEffect(()=>{
        localStorage.setItem("user-info", JSON.stringify(user));
        localStorage.setItem("user-type", JSON.stringify(type));
    },[user,type])


    return(
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )


}
export const useAuth= ()=>useContext(Context);