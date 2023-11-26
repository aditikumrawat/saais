import React from 'react'
import "../css/Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faFacebook, faTwitterSquare, faLinkedin, faInstagramSquare, faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-company'>
            <div className='footer-company-name'>SAAIS</div>
            <div className='footer-company-descp'>It is a platform designed to assist aspiring entrepreneurs 
            and new business owners in launching and growing their ventures. This user-friendly website provides a wealth of 
            resources, tools, and guidance to streamline the process of starting a business.</div>
        </div>
        <div className='footer-links'>
            <FontAwesomeIcon className='footer-link' icon={faLinkedin} size='xl'/>
            <FontAwesomeIcon className='footer-link' icon={faGithub} size='xl'/>
            <FontAwesomeIcon className='footer-link' icon={faFacebook} size='xl'/>
            <FontAwesomeIcon className='footer-link' icon={faTwitterSquare} size='xl'/>
            <FontAwesomeIcon className='footer-link' icon={faInstagramSquare} size='xl'/>
        </div>
        <div className='footer-pages'>
            <span className='footer-page'>Home</span>
            <span>|</span>
            <span className='footer-page'>About Us</span>
            <span>|</span>
            <span className='footer-page'>Contact</span>
        </div>
    </div>
  )
}

export default Footer