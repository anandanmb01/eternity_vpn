import React from "react";
import { createContext,useState } from "react";

const UsrContext = createContext({});

export function UsrProvider({children}){

    const [user,setUser] = useState(null);

    return(<UsrContext.Provider value={{user,setUser}}>{children}</UsrContext.Provider>)
}

export default UsrContext;