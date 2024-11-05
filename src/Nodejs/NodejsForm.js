import React, { useState } from 'react';
import Select from 'react-select'; // Import Select
import styles from './NodejsForm.module.css'; // Ensure this path is correct

function NodejsForm() {
  const [projectName, setProjectName] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');
  const [nodejsPort, setNodejsPort] = useState('');
  const [selectedDatabases, setSelectedDatabases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Define options for the Select component
  const options = [
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'redis', label: 'Redis' },
    // Add more options as needed
  ];

  const validate = () => {
    const newErrors = {};
    if (!projectName) newErrors.projectName = 'Project Name is required';
    if (!repositoryLink) newErrors.repositoryLink = 'Repository Link is required';
    if (!nodejsPort) newErrors.nodejsPort = 'Node.js Port is required';
    if (selectedDatabases.length === 0) newErrors.selectedDatabases = 'At least one database must be selected';
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
      console.log('Node.js Port:', nodejsPort);
      console.log('Selected Databases:', selectedDatabases.map(option => option.label).join(', '));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.centeredText}><i className="fab fa-node"></i> Node.js Project</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter Poject name"
            className={styles.input}
          />
          {errors.projectName && <span className={styles.error}>{errors.projectName}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="repositoryLink">Repository Link</label>
          <input
            type="text"
            id="repositoryLink"
            value={repositoryLink}
            onChange={(e) => setRepositoryLink(e.target.value)}
            placeholder="https://github.com/Amark0347-DevOps/BestProject.git"
            className={styles.input}
          />
          {errors.repositoryLink && <span className={styles.error}>{errors.repositoryLink}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="nodejsPort">Node.js Port</label>
          <input
            type="text"
            id="nodejsPort"
            placeholder="3000"
            value={nodejsPort}
            onChange={(e) => setNodejsPort(e.target.value)}
            className={styles.input}
          />
          {errors.nodejsPort && <span className={styles.error}>{errors.nodejsPort}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="databases">Databases</label>
          <Select
            id="databases"
            isMulti
            options={options}
            value={selectedDatabases}
            onChange={setSelectedDatabases}
            className={styles.select}
            classNamePrefix="select"
          />
          {errors.selectedDatabases && <span className={styles.error}>{errors.selectedDatabases}</span>}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NodejsForm;
