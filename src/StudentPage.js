import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import { getAllStudents } from './config/axiosConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState();
  const [allStudents, setAllStudents] = useState([]);
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
      setAllStudents(response.data); 
    } catch (error) {
      console.error('Error: ' + error);
      toast.error('Error fetching students. Please try again later.');
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
        allStudents={allStudents}
      />
    </div>
  );
}

export default StudentPage;
