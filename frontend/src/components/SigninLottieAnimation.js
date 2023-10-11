import React from 'react'
import Lottie from 'lottie-react';
import animationData from '../assets/signin_lottie_json.json'

const SigninLottieAnimation = () => {
  return (
    <div className='signin-lottie-Animation'>
        <Lottie animationData={animationData}/>
    </div>
  )
}

export default SigninLottieAnimation