import './App.css';
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Registration } from "./components/Registration";
import { Home } from './pages/Home';
import PortalMaster from './pages/PortalMaster';
import Role from './pages/Role';
import Position from './pages/Position';
import Department from './pages/Department';
import ProjectBidding from './pages/ProjectBidding';
import User from './pages/User';
import Salary from './pages/Salary';
import LeaveApplicationHr from './pages/LeaveApplicationHr';
// import Company from './pages/Company';
import PersonalInformation from './pages/PersonalInformation';
import Education from './pages/Education';
import Dependents from './pages/Dependents';
import Experience from './pages/Experience';
import LeaveApplicationEmp from './pages/LeaveApplicationEmp';

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/registration" element={<Registration />}></Route>

        <Route exact path="/role" element={<Role/>}></Route>
        <Route exact path="/position" element={<Position/>}></Route>
        <Route exact path="/department" element={<Department/>}></Route>
        <Route exact path="/project-bid" element={<ProjectBidding/>}></Route>
        <Route exact path="/portal-master" element={<PortalMaster/>}></Route>

        <Route exact path="/employee" element={<User/>}></Route>
        <Route exact path="/salary" element={<Salary/>}></Route>
        <Route exact path="/leave-application-hr" element={<LeaveApplicationHr/>}></Route>
        {/* <Route exact path="/company" element={<Company/>}></Route> */}

        <Route exact path="/personal-info" element={<PersonalInformation/>}></Route>
        <Route exact path="/education" element={<Education/>}></Route>
        <Route exact path="/dependents" element={<Dependents/>}></Route>
        <Route exact path="/experience" element={<Experience/>}></Route>
        <Route exact path="/leave-application-emp" element={<LeaveApplicationEmp/>}></Route>
      </Routes>
    </>
  );
}

export default App;
