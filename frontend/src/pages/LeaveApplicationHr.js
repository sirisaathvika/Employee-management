import React, { useState, useEffect } from "react";
import Axios from "axios";
import { HrNavbar } from "./HrNavbar";
import Login1 from "./Login1";
import { useNavigate } from "react-router";

const LeaveApplicationHr = () => {
  const [loginStatus, setloginStatus] = useState(false);
  const [Role, setRole] = useState("");
  const [data, setData] = useState([]);

  const Table = (e) => {
    const data = e.d;
    const [stat, setStat] = useState("");

    const handleApprove = (id, fromdate, todate) => {
      approve(id, fromdate, todate, stat);
    }

    return (
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>LeaveType</th>
            <th>FromDate</th>
            <th>ToDate</th>
            <th>Reason</th>
            <th>Lastest Status</th>
            <th>Approve/Disapprove</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.leavetype}</td>
                <td>
                  {new Date(a.fromdate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(a.todate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>{a.reason}</td>
                <td>{a.status}</td>
                <td>
                  <select
                    id="status"
                    name="status"
                    value={stat}
                    onChange={(e) => setStat(e.target.value)}
                  >
                    <option value="Approved">Approve</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleApprove(a.id,a.fromdate,a.todate)}>Assign</button>
                </td>
                <td>
                <button onClick={() => deleteleave(a.id,a.fromdate,a.todate)}>Delete</button>
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

  const refreshOnSpot = () =>{
    window.location.reload(true);
  }

  const fetchleaveapp = async (e) => {
    Axios.post("http://localhost:3001/leaveapphr", { id: e }).then((res) => {
      setData(res.data);
    });
  };

  const approve = async (id, fromdate, todate, status ) => {
    Axios.post("http://localhost:3001/approve", { id : id, fromdate : fromdate, todate : todate, status : status}).then((res)=>{
      console.log(res.data);
      refreshOnSpot();
    });
  }

  const deleteleave = async (id, fromdate, todate) => {
    Axios.post("http://localhost:3001/deleteleave", { id : id, fromdate : fromdate, todate : todate}).then((res)=>{
      console.log(res.data);
      refreshOnSpot();
    });
  }

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
        fetchleaveapp(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ? (
        <>
          <HrNavbar logoutAction={logout} />
          <div className="r1">
            <h2>HR Leave Application Portal</h2>
            <Table d={data} />
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

export default LeaveApplicationHr;
