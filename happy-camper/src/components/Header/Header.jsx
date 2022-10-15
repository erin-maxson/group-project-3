import React from 'react'
import './Header.css'
import LOGO from '../../assets/happycamperlogo.png'

const Header = () => {
  return (
    <div className='container.header_container'>
      <img src={LOGO} alt="happycamper logo" />
      <mapbox-search-box
        access-token="<your access token here>"
        proximity="0,0"
      >
      </mapbox-search-box>
    </div>
  )
}

export default Header