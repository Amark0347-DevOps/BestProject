// import React, { useState } from 'react';
// import styles from './InputForm.module.css';
// import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component

// function InputForm() {
//   const [secretKey, setSecretKey] = useState('');
//   const [accessKey, setAccessKey] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');

//   const validate = () => {
//     const newErrors = {};
//     if (!accessKey) newErrors.accessKey = 'Access Key is required';
//     if (!secretKey) newErrors.secretKey = 'Secret Key is required';
//     return newErrors;
//   };

//   const handleSave = async () => {
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsLoading(true);
//     setSuccessMessage('');

//     try {
//       const response = await fetch('http://localhost:4522/v1/access/secret', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           accessKey,
//           secretKey,
//         }),
//       });

//       if (response.ok) {
//         setSuccessMessage('Data saved successfully');
//       } else {
//         const errorData = await response.json();
//         setErrors({ apiError: errorData.message || 'Failed to save data' });
//       }
//     } catch (error) {
//       setErrors({ apiError: 'Failed to save data' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.formContainer}>
//       <h2 className={styles.centeredText}>Input Form</h2>
//       <div className={styles.formGroup}>
//         <label htmlFor="accessKey">Access Key</label>
//         <input
//           type="text"
//           id="accessKey"
//           value={accessKey}
//           onChange={(e) => setAccessKey(e.target.value)}
//         />
//         {errors.accessKey && <span className={styles.error}>{errors.accessKey}</span>}
//       </div>
//       <div className={styles.formGroup}>
//         <label htmlFor="secretKey">Secret Key</label>
//         <input
//           type="text"
//           id="secretKey"
//           value={secretKey}
//           onChange={(e) => setSecretKey(e.target.value)}
//         />
//         {errors.secretKey && <span className={styles.error}>{errors.secretKey}</span>}
//       </div>
//       {errors.apiError && <div className={styles.error}>{errors.apiError}</div>}
//       {successMessage && <div className={styles.success}>{successMessage}</div>}
//       <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
//         {isLoading ? <LoadingSpinner /> : 'Save'}
//       </button>
//     </div>
//   );
// }

// export default InputForm;
import React, { useState } from 'react';
import styles from './InputForm.module.css';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component

function InputForm() {
  const [access_key, setAccessKey] = useState('');
  const [secret_access_key, setSecretAccessKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!access_key) {
      newErrors.access_key = 'Access Key is required';
    } else if (access_key.length !== 20) {
      newErrors.access_key = 'Enter the Right Access Key';
    }

    if (!secret_access_key) {
      newErrors.secret_access_key = 'Secret Access Key is required';
    } else if (secret_access_key.length !== 40) {
      newErrors.secret_access_key = 'Enter the Right Secret Access Key';
    }

    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    setErrors({});

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await fetch('http://localhost:4522/v1/access/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include Authorization header
        },
        body: JSON.stringify({
          access_key,
          secret_access_key,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Data saved successfully');
      } else if (response.status === 409) {
        setErrors({ apiError: 'Data is already saved' });
      } else {
        const errorData = await response.json();
        setErrors({ apiError: errorData.message || 'Failed to save data' });
      }
    } catch (error) {
      setErrors({ apiError: 'Failed to save data' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.centeredText}>Input Form</h2>
      <div className={styles.formGroup}>
        <label htmlFor="access_key">Access Key</label>
        <input
          type="text"
          id="access_key"
          value={access_key}
          onChange={(e) => setAccessKey(e.target.value)}
        />
        {errors.access_key && <span className={styles.error}>{errors.access_key}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="secret_access_key">Secret Access Key</label>
        <input
          type="text"
          id="secret_access_key"
          value={secret_access_key}
          onChange={(e) => setSecretAccessKey(e.target.value)}
        />
        {errors.secret_access_key && <span className={styles.error}>{errors.secret_access_key}</span>}
      </div>
      {errors.apiError && <div className={styles.error}>{errors.apiError}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}
      <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : 'Save'}
      </button>
    </div>
  );
}

export default InputForm;