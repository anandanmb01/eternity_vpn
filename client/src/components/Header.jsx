import React from "react";
import { Link } from "react-router-dom";
import "./app.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/app.css";
import UsrContext from "../context/UsrContext";
import { useContext } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import AvatarDropDown from "./dash_comp/AvatarDropDown";

function Header(props) {

    const navigate =useNavigate();
    const { user, setUser } = useContext(UsrContext);

    function handleLogout(event){
      event.preventDefault();
      axios.post(window.serverurl+"/auth/logout", { withCredentials: true })
      .then((res) => {
        if(res.data.status){
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        
      }); 

      navigate("/")

    }

  function LoginBtn() {
    const style = {
      border: "none",
      backgroundColor: "rgba(0,0,0,0)",
    };
    return (
      <>
        <button id="login" style={style} onClick={()=>{navigate("/login")}}>Login</button>
      </>
    );
  }

  function Avatar() {
    return (
      <div className="avatar">
        <span>{user.name}</span>
        <OverlayTrigger trigger="click" placement="bottom" overlay={AvatarDropDown}>
          <img src={user.photo?user.photo:'images/login.png'} alt="" width="35px" height="35px" />
        </OverlayTrigger>

        <span id="logout" onClick={handleLogout}>Logout</span>
      </div>
    );
  }

  return (
    <div className="header m-2">
      <nav className="navbar ">
        <Link to="/">
          <div className="navBarLogo">
            <img src="/images/infinity.png" alt="" width="40px" height="40px" />
          
            <span className="navbar-brand">Eternity VPN</span>
          </div>
        </Link>
        <div className="avatar" >{user ? <Avatar /> : <LoginBtn />}</div>
      </nav>
    </div>
  );
}

export default Header;
