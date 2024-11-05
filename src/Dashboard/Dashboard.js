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

  const handleHomeClick = () => {
    setShowForm('home');
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={logo} alt="MyApp Logo" className={styles.logoImage} />
          Rocket Deployments
        </div>
        <nav>
          <Link to="#" onClick={handleHomeClick} className={styles.navLink}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="#" onClick={handleCredentialsClick} className={styles.navLink}>
            <i className="fas fa-key"></i> Credentials
          </Link>
          <Link to="#" onClick={handleMachinesClick} className={styles.navLink}>
            <i className="fas fa-server"></i> Machines
          </Link>
          <Link to="#" onClick={handleHTMLClick} className={styles.navLink}>
            <i className="fab fa-html5"></i> HTML
          </Link>
          <Link to="#" onClick={handleReactJSClick} className={styles.navLink}>
            <i className="fab fa-react"></i> ReactJS
          </Link>
          <Link to="#" onClick={handleNodejsClick} className={styles.navLink}>
            <i className="fab fa-node"></i> NodeJs
          </Link>
          <Link to="#" onClick={handleFastApiClick} className={styles.navLink}>
            <i className="fa-brands fa-python"></i> FastAPI
          </Link>
          <button onClick={handleSignOut} className={styles.signOutButton}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </nav>
      </aside>
      <div className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <div className={styles.logo}>
            <img src={logo} alt="MyApp Logo" className={styles.logoImage} />
            Rocket
          </div>
        </header>
        <main>
          {showForm === 'home' && <div>Welcome to the Home Page</div>}
          {showForm === 'credentials' && <InputForm />}
          {showForm === 'machines' && <MachineForm />}
          {showForm === 'reactjs' && <ReactJSForm />}
          {showForm === 'nodejs' && <NodejsForm />} {/* Updated component */}
          {showForm === 'html' && <HTMLForm />}
          {showForm === 'fastapi' && <FastAPIForm />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;