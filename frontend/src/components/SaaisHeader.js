import React from 'react'
import '../css/SaaisHeader.css'
import { Link } from 'react-router-dom'

const SaaisHeader = () => {
  return (
    <div className='saais-header'>
      <div className='saais-logo'><Link to="/" className='saais-link'>SAAIS</Link></div>
    </div>
  )
}

export default SaaisHeader