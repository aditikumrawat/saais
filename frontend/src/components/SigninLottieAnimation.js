import React from 'react'
import Lottie from 'lottie-react';
import animationData from '../assets/login_animation.json'

const SigninLottieAnimation = () => {
  return (
    <div className='signin-lottie-Animation'>
        <Lottie animationData={animationData}/>
    </div>
  )
}

export default SigninLottieAnimation