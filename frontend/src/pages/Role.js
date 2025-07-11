import React, { useState, useEffect } from "react";
import Axios from "axios";
import { AdminNavbar } from "./AdminNavbar";
import { HrNavbar } from "./HrNavbar";
import Login1 from "./Login1";
import { useNavigate } from "react-router";

const Role = () => {
  const [loginStatus, setloginStatus] = useState(false);
  const [Role, setRole] = useState("");
  const [currwork_role, setCurrwork_role] = useState("");
  const [data, setData] = useState([]);

  const Table = (e) => {
    const data = e.d;

    const handleUpdate = (id) => {
      update(id, currwork_role);
    };

    return (
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Role</th>
            <th>Assign/Change Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.currwork_role}</td>
                <td>
                <select
                    id="role"
                    name="role"
                    value={currwork_role}
                    onChange={(e) => setCurrwork_role(e.target.value)}
                  >
                    <option value="Manager">Manager</option>
                    <option value="Testing">Testing</option>
                    <option value="Senior Team Manager">Senior Team Manager</option>
                    <option value="Developer">Developer</option>
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
  const refreshToHome = () => {
    navigate("/");
  };

  const refreshOnSpot = () => {
    window.location.reload(true);
  };

  const fetchhruser = async (e) => {
    Axios.post("http://localhost:3001/hruser", { id: e }).then((res) => {
      setData(res.data);
    });
  };

  const update = async (id, currwork_role) => {
    Axios.post("http://localhost:3001/update", {
      id: id,
      currwork_role: currwork_role,
    }).then((res) => {
      console.log(res.data);
      refreshOnSpot();
    });
  };

  const logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      // alert("Sure u want to log out");
      console.log(response);
      // refreshOnSpot();
      refreshToHome();
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        console.log(response);
        setloginStatus(true);
        setRole(response.data.user.rows[0].role);
        fetchhruser(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ? (
        Role === "admin" ? (
          <>
            <AdminNavbar logoutAction={logout} />
            <div className="r1">
              <h2>Role-Admin</h2>
              <Table d={data} />
            </div>
          </>
        ) : Role === "hr" ? (
          <>
            <HrNavbar logoutAction={logout} />
            <div className="r1">
              <h2>Role-Hr</h2>
              <Table d={data} />
            </div>
          </>
        ) : (
          <></>
        )
      ) : (
        <>
          <h2>Employee Management System</h2>
          <Login1 />
        </>
      )}
    </div>
  );
};

export default Role;
