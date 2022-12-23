/* eslint-disable */
import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";
import "../components/app.css";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import SignUpModal from "../components/SignUpModal";
import UsrContext from "../context/UsrContext";
import { useState, useContext, useRef } from "react";
import Button from 'react-bootstrap/Button';

function handleGoogle(){
    window.open(window.serverurl+"/auth/google","_self");
}

function handleGitHub(){
    window.open(window.serverurl+"/auth/github","_self");
}
function handleFacebook(){
    window.open(window.serverurl+"/auth/facebook","_self");
}

function Login(){
  const { user, setUser } = useContext(UsrContext);
    const [modalShow, setModalShow] = React.useState(false);
    const navigate =useNavigate();
    const [loginMessage,setLoginMessage] = useState("");

    function Inp() {

    const [login,setLogin] = React.useState({
        username:"",
        password:"",
      });
      // console.log(login); 


  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input value={login.username}
          onChange={(e) => {
            setLogin((x) => {
              return { ...x, ["username"]: e.target.value };
            });
          }}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          value={login.password}
          onChange={(e) => {
            setLogin((x) => {
              return { ...x, ["password"]: e.target.value };
            });
          }}
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <div className="local-dignup-btn-gp">
        <Button
        variant="outline-primary"
        size="sm"
          onClick={(e) => {
            e.preventDefault();
            axios
              .post(window.serverurl + "/auth/login",{...login,["username"]:(login.username.split("@")[0]+"_eternity")})
              .then((r)=>{
                if(r.data.redirect){
                  setUser(r.data.result);
                  navigate(r.data.redirect);
                }else{
                  setLoginMessage(r.data.result);
                }
                // console.log(r.data)

                });}}
          className="btn btn-outline-primary"
        >
          Login
        </Button>
        {loginMessage!=="" && <div className="login-message">{loginMessage}</div>}
        <span onClick={() => setModalShow(true)}>Signup</span>
      </div>
    </>
  );
}

    return(<>
        <div className="login">
            <div className=" login-content shadow">
                <div className="social-login">
                    <GoogleLoginButton onClick={handleGoogle}><span>Google</span></GoogleLoginButton>
                    <FacebookLoginButton onClick={handleFacebook}><span>Facebook</span></FacebookLoginButton>
                    <GithubLoginButton onClick={handleGitHub}><span>GitHub</span></GithubLoginButton>
                    
                </div>
                <div className="login-seperator">
                    <div className="login-seperator-or-line shadow"></div>
                    <div className="login-seperator-or shadow">
                        <span>OR</span>
                    </div>
                </div>
                <div className="local-login">
                    <form className="local-login-form">
                        <h5><img src="/images/infinity.png" alt="" height="35px"></img>Local login</h5>

                        <Inp/>  
                        <SignUpModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        />            
                    </form>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Login;