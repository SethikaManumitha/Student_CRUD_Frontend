import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './LoginPage';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
