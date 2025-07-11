import React from 'react'
import { Link } from 'react-router-dom'
import { Axios } from 'axios'
import "../components/css/EmpNavbar.css"

export const AdminNavbar = ({logoutAction}) => {

  return (
    <>
      <nav className='navigation'>
          <Link to='/'>Home</Link>
          <Link to='/role'>Role</Link>
          <Link to='/position'>Position</Link>
          <Link to='/department'>Department</Link>
          <Link to='/project-bid'>Project Bidding</Link>
          <Link to='/portal-master'>Portal Master</Link>
          <Link onClick={logoutAction}>Log Out</Link>
      </nav>
    
    </>
  )
}
