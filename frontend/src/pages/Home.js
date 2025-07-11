import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Login1 from './Login1';
import AdminDashboard from './AdminDashboard';
import HrDashboard from './HrDashboard';
import EmpDashboard from './EmpDashboard';
import { AdminNavbar } from './AdminNavbar';
import { HrNavbar } from './HrNavbar';
import { EmpNavbar } from './EmpNavbar';

export const Home = () => {

  const [loginStatus, setloginStatus] = useState(false);
//   const  [ msg, setMsg] = useState("Login In");
//   const [userId, setUserID] = useState("");
  const [Role,setRole] = useState("");

  const refreshOnSpot = () =>{
    window.location.reload(true);
  }

  const logout = () => {
    Axios.get('http://localhost:3001/logout')
    .then((response) => {
      // alert("Sure u want to log out");
      console.log(response);
      refreshOnSpot();
    }); 
    };

    
  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
        console.log(response);
      if(response.data.loggedIn === true) {
        console.log(response)
        setloginStatus(true);
        // setMsg("Logged Into User ID");
        // setUserID(response.data.user.rows[0].id);
        setRole(response.data.user.rows[0].role);
      }
    });
  }, []);

  return (
    
    <div>
        {/* <h2>Employee Management System</h2> */}
    {loginStatus ? 
        Role === "admin" ? 
            (<>
              <AdminNavbar logoutAction={logout}/>
              <AdminDashboard/>
            </>) 
            :
        Role === "hr" ?
            (<>
              <HrNavbar logoutAction={logout}/>
              <HrDashboard/>
            </>)
            :
        Role === "emp" ?
            (<>
              <EmpNavbar logoutAction={logout}/>
              <EmpDashboard/>
            </>)
            :
            (<></>)
        :   
            (<>
          <Login1/>
          </>)}
    </div>
  );
}
