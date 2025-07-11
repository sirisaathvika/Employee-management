import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { AdminNavbar } from './AdminNavbar';
import { HrNavbar } from './HrNavbar';
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const Department = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [currwork_department, setcurrwork_department] = useState("");
  const [data, setData] = useState([]);

  const Table = (e) => {
    const data = e.d;

    const handleUpdate = (id) => {
      updatedep(id, currwork_department);
    };

    return (
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Assign/Change Dept</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.currwork_department}</td>
                <td>
                <select
                    id="dept"
                    name="dept"
                    value={currwork_department}
                    onChange={(e) => setcurrwork_department (e.target.value)}
                  >
                    <option value="Sales">Sales</option>
                    <option value="DNA">DNA</option>
                    <option value="Dept ABC">Dept ABC</option>
                    <option value="Graphic">Graphic</option>
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

  const updatedep = async (id, currwork_department) => {
    Axios.post("http://localhost:3001/updatedep", {
      id: id,
      currwork_department: currwork_department,
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
      // refreshOnSpot();
      refreshToHome();
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
            <h2>Department-Admin</h2>
            <Table d={data} />
          </div>
        </>)
        :
      Role === "hr" ?
        (<>
          <HrNavbar logoutAction={logout} />
          <div className="r1">
            <h2>Department-Hr</h2>
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

export default Department