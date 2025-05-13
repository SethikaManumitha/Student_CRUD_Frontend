import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addStudent, updateStudent } from '../config/axiosConfig';
import { toast } from 'react-toastify';
import './StudentForm.css';

const StudentForm = ({ fetchStudents, editStudent }) => {

  const [student, setStudent] = useState({
    nic: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    nic: '',
    phoneNumber: '',
  });

  // Load student data into form if editing
  useEffect(() => {
    if (editStudent) {
      setStudent(editStudent);
    }
  }, [editStudent]);

  // Handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Form validation
  const validateForm = () => {
    const validationErrors = {};

    if (student.nic.trim().length < 10) {
      validationErrors.nic = '*NIC must be at least 10 characters long';
    }

    if (!/^\d{10}$/.test(student.phoneNumber)) {
      validationErrors.phoneNumber = '*Phone number must be exactly 10 digits';
    }

    // Set any validation errors
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.warn('Please correct the errors in the form');
      return;
    }

    try {
      // Decide whether to add or update
      if (editStudent) {
        await updateStudent(editStudent.nic, student);
        toast.success('Student updated successfully!');
      } else {
        await addStudent(student);
        toast.success('Student added successfully!');
      }

      // Refresh the list
      fetchStudents();

      // Clear the form
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
      console.error('Error saving student:', error);
      toast.error('Please try again later.');
    }
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
          {errors.nic && <p className="text-danger">{errors.nic}</p>}
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
            <Form.Label>Date of Birth</Form.Label>
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
          {errors.phoneNumber && (
            <p className="text-danger">{errors.phoneNumber}</p>
          )}
        </div>
      </div>

 
      <div className="row">
        <div className="col-md-12">
          <Form.Group className="mb-2">
            <Button variant="primary" type="submit" className="custom-submit-btn">
              {editStudent ? 'Update Student' : 'Add Student'}
            </Button>
          </Form.Group>
        </div>
      </div>
    </Form>
  );
};

export default StudentForm;
