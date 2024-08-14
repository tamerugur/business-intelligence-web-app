import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../store/employeesSlice";
import { selectFilteredEmployees } from "../store/selectors";
import "./Dashboard.css";

function DashboardMain() {
  const dispatch = useDispatch();
  const employees = useSelector(selectFilteredEmployees);
  const employeeStatus = useSelector((state) => state.employees.status);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (employeeStatus === "idle") {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  useEffect(() => {
    console.log("DashboardMain mounted");
    return () => {
      console.log("DashboardMain unmounted");
    };
  }, []);

  const handlePhotoClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  if (employeeStatus === "loading") {
    return <div style={{ fontSize: "30px" }}>Loading...</div>;
  }

  if (employeeStatus === "failed") {
    return <div style={{ fontSize: "30px" }}>Error loading employees.</div>;
  }

  const boxesPerRow = Math.ceil(Math.sqrt(employees.length));
  const boxWidth = boxesPerRow < 12 ? 80 : 1000 / (boxesPerRow + 10);

  const containerWidth = boxWidth * boxesPerRow;
  const containerHeight =
    containerWidth -
    (Math.sqrt(employees.length) !== Math.floor(Math.sqrt(employees.length))
      ? boxWidth
      : 0);

  return (
    <div>
      <div
        className="dashboard-main-container"
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          margin: "0px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div
              key={employee._id}
              className="box"
              onClick={() => handlePhotoClick(employee)}
              style={{
                width: `${boxWidth}px`,
                height: `${boxWidth}px`,
                backgroundImage: `url(${employee.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />
          ))
        ) : (
          <div style={{ fontSize: "30px" }}>No employees found.</div>
        )}
      </div>

      {selectedEmployee && (
        <div className="modal" onClick={handleCloseModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", gap: "20px", flexDirection: "row" }}
          >
            <span
              className="close"
              onClick={handleCloseModal}
              style={{
                fontSize: "35px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#333", 
              }}
            >
              &times;
            </span>
            <div>
              <h2>{selectedEmployee.fullName}</h2>
              <p>Age: {selectedEmployee.age}</p>
              <p>Gender: {selectedEmployee.gender}</p>
              <p>Unit: {selectedEmployee.unit}</p>
              <p>Team: {selectedEmployee.team}</p>
              <p>Experience: {selectedEmployee.duration}</p>
            </div>
            <div
              style={{
                marginTop: "35px",
                width: "250px",
                height: "225px",
                backgroundImage: `url(${selectedEmployee.photo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardMain;
