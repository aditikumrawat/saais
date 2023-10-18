import React from "react";
import { useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/SignUp.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import SaaisHeader from "./SaaisHeader";
import SignupLottieAnimation from "./SignupLottieAnimation";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password,setPassword] = useState("");

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
    const {id , value} = e.target;
    if(id === "firstName"){
        setFirstName(value);
    }
    if(id === "lastName"){
        setLastName(value);
    }
    if(id === "userName"){
      setUserName(value);
    }
    if(id === "email"){
        setEmail(value);
    }
    if(id === "password"){
        setPassword(value);
    }
}

const handleSubmit  = async() => {
    try {
        const user = {
          "first_name": firstName,
          "last_name": lastName,
          "email": email,
          "username": userName,
          "password": password 
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
                <input className="signup-input" name="firstName" id="firstName" type="text" placeholder="Enter Firstname" value={firstName} onChange = {(e) => handleInputChange(e)}/>
                <input className="signup-input" name="lastName" id="lastName" type="text" placeholder="Enter Lastname" value={lastName} onChange = {(e) => handleInputChange(e)}/>
                <input className="signup-input" name="userName" id="userName" type="text" placeholder="Create Username" value={userName} onChange = {(e) => handleInputChange(e)}/>
                <input className="signup-input" name="email" id="email" type="email" placeholder="Enter email" value={email} onChange = {(e) => handleInputChange(e)}/>
                <div className="signup-password-div">
                    <input className="signup-input signup-input-password" ref={passwordInput} name="password" id="password" type="password" placeholder="Enter password" value={password} onChange = {(e) => handleInputChange(e)}/>
                    <div className='signup-eye-button'>
                        <FontAwesomeIcon icon={faEye} onClick={changeVisibility}/>
                    </div>
                </div>
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
