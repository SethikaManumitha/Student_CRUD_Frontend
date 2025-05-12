import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../components/NavigationBar.css'; 

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Navbar className='navbar'>
    
        <Navbar.Brand className="mx-auto">
          <h1><b>Student Management System</b></h1>
        </Navbar.Brand>
        <Button variant="outline-primary" className="ms-auto logout-btn" onClick={handleLogout}>
          Logout
        </Button>
    </Navbar>
  );
};

export default NavigationBar;
