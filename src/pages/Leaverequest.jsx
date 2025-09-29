import React, { useState } from 'react';
import './Leaverequest.css'; // New CSS file for the form

const LeaveRequest = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);

    // After 2 seconds, hide the popup and clear the form
    setTimeout(() => {
      setShowPopup(false);
      // Clear the form fields here if you want
    }, 2000);
  };

  return (
    <div className="leave-application">
      <header>
        <h1>Apply for Leave</h1>
      </header>

      <form className="leave-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="referenceNumber">Employee ID</label>
          <input type="text" id="referenceNumber" placeholder="Enter ID number" required />
        </div>

        <div className="form-group">
          <label htmlFor="leaveType">Select Leave Type</label>
          <select id="leaveType" required>
            <option value="">-- Select --</option>
            <option value="casual">Casual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="earned">Earned Leave</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="fromDate">From Date</label>
          <input type="date" id="fromDate" required />
        </div>

        <div className="form-group">
          <label htmlFor="toDate">To Date</label>
          <input type="date" id="toDate" required />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Leave</label>
          <textarea id="reason" placeholder="Enter reason for leave" required></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <p>✅ Successfully Submitted!</p>
          </div>
        </div>
      )}
    </div>
  );
};
  
export default LeaveRequest;