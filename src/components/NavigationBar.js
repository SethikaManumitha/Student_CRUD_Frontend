import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar,Container,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../components/NavigationBar.css'; 

const NavigationBar = () => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

  return (
   <Navbar className='navbar'>
      <Container>
        <Button className='btnBack' onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} color='blue' />
        </Button>
        <Navbar.Brand className="mx-auto"><h1><b>Student Management System</b></h1></Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavigationBar