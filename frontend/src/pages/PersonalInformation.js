import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { EmpNavbar } from './EmpNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const PersonalInformation = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);
  const [FirstName,setFirstName] = useState("");
  const [LastName,setLastName] = useState("");
  const [Gendor,setGendor] = useState("");
  const [DoB,setDoB] = useState("");
  const [Hometown,setHometown] = useState("");
  const [PanCard,setPanCard] = useState("");
  const [PhoneNumber,setPhoneNumber] = useState("");
  const [id, setId] = useState("");


  const Table = (e) => {
    const data = e.d;
    
    return(
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
                <td>{new Date(a.DOB).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
                <td>{a.Hometown}</td>
                <td>{a.PanCard}</td>
                <td>{a.PhoneNumber}</td>
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

  const fetchempdetail = async (e)=>{
      Axios.post("http://localhost:3001/empdetail", {id : e}).then((res)=>{
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
    Axios.post("http://localhost:3001/persoinfosubmit", {
      id: id,
      FirstName: FirstName,
      LastName: LastName,
      Gendor: Gendor,
      DoB: DoB,
      Hometown: Hometown,
      PanCard: PanCard,
      PhoneNumber: PhoneNumber,
    }).then((response) => {
      console.log(response);
      fetchempdetail(response.data.id);
      setFirstName("");
      setLastName("");
      setGendor("");
      setDoB("");
      setHometown("");
      setPanCard("");
      setPhoneNumber("");
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
        fetchempdetail(response.data.user.rows[0].id);
        setId(response.data.user.rows[0].id)
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <EmpNavbar logoutAction={logout}/>
        <div className="r1">
          <h2>Personal Information</h2>
          <Table d={data}/>
          <br></br>
          <a href="#" onClick={toggleForm}>Add/Update Personal Information Details</a>
          {showForm && (
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="firstname">First Name</label>
                  <textarea
                    id="firstname"
                    name="firstname"
                    rows="1"
                    cols="20"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lastname">Last Name</label>
                  <textarea
                    id="lastname"
                    name="lastname"
                    rows="1"
                    cols="20"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="gender">Gender</label>
                  <textarea
                    id="gender"
                    name="gender"
                    rows="1"
                    cols="20"
                    value={Gendor}
                    onChange={(e) => setGendor(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="DOB">DOB</label>
                  <input
                    type="date"
                    id="DOB"
                    name="DOB"
                    value={DoB}
                    onChange={(e) => setDoB(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Hometown">Hometown</label>
                  <textarea
                    id="Homtown"
                    name="Hometown"
                    rows="1"
                    cols="20"
                    value={Hometown}
                    onChange={(e) => setHometown(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="PanCard">PanCard</label>
                  <textarea
                    id="PanCard"
                    name="PanCard"
                    rows="1"
                    cols="20"
                    value={PanCard}
                    onChange={(e) => setPanCard(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="PhoneNumber">Phone Number</label>
                  <textarea
                    id="PhoneNumber"
                    name="PhoneNumber"
                    rows="1"
                    cols="20"
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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

export default PersonalInformation