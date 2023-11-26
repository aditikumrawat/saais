import React, { useState, useRef } from "react";
import validator from 'validator'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import SaaisHeader from "./SaaisHeader";
import SignupLottieAnimation from "./SignupLottieAnimation";
import "../css/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [usernameCheckIcon, setUsernamecheckIcon] = useState(faCheck);
  const [passwordVisiblilityIcon, setPasswordVisiblilityIcon] = useState(faEye);

  const passwordInput = useRef();

  const navigate = useNavigate();
  
  const changeVisibility = () => {
    if (passwordInput.current.type === 'text') {
      passwordInput.current.type = 'password';
      setPasswordVisiblilityIcon(faEye);
    } else {
      passwordInput.current.type = 'text';
      setPasswordVisiblilityIcon(faEyeSlash);
    }
  }

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "username") {
      try {
        const response = await axios.get(`http://localhost:8000/users/${value}`);
        console.log("response is ", response);
        console.log("response.data is ", response.data);
        if (response.data === true) {
          setUsernamecheckIcon(faXmark);
        }
        else {
          setUsernamecheckIcon(faCheck);
        }
      }
      catch (error) {
        console.error('Error:', error);
      }
    }
  }

  const generateUsername = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/generate_username/${formData.fullName}`);
      setFormData({
        ...formData,
        username: response.data,
      });
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  const isFormValid = () => {
    return (formData.fullName !== '' && formData.email !== '' && formData.username !== '' && formData.password !== '' && formData.confirmPassword !== '' &&
    validator.isStrongPassword(formData.password, { 
      minLength: 8, minLowercase: 1, 
      minUppercase: 1, minNumbers: 1, minSymbols: 1 
    })) && formData.password === formData.confirmPassword
  }

  const handleSubmit = async () => {
    try {
      const user = {
        "full_name": formData.fullName,
        "email": formData.email,
        "username": formData.username,
        "password": formData.password,
        "phone_no": ""
      }

      const response = await axios.post('http://localhost:8000/register_user', user, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response.data);
      navigate('/beforeActivation');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="signup">
      <SaaisHeader />
      <div className="signup-container">
        <form className="signup-form" autoComplete="on" onSubmit={(e) => e.preventDefault()} action="">
          <div className="signup-heading-div">
            <span className='signup-heading'>Start Your Journey Here</span>
          </div>
          <input className="signup-input" name="fullName" type="text" placeholder="Enter full name" value={formData.fullName} onChange={handleInputChange} />
          <div className="signup-username-div">
            <input className="signup-input-username" name="username" type="text" placeholder="Create Username" value={formData.username} onChange={handleInputChange} onFocus={formData.fullName === "" ? null : generateUsername} />
            <div className='signup-username-tick'>
              {formData.username === "" ? null : <FontAwesomeIcon icon={usernameCheckIcon} style={usernameCheckIcon === faCheck ? { color: '#3ee133' } : { color: '#ff2929' }} />}
            </div>
          </div>
          <input className="signup-input" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
          <div className="password-div">
            <div className="signup-password-div">
              <input aria-label="Password" aria-required="true" autoCapitalize="off" autoComplete="new-password" autoCorrect="off" ref={passwordInput}
                className="signup-input-password" placeholder="Enter password" type="password" value={formData.password} name="password"
                aria-autocomplete="list" onChange={handleInputChange} />
              <div className='signup-eye-button'>
                {formData.password === "" ? null : <FontAwesomeIcon icon={passwordVisiblilityIcon} onClick={changeVisibility} />}
              </div>
            </div>
            {(validator.isStrongPassword(formData.password, { 
                minLength: 8, minLowercase: 1, 
                minUppercase: 1, minNumbers: 1, minSymbols: 1 
              }) || formData.password === '') ? null : <div className="password-match-error">Not a strong password</div>}
          </div>
          <div className="confirm-password-div">
            <input className="confirm-password-input" name="confirmPassword" type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleInputChange} />
            {(formData.password === formData.confirmPassword || formData.confirmPassword === '') ? null : <div className="password-match-error">Passwords do not match</div>}
          </div>
          <button onClick={() => handleSubmit()} type="submit" className="signup-button" disabled={!isFormValid()}>Register</button>
          <span className="signup-links-div">Already a member? <Link className='signup-links' to='/signin'> Login here</Link></span>
        </form>
        <div className="signup-animation">
          <SignupLottieAnimation />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
