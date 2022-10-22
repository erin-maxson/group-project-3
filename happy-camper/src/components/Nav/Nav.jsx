import React, { useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth';



const Nav = () => {
  
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return(
  <nav>
    {Auth.loggedIn() ? (
      <>
        <Link className="login" to="/" onClick={logout}>Logout</Link>

      </>
    ) : (
      <>
        <Link className='signup' to="/signup">
          Signup
        </Link>
        <Link className="login" to="/login">
          Login
        </Link>

      </>
    )}
  </nav>

  )


}



export default Nav