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
  const [selectedSort, setSelectedSort] = useState("");

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
    navigate('/dashboard/main');
  };

  const handleSortSelect = (item) => {
    setSelectedSort(item);
    dispatch(setSort(item));
    navigate('/dashboard/sort');
  };

  const handleDashboardClick = () => {
    dispatch(setSort(""));
    setSelectedSort("");
    navigate('/dashboard/main');
  };

  return (
    <div style={{ width: "100%" }}>
      <Navbar
        style={{
          backgroundColor: "#d90209",
          borderTop: "10px solid rgb(245, 227, 227)",
          fontSize: "25px",
          fontWeight: "500",
          color: "white"
        }}
        light
        expand="md"
      >
        <NavbarBrand
          style={{ fontWeight: "bold", fontSize: "25px", marginLeft: "90px", color: "white",}}
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
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                Dashboard
              </button>
            </NavItem>
            <NavItem style={{ marginRight: "20px",
                              color: "white",
             }}>
              <Link className="nav-link" to="/dashboard/employees" style = {{color: "white", fontSize: "20px", fontWeight: "bold"}}>
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
                  color: "white",
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
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    marginRight: "0px",
                  }}
                  caret
                >
                  Sort by: {selectedSort}
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
                  color: "white",
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
