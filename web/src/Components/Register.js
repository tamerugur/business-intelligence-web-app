import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, id, fullName, phoneNumber, repeatPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    }
  };

  return (
    <div className="register-form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} style={{ fontSize: "30px" }}>
        <div className="form-row">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control username-input"
              style={{
                fontSize: "18px",
                padding: "10px",
                width: "100%",
                maxWidth: "240px",
                fontWeight: "500",
              }}
            />
          </div>
          <div className="form-group">
            <label>ID No</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="form-control id-input"
              placeholder="Your 11-digit ID number"
              style={{
                fontSize: "18px",
                padding: "10px",
                width: "100%",
                maxWidth: "240px",
                fontWeight: "500",
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-control fullName-input"
              style={{
                fontSize: "18px",
                padding: "10px",
                width: "100%",
                maxWidth: "240px",
                fontWeight: "500",
              }}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-control phoneNumber-input"
              placeholder="0XXX-XXX-XX-XX"
              style={{
                fontSize: "18px",
                padding: "10px",
                width: "100%",
                maxWidth: "240px",
                fontWeight: "500",
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control password-input"
              style={{
                fontSize: "18px",
                padding: "10px",
                width: "100%",
                maxWidth: "240px",
              }}
            />
          </div>
          <div className="form-group">
            <label>Repeat Password</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="form-control repeatPassword-input"
              style={{
                fontSize: "18px",
                padding: "10px",
                width: "100%",
                maxWidth: "240px",
              }}
            />
          </div>
        </div>
        <div
          className="register-buttons"
          style={{ display: "flex", alignItems: "center" }}
        >
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              fontSize: "25px",
              width: "130px",
              padding: "10px 20px",
              marginLeft: "10px",
            }}
          >
            Register
          </button>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              width: "130px",
            }}
          >
            <button 
              className="register-buttons"
              style={{
                fontSize: "25px",
                marginLeft: "185px",
                width: "190px",
                maxWidth: "190px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "0px"
              }}
            >
              Back to Login
            </button>
          </Link>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;