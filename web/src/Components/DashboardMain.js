import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from '../store/employeesSlice';
import { selectFilteredEmployees } from '../store/selectors';
import './Dashboard.css';

function DashboardMain() {
  const dispatch = useDispatch();
  const employees = useSelector(selectFilteredEmployees);
  const employeeStatus = useSelector((state) => state.employees.status);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  const handlePhotoClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  if (employeeStatus === 'loading') {
    return <div style={{ fontSize: "30px" }}>Loading...</div>;
  }

  if (employeeStatus === 'failed') {
    return <div style={{ fontSize: "30px" }}>Error loading employees.</div>;
  }

  const boxesPerRow = Math.ceil(Math.sqrt(employees.length));
  const boxWidth = boxesPerRow < 12 ? 80 : 1000 / (boxesPerRow + 10);

  const containerWidth = boxWidth * boxesPerRow;
  const containerHeight = containerWidth - (Math.sqrt(employees.length) !== Math.floor(Math.sqrt(employees.length)) ? boxWidth : 0);

  return (
    <div>
      <div
        className='dashboard-main-container'
        style={{ width: `${containerWidth}px`, height: `${containerHeight}px`, margin: '0px', display: 'flex', flexWrap: 'wrap' }}
      >
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <div
              key={index}
              className='box'
              onClick={() => handlePhotoClick(employee)}
              style={{ 
                width: `${boxWidth}px`, 
                height: `${boxWidth}px`, 
                backgroundImage: `url(${employee.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                cursor: 'pointer' // Change cursor to pointer
              }}
            />
          ))
        ) : (
          <div style={{ fontSize: "30px" }}>No employees found.</div>
        )}
      </div>

      {selectedEmployee && (
        <div className='modal' onClick={handleCloseModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <span className='close' onClick={handleCloseModal}>&times;</span>
            <h2>{selectedEmployee.name}</h2>
            <p>Age: {selectedEmployee.age}</p>
            <p>Gender: {selectedEmployee.gender}</p>
            <p>Unit: {selectedEmployee.unit}</p>
            <p>Team: {selectedEmployee.team}</p>
            <p>Experience: {selectedEmployee.duration}</p>
            {/* Add more employee details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardMain;
