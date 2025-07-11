import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { AdminNavbar } from './AdminNavbar';
import { HrNavbar } from './HrNavbar';
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const Position = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [currwork_position, setcurrwork_position] = useState("");
  const [data, setData] = useState([]);

  const Table = (e) => {
    const data = e.d;

    const handleUpdate = (id) => {
      updatepos(id, currwork_position);
    };

    return (
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Postion</th>
            <th>Change Position</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.currwork_position}</td>
                <td>
                <select
                    id="position"
                    name="position"
                    value={currwork_position}
                    onChange={(e) => setcurrwork_position(e.target.value)}
                  >
                    <option value="FrontEnd">FrontEnd</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Tester">Tester</option>
                    <option value="BackEnd">BackEnd</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleUpdate(a.id)}>Update</button>
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

  const refreshOnSpot = () => {
    window.location.reload(true);
  };

  const fetchhruser = async (e) => {
    Axios.post("http://localhost:3001/hruser", { id: e }).then((res) => {
      setData(res.data);
    });
  };

  const updatepos = async (id, currwork_position) => {
    Axios.post("http://localhost:3001/updatepos", {
      id: id,
      currwork_position: currwork_position,
    }).then((res) => {
      console.log(res.data);
      refreshOnSpot();
    });
  };

  const logout = () => {
    Axios.get('http://localhost:3001/logout')
    .then((response) => {
      // alert("Sure u want to log out");
      console.log(response);
      refreshToHome();
      // refreshOnSpot();
    }); 
    };

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
        console.log(response);
      if(response.data.loggedIn === true) {
        console.log(response)
        setloginStatus(true);
        setRole(response.data.user.rows[0].role);
        fetchhruser(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
  <div>
    {loginStatus ? 
      Role === "admin" ?
        (<>
          <AdminNavbar logoutAction={logout}/>
          <div className="r1">
            <h2>Position-Admin</h2>
            <Table d={data} />
          </div>
        </>)
        :
      Role === "hr" ?
        (<>
          <HrNavbar logoutAction={logout} />
          <div className="r1">
            <h2>Position-Hr</h2>
            <Table d={data} />
          </div>
        </>)
        :
        (<></>)  
      :
          (<>
          <h2>Employee Management System</h2>
          <Login1/>
          </>)}
  </div>
  )
}

export default Position