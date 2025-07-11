import React, { useState, useEffect } from "react";
import Axios from "axios";
import { EmpNavbar } from "./EmpNavbar";
import Login1 from "./Login1";
import { useNavigate } from "react-router";

const LeaveApplicationEmp = () => {
  const [loginStatus, setloginStatus] = useState(false);
  const [Role, setRole] = useState("");
  const [data, setData] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [id, setId] = useState("");

  const Table = (e) => {
    const data = e.d;

    return (
      <table className="t1">
        <thead>
          <tr>
            <th>LeaveType</th>
            <th>FromDate</th>
            <th>ToDate</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
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
    Axios.post("http://localhost:3001/leaveapp", { id: e }).then((res) => {
      setData(res.data);
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
    Axios.post("http://localhost:3001/leaveappsubmit", {
      id: id,
      leavetype: leaveType,
      fromdate: fromDate,
      todate: toDate,
      reason: reason,
    }).then((response) => {
      console.log(response);
      fetchleaveapp(response.data.id);
      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");
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
        fetchleaveapp(response.data.user.rows[0].id);
        setId(response.data.user.rows[0].id)
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ? (
        <>
          <EmpNavbar logoutAction={logout} />
          <div className="r1">
            <h2>Employee Leave Application</h2>
            <Table d={data} />
            <br></br>
            <a href="#" onClick={toggleForm}>New Leave Application Form</a>
            {showForm && (
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="leavetype">Leave Type</label>
                  <select
                    id="leavetype"
                    name="leavetype"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                  >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="fromdate">From Date</label>
                  <input
                    type="date"
                    id="fromdate"
                    name="fromdate"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="todate">To Date</label>
                  <input
                    type="date"
                    id="todate"
                    name="todate"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="reason">Reason</label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows="4"
                    cols="50"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
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

export default LeaveApplicationEmp;
