import React, { useState, useEffect, useMemo, useRef } from 'react';
import AdminNavigation from './AdminNavigation';
import KpiCards from './KpiCards';
//import '../styles/Dashboard.css';
//import '../styles/AccessControlSettings.css';
//import '../styles/ReportsAnalytics.css';
import Chart from 'chart.js/auto';
import "../index.css";


function Dashboard({ onLogout }) {
  const [activeView, setActiveView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState(null);
  const [message, setMessage] = useState('');

  const [gateAccessEnabled, setGateAccessEnabled] = useState(true);
  const [openingHours, setOpeningHours] = useState('06:00 - 22:00');
  const [authorizedUsers, setAuthorizedUsers] = useState(['John Doe', 'Jane Smith']);
  const [newUser, setNewUser] = useState('');

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const chartData = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Gate Entries',
        data: [120, 190, 300, 250, 220, 310],
        backgroundColor: '#4caf50',
      },
    ],
  }), []);

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Entered Gate A', time: '10:15 AM' },
    { id: 2, user: 'Jane Smith', action: 'Exited Gate B', time: '10:45 AM' },
    { id: 3, user: 'Mark Lee', action: 'Entered Gate C', time: '11:00 AM' },
  ];

  const kpiData = {
    totalEmployees: employees.length,
    activeGates: 12,
    accessViolations: 3,
    pendingTasks: 4,
  };

  useEffect(() => {
    fetch('https://localhost:7215/api/User/AllUsers')
      .then(response => response.json())
      .then(data => {
        const mockedData = data.map((emp, index) => ({
          ...emp,
          access_status: index % 5 === 0 ? 'suspended' : 'active',
          department: emp.department || 'Production',
          role: emp.role || 'Operator',
        }));
        setEmployees(mockedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredEmployeesList = useMemo(() => {
    if (!searchTerm) return employees;
    const lowerCaseSearch = searchTerm.toLowerCase();
    return employees.filter(emp =>
      (emp.full_name && emp.full_name.toLowerCase().includes(lowerCaseSearch)) ||
      (emp.employee_id && emp.employee_id.toString().includes(lowerCaseSearch))
    );
  }, [employees, searchTerm]);

  const handleSearch = () => {
    const result = employees.find(emp =>
      emp.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployee(result || null);
    setMessage('');
  };

  const handleDelete = async () => {
    if (!filteredEmployee) return;
    if (!window.confirm(`Delete logs for ${filteredEmployee.employee_id}?`)) return;

    try {
      const response = await fetch(`https://localhost:7215/api/Delete/users/employee/${filteredEmployee.employee_id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setMessage('✅ Access logs deleted successfully.');
        setFilteredEmployee(null);
        setSearchTerm('');
      } else {
        setMessage(result.message || '❌ Failed to delete access logs.');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      setMessage('❌ Error deleting access logs.');
    }
  };

  useEffect(() => {
    if (activeView === 'reports' && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: { responsive: true },
      });
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [activeView, chartData]);

  const handleAddUser = () => {
    if (newUser.trim() && !authorizedUsers.includes(newUser)) {
      setAuthorizedUsers([...authorizedUsers, newUser]);
      setNewUser('');
    }
  };

  const handleRemoveUser = (user) => {
    setAuthorizedUsers(authorizedUsers.filter(u => u !== user));
  };

  const renderRightColumnContent = () => {
    switch (activeView) {
      case 'employees':
        return (
          <>
            

            <input
              type="text"
              placeholder="Search by Name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-table-search-input"
            />
            <p className="admin-results-count">{filteredEmployeesList.length} Employees Found</p>

            <table className="admin-employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                 
                </tr>
              </thead>
              <tbody>
                {filteredEmployeesList.map(emp => (
                  <tr key={emp.employee_id}>
                    <td>{emp.employee_id}</td>
                    <td>{emp.full_name}</td>
                    <td>{emp.department}</td>
                    <td>
                      <span className={`admin-status-tag admin-status-${emp.access_status}`}>
                        {emp.access_status}
                      </span>
                    </td>
                    <td>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );

      case 'access':
        return (
          <div className="access-control-container">
            <h2>Access Control & Gate Settings</h2>

            <div className="setting">
              <label>Gate Access:</label>
              <button onClick={() => setGateAccessEnabled(!gateAccessEnabled)} className={gateAccessEnabled ? 'enabled' : 'disabled'}>
                {gateAccessEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="setting">
              <label>Gate Opening Hours:</label>
              <select value={openingHours} onChange={(e) => setOpeningHours(e.target.value)}>
                <option>06:00 - 22:00</option>
                <option>07:00 - 21:00</option>
                <option>24/7</option>
              </select>
            </div>

            <div className="setting">
              <label>Authorized Personnel:</label>
              <ul className="user-list">
                {authorizedUsers.map((user, index) => (
                  <li key={index}>
                    {user}
                    <button onClick={() => handleRemoveUser(user)}>Remove</button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Add new user"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
              <button onClick={handleAddUser}>Add User</button>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="reports-container">
            <h2>Reports & Analytics</h2>

            <div className="summary-cards">
              <div className="card">
                <h3>Total Entries</h3>
                <p>1,390</p>
              </div>
              <div className="card">
                <h3>Unauthorized Attempts</h3>
                <p>12</p>
              </div>
              <div className="card">
                <h3>Peak Hour</h3>
                <p>9:00 AM - 10:00 AM</p>
              </div>
            </div>

            <div className="chart-section">
              <h3>Monthly Gate Entries</h3>
              <canvas ref={chartRef} />
            </div>

            <div className="activity-section">
              <h3>Recent Activity</h3>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((item) => (
                    <tr key={item.id}>
                      <td>{item.user}</td>
                      <td>{item.action}</td>
                      <td>{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'overview':
      default:
        return (
          <>
            <h2 className="admin-content-title">Dashboard Overview</h2>
            <KpiCards {...kpiData} />
            <div className="admin-search-summary-section">
              
              {filteredEmployee ? (
                <div className="admin-employee-details-card">
                  <div className="admin-details-text">
                    <h3>{filteredEmployee.full_name}</h3>
                    <p><strong>ID:</strong> {filteredEmployee.employee_id}</p>
                    <p><strong>Department:</strong> {filteredEmployee.department}</p>
                    <button onClick={handleDelete} className="admin-delete-logs-btn">
                      Delete Access Logs
                    </button>
                  </div>
                </div>
              ) : (
                searchTerm && <p className="admin-no-results">No employee found with that name.</p>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="employee-main-content">
      <div className="dashboard-split-screen">
        <div className="dashboard-column dashboard-left-column">
          <AdminNavigation
            setActiveView={setActiveView}
            activeView={activeView}
            onLogout={onLogout}
          />
        </div>
        <div className="dashboard-column dashboard-right-column">
          {message && <p className="admin-system-message">{message}</p>}
          {renderRightColumnContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
