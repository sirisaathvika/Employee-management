import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { AdminNavbar } from './AdminNavbar'
import Login1 from './Login1'
import { useNavigate } from 'react-router'

const PortalMaster = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const Table = (e) => {
    const data = e.d;
    const [selectedRole, setSelectedRole] = useState("");

    const handleAssign = (id) => {
      assign(id, selectedRole);
    }

    return(
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Portal Access</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="hr">HR</option>
                  <option value="emp">Employee</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleAssign(a.id)}>Assign</button>
              </td>
              <td>
                <button onClick={() => drop(a.id)}>Drop</button>
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }

  const Table1 = (f) => {
    const data1 = f.d1;

    return (
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.role}</td>
                <td>
                <button onClick={() => drop(a.id)}>Drop</button>
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const navigate = useNavigate();
  const refreshToHome = () =>{
    navigate("/");
  }

  const refreshOnSpot = () =>{
    window.location.reload(true);
  }
  
  const logout = () => {
    Axios.get('http://localhost:3001/logout')
    .then((response) => {
      // alert("Sure u want to log out");
      console.log(response);
      // refreshOnSpot();
      refreshToHome();
    }); 
    };


    const fetchPortalInfo = async (e)=>{
      Axios.get("http://localhost:3001/portalmaster").then((res)=>{
        setData(res.data);
      });
    }

    const fetchexiemp = async (f)=>{
      Axios.get("http://localhost:3001/exiemp").then((res)=>{
        setData1(res.data);
      });
    }

    const assign = async (id, role) => {
      Axios.post("http://localhost:3001/assign", { id : id, role : role}).then((res)=>{
        console.log(res.data);
        refreshOnSpot();
      });
    }

    const drop = async (id) => {
      Axios.post("http://localhost:3001/drop", { id : id}).then((res)=>{
        console.log(res.data);
        refreshOnSpot();
      });
    }

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
        console.log(response);
      if(response.data.loggedIn === true) {
        console.log(response)
        setloginStatus(true);
        setRole(response.data.user.rows[0].role);
        fetchPortalInfo(response.data.user.rows[0].id);
        fetchexiemp(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <AdminNavbar logoutAction={logout}/>
        <div className="r1">
          <h2>Portal Master</h2>
          <Table d={data}/>
          <br></br>
          <h3>Existing Users</h3>
          <Table1 d1={data1}/>
        </div>
        </>)
      :
        (<>
        <h2>Employee Management System</h2>
        <Login1/>
        </>)}
    </div>
  )
}

export default PortalMaster