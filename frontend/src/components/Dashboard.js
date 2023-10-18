import React from 'react';
import '../css/Dashboard.css'
import SignIn from './SignIn';
import Header from './Header';

const Dashboard = () => {
  const accessToken = window.localStorage.getItem('accessToken');

  return accessToken == null ? (
    <SignIn />
  ) : (
    <div className='dashboard'>
        <Header />
    </div>
  );
};

export default Dashboard;
