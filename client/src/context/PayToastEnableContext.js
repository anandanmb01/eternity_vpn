import React from "react";
import { createContext,useState } from "react";

const PayToastEnableContext =createContext({});

export function PayToastEnableProvider({children}){
    const [PayToastEnable_,setPayToastEnable_] = useState(true);
    return(<PayToastEnableContext.Provider value={{PayToastEnable_,setPayToastEnable_}}>{children}</PayToastEnableContext.Provider>);
}


export default PayToastEnableContext;