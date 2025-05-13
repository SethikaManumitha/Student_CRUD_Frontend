import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSortAlphaAsc, faSortAlphaDesc } from '@fortawesome/free-solid-svg-icons';
import { deleteStudent } from '../config/axiosConfig';
import { toast } from 'react-toastify';

const StudentTable = ({ students, setStudents, setEditStudent, allStudents }) => {

  // Track sorting toggle count
  const [sortCount, setSortCount] = useState(0); 

  // Toggle sort between ascending and descending order 
  const handleSort = () => {
    setSortCount(prev => {
      const newCount = prev + 1;
      const isAscending = newCount % 2 === 1;

      const sorted = [...students].sort((a, b) => {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });

      setStudents(sorted);
      return newCount;
    });
  };

  // Filter students by NIC value during typing
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      setStudents(allStudents);
      return;
    }

    const filtered = allStudents.filter(student =>
      student.nic.toLowerCase().includes(query)
    );
    setStudents(filtered);
  };

  // Delete a student by NIC and update table
  const handleDeleteStudent = async (nic) => {
    try {
      await deleteStudent(nic);
      setStudents(prev => prev.filter(student => student.nic !== nic));
      toast.success('Student deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Error deleting student. Please try again later.');
    }
  };

  return (
    <div className="container">
      {/* Search and Sort Row */}
      <div className="row mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <Form.Control
            type="text"
            placeholder="Search by NIC"
            onChange={handleSearch}
            className="me-2"
          />
          <Button variant="success" onClick={handleSort}>
            <FontAwesomeIcon icon={sortCount % 2 === 0 ? faSortAlphaAsc : faSortAlphaDesc} />
          </Button>
        </div>
      </div>

      {/* Students Table */}
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
              <td colSpan="9" className="text-center text-muted">
                No students found.
              </td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.nic}>
                <td>{student.nic}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.gender}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>{student.dob}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setEditStudent(student)}
                    aria-label={`Edit ${student.firstName}`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteStudent(student.nic)}
                    aria-label={`Delete ${student.firstName}`}
                  >
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
