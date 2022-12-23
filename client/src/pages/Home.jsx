import React from "react";
import "../components/app.css";
import { useNavigate } from "react-router-dom";
import UsrContext from "../context/UsrContext";
import {useContext} from "react";

function Home(props){

const {user}=useContext(UsrContext);
const navigate =useNavigate();

  function handleDashboard(event){
    event.preventDefault();
    navigate("/dashboard")
  }

    return(
        <div className="home">
            <div className="row container-fluid ">
                <div className="col-lg-6 content-left">
                    {/*  */}
                    <img src="/images/infinity.png" alt="" />
                    
                </div>
                <div className="col-lg-6 content-right">
                    <div id="content-div">
                        <h1>Eternity VPN</h1>
                        <p className="container-fluid">Eternity-VPN is a free vpn hosted on mumbai based amazon aws server capale of delivering high speed encrypted connectivity to all sort of devices platforms like Windows, Linux, Mac,Ios and Android, Login in to connect to vpn</p>
                        <p style={{color:"gray"}} className="container-fluid">This server is developed as production ready server by using softether binaries implimented on Linux system managed by linux native shell commands managed by ssh sftp protocols,server backend id developed using Express JS, front end by React JS and database used is MongoDB </p>
                        {user&&(<button className="btn btn-outline-secondary home-btn" onClick={handleDashboard}>Dashboard</button>)}
                        
                    </div>
                    
                </div>

            </div>
        </div>
    )
}
export default Home;