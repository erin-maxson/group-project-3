import React from 'react'
import './Nav.css'

const Nav = () => {
  return (
    <nav className='container.nav_container'>
        <a className='signup' href="#Signup">Signup</a>
        <a className='login' href="#Login">Login</a>
    </nav>
  )
}

export default Nav