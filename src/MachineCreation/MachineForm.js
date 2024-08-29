
import React, { useState, useEffect } from 'react';
import styles from './MachineForm.module.css'; // Use the same CSS module for styling
import LoadingSpinner from '../LoadingSpinner'; // Import the LoadingSpinner component
import KeypairPopup from './KeypairPopup'; // Import the KeypairPopup component
import { FaCopy } from 'react-icons/fa'; // Importing a copy icon from react-icons

function MachineForm() {
  const [machineName, setMachineName] = useState('');
  const [machineType, setMachineType] = useState('');
  const [keyPair, setKeyPair] = useState('');
  const [keyPairOptions, setKeyPairOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [instances, setInstances] = useState([]); // State to hold AWS instances
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  // Fetch key pairs and instances from the API when the component mounts
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

    const fetchInstances = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await fetch('http://127.0.0.1:4522/v1/get/machine', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInstances(data.data);
        } else {
          console.error('Failed to fetch instances');
        }
      } catch (error) {
        console.error('An error occurred while fetching instances:', error);
      }
    };

    fetchKeyPairs();
    fetchInstances();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!machineName) newErrors.machine_name = 'Machine Name is required';
    if (!machineType) newErrors.machine_type = 'Machine Type is required';
    if (!keyPair) newErrors.key_pair = 'Key Pair is required';
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
      const response = await fetch('http://127.0.0.1:4522/v1/create/machine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          machineName,
          machineType,
          keyPair,
        }),
      });
      if (response.status === 500) {
        setSuccessMessage('Machine Name Already Exist');
        // Optionally fetch instances again to refresh the table
      };

      if (response.ok) {
        setSuccessMessage('Machine Created Successfully');
        // Optionally fetch instances again to refresh the table
        const instancesResponse = await fetch('http://127.0.0.1:4522/v1/get/machine', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (instancesResponse.ok) {
          const data = await instancesResponse.json();
          setInstances(data.data);
        }
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

  const handleStop = async (instanceId) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await fetch(`http://127.0.0.1:4522/v1/stop/machine/${instanceId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Include Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInstances(data.data);
        } else {
          console.error('Failed to Delete The instances');
        }
      } catch (error) {
        console.error('An error occurred while fetching instances:', error);
      }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleTerminate = async (instanceId) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await fetch(`http://127.0.0.1:4522/v1/terminate/machine/${instanceId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Include Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInstances(data.data);
        } else {
          console.error('Failed to terminate the instance');
        }
      } catch (error) {
        console.error('An error occurred while fetching instances:', error);
      }
  };

  const handleStart = async (instanceId) => {
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await fetch(`http://127.0.0.1:4522/v1/start/machine/${instanceId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Include Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setInstances(data.data);
        } else {
          console.error('Failed to start the instance');
        }
      } catch (error) {
        console.error('An error occurred while fetching instances:', error);
      }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy text:', err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.centeredText}><i className="fas fa-server"></i> Create Machine</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="machineName">Machine Name:</label>
          <input
            type="text"
            id="machineName"
            placeholder='Enter Machine Name'
            value={machineName}
            onChange={(e) => setMachineName(e.target.value)}
            className={styles.input}
          />
          {errors.machine_name && <p className={styles.error}>{errors.machine_name}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="machineType" className={styles.label}>Machine Type</label>
          <div className={styles.customSelectWrapper}>
            <select
              id="machineType"
              value={machineType}
              onChange={(e) => setMachineType(e.target.value)}
              className={styles.customSelect}
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
            <div className={styles.customArrow}></div>
          </div>
          {errors.machine_type && <span className={styles.error}>{errors.machine_type}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="keyPair">Key Pair</label>
          <select
            id="keyPair"
            value={keyPair}
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
        <div className={styles.buttonContainer}>
        <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : 'Create Machine'}
        </button>
          <button onClick={handleButtonClick} className={styles.newButton}>
            Create Keypair
          </button>
        </div>
        {showPopup && (
          <KeypairPopup isVisible={showPopup} onClose={handlePopupClose} />
        )}
        {errors.apiError && <div className={styles.error}>{errors.apiError}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}
      </div>
      {instances.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Instance ID</th>
                <th>Private IP Address</th>
                <th>Public IP Address</th>
                <th>Status</th>
                <th>Name</th>
                <th>Running Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((instance, index) => (
                <tr key={instance.InstanceId}>
                  <td>{index + 1}</td>
                  <td>{instance.InstanceId}</td>
                  <td>{instance.PrivateIpAddress}</td>
                  <td>
                    {instance.PublicIpAddress}
                    <FaCopy 
                      className={styles.copyIcon} 
                      onClick={() => copyToClipboard(instance.PublicIpAddress)} 
                    />
                  </td>
                  <td>{instance.Status}</td>
                  <td>{instance.Name}</td>
                  <td>{instance.RunningStatus}</td>
                  <td>
                    <button 
                      onClick={() => handleStart(instance.InstanceId)}
                      className={`${styles.actionButton} ${styles.startButton}`}
                    >
                      Start
                    </button>
                    <button 
                      onClick={() => handleStop(instance.InstanceId)}
                      className={`${styles.actionButton} ${styles.stopButton}`}
                    >
                      Stop
                    </button>
                    <button 
                      onClick={() => handleTerminate(instance.InstanceId)}
                      className={`${styles.actionButton} ${styles.removeTerminate}`}
                    >
                      Trash
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

export default MachineForm;
