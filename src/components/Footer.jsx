import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className="social-links">
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" >
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <p>&copy; 2025 Smart Factory. All rights reserved.</p>
    </footer>
  );
};

export default Footer;