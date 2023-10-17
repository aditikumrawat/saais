import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import SigninLottieAnimation from './SigninLottieAnimation';

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const[passwordVisiblility,setPasswordVisiblility] = useState(false);
  const passwordInput = useRef();

  const navigate = useNavigate(); 

  const changeVisibility = () => {
    if(passwordVisiblility === false){
      setPasswordVisiblility(true);
      passwordInput.current.type = 'text';
    }else{
      setPasswordVisiblility(false);
      passwordInput.current.type = 'password';
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUserName(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:8000/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const access_token = response.data.access_token;
      const user_name = response.data.username;
      const expiresIn = 3600;

      window.localStorage.setItem('accessToken', access_token);
      window.localStorage.setItem('username',user_name);
      window.localStorage.setItem('tokenExpiry', Date.now() + expiresIn * 1000);

      console.log(user_name);
      console.log(access_token);

      setTimeout(() => {
        // Remove the token and related data from localStorage
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('tokenExpiry');
      }, expiresIn * 1000); // This will run after the token expires (in milliseconds)

      navigate('/');
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Check if the access token has expired
    const tokenExpiry = window.localStorage.getItem('tokenExpiry');
    if (tokenExpiry && Date.now() > parseInt(tokenExpiry, 10)) {
      // Token has expired, remove it from localStorage
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('tokenExpiry');
    }
  }, []);

  return (
    <div className='signin'>
      <div className='signin-container'>
        <div className='signin-animation'>
          <SigninLottieAnimation />
        </div>
        <form className='signin-form' onSubmit={handleSubmit} action="">
          <span className='signin-welcome'>Welcome back</span>
          <input name="username" id="username" className='signin-input signin-input-username' type="text" placeholder="Enter your username" value={username} onChange={(e) => handleInputChange(e)} />
          <div className='signin-password-div'>
            <input ref={passwordInput} name="password" id="password" className='signin-input signin-input-password' type="password" placeholder="Enter password" value={password} onChange={(e) => handleInputChange(e)} />
            <div className='signin-eye-button'>
              <FontAwesomeIcon icon={faEye} onClick={changeVisibility}/>
            </div>
          </div>
          <button type="submit" className="signin-button">Login</button>
          <div className='signin-links-div'>
            <span >Don't have an account? <a className='signin-links' href='/'>Sign up</a></span>
            <span><a className='signin-links' href='/'>Forget password?</a></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn;
