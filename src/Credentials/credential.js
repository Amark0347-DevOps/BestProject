
import React, { useState, useEffect } from 'react';
import styles from './credential.module.css';
import LoadingSpinner from '../LoadingSpinner';
import { FaCopy } from 'react-icons/fa'; // Importing a copy icon from react-icons
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection

function InputForm() {
  const [access_key, setAccessKey] = useState('');
  const [secret_access_key, setSecretAccessKey] = useState('');
  const [aws_region, setAwsRegion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [fetchedData, setFetchedData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const validateForm = () => {
    const newErrors = {};
    if (!access_key) newErrors.access_key = 'Access Key is required';
    else if (access_key.length < 1 || access_key.length > 20) newErrors.access_key = 'Access Key must be between 1 and 20 characters';

    if (!secret_access_key) newErrors.secret_access_key = 'Secret Access Key is required';
    else if (secret_access_key.length < 1 || secret_access_key.length > 40) newErrors.secret_access_key = 'Secret Access Key must be between 1 and 40 characters';

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
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4522/v1/access/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ access_key, secret_access_key, aws_region }),
      });
  
      if (response.ok) {
        setSuccessMessage('Credentials saved successfully');
        
        // Fetch updated data immediately after saving
        const fetchResponse = await fetch('http://localhost:4522/v1/get/access/secret', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          setFetchedData(data.data || []);
        } else if (fetchResponse.status === 401) {
          navigate('/login'); // Redirect to login page if unauthorized
        }
      } else if (response.status === 401) {
        navigate('/login'); // Redirect to login page if unauthorized
      } else if (response.status === 409) {
        setErrors({ apiError: 'Credentials is already saved' });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4522/v1/get/access/secret', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          navigate('/login'); // Redirect to login page if unauthorized
        }

        const data = await response.json();
        if (response.ok && data.data.length > 0) {
          setFetchedData(data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy text:', err));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4522/v1/delete/access/secret/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          navigate('/login'); // Redirect to login page if unauthorized
        }

        if (response.ok) {
          setFetchedData(fetchedData.filter(item => item._id !== id));
        } else {
          const errorData = await response.json();
          console.error('Delete error:', errorData.message);
        }
      } catch (error) {
        console.error('Failed to delete data:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
      <h2 className={styles.centeredText}><i className="fas fa-key"></i>  AWS Credentials</h2>
        <div className={styles.formGroup}>
          <label htmlFor="access_key">Access Key</label>
          <input
            type="text"
            id="access_key"
            placeholder='Enter Access Key'
            value={access_key}
            onChange={(e) => setAccessKey(e.target.value)}
            className={styles.input}
          />
          {errors.access_key && <span className={styles.error}>{errors.access_key}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="secret_access_key">Secret Access Key</label>
          <input
            type="text"
            id="secret_access_key"
            placeholder='Enter Secret Access Key'
            
            value={secret_access_key}
            onChange={(e) => setSecretAccessKey(e.target.value)}
            className={styles.input}
          />
          {errors.secret_access_key && <span className={styles.error}>{errors.secret_access_key}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="aws_region">AWS Region</label>
          <select
            id="aws_region"
            value={aws_region}
            onChange={(e) => setAwsRegion(e.target.value)}
            className={styles.select}
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

      {/* Second flexbox to display fetched data */}
      {fetchedData.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Access Key</th>
                <th>Secret Access Key</th>
                <th>AWS Region</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.access_key}
                    <button 
                      onClick={() => copyToClipboard(item.access_key)}
                      className={styles.copyButton}
                    >
                      <FaCopy />
                    </button>
                  </td>
                  <td>
                    {item.secret_access_key}
                    <button 
                      onClick={() => copyToClipboard(item.secret_access_key)}
                      className={styles.copyButton}
                    >
                      <FaCopy />
                    </button>
                  </td>
                  <td>{item.aws_region}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InputForm;
