
import React from "react";
import "../components/app.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import VpnUsrDisp from "../components/VpnUsrDisp";
import HubContext from "../context/HubContext";
import UsrContext from "../context/UsrContext"
import VpnUsrContext from "../context/VpnUsrContext";
import { useState } from "react";
import { useEffect } from "react";
import PayToast from "../components/dash_comp/PayToast"
import CreateUser from "../components/dash_comp/CreateUser";
import AlertContext from "../context/AlertContext";
import { Button } from "react-bootstrap";
import {useParams} from "react-router-dom";
import moment from "moment";


function UserDashboard() {
  const {setAlert} = useContext(AlertContext);
  const { user } = useContext(UsrContext);
  const {hubSelect} = useContext(HubContext);

  const navigate = useNavigate();

  const [userForm, setUserForm] = useState(false);
  const [changePsk,setChangePsk] = useState(false);
  const [creditDisp,setCreditDisp] = useState(true);

  let { id } = useParams();
  // context of hub data and user
  
  const { vpnUsr, setVpnUsr } = useContext(VpnUsrContext);

  if (id !== user.id){
    navigate("/dashbaord");
  }

  useEffect(() => {
    // console.log(hubSelect);
    axios
      .post(window.serverurl + "/api/vpn/connect", {
        hub_id: hubSelect,
      })
      .then((res) => {
        if (res.data.redirect) {
          navigate("/");
        } else {
          if (res.data.error) {
            setAlert("user not available");
            setVpnUsr({});
          } else {
            setVpnUsr(res.data);
          }
        }
      }).catch((e)=>{
        console.log(e);
      });
  },[]);

    // ------------------Create User-------------------//


    function Paytoast() {
      if (user.expiry == null) {
        return (
          <PayToast message="Activate your free trial to start using eternity vpn" />
        );
      } else {
        const diff = moment(user.expiry).diff(moment(), "days");

        if(diff<1){
          return (
            <PayToast message="Account has been expired, purchase plan to start using eternity vpn" />
          );
        }else if(diff < 6){
          return (
            <PayToast message={`Your account is about to expire and is valid only for ${diff} days purchase plan for having premium experience`} />
          )
        }else{
            return <div></div>;

        }

      }
    }




  function deleteusr(event){
    event.preventDefault();
          axios.post(window.serverurl+"/api/vpn/deleteuser",
          {hub_id: hubSelect})
          .then((res)=>{
              if(res.data.error){
                setAlert('user not deleted [ error occured ]')
              }else{
                setAlert('user deleted')
              }
              navigate("/dashboard");
              setVpnUsr({});
              
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
            setAlert('password updation unsucessful');
          }else{
            setAlert('user password updated');
          }
          setChangePsk(false);
          // navigate("/dashboard");
          
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
      <Button size="sm" variant="outline-secondary" shadow="sm" onClick={()=>{setUserForm(!userForm)}}>create user</Button>
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
      {Object.keys(vpnUsr).length === 0 ? (
        <>
          <UsrCreateForm />
          <Paytoast />
        </>
      ) : (
        <>
          <VpnUsrDisp hub={hubSelect} guideVar={setCreditDisp} />
          <UserMod />
          {creditDisp ? <Paytoast /> : <></>}
        </>
      )}
      {changePsk && <ChangeUsrPsk />}
    </div>
  );
}

export default UserDashboard;