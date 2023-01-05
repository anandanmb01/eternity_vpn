import React from "react";
import { createContext,useState } from "react";


const AlertContext = createContext({});



export function AlertProvider({children}){

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage,setAlertMessage] = useState("");
    
    const setAlert = (message) => {
            setAlertMessage(message);
            setShowAlert(true);
            setTimeout(()=>{
                setShowAlert(false);
            },3000)
    };

    function toggleShowAlert () {
        setShowAlert(!showAlert)
    };

    return(<AlertContext.Provider value={{showAlert,toggleShowAlert,setAlert,setShowAlert,alertMessage}}>{children}</AlertContext.Provider>)
}

export default AlertContext;