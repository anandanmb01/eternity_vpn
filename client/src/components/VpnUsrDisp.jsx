import React, { useContext } from "react";
import VpnUsrContext from "../context/VpnUsrContext";
import UsrContext from "../context/UsrContext";
import "../components/app.css";
import {useState} from "react";
import HubContext from "../context/HubContext";
import VpnUsrGuide from "./dash_comp/VpnUsrGuide";


function VpnUsrDisp(props){

    const {vpnUsr} = useContext(VpnUsrContext);
    const {user} = useContext(UsrContext);
    const [vpnUsrGuide,setVpnUsrGuide] =useState(false);
    const {hubSelect} = useContext(HubContext);
    props.guideVar(!vpnUsrGuide);
    
    return(
        <div className="row">
        {/* ////----- */}
        <div className="vpn-usr-disp col-lg-5 shadow">
            <div className="avatar-div">
                <img className="shadow" src={user.photo} alt="" width="96px" height="96px"/>
                <h5>{user.name}</h5>
            </div>
            <div className="usr-cnt">
            <table>
            <tbody>
                <tr>
                    <td className="td">username</td>
                    <td>{vpnUsr.data.userName}</td>
                </tr>
                <tr>
                    <td className="td">id</td>
                    <td>{vpnUsr.data.description}</td>
                </tr>
                <tr>
                    <td className="td">host address</td>
                    <td>{`eternityvpn.ddns.net`}</td>
                </tr>
                <tr>
                    <td className="td">port</td>
                    <td>{`992 | 1194 | 5555 | 8443`}</td>
                </tr>
                <tr>
                    <td className="td">preshared key</td>
                    <td>{`eternitykey`}</td>
                </tr>
                <tr>
                    <td className="td">L2TP hub</td>
                    <td>{`${hubSelect}`}</td>
                </tr>
                <tr>
                    <td className="td">auth type</td>
                    <td>{vpnUsr.data.authType}</td>
                </tr>
                <tr>
                    <td className="td">experation date</td>
                    <td>{vpnUsr.data.expirationDate}</td>
                </tr>
                <tr>
                    <td className="td">created on</td>
                    <td>{vpnUsr.data.createdOn}</td>
                </tr>
                <tr>
                    <td className="td">no of login</td>
                    <td>{vpnUsr.data.numberOfLogins}</td>
                </tr>
                <tr>
                    <td className="td">incomming packet </td>
                    <td>{vpnUsr.data.incomingBroadcastTotalSize}</td>
                </tr>
                <tr>
                    <td className="td">outgoing packet</td>
                    <td>{vpnUsr.data.outgoingBroadcastTotalSize}</td>
                </tr>
                <tr>
                    <td className="td">dns</td>
                    <td>{`1.1.1.1`}</td>
                </tr>
                </tbody>
            </table>
            </div>
        <><p style={{cursor:"pointer",}} onClick={()=>{setVpnUsrGuide(!vpnUsrGuide)}}>User guide&emsp;{vpnUsrGuide&&<div className="spinner-border text-dark spinner-border-sm" role="status"></div>}</p></>
        </div>
        {vpnUsrGuide&&<VpnUsrGuide/>}
        </div>
    )
}
export default VpnUsrDisp;