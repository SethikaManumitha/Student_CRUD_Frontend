import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import { getAllStudents } from './config/axiosConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error: ' + error);
      alert('Error fetching students. Please try again later.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <StudentForm
          fetchStudents={fetchStudents}
          editStudent={editStudent}
          setEditStudent={setEditStudent}
        />
      </div>
      <br />
      <StudentTable
        students={students}
        setStudents={setStudents}
        setEditStudent={setEditStudent}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default StudentPage;
