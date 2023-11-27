import React, { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/SignIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import SigninLottieAnimation from './SigninLottieAnimation';
import SaaisHeader from './SaaisHeader';

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


  const googleSignin = async(credentialResponse) =>{
    const credentialsDecoded = jwtDecode(credentialResponse.credential);
    let username= "";
    try{
      const response = await axios.get(`http://localhost:8000/generate_username/${credentialsDecoded.name}`);
      username = response.data;
    }catch (error) {
      console.error('Error:', error);
    }
    const googleSigninData = {
      "full_name": credentialsDecoded.name,
      "email": credentialsDecoded.email,
      "is_active": false,
      "id_token": credentialResponse.credential,
      "username" : username,
    }
    try{
      const response = await axios.post('http://localhost:8000/auth/google',googleSigninData,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
      window.localStorage.setItem('accessToken', response.data.session_token);
      navigate('/chatComp');
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  const isFormValid = () => {
    return (username !== '' && password !== '')
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
      window.localStorage.setItem('accessToken', access_token);

      navigate('/chatComp');
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='signin'>
      <SaaisHeader />
      <div className='signin-container'>
        <div className='signin-animation'>
          <SigninLottieAnimation />
        </div>
        <form className='signin-form' onSubmit={handleSubmit} action="">
          <span className='signin-welcome'>Welcome back</span>
          <input name="username" id="username" className='signin-input signin-input-username' type="text" placeholder="Enter your username" value={username} onChange={(e) => handleInputChange(e)} autoComplete="off"/>
          <div className='signin-password-div'>
            <input ref={passwordInput} name="password" id="password" className='signin-input signin-input-password' type="password" placeholder="Enter password" value={password} onChange={(e) => handleInputChange(e)} autoComplete="off"/>
            <div className='signin-eye-button'>
              <FontAwesomeIcon icon={faEye} onClick={changeVisibility}/>
            </div>
          </div>
          <button type="submit" className="signin-button" disabled={!isFormValid()}>Login</button>
          <GoogleLogin theme='filled_black' text='continue_with' shape='rectangular' size='small' isSignedIn={true} onSuccess={googleSignin}  onError={() => {
                console.log('Login Failed');
            }}/>
          <div className='signin-links-div'>
            <span style={{textAlign:'center'}} >Don't have an account? <Link className='signin-links' to='/signup'>Register here</Link></span>
            <span><Link className='signin-links' to='/forgetPassword'>Forget password?</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn;
