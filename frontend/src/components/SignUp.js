import React, { useState, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import SaaisHeader from "./SaaisHeader";
import SignupLottieAnimation from "./SignupLottieAnimation";
import "../css/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName:'',
    email:'',
    userName:'',
    password:'',
    confirmPassword:''
  });
  
  const passwordInput = useRef();

  const navigate = useNavigate(); 

  const changeVisibility = () => {
    if(passwordInput.current.type === 'text'){
      passwordInput.current.type = 'password';
    }else{
      passwordInput.current.type = 'text';
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

const handleSubmit  = async() => {
    try {
        const user = {
          "full_name": formData.fullName,
          "email": formData.email,
          "username": formData.userName,
          "password": formData.password 
        }
    
        const response = await axios.post('http://localhost:8000/register_user', user, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
    
        console.log('Response:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Error:', error);
      }
}

  return (
    <div className="signup">
        <SaaisHeader />
        <div className="signup-container">
            <form className="signup-form" onSubmit={(e)=> e.preventDefault()} action="">
                <div className="signup-heading-div">
                    <span className='signup-heading'>Start Your Journey Here</span>
                </div>
                <input className="signup-input" name="fullName" type="text" placeholder="Enter full name" value={formData.fullName} onChange = {handleInputChange}/>
                <input className="signup-input" name="userName" type="text" placeholder="Create Username" value={formData.userName} onChange = {handleInputChange}/>
                <input className="signup-input" name="email" type="email" placeholder="Enter email" value={formData.email} onChange = {handleInputChange}/>
                <div className="signup-password-div">
                    <input className="signup-input signup-input-password" ref={passwordInput} name="password" type="password" placeholder="Enter password" value={formData.password} onChange = {handleInputChange}/>
                    <div className='signup-eye-button'>
                        <FontAwesomeIcon icon={faEye} onClick={changeVisibility}/>
                    </div>
                </div>
                <input className="signup-input" name="confirmpassword" type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange = {handleInputChange}/>
                <button onClick={()=>handleSubmit()} type="submit" className="signup-button">Register</button>
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
