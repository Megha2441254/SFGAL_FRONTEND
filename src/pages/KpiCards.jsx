import React from 'react';
import './AdminDashboard.css';

function KpiCards({ totalEmployees, activeGates, accessViolations, pendingTasks }) {
    return (
        <div className="admin-kpi-grid">
            <div className="admin-kpi-card admin-kpi-total">
                <h3>Total Employees</h3>
                <h2>{totalEmployees}</h2>
                <p>Registered in system</p>
            </div>
            <div className="admin-kpi-card admin-kpi-active">
                <h3>Active Gates</h3>
                <h2>{activeGates}</h2>
                <p>Gates currently online</p>
            </div>
            <div className="admin-kpi-card admin-kpi-violations">
                <h3>Violations (24h)</h3>
                <h2 style={{ color: accessViolations > 0 ? '#e74c3c' : '#2ecc71' }}>{accessViolations}</h2>
                <p>Recent failed access attempts</p>
            </div>
            <div className="admin-kpi-card admin-kpi-pending">
                <h3>Pending Tasks</h3>
                <h2>{pendingTasks}</h2>
                <p>Awaiting admin review</p>
            </div>
        </div>
    );
}

export default KpiCards;