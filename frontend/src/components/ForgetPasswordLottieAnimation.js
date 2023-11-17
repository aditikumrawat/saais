import React from 'react'
import Lottie from 'lottie-react';
import animationData from '../assets/forgetPasswordAnimation.json';

const ForgetPasswordLottieAnimation = () => {
  return (
    <div className='signin-lottie-Animation'>
        <Lottie animationData={animationData}/>
    </div>
  )
}

export default ForgetPasswordLottieAnimation