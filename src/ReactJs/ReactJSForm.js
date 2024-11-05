
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import styles from './ReactJSForm.module.css'; // Import the CSS module

const ProjectPage = () => {
  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [reactPort, setReactPort] = useState('');
  const [machine, setMachine] = useState('');
  const [machines, setMachines] = useState([]);
  const [projects, setProjects] = useState([]); // State for storing projects

  useEffect(() => {
    // Fetch machines
    const fetchMachines = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:4522/v1/get/machine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter only running instances
        const runningMachines = response.data.data.filter((machine) => machine.Status === 'running');
        setMachines(runningMachines);
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    // Fetch projects
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:4522/v1/get/reactjs/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchMachines();
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      projectName,
      repositoryLink: projectLink,
      reactjsPort: reactPort,
      machineid: machine,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:4522/v1/deploy/reactjs', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Add the newly deployed project to the projects state
      setProjects([...projects, response.data.data]);

      // Show success toast
      toast.success('Project Save Successfully!');
    } catch (error) {
      console.error('Error deploying project:', error);

      // Show error toast
      toast.error('Failed to send deployment request.');
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:4522/v1/delete/reactjs/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted project from the state
      setProjects(projects.filter((project) => project._id !== projectId));

      // Show success toast
      toast.success('Project Deleted Successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);

      // Show error toast
      toast.error('Failed to Delete Project.');
    }
  };
  const handleDeploy = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:4522/v1/delete/reactjs/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted project from the state
      setProjects(projects.filter((project) => project._id !== projectId));

      // Show success toast
      toast.success('Project Deleted Successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);

      // Show error toast
      toast.error('Failed to Delete Project.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.centeredText}><i className="fab fa-react"></i> ReactJS Project</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Project Name</label>
            <input
              type="text"
              placeholder='Enter Project Name'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Project Link</label>
            <input
              type="text"
              placeholder='https://github.com/Amark0347-DevOps/BestProject.git'
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>ReactJS Port</label>
            <input
              type="text"
              placeholder='3000'
              value={reactPort}
              onChange={(e) => setReactPort(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Machine</label>
            <select
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
              className={styles.select}
              required
            >
              <option value="">Select Machine</option>
              {machines.length > 0 ? (
                machines.map((machine) => (
                  <option key={machine.InstanceId} value={machine.InstanceId}>
                    {machine.InstanceId} - {machine.Name} - {machine.Status}
                  </option>
                ))
              ) : (
                <option value="">No running instances available</option>
              )}
            </select>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.saveButton}>Save Project</button>
          </div>
        </form>
      </div>

      {projects.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Repository Link</th>
                <th>Port</th>
                <th>Machine ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.projectName}</td>
                  <td>
                    <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer">
                      {project.repositoryLink}
                    </a>
                  </td>
                  <td>{project.reactjsPort}</td>
                  <td>{project.machineid}</td>
                  <td>
                    <button
                      className={styles.deployButton}
                      onClick={() => handleDeploy(project._id)}
                    >
                      Deploy
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
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
};

export default ProjectPage;
