import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import '../App.css';

function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        document.cookie = `token=${data.token}; path=/; SameSite=Lax`;
        console.log("Logged in user:", data.user);
        dispatch(login(data.user));
        navigate('/dashboard/main');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ fontSize: "30px" }}>
        <div className="form-group" style = {{marginLeft: "80px"}}>
          <label>Username</label>
          <input
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control username-input"
            style={{
              fontSize: "18px",
              padding: "10px",
              width: "300px",
              maxWidth: "300px",
              fontWeight: "500"
            }}
          />
        </div>
        <div className="form-group" style = {{marginLeft: "80px"}}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control password-input"
            style={{
              fontSize: "18px",
              padding: "10px",
              width: "300px",
              maxWidth: "300px"
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ fontSize: "25px", width: "130px", padding: "10px 20px", marginLeft: "80px"}}
          >
            Login
          </button>
          <Link to="/register" style={{ textDecoration: 'none', marginLeft: '10px', width: '130px' }}>
            <button
              style={{
                fontSize: "25px",
                marginLeft: "30px",
                width: "100%",
                padding: "10px 20px",
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px'
              }}
            >
              Register
            </button>
          </Link>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Form;
