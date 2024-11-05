import React, { useState } from 'react';
import Select from 'react-select';
import styles from './FastAPIForm.module.css'; // Ensure this matches your actual CSS file

const options = [
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'redis', label: 'Redis' },
];

function FastAPIForm() {
  const [projectName, setProjectName] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');
  const [fastAPIPort, setFastAPIPort] = useState('');
  const [selectedDatabases, setSelectedDatabases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!projectName) newErrors.projectName = 'Project Name is required';
    if (!repositoryLink) newErrors.repositoryLink = 'Repository Link is required';
    if (!fastAPIPort) newErrors.fastAPIPort = 'FastAPI Port is required';
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
      console.log('FastAPI Port:', fastAPIPort);
      console.log('Selected Databases:', selectedDatabases.map(option => option.label).join(', '));
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.centeredText}><i className="fa-brands fa-python"></i> FastAPI Project</h2>
        <div className={styles.inputGroup}>
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
        <div className={styles.inputGroup}>
          <label htmlFor="repositoryLink">Repository Link</label>
          <input
            type="text"
            id="repositoryLink"
            placeholder="https://github.com/Amark0347-DevOps/BestProject.git"
            value={repositoryLink}
            onChange={(e) => setRepositoryLink(e.target.value)}
          />
          {errors.repositoryLink && <span className={styles.error}>{errors.repositoryLink}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fastAPIPort">FastAPI Port</label>
          <input
            type="text"
            id="fastAPIPort"
            value={fastAPIPort}
            onChange={(e) => setFastAPIPort(e.target.value)}
            placeholder="5000"
          />
          {errors.fastAPIPort && <span className={styles.error}>{errors.fastAPIPort}</span>}
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

export default FastAPIForm;
