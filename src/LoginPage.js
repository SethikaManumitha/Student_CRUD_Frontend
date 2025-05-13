import {React,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { Form,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { login } from './config/axiosConfig';
import { toast } from 'react-toastify';
import loginImage from './assets/images/login.jpg';
const LoginPage = () => {

  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  // Handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  }

  // Handle form submission
   const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(admin.email, admin.password);
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Invalid email or password");
            } else {
                toast.error("An error occurred. Please try again later.");
                console.error("Unexpected error:", error);
            }
        }
    };

  // Redirect to home page on successful login
  const navigate = useNavigate();

  return (
    <div>
        <div className="row page">
            <div className="col-md-6 login-column">
                <div className="login-form">
                    <div className='login-logo'>
                        <FontAwesomeIcon icon={faUserCircle} color='blue'  className='login-icon' />
                    </div>
                    <div className="login-container">
                         <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} value={admin.email} required/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} value={admin.password} required/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className='custom-submit-btn'>
                            Login
                        </Button>
                    </Form>
                    </div>
                   
                </div>
            </div>
            <div className="col-md-6 img-column">
                <div className="image-wrapper">
                    <img src={loginImage} alt="Login Visual" />
                    <div className="overlay"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage