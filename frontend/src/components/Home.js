import React from 'react';
import '../css/Home.css';
import Header from '../components/Header';
import Content from '../components/Content';
import LottieAnimation from '../components/LottieAnimation';
import Services from '../components/Services';
import Footer from '../components/Footer';

function Home() {
    return (
      <div className='Home'>
        <div className='home-main'>
          <Header />
          <div className='container'>
            <Content />
            <LottieAnimation/>
          </div>
          <Services/>
          <Footer />
        </div>
      </div>
    );
  }
  
  export default Home;