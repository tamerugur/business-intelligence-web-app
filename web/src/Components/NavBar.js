// src/components/CustomNavBar.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components.css";
import { Navbar, NavItem, Collapse, Nav, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { clearFilters } from '../store/employeesSlice';
import { setSort } from '../store/sortSlice';

const sortByItems = ["Unit", "Gender", "Age", "Team", "Experience"];

function CustomNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sort By");

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch(logout());
        navigate("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSelectedSort("Sort By");
  };

  const handleSortSelect = (item) => {
    setSelectedSort(item); // Update local state
    dispatch(setSort(item)); // Update Redux state
    navigate('/dashboard/sort'); // Redirect
  };

  const handleDashboardClick = () => {
    dispatch(setSort("Sort By")); // Update Redux state
    setSelectedSort("Sort By");
    navigate('/dashboard/main'); // Redirect to DashboardMain
  };

  return (
    <div style={{ width: "100%" }}>
      <Navbar
        style={{
          backgroundColor: "#a2d2ff",
          fontSize: "25px",
          fontWeight: "500",
          color: "red",
        }}
        light
        expand="md"
      >
        <NavbarBrand
          style={{ fontWeight: "bold", fontSize: "25px", marginLeft: "90px" }}
          href="#"
        >
          Ziraat Teknoloji
        </NavbarBrand>
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem style={{ marginRight: "20px", marginLeft: "110px" }}>
            <button
                onClick={handleDashboardClick}
                style={{
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                Dashboard
              </button>
            </NavItem>
            <NavItem style={{ marginRight: "20px" }}>
              <Link className="nav-link" to="/dashboard/employees">
                Add Employee
              </Link>
            </NavItem>
          </Nav>
          <Nav className="ms-auto" navbar>
            <NavItem style={{ marginRight: "10px" }}>
              <button
                onClick={handleClearFilters}
                style={{
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                Reset Filters
              </button>
            </NavItem>
            <NavItem style={{ marginRight: "0px" }}>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle
                  style={{
                    background: "none",
                    border: "none",
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: "20px",
                    cursor: "pointer",
                    marginRight: "0px",
                  }}
                  caret
                >
                  {selectedSort}
                </DropdownToggle>
                <DropdownMenu>
                  {sortByItems.map(item => (
                    <DropdownItem key={item} onClick={() => handleSortSelect(item)}>
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <button
                onClick={handleSignOut}
                style={{
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavBar;
