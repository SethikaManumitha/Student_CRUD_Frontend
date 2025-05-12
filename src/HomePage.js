import React from 'react';
import './HomePage.css';
import StudentPage from './StudentPage';
import NavigationBar from './components/NavigationBar';

function HomePage() {

  return (
      <>
        <NavigationBar />
        <StudentPage />
      </>
  );
}

export default HomePage;
