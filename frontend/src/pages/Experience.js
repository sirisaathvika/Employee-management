import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { EmpNavbar } from './EmpNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const Experience = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);
  const [company,setcompany] = useState("");
  const [designation,setdesignation] = useState("");
  const [joindate,setjoindate] = useState("");
  const [enddate,setendate] = useState("");
  const [id, setId] = useState("");


  const Table = (e) => {
    const data = e.d;
    
    return(
      <table className="t1">
        <thead>
          <tr>
            <th>Company</th>
            <th>Designation</th>
            <th>StartDate</th>
            <th>EndDate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.company}</td>
                <td>{a.designation}</td>
                <td>{new Date(a.joindate).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
                <td>{new Date(a.enddate).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }


  const navigate = useNavigate();
  const refreshToHome = () =>{
    navigate("/");
  }

  const refreshOnSpot = () =>{
    window.location.reload(true);
  }

  const fetchworkexp = async (e)=>{
    Axios.post("http://localhost:3001/workexp", {id : e}).then((res)=>{
      setData(res.data);
    });
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

  const submitHandler = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:3001/expsubmit", {
        id: id,
        company: company,
        designation: designation,
        joindate: joindate,
        enddate: enddate,
      }).then((response) => {
        console.log(response);
        fetchworkexp(response.data.id);
        setcompany("");
        setdesignation("");
        setjoindate("");
        setendate("");
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
        fetchworkexp(response.data.user.rows[0].id);
        setId(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <EmpNavbar logoutAction={logout}/>
        <div className="r1">
          <h2>Experience</h2>
          <Table d={data}/>
          <br></br>
          <a href="#" onClick={toggleForm}>Add/Update Previous Experience Information Details</a>
          {showForm && (
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="company">Name of the Company</label>
                  <textarea
                    id="company"
                    name="company"
                    rows="1"
                    cols="20"
                    value={company}
                    onChange={(e) => setcompany(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="designation">Designation</label>
                  <textarea
                    id="designation"
                    name="designation"
                    rows="1"
                    cols="20"
                    value={designation}
                    onChange={(e) => setdesignation(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="joindate">Date Of Joining</label>
                  <input
                    type="date"
                    id="joindate"
                    name="joindate"
                    value={joindate}
                    onChange={(e) => setjoindate(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="endate">Date Of Leaving</label>
                  <input
                    type="date"
                    id="endate"
                    name="endate"
                    value={enddate}
                    onChange={(e) => setendate(e.target.value)}
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

export default Experience