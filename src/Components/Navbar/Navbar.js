import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; // Import AuthContext
import { ReactComponent as RocketLogo } from '../../assets/images/rocket.svg'; // Correct the path to your SVG
import './Navbar.css'; // Import the CSS file (not as modules)

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext); // Access authentication state
  const navigate = useNavigate(); // Hook for navigation
  
  // State to manage which link is active
  const [activeLink, setActiveLink] = useState('signup'); // Default is signup

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/'); // Redirect to home page after logout
  };

  const handleLogoClick = () => {
    // If user is authenticated, redirect to dashboard; otherwise, to home page
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar__left">
        {/* Click on logo to navigate to home page or dashboard if logged in */}
        <div onClick={handleLogoClick} className="navbar__logo">
          <RocketLogo className="logo-svg" />
          <span className="logo-text">Rocket</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar__right">
        <ul className="navbar__links">
          {!isAuthenticated && ( // Only show Contact if user is not logged in
            <li className={activeLink === 'contact' ? 'active' : ''}>
              <Link to="/contact" 
                    className="nav-link" 
                    onClick={() => setActiveLink('contact')}>
                Contact
              </Link>
            </li>
          )}
          {!isAuthenticated ? (
            <>
              <li className={activeLink === 'login' ? 'active' : ''}>
                <Link to="/login" 
                      className="nav-link" 
                      onClick={() => setActiveLink('login')}>
                  Login
                </Link>
              </li>
              <li className={activeLink === 'signup' ? 'active' : ''}>
                <Link to="/signup" 
                      className="nav-link" 
                      onClick={() => setActiveLink('signup')}>
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* <li>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li> */}
              <li>
                <button 
                  onClick={handleLogout} 
                  className="logout-button">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Hamburger Menu (optional, for mobile responsiveness) */}
      <div className="navbar__toggle">
        <span className="hamburger-icon"></span>
        <span className="hamburger-icon"></span>
        <span className="hamburger-icon"></span>
      </div>
    </nav>
  );
}

export default Navbar;
