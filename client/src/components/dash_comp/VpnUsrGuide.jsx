import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {Windows,Android,Mac,Linux,Ios} from "../../pages/instructions";

function VpnUsrGuide(){
    return(
        <div className="col-lg-6 vpn-usr-disp vpn-usr-guide shadow">
                <Tabs
                defaultActiveKey="overview"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                    <Tab eventKey="overview" title="overview">
                        <div style={{display:"flex",justifyContent:"centre",alignItems:"center"}}>
                            <img className="mx-auto" style={{width:"90%"}}src="/images/client.png" alt=""></img>
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

export default VpnUsrGuide;