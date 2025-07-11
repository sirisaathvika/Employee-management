import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './css/Registration.css'

export const Registration = () => {

  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const navigate = useNavigate();
  const refreshToHome = () => {
    navigate("/");
  }

   const register = () => {
    Axios.post("http://localhost:3001/registration", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
        console.log(response)
        if(response.data){
          refreshToHome();
        }
    });
  };

  const signin = () => {
    navigate("/")
  };

  return(

    <div className="registration">
    <h2>Registration</h2>
      <div className='reg_eid'>
        <label>Employee ID</label>
        <input
          type="text"
          placeholder='Enter your Employee ID'
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        </div>
      <div className='reg_pswd'>
          <label>Password</label>
          <input
            type="password"
            placeholder='Enter Password to be set'
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
        </div>
          <button class="button-74" onClick={register}> Register </button>
          <button class="button-74" onClick={signin}> Sign In </button>
      </div>
  );
}