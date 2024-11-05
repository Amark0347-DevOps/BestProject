import React, { useState } from 'react';
import styles from './HTML.module.css';

function HTML() {
  const [projectName, setProjectName] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!projectName) newErrors.projectName = 'Project Name is required';
    if (!repositoryLink) newErrors.repositoryLink = 'Repository Link is required';
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
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.centeredText}><i className="fab fa-html5"></i> HTML Project</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            placeholder='Enter Project Name'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          {errors.projectName && <span className={styles.error}>{errors.projectName}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="repositoryLink">Repository Link</label>
          <input
            type="text"
            id="repositoryLink"
            placeholder='https://github.com/Amark0347-DevOps/BestProject.git'
            value={repositoryLink}
            onChange={(e) => setRepositoryLink(e.target.value)}
          />
          {errors.repositoryLink && <span className={styles.error}>{errors.repositoryLink}</span>}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
            {isLoading ? <div className={styles.loadingSpinner}></div> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HTML;
