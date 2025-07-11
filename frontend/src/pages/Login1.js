import React, {Component, useState}  from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../components/css/Login1.css'
import "../components/css/button.css"


const Login1 = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setloginStatus] = useState(false);
  // const  [ msg, setMsg] = useState("Login In");
  // const [userId, setUserID] = useState("");

  const navigate = useNavigate();
  const refreshToHome = () =>{
    navigate("/");
  }

    const refreshOnSpot = () =>{
        window.location.reload(true);
    }

  const login1 = () => {
    Axios.post('http://localhost:3001/login', {
      username: username, 
      password: password,
    }).then((response) => {
      console.log("aditya",response.data);
      if(response.data.success) {
        setloginStatus(response.data.success);
        // setUserID(response.data.data.rows[0].id);
        // setMsg(response.data.message);
        refreshOnSpot();
      } else {
        setloginStatus(response.data.success);
        // setMsg(response.data.message);
      }
      // console.log(response)
    }); 
  };

  const signup = () => {
    navigate("/registration")
  };


  return (
    // { <h3> {msg} {userId}</h3> }
    <div className='login' >
      <h2>Employee Management System</h2>
     <>
        <div className='uname'>
          <label>Employee ID</label>
            <input 
              type="test"
              placeholder="Enter Employee ID"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              /></div>
          <div className='pswd'>
            <label>Password</label>
            <input 
              type="password"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              /></div>
            <button class="button-74" onClick={login1}>Login</button>
            <button class="button-74" onClick={signup}>Sign Up</button>
        </>
    </div>  
  )
}

export default Login1