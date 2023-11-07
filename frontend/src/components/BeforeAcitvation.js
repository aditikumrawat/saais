import {React, useEffect, useState} from 'react'
import '../css/BeforeActivation.css'
import SaaisHeader from './SaaisHeader'

const BeforeAcitvation = () => {
    const [seconds, setSeconds] = useState(30); 

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timer); 
      }
    }, 1000);

    return () => {
      clearInterval(timer); 
    };
  }, [seconds]);
  return (
    <div className='before-activation'>
        <SaaisHeader />
        <div className='before-activation-container'>
            <span className='before-activation-heading'>Activation Link Sent</span>
            <span className='before-activation-content'>Thank you for signing up with us! An email has been sent to the address you provided. This email contains a link that you need to click to activate your account. 
            Please check your inbox, including the spam folder, and follow the instructions in the email.</span>
            {seconds === 0 ? <span className='before-activation-timer'>Link Expired !</span> : <span className='before-activation-timer'>Link will expire in {seconds} seconds</span>}
            {seconds===0? <button className='before-activation-button'>Resend Link</button>: null}
        </div>
    </div>
  )
}

export default BeforeAcitvation