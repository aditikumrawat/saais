import React from 'react';
import '../css/Dashboard.css'
import SaaisHeader from './SaaisHeader';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken == null) {
      navigate('/signin');
    }
  }, [navigate]);

  const addProduct = () => {
    navigate('/addProduct');
  }

  return (
    <div className='dashboard'>
      <SaaisHeader />
      <div className="dashboard-container">
          <button className='dashboard-add-product-btn' onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default Dashboard;
