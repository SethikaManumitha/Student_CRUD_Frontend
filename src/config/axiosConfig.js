import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/students'; 

// Base URL for adding students
export const addStudent = (student) => axios.post(BASE_URL, student);

// Base URL for getting all students
export const getAllStudents = () => axios.get(BASE_URL);

// Base URL for getting students by NIC, first name, and last name
export const getStudentByNic = (nic) => axios.get(`${BASE_URL}/nic`, {params: { nic }});
export const getStudentByFirstName = (firstName) => axios.get(`${BASE_URL}/firstname`, {params: { firstName }});
export const getStudentByLastName = (lastName) => axios.get(`${BASE_URL}/lastname`, {params: { lastName }});

// Base URL for updating a student
export const updateStudent = (nic, student) => axios.put(`${BASE_URL}/update`, student, { params: { nic } });
  
// Base URL for deleting a student
export const deleteStudent = (nic) => axios.delete(`${BASE_URL}/delete`, { params: { nic } });
  