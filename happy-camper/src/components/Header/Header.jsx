import React from 'react'
import './Header.css'
import LOGO from '../../assets/happycamperlogo.png'

const Header = () => {
  return (
    <div className='container.header_container'>
        <img src={LOGO} alt="happycamper logo" />
    </div>
  )
}

export default Header