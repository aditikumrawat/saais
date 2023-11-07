import {React, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SaaisHeader from './SaaisHeader'
import '../css/AfterActivation.css'
import axios from 'axios'

const AfterAcivation = () => {
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const token = urlSearchParams.get('token');
        try{
            const response = axios.post(`http://localhost:8000/activate_user/${token}`);
              console.log("token is ",token);
              response.then(res => {
                console.log("response is ",res.data); 
              }).catch(error => {
                console.error(error); 
              });
            } catch (error) {
              console.error(error);
            }
      }, []);
  return (
    <div className='after-activation'>
        <SaaisHeader />
        <div className='after-activation-container'>
            <span className='after-activation-heading'>Account Activation Successful</span>
            <span className='after-activation-content'>Thank you for verifying your email address and successfully 
            activating your account with us. We're excited to have you on board! Your journey with our platform has officially begun.</span>
            <Link to="/signin"><button className='after-activation-button'>Login Here</button></Link>
        </div>
    </div>
  )
}

export default AfterAcivation