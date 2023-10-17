import React from 'react';
import '../css/Dashboard.css'
import SignIn from './SignIn';

const Dashboard = () => {
  const accessToken = window.localStorage.getItem('accessToken');

  return accessToken == null ? (
    <SignIn />
  ) : (
    <div className='dashboard'>
        <div className='dashboard-container'></div>
    </div>
  );
};

export default Dashboard;
