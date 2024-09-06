import React, { useState } from 'react';
import Select from 'react-select';
import styles from './FastAPIForm.module.css';

const options = [
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'redis', label: 'Redis' },
];

function ReactJSForm() {
  const [projectName, setProjectName] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');
  const [reactJSPort, setReactJSPort] = useState('');
  const [domainName, setDomainName] = useState('');
  const [selectedDatabases, setSelectedDatabases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!projectName) newErrors.projectName = 'Project Name is required';
    if (!repositoryLink) newErrors.repositoryLink = 'Repository Link is required';
    if (!reactJSPort) newErrors.reactJSPort = 'ReactJS Port is required';
    if (!domainName) newErrors.domainName = 'Domain Name is required';
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
      console.log('ReactJS Port:', reactJSPort);
      console.log('Domain Name:', domainName);
      console.log('Selected Databases:', selectedDatabases.map(option => option.label).join(', '));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.centeredText}><i className="fab fa-react"></i> ReactJS Project</h2>
      <div className={styles.formGroup}>
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
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
          placeholder="Enter repository link"
        />
        {errors.repositoryLink && <span className={styles.error}>{errors.repositoryLink}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="reactJSPort">ReactJS Port</label>
        <input
          type="text"
          id="reactJSPort"
          value={reactJSPort}
          onChange={(e) => setReactJSPort(e.target.value)}
          placeholder="Enter ReactJS port"
        />
        {errors.reactJSPort && <span className={styles.error}>{errors.reactJSPort}</span>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="domainName">Domain Name</label>
        <input
          type="text"
          id="domainName"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          placeholder="Enter domain name"
        />
        {errors.domainName && <span className={styles.error}>{errors.domainName}</span>}
      </div>
      <div className={styles.formGroup}>
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
      <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );
}

export default ReactJSForm;
