import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be a 10-digit number';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4522/v1/signup', formData);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setSuccess('Signup successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Let's Register</h2>
        <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? <span className={styles.spinner}></span> : 'Sign Up'}
          </button>
          <div className={styles.loginLink}>
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
