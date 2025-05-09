import React, { useState,useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addStudent,updateStudent } from '../config/axiosConfig';
import { toast } from 'react-toastify';
import './StudentForm.css';

const StudentForm = ({ fetchStudents,editStudent }) => {
  const [student, setStudent] = useState({
    nic: '',
    dob: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState([]);
  
  const validateForm = () => {
    const newErros = [];
    if (student.nic.length < 10) {
      newErros.push('NIC must be at least 10 characters long');
    }
    if (!/^\d{10}$/.test(student.phoneNumber)) {
      newErros.push('Phone number must be 10 digits');
    }

    setErrors(newErros);
    return newErrors.length === 0;
  }
  useEffect(() => {
    if (editStudent) {
      setStudent(editStudent);
    }
  }, [editStudent]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
     
      if (validateForm()) {
        if (editStudent) {
          await updateStudent(editStudent.nic, student);
          toast.success('Student updated successfully!');
  
        } else {
          await addStudent(student);
          toast.success('Student added successfully!');
        }
      }
     
      fetchStudents();
      setStudent({
        nic: '',
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        phoneNumber: '',
        email: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error saving student. Please try again later.');
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: '' });
  };

  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
        
        
      <div className="row">
        <div className="col-md-12">
          <Form.Group className="mb-2">
          <Form.Label>NIC</Form.Label>
          <Form.Control
            type="text"
            name="nic"
            placeholder="Enter NIC"
            value={student.nic}
            onChange={handleChange}
            required
          />
          </Form.Group>
          {errors.nic && <p style={{ color: 'red' }}>{errors.nic}</p>}
        </div>
      </div>
       
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-2">
          <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={student.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>
          
        <div className="col-md-6">  
          <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={student.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>
      </div>

     <div className="row">
      <div className="col-md-6">
      <Form.Group className="mb-2">
        <Form.Label>DOB</Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={student.dob}
          onChange={handleChange}
          required
        />
      </Form.Group>

      </div>
      <div className="col-md-6">
      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter Email"
          value={student.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      </div>
     </div>

     
      <div className="row">
        <div className="col-md-6">
            <Form.Group className="mb-2">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-2">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={student.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
        </div>
      </div>

      
      
     <div className="row">
      <div className="col-md-12">
      <Form.Group className="mb-2">
        <Button variant="primary" type="submit" name='btnSubmit' className="custom-submit-btn">
          Submit
        </Button>
      </Form.Group>
      </div>
     </div>

     

    </Form>
  );
};

export default StudentForm;
