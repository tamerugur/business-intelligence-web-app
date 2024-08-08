import React from "react";
import CustomNavBar from "../Components/NavBar";
import Filters from "../Components/Filters";
import { Outlet } from "react-router-dom";
import "../Components/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="navbar-container">
        <CustomNavBar />
      </div>
      <div className="employees-filters-container">
        <div className="filters-container">
          <Filters />
        </div>
        <div className="employees-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;