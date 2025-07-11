import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { EmpNavbar } from './EmpNavbar';
import "../components/css/button.css"

const EmpDashboard = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [userId, setUserID] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
        console.log(response);
      if(response.data.loggedIn === true) {
        console.log(response)
        setloginStatus(true);
        // setMsg("Logged Into User ID");
        setUserID(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
  <>
    <div className='logout'>
        <h2>Welcome Employee {userId}</h2>
    </div>
  </>
  );
}

export default EmpDashboard