import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { EmpNavbar } from './EmpNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const Education = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);
  const [schooluni,setschooluni] = useState("");
  const [degree,setdegree] = useState("");
  const [grade,setgrade] = useState("");
  const [passyear,setpassyear] = useState("");
  const [id, setId] = useState("");

  const Table = (e) => {
    const data = e.d;
    
    return(
      <table className="t1">
        <thead>
          <tr>
            <th>School/University</th>
            <th>Degree</th>
            <th>Grade</th>
            <th>Year of Passing</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.schooluni}</td>
                <td>{a.degree}</td>
                <td>{a.grade}</td>
                <td>{a.passyear}</td>
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

  const fetchedu = async (e)=>{
      Axios.post("http://localhost:3001/edu", {id : e}).then((res)=>{
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
      Axios.post("http://localhost:3001/edusubmit", {
        id: id,
        schooluni: schooluni,
        degree: degree,
        grade: grade,
        passyear: passyear,
      }).then((response) => {
        console.log(response);
        fetchedu(response.data.id);
        setschooluni("");
        setdegree("");
        setgrade("");
        setpassyear("");
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
        fetchedu(response.data.user.rows[0].id);
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
          <h2>Education</h2>
          <Table d={data}/>
          <br></br>
          <a href="#" onClick={toggleForm}>Add/Update Education Information Details</a>
          {showForm && (
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="schooluni">School/University Name</label>
                  <textarea
                    id="schooluni"
                    name="schooluni"
                    rows="1"
                    cols="20"
                    value={schooluni}
                    onChange={(e) => setschooluni(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="degree">Degree</label>
                  <textarea
                    id="degree"
                    name="degree"
                    rows="1"
                    cols="20"
                    value={degree}
                    onChange={(e) => setdegree(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="grade">Grade</label>
                  <textarea
                    id="grade"
                    name="grade"
                    rows="1"
                    cols="20"
                    value={grade}
                    onChange={(e) => setgrade(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="passyear">Year Of Passing</label>
                  <textarea
                    id="passyear"
                    name="passyear"
                    rows="1"
                    cols="20"
                    value={passyear}
                    onChange={(e) => setpassyear(e.target.value)}
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

export default Education