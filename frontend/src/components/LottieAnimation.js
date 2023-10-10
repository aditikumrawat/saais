import React from 'react'
import '../css/LottieAnimation.css'
import Lottie from 'lottie-react';
import animationData from '../assets/animation_lmozjaq0.json'

const LottieAnimation = () => {
  return (
    <div className='lottie-Animation'>
        <Lottie animationData={animationData}/>
    </div>
  )
}

export default LottieAnimation