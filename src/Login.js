// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post('http://127.0.0.1:4522/v1/login', formData);
      
      // Adjust response handling based on your backend response
      if (response.data.status === 'Success') {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirect on successful login
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err); // Log error details for debugging
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;