import React from "react";
import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

const HubContext = createContext({});

export function HubProvider({children}) {
  const [cookies, setCookie] = useCookies([]);

  // console.log(cookies.sitedata);

    if (Object.keys(cookies).length === 0) {

      setCookie("sitedata", {
        'hubSelection': null,
        'locSelection': null,
        'hubSelect': null,
      });
      }

  const [hubSelection, setHubSelection] = useState(cookies.sitedata.hubSelection);
  const [locSelection, setLocSelection] = useState(cookies.sitedata.locSelection);
  const [hubSelect, setHubSelect] = useState(cookies.sitedata.hubSelect);
  

  return (<HubContext.Provider value={{hubSelection,setHubSelection,locSelection,setLocSelection,hubSelect,setHubSelect,setCookie}}>{children}</HubContext.Provider>);
}

export default HubContext;
