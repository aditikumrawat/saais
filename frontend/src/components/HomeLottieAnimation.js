import React from 'react'
import '../css/HomeLottieAnimation.css'
import Lottie from 'lottie-react';
import animationData from '../assets/homeLottieAnimation.json'

const LottieAnimation = () => {
  return (
    <div className='home-lottie-Animation'>
        <Lottie animationData={animationData}/>
    </div>
  )
}

export default LottieAnimation