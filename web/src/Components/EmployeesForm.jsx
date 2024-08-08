import React, { useState, useRef } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Input,
} from "reactstrap";
import "./Dashboard.css";

const unitItems = [
  "Kurumsal Dijital Uygulamalar",
  "KGY ve OPİM",
  "Bankasürans Uygulamaları",
  "İK Uygulamaları",
  "Müşteri İlişkileri Yönetimi",
  "Müşteri ve Kampanya Yönetimi",
  "İş Zekası Ve Raporlama",
  "Veri Analitiği ve Yapay Zeka",
  "Analitik Araç ve Ortam Yönetimi",
  "Veri Ambarı Yönetimi",
];

const genderItems = ["Male", "Female"];
const ageItems = ["18-25", "25-35", "35-50", "50+"];
const teamItems = [
  "Software Development",
  "Analyst",
  "Hiring",
  "Maintaining",
  "Supervisor",
  "Security",
];
const expItems = [
  "0-2 years",
  "2-5 years",
  "5-10 years",
  "10-15 years",
  "15+ years",
];

function EmployeesForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [unit, setUnit] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [team, setTeam] = useState("");
  const [duration, setDuration] = useState("");
  const [photoBase64, setPhotoBase64] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState({
    unit: false,
    gender: false,
    age: false,
    team: false,
    duration: false,
  });

  const fileInputRef = useRef(null);

  const toggle = (dropdown) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const handleSelect = (item, field) => {
    switch (field) {
      case "unit":
        setUnit(item);
        break;
      case "gender":
        setGender(item);
        break;
      case "age":
        setAge(item);
        break;
      case "team":
        setTeam(item);
        break;
      case "duration":
        setDuration(item);
        break;
      default:
        break;
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhotoBase64(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      fullName,
      email,
      phoneNumber,
      unit,
      gender,
      age,
      team,
      duration,
      photo: photoBase64
    };
    
    const payloadString = JSON.stringify(payload);

  // Log the size of the payload in bytes
  console.log(`Payload size: ${new Blob([payloadString]).size} bytes`);
  console.log(payload);

    try {
      const response = await fetch("http://localhost:3001/employees/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payloadString,
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
      setFullName("");
    setEmail("");
    setPhoneNumber("");
    setUnit("");
    setGender("");
    setAge("");
    setTeam("");
    setDuration("");
    setPhotoBase64("");
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="employee-form-container" style={{ marginTop: "-40px" }}>
      <h1>Employee Details</h1>
      <form onSubmit={handleSubmit} style={{ fontSize: "30px" }}>
        <div className="form-group">
          <Row>
            <Col md={4}>
              <label>Full Name</label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Full Name"
              />
            </Col>
            <Col md={4}>
              <label style={{ marginLeft: "19px" }}>Email</label>
              <Input
                type="email"
                value={email}
                style={{ marginLeft: "19px" }}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </Col>
            <Col md={4}>
              <label style={{ marginLeft: "19px", fontSize: "29px" }}>Phone Number</label>
              <Input
                type="text"
                value={phoneNumber}
                style={{ marginLeft: "22px" }}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <label>Unit</label>
              <Dropdown
                isOpen={dropdownOpen.unit}
                toggle={() => toggle("unit")}
                className="dropdown"
              >
                <DropdownToggle caret className="dropdown-toggle">
                  {unit || "Select Unit"}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  {unitItems.map((item, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleSelect(item, "unit")}
                    >
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md={4}>
              <label>Gender</label>
              <Dropdown
                isOpen={dropdownOpen.gender}
                toggle={() => toggle("gender")}
                className="dropdown"
              >
                <DropdownToggle caret className="dropdown-toggle">
                  {gender || "Select Gender"}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  {genderItems.map((item, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleSelect(item, "gender")}
                    >
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md={4}>
              <label>Age</label>
              <Dropdown
                isOpen={dropdownOpen.age}
                toggle={() => toggle("age")}
                className="dropdown"
              >
                <DropdownToggle caret className="dropdown-toggle">
                  {age || "Select Age Range"}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  {ageItems.map((item, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleSelect(item, "age")}
                    >
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <label>Team</label>
              <Dropdown
                isOpen={dropdownOpen.team}
                toggle={() => toggle("team")}
                className="dropdown"
              >
                <DropdownToggle caret className="dropdown-toggle">
                  {team || "Select Team"}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  {teamItems.map((item, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleSelect(item, "team")}
                    >
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md={4}>
              <label>With Us For:</label>
              <Dropdown
                isOpen={dropdownOpen.duration}
                toggle={() => toggle("duration")}
                className="dropdown"
              >
                <DropdownToggle caret className="dropdown-toggle">
                  {duration || "Select Duration"}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu">
                  {expItems.map((item, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => handleSelect(item, "duration")}
                    >
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md={4}>
              <label>Employee Photo</label>
              <div className="photo-upload-container">
                <button
                  type="button"
                  className="btn btn-secondary photo-upload-button"
                  style={{ marginLeft: "35px" }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <label>Upload Photo</label>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <div className="btn-container">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "130px", marginTop: "15px" }}
              >
                Submit
              </button>
            </div>
          </Col>
            <Col md={4}>
            {photoBase64 && (
              <div style={{ marginLeft: "227px" }}>
                <img
                  src={photoBase64}
                  alt="Selected"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
          </Col>
          </Row>
        </div>
      </form>
    </div>
  );
}

export default EmployeesForm;
