import React, { useContext } from "react";
import VpnUsrContext from "../db/VpnUsrContext";
import UsrContext from "../context/UsrContext";
import "../components/app.css";
import {useState} from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Windows,Android,Mac,Linux,Ios} from "../pages/instructions";

function VpnUsrDisp(){

    const {vpnUsr} = useContext(VpnUsrContext);
    const {user} = useContext(UsrContext);
    const [vpnUsrGuide,setVpnUsrGuide] =useState(false);


    function VpnUsrGuidei(){
        return(
            <div className="col-lg-6 vpn-usr-disp vpn-usr-guide shadow">
                    <Tabs
                    defaultActiveKey="overview"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    >
                        <Tab eventKey="overview" title="overview">
                            <div style={{display:"flex",justifyContent:"centre",alignItems:"center"}}>
                                <img style={{width:"700px"}}src="/images/client.png" alt=""></img>
                            </div>
                        </Tab>
                        <Tab eventKey="windows" title="windows">
                            <div style={{overflowY:"scroll",height:"650px"}}>
                                <Windows/>
                            </div>
                        </Tab>
                        <Tab eventKey="mac" title="mac">
                            <div style={{overflowY:"scroll",height:"650px"}}>
                                <Mac/>
                            </div>
                        </Tab>
                        <Tab eventKey="linux" title="linux">
                            <div style={{overflowY:"scroll",height:"650px"}}>
                                <Linux/>
                            </div>
                        </Tab>
                        <Tab eventKey="android" title="android" >
                            <div style={{overflowY:"scroll",height:"650px"}}>
                            <Android/>
                            </div>
                        </Tab>
                        <Tab eventKey="ios" title="ios">
                            <div style={{overflowY:"scroll",height:"650px"}}>
                            <Ios/>
                            </div>
                        </Tab>
                    </Tabs>
            </div>
        )
    }

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
                    <td>{`43.205.75.80`}</td>
                </tr>
                <tr>
                    <td className="td">port</td>
                    <td>{`8443`}</td>
                </tr>
                <tr>
                    <td className="td">preshared key</td>
                    <td>{`eternity_hub`}</td>
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
        {/* {`${JSON.stringify(vpnUsr)}`} */}
        <><p style={{cursor:"pointer",}} onClick={()=>{setVpnUsrGuide(!vpnUsrGuide)}}>User guide&emsp;{vpnUsrGuide&&<div className="spinner-border text-dark spinner-border-sm" role="status"></div>}</p></>
        </div>
        {/* ////---- */}
        {vpnUsrGuide&&<VpnUsrGuidei/>}
        </div>
    )
}
export default VpnUsrDisp;