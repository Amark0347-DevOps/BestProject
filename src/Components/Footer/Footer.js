

// export default Footer;
import React from 'react';
import './Footer.css';
import logo from '../../assets/images/rocket.svg'; // Import the SVG logo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description Section */}
        <div className="footer-section">
          <h3 className="footer-logo">
            <img src={logo} alt="Rocket Logo" className="footer-logo-img" /> Rocket
          </h3>
          <p className="footer-description">
            Your trusted partner for modern web solutions. Empowering businesses with cutting-edge technology.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/about" className="footer-link">📖 About Us</a>
            </li>
            <li>
              <a href="/services" className="footer-link">🛠️ Services</a>
            </li>
            <li>
              <a href="/contact" className="footer-link">📞 Contact</a>
            </li>
            <li>
              <a href="/faq" className="footer-link">❓ FAQ</a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="footer-socials">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">📱 Facebook</a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">🐦 Twitter</a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">💼 LinkedIn</a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">📸 Instagram</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
