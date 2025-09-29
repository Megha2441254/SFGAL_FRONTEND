
import './About.css';
import React, { useState } from 'react';
import { FaUserCircle, FaFemale, FaMale } from 'react-icons/fa';

const About = () => {
  const [hoveredCardColor, setHoveredCardColor] = useState('#f0f2f5'); // Default background

  const handleMouseEnter = (color) => {
    setHoveredCardColor(color);
  };

  const handleMouseLeave = () => {
    setHoveredCardColor('#f0f2f5'); // Reset to default background color
  };

  return (
    <div className="main-content" style={{ backgroundColor: hoveredCardColor }}>
      <div className="about-header-section">
        <h1>About Our Smart Factory</h1>
        <p>We are pioneers in modern manufacturing, leveraging cutting-edge technology to create efficient, secure, and sustainable solutions. Our commitment to innovation drives us to build smarter systems for a better future.</p>
      </div>

      <div className="about-cards-container">
        {/* Our Vision Card */}
        <div 
          className="about-card"
          onMouseEnter={() => handleMouseEnter('#e0f7fa')} // Light Cyan
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="card-title"><header>Our Vision</header></h3>
          <p className="card-content">
            <span className="list-item-title">Automated Entry-Exit:</span> To replace outdated, manual gatekeeping with a seamless, secure, and data-driven system.<br /><br />
            <span className="list-item-title">RFID Integration:</span> Implementing advanced RFID technology for rapid, frictionless access control.<br /><br />
            <span className="list-item-title">Real-Time Monitoring:</span> Providing instant insights into gate activity to enhance security and operational oversight.
          </p>
        </div>

        {/* Features Card */}
        <div 
          className="about-card"
          onMouseEnter={() => handleMouseEnter('#e8f5e9')} // Light Green
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="card-title"><header>Features</header></h3>
          <p className="card-content">
            <span className="list-item-title">Enhanced Security:</span> A tamper-proof digital log of all entry and exit events to protect your valuable assets.<br /><br />
            <span className="list-item-title">User Registration with Role-Based Access:</span> Securely manage who can access the factory and the system with clear user roles.<br /><br />
            <span className="list-item-title">API-Driven Architecture:</span> A robust, scalable, and secure backend that integrates seamlessly with existing systems.
          </p>
        </div>

        {/* Benefits Card */}
        <div 
          className="about-card"
          onMouseEnter={() => handleMouseEnter('#ffebee')} // Light Pink
          onMouseLeave={handleMouseLeave}
        >
          <h3 className="card-title"><header>Benefits</header></h3>
          <p className="card-content">
            <span className="list-item-title">Detailed Logging & Data Capture:</span> Meticulously records every access event for comprehensive auditing and analysis.<br /><br />
            <span className="list-item-title">User Profile Management:</span> Centralized control to update user information, manage roles, and deactivate accounts.<br /><br />
            <span className="list-item-title">Reporting and Analytics:</span> Generate custom reports to track attendance, optimize traffic flow, and ensure compliance.
          </p>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {/* Team Lead Card */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <FaUserCircle className="team-icon" />
                <div className="team-details">
                  <h3>Meghana Siddha</h3>
                  <p className="team-role">Team Lead</p>
                </div>
              </div>
              <div className="flip-card-back">
                <h3 className="team-name">Meghana Siddha</h3>
                <p className="team-about-text">About me</p>
              </div>
            </div>
          </div>

          {/* Developer Card */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <FaFemale className="team-icon" />
                <div className="team-details">
                  <h3>Kalyani Tummala</h3>
                  <p className="team-role">Developer</p>
                </div>
              </div>
              <div className="flip-card-back">
                <h3 className="team-name">Kalyani Tummala</h3>
                <p className="team-about-text">About me</p>
              </div>
            </div>
          </div>

          {/* UX/UI Designer Card */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <FaMale className="team-icon" />
                <div className="team-details">
                  <h3>Shanmukha Tellakula</h3>
                  <p className="team-role">UX/UI Designer</p>
                </div>
              </div>
              <div className="flip-card-back">
                <h3 className="team-name">Shanmukha Tellakula</h3>
                <p className="team-about-text">About me</p>
              </div>
            </div>
          </div>

          {/* Quality Assurance Card */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <FaFemale className="team-icon" />
                <div className="team-details">
                  <h3>Gowthami Korra</h3>
                  <p className="team-role">Quality Assurance</p>
                </div>
              </div>
              <div className="flip-card-back">
                <h3 className="team-name">Gowthami Korra</h3>
                <p className="team-about-text">About me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;