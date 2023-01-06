import React from "react";
import { createContext,useState } from "react";

const VpnUsrContext =createContext({});

export function VpnUsrProvider({children}){
    const [vpnUsr,setVpnUsr] = useState({});
    return(<VpnUsrContext.Provider value={{vpnUsr,setVpnUsr}}>{children}</VpnUsrContext.Provider>);
}


export default VpnUsrContext;