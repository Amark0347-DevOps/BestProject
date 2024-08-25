import React, { useState } from 'react';
import styles from './FastAPIForm.module.css';
import LoadingSpinner from './LoadingSpinner'; // Import LoadingSpinner
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function FastAPIForm() {
  const [projectName, setProjectName] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');
  const [fastapiPort, setFastapiPort] = useState('');
  const [domainName, setDomainName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!projectName) newErrors.projectName = 'Project Name is required';
    if (!repositoryLink) newErrors.repositoryLink = 'Repository Link is required';
    if (!fastapiPort) newErrors.fastapiPort = 'FastAPI Port is required';
    if (!domainName) newErrors.domainName = 'Domain Name is required';
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
      const response = await fetch('http://localhost:4522/v1/fastapi/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include Authorization header
        },
        body: JSON.stringify({
          projectName,
          repositoryLink,
          fastapiPort,
          domainName,
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
      <h2 className={styles.centeredText}><i className="fa-brands fa-python"></i> FastAPI Project</h2>
      <div className={styles.formGroup}>
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        {errors.projectName && <span className={styles.error}>{errors.projectName}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="repositoryLink">Repository Link</label>
        <input
          type="text"
          id="repositoryLink"
          value={repositoryLink}
          onChange={(e) => setRepositoryLink(e.target.value)}
        />
        {errors.repositoryLink && <span className={styles.error}>{errors.repositoryLink}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="fastapiPort">FastAPI Port</label>
        <input
          type="text"
          id="fastapiPort"
          value={fastapiPort}
          onChange={(e) => setFastapiPort(e.target.value)}
        />
        {errors.fastapiPort && <span className={styles.error}>{errors.fastapiPort}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="domainName">Domain Name</label>
        <input
          type="text"
          id="domainName"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
        />
        {errors.domainName && <span className={styles.error}>{errors.domainName}</span>}
      </div>
      {errors.apiError && <div className={styles.error}>{errors.apiError}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}
      <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : 'Save'}
      </button>
    </div>
  );
}

export default FastAPIForm;