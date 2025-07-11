import React from 'react'
import { Link } from 'react-router-dom'
import "../components/css/EmpNavbar.css"

export const EmpNavbar = ({logoutAction}) => {
  return (
    <>
    <nav className='navigation'>
        <Link to='/'>Home</Link>
        <Link to='/personal-info'>Personal Information</Link>
        <Link to='/education'>Education</Link>
        <Link to='/dependents'>Dependents</Link>
        <Link to='/experience'>Experience</Link>
        <Link to='/leave-application-emp'>Leave Application</Link>
        <Link onClick={logoutAction}>Log Out</Link>
    </nav>
    </>
  )
}
