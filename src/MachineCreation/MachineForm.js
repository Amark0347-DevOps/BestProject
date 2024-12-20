
import React, { useState, useEffect } from 'react';
import styles from './MachineForm.module.css'; // Use the same CSS module for styling
import LoadingSpinner from '../LoadingSpinner'; // Import the LoadingSpinner component
import KeypairPopup from './KeypairPopup'; // Import the KeypairPopup component
import { FaCopy } from 'react-icons/fa'; // Importing a copy icon from react-icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  

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
        toast.error('Machine Name Already Exists');
        // Optionally fetch instances again to refresh the table
      };

      if (response.ok) {
        toast.success('Machine Created Successfully');
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
        // Refresh the instance list after stopping the machine
        const instancesResponse = await fetch('http://127.0.0.1:4522/v1/get/machine', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include Authorization header
          },
        });
        if (instancesResponse.ok) {
          const data = await instancesResponse.json();
          if (data.data[0].Status === 'terminated'){
             toast.error("Machine Terminated");
          }
          
          if (data.data[0].Status === 'stoped'){
             toast.error("Machine Alredy Stoped");
          }
          
          
          setInstances(data.data); // Update the state with the latest instances
        }
      } else {
        toast.error('Failed to stop the instance');
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
        // Refresh the instance list after terminating the machine
        const instancesResponse = await fetch('http://127.0.0.1:4522/v1/get/machine', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include Authorization header
          },
        });
        if (instancesResponse.ok) {
          const data = await instancesResponse.json();
          // console.log(data.data[0].Status)
          if (data.data[0].Status === 'terminated'){
            toast.error("Machine Terminated");
         }
         
         if (data.data[0].Status === 'stoped'){
            toast.error("Machine Alredy Stoped");
         }
          setInstances(data.data); // Update the state with the latest instances
        }
      } else {
        toast.error('Failed to terminate the instance');
      }
    } catch (error) {
      console.error('An error occurred while fetching instances:', error);
    }
  };


  const handleRefreshButton = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
  
      // Fetch the latest key pairs from your API with the Authorization header
      const response = await fetch("http://127.0.0.1:4522/v1/get/keypairs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the header
        },
      });
  
      const data = await response.json();
  
      if (data.key_pairs) {
        // Update the keyPairs state with the latest key pairs
        setKeyPairOptions(data.key_pairs)(data.key_pairs);
      }
    } catch (error) {
      console.error("Failed to fetch key pairs:", error);
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
        toast.success('Machine Starting');
        // Refresh the instance list after starting the machine
        const instancesResponse = await fetch('http://127.0.0.1:4522/v1/get/machine', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include Authorization header
          },
        });
        if (instancesResponse.ok) {
          const data = await instancesResponse.json();
          setInstances(data.data); // Update the state with the latest instances
        }
      } else {
        toast.error('Failed To Start Machine');
      }
    } catch (error) {
      console.error('An error occurred while fetching instances:', error);
    }
  };
  const handleDownloadKeyPair = async (KeyName) => {
    setLoading(true); // Start loading state
    setError(''); // Clear previous errors
    
    try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const response = await fetch(`http://localhost:4522/v1/download/keypair/${KeyName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Include Authorization header
            },
        });

        if (!response.ok) {
          toast.error('Network Response Was Not ok');
          throw new Error('Network response was not ok.');
        }
        toast.success('KeyPair Downloding');
        const result = await response.json();
        const { data } = result;
        
        // Trigger the file download
        window.location.href = data;
    } catch (err) {
      setError('Failed to fetch the download URL: ' + err.message);
    } finally {
      setLoading(false); // End loading state
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
          <label htmlFor="machineName">Machine Name</label>
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
              <option value="t2.nano">t2.nano - 1 vCPU,  0.5 GiB Mem</option>
              <option value="t2.micro">t2.micro - 1 vCPU,  1 GiB Mem</option>
              <option value="t2.small">t2.small - 1 vCPU,  2 GiB Mem</option>
              <option value="t2.medium">t2.medium - 2 vCPU,  4 GiB Mem</option>
              <option value="t2.large">t2.large - 2 vCPU,  8 GiB Mem</option>
              <option value="t2.xlarge">t2.xlarge - 4 vCPU,  16 GiB Mem</option>
              <option value="t2.2xlarge">t2.2xlarge - 8 vCPU,  32 GiB Mem</option>
              <option value="t3.nano">t3.nano - 2 vCPU,  0.5 GiB Mem</option>
              <option value="t3.micro">t3.micro - 2 vCPU,  1 GiB Mem</option>
              <option value="t3.small">t3.small - 2 vCPU,  2 GiB Mem</option>
              <option value="t3.medium">t3.medium - 2 vCPU,  4 GiB Mem</option>
              <option value="t3.large">t3.large - 2 vCPU,  8 GiB Mem</option>
              <option value="t3.xlarge">t3.xlarge - 4 vCPU,  16 GiB Mem</option>
              <option value="t3.2xlarge">t3.2xlarge - 8 vCPU,  32 GiB Mem</option>
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
            Create KeyPair
          </button>
          <button onClick={handleRefreshButton} className={styles.newButton}>
          <i class="fa fa-refresh" aria-hidden="true"></i>
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
                <th>Name</th>
                <th>Private IPV4</th>
                <th>Public IPV4</th>
                <th>Status</th>
                <th>Key Pair</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instances.map((instance, index) => (
                <tr key={instance.InstanceId}>
                  <td>{index + 1}</td>
                  <td>{instance.InstanceId}</td>
                  <td>{instance.Name}</td>
                  <td>{instance.PrivateIpAddress}</td>
                  <td>
                    {instance.PublicIpAddress}
                    <FaCopy 
                      className={styles.copyIcon} 
                      onClick={() => copyToClipboard(instance.PublicIpAddress)} 
                    />
                  </td>
                  <td>{instance.Status}</td>
                  <td>{instance.KeyName}</td>
                
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
                    <button 
                      onClick={() => handleDownloadKeyPair(instance.KeyName)}
                      className={`${styles.actionButton} ${styles.removeTerminate}`}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default MachineForm;
