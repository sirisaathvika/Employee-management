import React, { useState, useEffect } from "react";
import Axios from "axios";
import { HrNavbar } from "./HrNavbar";
import Login1 from "./Login1";
import { useNavigate } from "react-router";

const User = () => {
  const [loginStatus, setloginStatus] = useState(false);
  const [Role, setRole] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [currwork_role, setcurrwork_role] = useState("");
  const [currwork_position, setcurrwork_position] = useState("");
  const [currwork_department, setcurrwork_department] = useState("");
  const [currwork_joindate, setcurrwork_joindate] = useState("");
  const [id, setId] = useState("");
  const [id1, setId1] = useState("");

  const Table = (e) => {
    const data = e.d;

    return (
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Hometown</th>
            <th>Pancard</th>
            <th>PhoneNumber</th>
            <th>Role</th>
            <th>Postion</th>
            <th>Department</th>
            <th>Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.FirstName}</td>
                <td>{a.LastName}</td>
                <td>{a.Gender}</td>
                <td>
                  {new Date(a.DOB).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>{a.Hometown}</td>
                <td>{a.PanCard}</td>
                <td>{a.PhoneNumber}</td>
                <td>{a.currwork_role}</td>
                <td>{a.currwork_position}</td>
                <td>{a.currwork_department}</td>
                <td>
                  {new Date(a.currwork_joindate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const Table1 = (f) => {
    const data1 = f.d1;

    return (
      <table className="t1">
        <thead>
          <tr>
            <th>New Employees</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
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

  const fetchnewemp = async (f) => {
    Axios.get("http://localhost:3001/newemp").then((res) => {
      setData1(res.data);
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

  const submitHandler = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/currworksubmit", {
      id: id1,
      currwork_role: currwork_role,
      currwork_position: currwork_position,
      currwork_department: currwork_department,
      currwork_joindate: currwork_joindate,
    }).then((response) => {
      console.log(response);
      fetchhruser(response.data.id);
      setcurrwork_role("");
      setcurrwork_position("");
      setcurrwork_department("");
      setcurrwork_joindate("");
      refreshOnSpot();
    });
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login-session").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        console.log(response);
        setloginStatus(true);
        setRole(response.data.user.rows[0].role);
        fetchhruser(response.data.user.rows[0].id);
        fetchnewemp(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ? (
        <>
          <HrNavbar logoutAction={logout} />
          <div className="r1">
            <h2>Employee Details</h2>
            <Table d={data} />
            <br></br>
            <Table1 d1={data1} />
            <br></br>
            <a href="#" onClick={toggleForm}>
              Add/Update Info for New Employees
            </a>
            {showForm && (
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="curremp">Enter Employee ID</label>
                  <textarea
                    id="curremp"
                    name="curremp"
                    rows="1"
                    cols="20"
                    value={id1}
                    onChange={(e) => setId1(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="currwork_role">Current Role</label>
                  <textarea
                    id="currwork_role"
                    name="currwork_role"
                    rows="1"
                    cols="20"
                    value={currwork_role}
                    onChange={(e) => setcurrwork_role(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="currwork_position">Current postion</label>
                  <textarea
                    id="currwork_position"
                    name="currwork_position"
                    rows="1"
                    cols="20"
                    value={currwork_position}
                    onChange={(e) => setcurrwork_position(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="currwork_department">
                    Current Department
                  </label>
                  <textarea
                    id="currwork_department"
                    name="currwork_department"
                    rows="1"
                    cols="20"
                    value={currwork_department}
                    onChange={(e) => setcurrwork_department(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="currwork_joindate">Date Of Joining</label>
                  <input
                    type="date"
                    id="currwork_joindate"
                    name="currwork_joindate"
                    value={currwork_joindate}
                    onChange={(e) => setcurrwork_joindate(e.target.value)}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </>
      ) : (
        <>
          <h2>Employee Management System</h2>
          <Login1 />
        </>
      )}
    </div>
  );
};

export default User;
