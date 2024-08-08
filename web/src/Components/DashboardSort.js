import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from '../store/employeesSlice';
import { selectFilteredEmployees } from '../store/selectors';
import { unitItems, genderItems, teamItems, ageItems, expItems } from './Filters';
import "./components.css";

function DashboardSort() {
  var selectedSort = useSelector((state) => state.sort.selectedSort);
  const dispatch = useDispatch();
  const employees = useSelector(selectFilteredEmployees);
  const employeeStatus = useSelector((state) => state.employees.status);
  const [itemsArray, setItemsArray] = useState([]);
  const [sortedEmployees, setSortedEmployees] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  useEffect(() => {
    switch (selectedSort) {
      case 'Unit':
        setItemsArray(unitItems);
        break;
      case 'Gender':
        setItemsArray(genderItems);
        break;
      case 'Age':
        setItemsArray(ageItems);
        break;
      case 'Team':
        setItemsArray(teamItems);
        break;
      case 'Experience':
        setItemsArray(expItems);
        break;
      default:
        setItemsArray([]);
        break;
    }
  }, [selectedSort]);

  useEffect(() => {
    const initialSortedEmployees = itemsArray.reduce((acc, item) => {
      acc[item] = [];
      return acc;
    }, {});

    employees.forEach(employee => {
      if(selectedSort === "Experience"){
        selectedSort = "duration";
      }
      const key = employee[selectedSort.toLowerCase()];
      if (key && initialSortedEmployees[key]) {
        initialSortedEmployees[key].push(employee);
      }
    });

    setSortedEmployees(initialSortedEmployees);
  }, [employees, itemsArray, selectedSort]);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  if (employeeStatus === 'loading') {
    return <div style={{ fontSize: "30px" }}>Loading...</div>;
  }

  if (employeeStatus === 'failed') {
    return <div style={{ fontSize: "30px" }}>Error loading employees.</div>;
  }

  const containerWidth = itemsArray.length > 0 ? 1400 / itemsArray.length : 0;

  return (
    <div className='dashboard-sort-container'>
      {itemsArray.map((item) => (
       <div 
         key={item}
         className='sort-container'
         style={{ width: `${containerWidth}px` }}
       >
         <h2>{item}</h2>
         <div className='inner-sort'>
           {sortedEmployees[item] && sortedEmployees[item].map((employee, index) => (
             <div
               key={index}
               className='employee-box'
               style={{ 
                 backgroundImage: `url(${employee.photo})`,
               }}
               onClick={() => handleEmployeeClick(employee)}
             />
           ))}
         </div>
       </div>
      ))}

      {isModalOpen && selectedEmployee && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <h2>{selectedEmployee.name}</h2>
            <p>Unit: {selectedEmployee.unit}</p>
            <p>Gender: {selectedEmployee.gender}</p>
            <p>Age: {selectedEmployee.age}</p>
            <p>Team: {selectedEmployee.team}</p>
            <p>Experience: {selectedEmployee.duration}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardSort;
