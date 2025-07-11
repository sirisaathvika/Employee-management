import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { EmpNavbar } from './EmpNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const Dependents = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);
  const [dep_name,setdep_name] = useState("");
  const [dep_relationship,setdep_relationship] = useState("");
  const [dep_dob,setdep_dob] = useState("");
  const [dep_number,setdep_number] = useState("");
  const [id, setId] = useState("");

  const Table = (e) => {
    const data = e.d;
    
    return(
      <table className="t1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Relationship</th>
            <th>DOB</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.dep_name}</td>
                <td>{a.dep_relationship}</td>
                <td>{new Date(a.dep_dob).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
                <td>{a.dep_number}</td>
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

  const fetchdep = async (e)=>{
      Axios.post("http://localhost:3001/dependent", {id : e}).then((res)=>{
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
      Axios.post("http://localhost:3001/depsubmit", {
        id: id,
        dep_name: dep_name,
        dep_relationship: dep_relationship,
        dep_dob: dep_dob,
        dep_number: dep_number,
      }).then((response) => {
        console.log(response);
        fetchdep(response.data.id);
        setdep_name("");
        setdep_relationship("");
        setdep_dob("");
        setdep_number("");
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
        fetchdep(response.data.user.rows[0].id);
        setId(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div >
      {loginStatus ?
        (<>
        <EmpNavbar logoutAction={logout}/>
        <div className="r1">
          <h2>Dependents</h2>
          <Table d={data}/>
          <br></br>
          <a href="#" onClick={toggleForm}>Add/Update Dependents Information Details</a>
          {showForm && (
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="dep_name">Name of the Dependent</label>
                  <textarea
                    id="dep_name"
                    name="dep_name"
                    rows="1"
                    cols="20"
                    value={dep_name}
                    onChange={(e) => setdep_name(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="dep_relationship">Relationship</label>
                  <textarea
                    id="dep_relationship"
                    name="dep_relationship"
                    rows="1"
                    cols="20"
                    value={dep_relationship}
                    onChange={(e) => setdep_relationship(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="dep_dob">DOB of Dependent</label>
                  <input
                    type="date"
                    id="dep_dob"
                    name="dep_dob"
                    value={dep_dob}
                    onChange={(e) => setdep_dob(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="dep_number">Phone Number of the Dependent</label>
                  <textarea
                    id="dep_number"
                    name="dep_number"
                    rows="1"
                    cols="20"
                    value={dep_number}
                    onChange={(e) => setdep_number(e.target.value)}
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

export default Dependents