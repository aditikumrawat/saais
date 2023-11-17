import {React, useState, useRef} from 'react';
import axios from 'axios';
import '../css/ChangePassword.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import SaaisHeader from './SaaisHeader';

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const[passwordVisiblility,setPasswordVisiblility] = useState(false);
  const passwordInput = useRef();

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
    const { name, value } = e.target;
    if (name === "password")  {
      setPassword(value);
    }
    else {
      setConfirmPassword(value);
    }
  }

  const handleSubmit = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('verification_token');
    try{
        const newPassword = {
          "token": token,
          "password": password
        } 
        const response = axios.post('http://localhost:8000/change_password/verification_check', newPassword ,  {
          headers: {
            'Content-Type': 'application/json',
          }
        });
          response.then(res => {
            console.log("response is ",res.data); 
            alert('Password changed successfully')
          }).catch(error => {
            console.error(error); 
          });
        } catch (error) {
          console.error(error);
        }
  }

  return (
    <div className='change-password'>
        <SaaisHeader />
        <div className="change-password-container">
            <div className='change-password-head'>Reset Password</div>
            <div className='change-password-input-div'>
              <input className='change-password-input' ref={passwordInput} name='password' type='password' placeholder='create new password' value={password} onChange={handleInputChange}/>
              <FontAwesomeIcon className='eye-btn' icon={passwordVisiblility ? faEyeSlash : faEye} onClick={changeVisibility}/>
            </div>
            <div className='change-password-input-div'>
              <input className='change-password-input'  type='password' name='confirm-password' placeholder='confirm password' value={confirmPassword} onChange={handleInputChange}/>
            </div>
            <button type='submit' className='change-password-btn' onClick={handleSubmit}>Change Password</button>
        </div>
    </div>
  )
}

export default ChangePassword