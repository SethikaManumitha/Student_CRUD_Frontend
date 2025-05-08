import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
      <div className="container home-page-container">
        <h1>Welcome to the Student App</h1>
        <button
          className="custom-submit-btn"
          onClick={() => navigate('/students')}
        >
          Enter Student Portal
        </button>
      </div>
  );
}

export default HomePage;
