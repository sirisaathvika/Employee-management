import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { AdminNavbar } from './AdminNavbar'
import Login1 from './Login1';
import { useNavigate } from 'react-router';

const ProjectBidding = () => {

  const [loginStatus, setloginStatus] = useState(false);
  const [Role,setRole] = useState("");
  const [data, setData] = useState([]);
  const [projtitle,setprojtitle] = useState("");
  const [portal,setportal] = useState("");
  const [esttime,setesttime] = useState("");
  const [estcost,setestcost] = useState("");
  const [remark,setremark] = useState("");

  const Table = (e) => {
    const data = e.d;
    
    return(
      <table className="t1">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Portal</th>
            <th>Estimated Time</th>
            <th>Estimated Cost</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, index) => {
            return (
              <tr key={index}>
                <td>{a.projtitle}</td>
                <td>{a.portal}</td>
                <td>{a.esttime}</td>
                <td>{a.estcost}</td>
                <td>{a.remark}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  }

  const refreshOnSpot = () =>{
    window.location.reload(true);
  }

  const navigate = useNavigate();
  const refreshToHome = () =>{
    navigate("/");
  }

  const fetchprojbid = async (e)=>{
    Axios.post("http://localhost:3001/projbid", {id : e}).then((res)=>{
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
    Axios.post("http://localhost:3001/projbidsubmit", {
      projtitle: projtitle,
      portal: portal,
      esttime: esttime,
      estcost: estcost,
      remark: remark,
    }).then((response) => {
      console.log(response);
      fetchprojbid(response.data.id);
      setprojtitle("");
      setportal("");
      setesttime("");
      setestcost("");
      setremark("");
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
        fetchprojbid(response.data.user.rows[0].id);
      }
    });
  }, []);

  return (
    <div>
      {loginStatus ?
        (<>
        <AdminNavbar logoutAction={logout}/>
        <div className="r1">
          <h2>Project Bidding</h2>
          <Table d={data}/>
          <br></br>
          <a href="#" onClick={toggleForm}>Add/Update Project Bidding Details</a>
          {showForm && (
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="projttitle">Project Title</label>
                  <textarea
                    id="projtitle"
                    name="projtitle"
                    rows="1"
                    cols="20"
                    value={projtitle}
                    onChange={(e) => setprojtitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="portal">Portal</label>
                  <textarea
                    id="portal"
                    name="portal"
                    rows="1"
                    cols="20"
                    value={portal}
                    onChange={(e) => setportal(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="esttime">Estimated Time</label>
                  <textarea
                    id="esttime"
                    name="esttime"
                    rows="1"
                    cols="20"
                    value={esttime}
                    onChange={(e) => setesttime(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="estcost">Estimated Cost</label>
                  <textarea
                    id="estcost"
                    name="estcost"
                    rows="1"
                    cols="20"
                    value={estcost}
                    onChange={(e) => setestcost(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="remark">Remark</label>
                  <textarea
                    id="remark"
                    name="remark"
                    rows="1"
                    cols="20"
                    value={remark}
                    onChange={(e) => setremark(e.target.value)}
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

export default ProjectBidding