import './Login.css'
import React, { useState } from 'react'
import logo from '../../assets/vanlogo.png'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../utils/mutations'
import { AiFillCloseCircle } from 'react-icons/ai'

import Auth from '../../utils/auth'


const Login = (props) => {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' })
    const [login, { error, data }] = useMutation(LOGIN)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            username: '',
            email: '',
            password: '',
        });
    };


    return (
        <div>
            <div className='signup-container'>

                <div>
                    <AiFillCloseCircle />
                </div>

                <div className='logo'>
                    <img src={logo} alt='small van logo' />
                </div>

                <h2>Login</h2>

                <div className='card-body'>
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (

                        <form onSubmit={handleFormSubmit}>
                            <p>Username</p>
                            <input
                                type="text"
                                placeholder="username"
                                name="username"
                                value={formState.username}
                                onChange={handleChange}

                            />
                            <p>Email</p>
                            <input
                                type="email"
                                placeholder="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                            />


                            <p>Password</p>
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button className='signupBtn'
                                type="submit"
                            >
                                On the road again...
                            </button>
                        </form>

                    )}

                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Login