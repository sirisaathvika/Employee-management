import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { HrNavbar } from './HrNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const Salary = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [accno, setaccno] = useState("");
  const [bankname, setbankname] = useState("");
  const [ifsc, setifsc] = useState("");
  const [salary, setsalary] = useState("");
  const [tax, settax] = useState("");
  const [id1, setId1] = useState("");

  const Table = (e) => {
    const data = e.d;
    
    return(
      <table className="t1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Bank Name</th>
            <th>Account No</th>
            <th>IFSC Code</th>
            <th>Tax Deduction</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.id}</td>
                <td>{a.FirstName}</td>
                <td>{a.LastName}</td>
                <td>{a.bankname}</td>
                <td>{a.accno}</td>
                <td>{a.ifsc}</td>
                <td>{a.tax}</td>
                <td>{a.salary}</td>
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
  const refreshToHome = () =>{
    navigate("/");
  }

  const refreshOnSpot = () => {
    window.location.reload(true);
  };

  const fetchsal = async (e)=>{
    Axios.post("http://localhost:3001/salary", {id : e}).then((res)=>{
      setData(res.data);
    });
  } 

  const fetchnewempsal = async (f) => {
    Axios.get("http://localhost:3001/newempsal").then((res) => {
      setData1(res.data);
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

    const submitHandler = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:3001/salsubmit", {
        id: id1,
        accno: accno,
        bankname: bankname,
        ifsc: ifsc,
        salary: salary,
        tax: tax,
      }).then((response) => {
        console.log(response);
        fetchsal(response.data.id);
        setaccno("");
        setbankname("");
        setifsc("");
        setsalary("");
        settax("");
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
      if(response.data.loggedIn === true) {
        console.log(response)
        setloginStatus(true);
        setRole(response.data.user.rows[0].role);
        fetchsal(response.data.user.rows[0].id);
        fetchnewempsal(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <HrNavbar logoutAction={logout}/>
        <div className="r1">
          <h2>Salary</h2>
          <Table d={data}/>
          <br></br>
          <Table1 d1={data1} />
          <br></br>
          <a href="#" onClick={toggleForm}>
              Add/Update Salary for New Employees
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
                  <label htmlFor="accno">Account Number</label>
                  <textarea
                    id="accno"
                    name="accno"
                    rows="1"
                    cols="20"
                    value={accno}
                    onChange={(e) => setaccno(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="bankname">Bank Name</label>
                  <textarea
                    id="bankname"
                    name="bankname"
                    rows="1"
                    cols="20"
                    value={bankname}
                    onChange={(e) => setbankname(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="ifsc">
                    IFSC Code
                  </label>
                  <textarea
                    id="ifsc"
                    name="ifsc"
                    rows="1"
                    cols="20"
                    value={ifsc}
                    onChange={(e) => setifsc(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="salary">Salary</label>
                  <textarea
                    id="salary"
                    name="salary"
                    rows="1"
                    cols="20"
                    value={salary}
                    onChange={(e) => setsalary(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="tax">Tax Deduction</label>
                  <textarea
                    id="tax"
                    name="tax"
                    rows="1"
                    cols="20"
                    value={tax}
                    onChange={(e) => settax(e.target.value)}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            )}
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

export default Salary