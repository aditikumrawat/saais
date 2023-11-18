import React from 'react';
import '../css/Service.css';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

const Service = (props) => {
  // const imgRef = useRef(null);
  // const serviceRef = useRef(null);

  // useEffect(() => {
  //   const imgElement = imgRef.current;
  //   const serviceElement = serviceRef.current;

  //   gsap.to(imgElement, {
  //     width: '240px',
  //     height:'240px',
  //     duration: 2,
  //     delay:1,
  //     scrollTrigger: {
  //       trigger: serviceElement, // Replace with the correct selector of the other component
  //       start: 'top 300px', // Adjust the trigger point as needed
  //       end: 'top 100%', // Adjust the end point as needed
  //       scrub: true, // This creates a "scrubbing" effect as you scroll
  //     },
  //   });
  // }, []);

  return (
    <div style={props.service.id % 2 ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }} className='service' >
      <div className='service-img-div'>
        <img className='service-img' src={props.service.img} alt='img' />
      </div>
      <div className='service-text'>
        <span className='service-text-head'>{props.service.head}</span>
        <span className='service-text-descp'>{props.service.descp}</span>
      </div>
    </div>
  );
};

export default Service;
