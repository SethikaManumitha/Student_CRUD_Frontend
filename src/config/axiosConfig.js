import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1'; 

// Base URL for login
export const login = (email,password) => axios.get(`${BASE_URL}/admin`, {params: { email, password }});

// Base URL for adding students
export const addStudent = (student) => axios.post(`${BASE_URL}/students`, student);

// Base URL for getting all students
export const getAllStudents = () => axios.get(`${BASE_URL}/students`);


// Base URL for updating a student
export const updateStudent = (nic, student) => axios.put(`${BASE_URL}/students/update`, student, { params: { nic } });
  
// Base URL for deleting a student
export const deleteStudent = (nic) => axios.delete(`${BASE_URL}/students/delete`, { params: { nic } });
  