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
import Form from 'react-bootstrap/Form';
import { FormText } from "react-bootstrap";
import LoginElement from "../components/LoginElement";

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
    <form className="d-flex flex-column justify-content-around h-100">

      <Form >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={login.username} onChange={(e) => {
            setLogin((x) => {
              return { ...x, ["username"]: e.target.value };
            });
          }} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        
        <Form.Control value={login.password}
          onChange={(e) => {
            setLogin((x) => {
              return { ...x, ["password"]: e.target.value };
            });
          }} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <div className="d-flex flex-row justify-content-between align-items-center mt-3">
      <Button variant="outline-primary" type="submit" size="sm" onClick={(e) => {
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

                });}}>
      Login
      </Button>
      {loginMessage!=="" && <div className="login-message">{loginMessage}</div>}
      <Button variant="light" type="submit" size="sm" onClick={(e) => {e.preventDefault();setModalShow(true)}}> 
      signup
      </Button>
      </div>
    </Form>
    </form>
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
                    <div className="local-login-form ">
                        <h5 className="mb-1 mt-4"><img src="/images/infinity.png" alt="" height="35px"></img>Login</h5>

                        <Inp/>  
                        <SignUpModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        />            
                    </div>
                    {/* <LoginElement/> */}
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Login;