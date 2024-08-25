import React, { useState, useEffect } from 'react';
import styles from './MachineForm.module.css'; // Use the same CSS module for styling
import LoadingSpinner from './LoadingSpinner'; // Assuming you have a LoadingSpinner component

function MachineForm() {
  const [machine_name, setMachineName] = useState('');
  const [machine_type, setMachineType] = useState('');
  const [key_pair, setKeyPair] = useState('');
  const [keyPairOptions, setKeyPairOptions] = useState([]); // Store key pair options
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch key pairs from the API when the component mounts
  useEffect(() => {
    const fetchKeyPairs = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await fetch('http://127.0.0.1:4522/v1/get/keypairs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setKeyPairOptions(data.key_pairs);
        } else {
          console.error('Failed to fetch key pairs');
        }
      } catch (error) {
        console.error('An error occurred while fetching key pairs:', error);
      }
    };

    fetchKeyPairs();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!machine_name) newErrors.machine_name = 'Machine Name is required';
    if (!machine_type) newErrors.machine_type = 'Machine Type is required';
    if (!key_pair) newErrors.key_pair = 'Key Pair is required';
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
      const response = await fetch('http://localhost:4522/v1/machine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include Authorization header
        },
        body: JSON.stringify({
          machine_name,
          machine_type,
          key_pair,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Machine data saved successfully');
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
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.centeredText}><i className="fas fa-server"></i> Create Machine</h2>
        <div className={styles.formGroup}>
          <label htmlFor="machine_name">Machine Name</label>
          <input
            type="text"
            id="machine_name"
            value={machine_name}
            onChange={(e) => setMachineName(e.target.value)}
            placeholder="Enter Machine Name"
            className={styles.input}
          />
          {errors.machine_name && <span className={styles.error}>{errors.machine_name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="machine_type">Machine Type</label>
          <select
            id="machine_type"
            value={machine_type}
            onChange={(e) => setMachineType(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Machine Type</option>
            <option value="t2.nano">t2.nano - 1 vCPU, 3 CPU Credits/hour, 0.5 GiB Mem</option>
            <option value="t2.micro">t2.micro - 1 vCPU, 6 CPU Credits/hour, 1 GiB Mem</option>
            <option value="t2.small">t2.small - 1 vCPU, 12 CPU Credits/hour, 2 GiB Mem</option>
            <option value="t2.medium">t2.medium - 2 vCPU, 24 CPU Credits/hour, 4 GiB Mem</option>
            <option value="t2.large">t2.large - 2 vCPU, 36 CPU Credits/hour, 8 GiB Mem</option>
            <option value="t2.xlarge">t2.xlarge - 4 vCPU, 54 CPU Credits/hour, 16 GiB Mem</option>
            <option value="t2.2xlarge">t2.2xlarge - 8 vCPU, 81 CPU Credits/hour, 32 GiB Mem</option>
            <option value="t3.nano">t3.nano - 2 vCPU, 6 CPU Credits/hour, 0.5 GiB Mem</option>
            <option value="t3.micro">t3.micro - 2 vCPU, 12 CPU Credits/hour, 1 GiB Mem</option>
            <option value="t3.small">t3.small - 2 vCPU, 24 CPU Credits/hour, 2 GiB Mem</option>
            <option value="t3.medium">t3.medium - 2 vCPU, 24 CPU Credits/hour, 4 GiB Mem</option>
            <option value="t3.large">t3.large - 2 vCPU, 36 CPU Credits/hour, 8 GiB Mem</option>
            <option value="t3.xlarge">t3.xlarge - 4 vCPU, 96 CPU Credits/hour, 16 GiB Mem</option>
            <option value="t3.2xlarge">t3.2xlarge - 8 vCPU, 192 CPU Credits/hour, 32 GiB Mem</option>
          </select>
          {errors.machine_type && <span className={styles.error}>{errors.machine_type}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="key_pair">Key Pair</label>
          <select
            id="key_pair"
            value={key_pair}
            onChange={(e) => setKeyPair(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Key Pair</option>
            {keyPairOptions.map((kp, index) => (
              <option key={index} value={kp}>{kp}</option>
            ))}
          </select>
          {errors.key_pair && <span className={styles.error}>{errors.key_pair}</span>}
        </div>
        
        {errors.apiError && <div className={styles.error}>{errors.apiError}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
        <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default MachineForm;
