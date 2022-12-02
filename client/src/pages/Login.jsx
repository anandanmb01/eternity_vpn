import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";
import "../components/app.css";



function handleGoogle(){
    window.open(window.serverurl+"/auth/google","_self");
}

function handleGitHub(){
    window.open(window.serverurl+"/auth/github","_self");
}

function Inp() {

  return (<>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className="local-dignup-btn-gp">
  <button onClick={()=>{alert("Feature under development ,please signin using Google or Github")}} className="btn btn-outline-primary">Login</button>
  <span onClick={()=>{alert("Feature under development ,please signin using Google or Github")}} >Signup</span>
  </div>
  
  </>
  );
}

function Login(){

    return(
        <div className="login">
            <div className=" login-content shadow">
                <div className="social-login">
                    <GoogleLoginButton onClick={handleGoogle}><span>Google</span></GoogleLoginButton>
                    <FacebookLoginButton onClick={()=>{alert("Feature under development ,please signin using Google or Github")}}><span>Facebook</span></FacebookLoginButton>
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
                        <h5><img src="/images/infinity.png" height="35px"></img>Local login</h5>
                        <Inp/>              
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;