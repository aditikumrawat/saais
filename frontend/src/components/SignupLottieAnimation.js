import React from 'react'
import animationData from '../assets/register_animation.json'
import Lottie from 'lottie-react'

const SignupLottieAnimation = () => {
  return (
    <div className='signup-lottie-Animation'>
        <Lottie animationData={animationData}/>
    </div>
  )
}

export default SignupLottieAnimation