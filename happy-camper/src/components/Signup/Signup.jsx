import './Signup.css'
import logo from '../../assets/vanlogo.png'

const Signup = () => {
  return (
    <div className='signup-container'>
        <div className='logo'>
            <img src={logo} alt='small van logo' />
        </div>

        <h2>Sign up</h2>

        <form action="">
            <p>Create your username</p>
            <input type="text" placeholder="username" />
            <p>Add your email</p>
            <input type="email" placeholder="email" />
            <p>Create your password</p>
            <input type="password" placeholder="password" />
            <button className='signupBtn'>Let's go!</button>
        </form>

    </div>
  )
}

export default Signup