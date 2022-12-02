/* eslint-disable */
import React from "react";
import "../components/app.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import VpnUsrDisp from "../components/VpnUsrDisp";
import HubContext from "../context/HubContext";
import UsrContext from "../context/UsrContext"
import VpnUsrContext from "../db/VpnUsrContext";
import { useState } from "react";
import { useEffect } from "react";



function UserDashboard() {

  const { user ,setUser} = useContext(UsrContext);
  // console.log(user);
  const {
    hubSelection,
    setHubSelection,
    locSelection,
    setLocSelection,
    hubSelect,
    setHubSelect,
  } = useContext(HubContext);

  const navigate = useNavigate();
  let message = null;
  //create form control
  const [userForm, setUserForm] = useState(false);
  const [changePsk,setChangePsk] = useState(false);

  // context of hub data and user
  
  const { vpnUsr, setVpnUsr } = useContext(VpnUsrContext);

  useEffect(() => {
    axios
      .post(window.serverurl + "/api/vpn/connect", {
        hub_id: hubSelect,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.redirect) {
          navigate("/");
        } else {
          if (res.data.error) {
            message = "user not available";
            setVpnUsr({});
          } else {
            message = null;
            setVpnUsr(res.data);
            // console.log(vpnUsr);
          }
        }
      });
  }, []);

    // ------------------Create User-------------------//
    function CreateUser(){

      const [pass,setPass]=useState("");

      function userCreate(event){
          event.preventDefault();
          axios.post(window.serverurl+"/api/vpn/createuser",
          {hub_id: hubSelect,
            password:pass})
          .then((res)=>{
              if(res.data.error){
                  alert('user not created')
              }else{
                  alert('user created')
              }
              navigate("/dashboard");
              
          })


      }
  //////

  /////
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

  function deleteusr(event){
    event.preventDefault();
          axios.post(window.serverurl+"/api/vpn/deleteuser",
          {hub_id: hubSelect})
          .then((res)=>{
              if(res.data.error){
                  alert('user not deleted [ error occured ]')
              }else{
                  alert('user deleted')
              }
              navigate("/dashboard");
              
          })
  }

  function ChangeUsrPsk(){
    const [pass_,setPass_]=useState("");

  function userPassUpdate(event){
      event.preventDefault();
      axios.post(window.serverurl+"/api/vpn/changeusrpsk",
      {hub_id: hubSelect,
        password:pass_})
      .then((res)=>{
          if(res.data.error){
              alert('password updation unsucessful');
          }else{
              alert('user password updated');
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
      <input type="password" name="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(event)=>{setPass_(event.target.value)}} value={pass_} />
    </div>
  </div>
  <div className="local-dignup-btn-gp">
    <button className="btn btn-outline-primary btn-sm" onClick={userPassUpdate} >Change password</button>
    <span></span>
    </div>
      </div>
  )
}

  function UserMod(){
    return(
      <div className="usr-mod-btn">
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=>{setChangePsk(!changePsk)}}>Change password</button>&nbsp;
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={deleteusr}>Delete vpn user</button>
      </div>
    )
  }
  // ------------------end Create User-------------------//
  
  function UsrCreateForm(){
      return( <div className="user-dashboard-message">
      {message&&<p>{`${message}`}</p>}   
      <button type="button" className="btn btn-outline-secondary" onClick={()=>{setUserForm(!userForm)}}>Create user</button>
      {userForm&&<CreateUser/>}
  </div>);
  }


  return (
    <div className="user-dashboard">
      <div>
        <h3>{`Welcome ${user.name}`}</h3>
      </div>
      <div>
        <p>{`You are now connected to ${hubSelect}`}</p>
      </div>
      {/* {console.log(vpnUsr)} */}
      {Object.keys(vpnUsr).length === 0?<UsrCreateForm/>:<><VpnUsrDisp/><UserMod/></>}
      {changePsk&&<ChangeUsrPsk/>}
    </div>
  )
}
export default UserDashboard;