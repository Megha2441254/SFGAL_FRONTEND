import React from 'react';
import './LeaveRequest.css'; // Use the same CSS file for consistent styling

const HelpDesk = () => {
  return (
    <div className="leave-application">
      <header>
        <h1>Help Desk</h1>
      </header>
      
      <p className="section-description">Is this your first time? Fill out the request form below to get resolved</p>
      
      <form className="leave-form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" rows="6"></textarea>
        </div>
        <button type="submit" className="submit-btn">SUBMIT</button>
      </form>
    </div>
  );
};

export default HelpDesk;