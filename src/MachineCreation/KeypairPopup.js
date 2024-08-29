import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner'; // Import the LoadingSpinner component
import styles from './KeypairPopup.module.css'; // Import the CSS file

function KeypairPopup({ isVisible, onClose }) {
  // State hooks
  const [keyName, setKeyName] = useState('');
  const [keyMaterial, setKeyMaterial] = useState('');
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state
  const [isKeyNameValid, setIsKeyNameValid] = useState(true); // Add state for input validation
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Add state for button disabling

  useEffect(() => {
    // Check if keyName is empty or not to enable/disable the button
    setIsButtonDisabled(keyName.trim() === '');
  }, [keyName]);

  const handleCreateKeypair = async () => {
    if (keyName.length > 10) {
      setIsKeyNameValid(false);
      return;
    }
    setIsKeyNameValid(true);

    if (isButtonDisabled) {
      return; // Prevent function execution if the button is disabled
    }

    setIsLoading(true); // Set loading to true when starting the request
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      const response = await axios.post(
        'http://127.0.0.1:4522/v1/create/keypair',
        { key_pair_name: keyName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Wait for 2 seconds before showing the response
      setTimeout(() => {
        setKeyMaterial(response.data.data.key_material);
        setIsKeyVisible(true);
        setIsLoading(false); // Set loading to false after showing the response
      }, 1000);
    } catch (error) {
      console.error('Error creating keypair:', error);
      if (error.response && error.response.status === 400) {
        setError('KeyPair Already Created.'); // Set specific error message
      } else {
        setError('Failed to create keypair.');
      }
      setIsLoading(false); // Ensure loading state is reset even if there's an error
    }
  };

  const handleCopyPrivateKey = () => {
    navigator.clipboard.writeText(keyMaterial);
    alert('Private key copied to clipboard!');
  };

  const handleChangeKeyName = (e) => {
    const value = e.target.value;
    setKeyName(value);
    if (value.length > 10) {
      setIsKeyNameValid(false);
    } else {
      setIsKeyNameValid(true);
    }
  };

  if (!isVisible) return null; // Don't render anything if the popup is not visible

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Create Keypair</h2>
        <input
          type="text"
          placeholder="Enter key name"
          value={keyName}
          onChange={handleChangeKeyName}
          className={styles.input}
        />
        {!isKeyNameValid && <p className={styles.errorText}>Keypair name is too long (max 10 characters).</p>}
        <div className={styles.buttonContainer}> {/* Container for buttons */}
          <button
            onClick={handleCreateKeypair}
            className={styles.button}
            disabled={isButtonDisabled || isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Create Keypair'} {/* Show spinner only if loading */}
          </button>
          <button onClick={onClose} className={styles.closeButton}>
            Close
          </button>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {isKeyVisible && (
          <div className={styles.outputBox}>
            <div className={styles.keyContainer}>
              <h3>Generated Private Key</h3>
              <pre className={styles.keyMaterial}>{keyMaterial}</pre>
              <div className={styles.buttonContainer}>
                <button onClick={handleCopyPrivateKey} className={styles.copyButton}>
                  Copy Private Key
                </button>
                <button onClick={onClose} className={styles.closeButton}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default KeypairPopup;
