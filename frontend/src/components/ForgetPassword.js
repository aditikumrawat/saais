import {React, useState} from "react";
import "../css/ForgetPassword.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ForgetPasswordLottieAnimation from "../components/ForgetPasswordLottieAnimation";
import SaaisHeader from "./SaaisHeader";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {

  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async() => {
    try{
      if(email !== null){
        const response = await axios.get(`http://localhost:8000/forgot_password/send_verification_mail/${email}`);
        if(response.status === 200){
          alert("Change your password by clicking the link send to your mail");
        }
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  } 

  return (
    <div className="forget-password">
      <SaaisHeader />
      <div className="forget-password-container">
        <div className="forget-password-animation">
          <ForgetPasswordLottieAnimation />
        </div>
        <div className="forget-password-head">Froget Password</div>
        <div className="forget-password-content">
          Enter your email and we'll send you a link to reset your password.
        </div>
        <input className="email-input" type="email" name="email" placeholder="Enter the email address" value={email} onChange={handleInputChange}/>
        <div className="forget-password-links-div">
          <button className="forget-password-button" onClick={handleSubmit} type="submit">Submit</button>
          <div>
            <FontAwesomeIcon icon={faArrowLeft}/>
            <Link className="forget-password-loginlink" to="/signin">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
