import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faSortAlphaAsc,faSortAlphaDesc } from '@fortawesome/free-solid-svg-icons';
import { deleteStudent } from '../config/axiosConfig';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';

const StudentTable = ({ students, setStudents, setEditStudent }) => {

  const [count,setCount] = useState(0);

  const handleSort = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      const sortedStudents = [...students].sort((a, b) => {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        if (newCount % 2 === 1) {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
      setStudents(sortedStudents);
      return newCount;
    });
  };
  
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === '') {
      setStudents(students); 
      return;
    }else{
      const filteredStudents = students.filter((student) =>
        student.nic.toLowerCase().includes(searchValue)
      );
      setStudents(filteredStudents);
    }
   
  }
  const handleDeleteStudent = async (nic) => {
    try {
      await deleteStudent(nic);
      
      // Fecth students without the deleted one  
      setStudents((prevStudents) => prevStudents.filter(student => student.nic !== nic)); 

      toast.success('Student deleted successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error deleting student. Please try again later.');
    }
  };

  return (
    <div className="container">
      
      <div className="row">
      
        <div className="col-md-10">
        <Form.Control
              type="text"
              name="nic"
              placeholder="Enter NIC"
              onChange={handleSearch}
            />
        </div>
        <div className="col-md-2">
          <Button variant="success" onClick={handleSort}><FontAwesomeIcon icon={count % 2 == 0 ? faSortAlphaAsc : faSortAlphaDesc}></FontAwesomeIcon></Button>
        </div>
      </div>
      <br />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>NIC</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.nic}>
                <td>{student.nic}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.gender}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>{student.dob}</td>
                <td>
                  <Button variant="primary" onClick={() => setEditStudent(student)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteStudent(student.nic)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentTable;
