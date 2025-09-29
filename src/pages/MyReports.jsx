import React from 'react';
import './MyReports.css';

const MyReports = () => {
  // Mock data for reports
  const reports = [
    { id: 1, title: 'Monthly Performance Review', date: '2023-10-26', status: 'Completed' },
    { id: 2, title: 'Q3 Sales Summary', date: '2023-10-15', status: 'Completed' },
    { id: 3, title: 'Project X Status Report', date: '2023-10-01', status: 'Pending' },
    { id: 4, title: 'Annual Leave Summary', date: '2023-09-30', status: 'Completed' },
  ];

  return (
    <div className="reports-container">
      <h2>
        <header>My Reports</header></h2>
      <div className="report-list">
        {reports.map((report) => (
          <div key={report.id} className="report-item">
            <div className="report-details">
              <span className="report-title">{report.title}</span>
              <span className="report-date">{report.date}</span>
            </div>
            <span className={`report-status status-${report.status.toLowerCase()}`}>
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;
