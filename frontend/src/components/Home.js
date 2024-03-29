import React from 'react';
import '../css/Home.css';
import Header from '../components/Header';
import Content from '../components/Content';
import HomeLottieAnimation from "../components/HomeLottieAnimation"
import Services from '../components/Services';
import Footer from '../components/Footer';

function Home() {
    return (
      <div className='Home'>
        <div className='home-main'>
          <Header />
          <div className='container'>
            <Content />
            <HomeLottieAnimation />
          </div>
          <Services/>
          <Footer />
        </div>
      </div>
    );
  }
  
  export default Home;