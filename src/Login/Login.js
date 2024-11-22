// // src/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import styles from './Login.module.css';

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null); // Clear any previous errors
//     try {
//       const response = await axios.post('http://127.0.0.1:4522/v1/login', formData);

//       if (response.data.status === 'Success') {
//         localStorage.setItem('token', response.data.token);

//         // Force a page reload to ensure that the new authentication state is reflected
//         window.location.reload(); // This will refresh the page

//         navigate('/dashboard'); // Redirect to dashboard after reload
//       } else {
//         setError('Login failed. Please try again.');
//       }
//     } catch (err) {
//       console.error(err); // Log error details for debugging
//       setError('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.loginBox}>
//         <h2>Let's Login</h2>
//         {error && <p className={styles.error}>{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className={styles.input}
//           />
//           <button type="submit" className={styles.button}>Login</button>
//         </form>
//         <p className={styles.signupText}>
//           Don’t have an account? <Link to="/signup" className={styles.signupLink}>Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
// src/Login.js
// src/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from AuthContext

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

      if (response.data.status === 'Success') {
        login(response.data.token); // Update the authentication state
        navigate('/dashboard'); // Redirect to dashboard
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
        <h2>Let's Login</h2>
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
        <p className={styles.signupText}>
          Don’t have an account? <Link to="/signup" className={styles.signupLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
