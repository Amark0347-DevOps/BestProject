import React, { useState } from 'react';
import styles from './InputForm.module.css'; // Assuming you have a CSS module for styling
import LoadingSpinner from './LoadingSpinner'; // Assuming you have a LoadingSpinner component

function InputForm() {
  const [access_key, setAccessKey] = useState('');
  const [secret_access_key, setSecretAccessKey] = useState('');
  const [aws_region, setAwsRegion] = useState(''); // New state for aws_region
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!access_key) newErrors.access_key = 'Access Key is required';
    if (!secret_access_key) newErrors.secret_access_key = 'Secret Access Key is required';
    if (!aws_region) newErrors.aws_region = 'AWS Region is required';
    return newErrors;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
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
          aws_region, // Include aws_region in the request body
        }),
      });

      if (response.ok) {
        setSuccessMessage('Data saved successfully');
      } else if (response.status === 409) {
        setErrors({ apiError: 'Data is already saved' });
      } else {
        const errorData = await response.json();
        setErrors({ apiError: errorData.message });
      }
    } catch (error) {
      setErrors({ apiError: 'An error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="access_key">Access Key</label>
        <input
          type="text"
          id="access_key"
          value={access_key}
          onChange={(e) => setAccessKey(e.target.value)}
          className={styles.input} // Assuming you have a common input style
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
          className={styles.input} // Assuming you have a common input style
        />
        {errors.secret_access_key && <span className={styles.error}>{errors.secret_access_key}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="aws_region">AWS Region</label>
        <select
          id="aws_region"
          value={aws_region}
          onChange={(e) => setAwsRegion(e.target.value)}
          className={styles.input} // Assuming you have a common input style
        >
          <option value="">Select a Region</option>
          <option value="us-east-1">US East (N. Virginia)</option>
          <option value="us-east-2">US East (Ohio)</option>
          <option value="us-west-1">US West (N. California)</option>
          <option value="us-west-2">US West (Oregon)</option>
          <option value="ap-south-1">Asia Pacific (Mumbai)</option>
          <option value="ap-northeast-3">Asia Pacific (Osaka)</option>
          <option value="ap-northeast-2">Asia Pacific (Seoul)</option>
          <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
          <option value="ap-southeast-2">Asia Pacific (Sydney)</option>
          <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
          <option value="ca-central-1">Canada (Central)</option>
          <option value="eu-central-1">Europe (Frankfurt)</option>
          <option value="eu-west-1">Europe (Ireland)</option>
          <option value="eu-west-2">Europe (London)</option>
          <option value="eu-west-3">Europe (Paris)</option>
          <option value="eu-north-1">Europe (Stockholm)</option>
          <option value="sa-east-1">South America (São Paulo)</option>
        </select>
        {errors.aws_region && <span className={styles.error}>{errors.aws_region}</span>}
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