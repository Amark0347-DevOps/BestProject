import React, { useState } from 'react';
import styles from './HTMLForm.module.css';

function HTMLForm() {
  const [projectName, setProjectName] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');
  const [domainName, setDomainName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!projectName) newErrors.projectName = 'Project Name is required';
    if (!repositoryLink) newErrors.repositoryLink = 'Repository Link is required';
    if (!domainName) newErrors.domainName = 'Domain Name is required';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      console.log('Project Name:', projectName);
      console.log('Repository Link:', repositoryLink);
      console.log('Domain Name:', domainName);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.centeredText}><i className="fab fa-html5"></i> HTML Project</h2>
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
        <label htmlFor="domainName">Domain Name</label>
        <input
          type="text"
          id="domainName"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
        />
        {errors.domainName && <span className={styles.error}>{errors.domainName}</span>}
      </div>
      <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );
}

export default HTMLForm;
