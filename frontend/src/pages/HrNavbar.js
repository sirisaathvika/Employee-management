import React from 'react'
import { Link } from 'react-router-dom'
import "../components/css/EmpNavbar.css"

export const HrNavbar = ({logoutAction}) => {
  return (
    <>
      <nav className='navigation'>
          <Link to='/'>Home</Link>
          <Link to='/employee'>User</Link>
          <Link to='/salary'>Salery</Link>
          <Link to='/leave-application-hr'>Leave Application</Link>
          {/* <Link to='/company'>Company</Link> */}
          <Link to='/role'>Role</Link>
          <Link to='/position'>Position</Link>
          <Link to='/department'>Department</Link>
          <Link onClick={logoutAction}>Log Out</Link>
      </nav>
    </>
  )
}
