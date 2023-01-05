import React from "react";
import axios from "axios";
import { useState } from "react";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import UsrContext from "../../context/UsrContext";
import HubContext from "../../context/HubContext";
import AlertContext from "../../context/AlertContext";


function CreateUser(){
    const {setAlert} = useContext(AlertContext);
    const { user } = useContext(UsrContext);
    const {hubSelect,} = useContext(HubContext);
    const [pass,setPass]=useState("");
    const navigate = useNavigate();

    function userCreate(event){
        event.preventDefault();
        axios.post(window.serverurl+"/api/vpn/createuser",
        {hub_id: hubSelect,
          password:pass})

        .then((res)=>{

                if(res.data.error){
                    setAlert('user not created');
                }else{
                    setAlert('user created');
                }
                navigate("/dashboard"); 
                     
        })
    }
    
    return(
        <div className="card card-style-usr-create">
            <div className="form-group row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">username</label>
            <div className="col-sm-10">
            <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={user.username} />
            </div>
            </div>
            <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
            <input type="password" name="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(event)=>{setPass(event.target.value)}} value={pass} />
            </div>
            </div>
            <div className="local-dignup-btn-gp">
            <button className="btn btn-outline-primary btn-sm" onClick={userCreate} >create</button>
            <span></span>
            </div>
        </div>
    )
}
export default CreateUser;