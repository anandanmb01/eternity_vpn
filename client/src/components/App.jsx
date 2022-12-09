import React from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Home from "../pages/Home";
import Footer from "./Footer";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import axios from "axios";
import UserDashboard from "../pages/UserDashboard";
import UsrContext from "../context/UsrContext";
import { useContext } from "react";


window.serverurl=process.env.REACT_APP_SERVER_URL;

// use cookie for all axios query
axios.defaults.withCredentials = true;

function App() {

  const { user, setUser } = useContext(UsrContext);

  //--------Axios fetch ---------------//
  useEffect(() => {
    axios
      .post(window.serverurl + "/auth/getusr")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
      // eslint-disable-next-line
  }, []);

  // ---------------------------App return-------------------------------------------//
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user?<Dashboard/>:<Login />}/>
        <Route path="/dashboard/:id" element={user?<UserDashboard/>:<Login />} />
        <Route path="/*" element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
