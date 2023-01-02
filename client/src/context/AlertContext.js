import React from "react";
import { createContext,useState } from "react";
import UsrContext from "./UsrContext";


const AlertContext = createContext({});



export function AlertProvider({children}){

    let alertContent="";
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage,setAlertMessage] = useState(null);
    
    const setAlert = (message) => {
        if(alertContent !== alertMessage){

            alertContent=alertMessage;
            setAlertMessage(message);
            setShowAlert(true);
            setTimeout(()=>{
                setShowAlert(false);
            },2000)
        }
    };

    const toggleShowAlert = () => {setShowAlert(!showAlert)};

    return(<UsrContext.Provider value={{showAlert,toggleShowAlert,setAlert,alertMessage}}>{children}</UsrContext.Provider>)
}

export default AlertContext;