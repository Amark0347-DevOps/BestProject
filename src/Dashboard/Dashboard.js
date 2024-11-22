import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import logo from '../assets/logo.png'; // Adjust the path as necessary
import InputForm from '../Credentials/credential'; // Import the InputForm component
import ReactJSForm from '../ReactJs/ReactJSForm'; // Import the ReactJSForm component
import HTMLForm from '../HTML/HTML'; // Import the HTMLForm component
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import FastAPIForm from '../FastAPI/FastAPIForm';
import MachineForm from '../MachineCreation/MachineForm';
import NodejsForm from '../Nodejs/NodejsForm'; // Adjusted import

function Dashboard() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(null);

  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');

    // Redirect to the login page
    navigate('/login');
  };

  const handleOverviewClick = () => {
    setShowForm('overview');
  };

  const handleDomainClick = () => {
    setShowForm('domain');
  };

  const handleStorageClick = () => {
    setShowForm('storage');
  };

  const handleServicesClick = () => {
    setShowForm('services');
  };

  const handleSettingsClick = () => {
    setShowForm('settings');
  };

  const handleMonitoringClick = () => {
    setShowForm('monitoring');
  };

  const handleCredentialsClick = () => {
    setShowForm('credentials');
  };
  
  const handleNodejsClick = () => {
    setShowForm('nodejs');
  };

  const handleReactJSClick = () => {
    setShowForm('reactjs');
  };

  const handleFastApiClick = () => {
    setShowForm('fastapi');
  };

  const handleHTMLClick = () => {
    setShowForm('html');
  };

  const handleMachinesClick = () => {
    setShowForm('machines');
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <nav>
          {/* Overview */}
          <Link to="#" onClick={handleOverviewClick} className={styles.navLink}>
            🏡 Overview
          </Link>
          {/* Credentials */}
          <Link to="#" onClick={handleCredentialsClick} className={styles.navLink}>
            🔐 Credentials
          </Link>
          {/* Machines */}
          <Link to="#" onClick={handleMachinesClick} className={styles.navLink}>
            🖥️ Machines
          </Link>
          {/* Storage */}
          <Link to="#" onClick={handleStorageClick} className={styles.navLink}>
            💼 Storage
          </Link>
          {/* Domain */}
          <Link to="#" onClick={handleDomainClick} className={styles.navLink}>
            🌍 Domain
          </Link>
          {/* Services */}
          <Link to="#" onClick={handleServicesClick} className={styles.navLink}>
            🔧 Services
          </Link>
          {/* Settings */}
          <Link to="#" onClick={handleSettingsClick} className={styles.navLink}>
            ⚙️ Settings
          </Link>
          {/* Monitoring */}
          <Link to="#" onClick={handleMonitoringClick} className={styles.navLink}>
            📊 Monitoring
          </Link>
          {/* HTML */}
          <Link to="#" onClick={handleHTMLClick} className={styles.navLink}>
            📄 HTML
          </Link>
          {/* ReactJS */}
          <Link to="#" onClick={handleReactJSClick} className={styles.navLink}>
            ⚛️ ReactJS
          </Link>
          {/* NodeJs */}
          <Link to="#" onClick={handleNodejsClick} className={styles.navLink}>
            🟩 NodeJs
          </Link>
          {/* FastAPI */}
          <Link to="#" onClick={handleFastApiClick} className={styles.navLink}>
            🐍 FastAPI
          </Link>
          {/* Sign Out */}
          <button onClick={handleSignOut} className={styles.signOutButton}>
            🚪 Sign Out
          </button>
        </nav>
      </aside>
      <div className={styles.mainContent}>
        <main>
          {/* Show different components based on the clicked button */}
          {showForm === 'overview' && <div>Welcome to the Overview Page</div>}
          {showForm === 'domain' && <div>Domain Management Page</div>}
          {showForm === 'storage' && <div>Storage Management Page</div>}
          {showForm === 'services' && <div>Services Management Page</div>}
          {showForm === 'settings' && <div>Settings Page</div>}
          {showForm === 'monitoring' && <div>Monitoring Page</div>}
          {showForm === 'credentials' && <InputForm />}
          {showForm === 'machines' && <MachineForm />}
          {showForm === 'reactjs' && <ReactJSForm />}
          {showForm === 'nodejs' && <NodejsForm />}
          {showForm === 'html' && <HTMLForm />}
          {showForm === 'fastapi' && <FastAPIForm />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
