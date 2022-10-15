import React from 'react'
import logo from '../../assets/vanlogo.png'

const Login = () => {
    return (
        <div>
            <div className='login-container'>
                <div className='logo'>
                    <img src={logo} alt='small van logo' />
                </div>

                <h2>Login</h2>

                <form action="">
                    <p>Username</p>
                    <input type="text" placeholder="username" />
                    <p>Email</p>
                    <input type="email" placeholder="email" />
                    <p>Password</p>
                    <input type="password" placeholder="password" />
                    <button className='signupBtn'>On the road again...</button>
                </form>

            </div>
        </div>
    )
}

export default Login