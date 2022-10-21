import './Signup.css';
import logo from '../../assets/vanlogo.png';
// import { Cancel, Room } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import Auth from '../../utils/auth';

import { ADD_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (event) {
      console.error(event);
    }
  };

  return (
    <div className='signup-container'>
      <div className='logo'>
        <img src={logo} alt='small van logo' />
      </div>

      <h2>Sign up</h2>

      <form onSubmit={handleFormSubmit}>
        <p>Create your username</p>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={formState.name}
          onChange={handleChange}
        />
        <p>Add your email</p>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <p>Create your password</p>
        <input
          type="password"
          placeholder="**********"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button className='signupBtn' type="submit">Let's go!</button>
      </form>
    {error && (
      <div>
        {error.message}
      </div>
    )}

    </div>
  );
};

export default Signup;