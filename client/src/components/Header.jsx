import React from "react";
import { Link } from "react-router-dom";
import "./app.css";
import { useNavigate } from "react-router-dom";
import "../components/app.css";
import UsrContext from "../context/UsrContext";
import { useContext } from "react";
import Avatar from "./dash_comp/Avatar";

function Header(props) {
  const navigate = useNavigate();
  const { user } = useContext(UsrContext);
  function LoginBtn() {
    const style = {
      border: "none",
      backgroundColor: "rgba(0,0,0,0)",
    };
    return (
      <>
        <button
          id="login"
          style={style}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </>
    );
  }

  return (
    <div className="header m-2">
      <nav className="navbar ">
        <Link to="/">
          <div className="navBarLogo">
            <img src="/images/infinity.png" alt="" width="40px" height="40px" />
            <span
              class="navbar-brand"
              style={{ textDecorationLine: "underline" }}
            >
              Eternity VPN
            </span>{" "}
          </div>
        </Link>
        <div className="avatar">{user ? <Avatar /> : <LoginBtn />}</div>
      </nav>
    </div>
  );
}

export default Header;
