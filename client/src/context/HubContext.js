import React from "react";
import { createContext, useState } from "react";

const HubContext = createContext({});

export function HubProvider({children}) {
  const [hubSelection, setHubSelection] = useState(null);
  const [locSelection, setLocSelection] = useState(null);
  const [hubSelect, setHubSelect] = useState(null);
  console.log(hubSelect);

  return (<HubContext.Provider value={{hubSelection,setHubSelection,locSelection,setLocSelection,hubSelect,setHubSelect}}>{children}</HubContext.Provider>);
}

export default HubContext;
