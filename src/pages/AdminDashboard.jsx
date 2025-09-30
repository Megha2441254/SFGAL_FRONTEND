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
   const [editingRfid, setEditingRfid] = useState({ employee_id: null, rfid_value: '' });
  const [rfidMessage, setRfidMessage] = useState(''); // To show success/error for the update


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
    { id: 1, user: 'Gouthami', action: 'Entered Gate A', time: '10:15 AM' },
    { id: 2, user: 'Meghana', action: 'Exited Gate B', time: '10:45 AM' },
    { id: 3, user: 'Kalyani', action: 'Entered Gate C', time: '11:00 AM' },
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

  // In Dashboard.jsx (Near your other handlers like handleSearch)

const handleUpdateRfid = async (employeeId, newRfid) => {
    // 1. Basic validation
    if (!newRfid.trim()) {
        setRfidMessage('RFID tag cannot be empty.');
        setTimeout(() => setRfidMessage(''), 3000);
        return;
    }

    // 2. API Call (Verify this URL and method against your backend)
    try {
        const response = await fetch(`https://localhost:7215/api/Rfidtag/UpdateRfid/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ RfidTag: newRfid }),
        });

        if (!response.ok) {
            // Read the error message from the body if available
            const errorResult = await response.json(); 
            throw new Error(errorResult.message || 'Failed to update RFID tag.');
        }
        
        // 3. Success: Update local state (Optimistic UI update)
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.employee_id === employeeId ? { ...emp, rfid_tag: newRfid } : emp
            )
        );

        setRfidMessage(`✅ UID for ${employeeId} updated successfully.`);
        setEditingRfid({ employee_id: null, rfid_value: '' }); // Exit edit mode
        setTimeout(() => setRfidMessage(''), 3000);

    } catch (error) {
        console.error('Error updating RFID:', error);
        setRfidMessage(`❌ Error updating UID/RfidTag: ${error.message}`);
        setTimeout(() => setRfidMessage(''), 5000);
    }
};
  // ... (Lines 118-120: before the old handleDelete)

// New, reusable function to PERMANENTLY delete a user
const handleDeleteUser = async (employeeId, fullName) => {
    // IMPORTANT: Assuming your backend API for full user deletion is: 
    // https://localhost:7215/api/User/DeleteUser/{employeeId}
    const deleteApiUrl = `https://localhost:7215/api/Delete/users/employee/${employeeId}`;
    
    if (!window.confirm(`PERMANENTLY delete user ${fullName} (ID: ${employeeId}) from the database? This action cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(deleteApiUrl, {
            method: 'DELETE',
        });
        
        const result = await response.json();

        if (response.ok) { // Check for HTTP 200/204 success status
            // 1. Update UI: Remove the user from the local state
            setEmployees(prevEmployees => 
                prevEmployees.filter(emp => emp.employee_id !== employeeId)
            );
            
            // 2. Clear selected employee details card if the deleted user was displayed
            if (filteredEmployee && filteredEmployee.employee_id === employeeId) {
                setFilteredEmployee(null);
                setSearchTerm('');
            }

            setMessage(`✅ User ${fullName} permanently deleted successfully.`);
        } else {
            // Handle API errors (e.g., 404 Not Found, 400 Bad Request)
            setMessage(result.message || `❌ Failed to delete user ${employeeId}.`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        setMessage('❌ Error connecting to the server for user deletion.');
    }
};
// ... (after the new handleDeleteUser)


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

  // ... (Lines 378 - 500 in your AdminDashboard.jsx)

  const renderRightColumnContent = () => {
    switch (activeView) {
      case 'employees':
        return (
          <>
            <h2 className="admin-content-title">Employee Management</h2>

            <input
              type="text"
              placeholder="Search by Name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-table-search-input"
            />
            <p className="admin-results-count">{filteredEmployeesList.length} Employees Found</p>
            {/* Display status message for RFID updates or general success/error */}
            {rfidMessage && <p className="admin-system-message">{rfidMessage}</p>}
            {message && <p className="admin-system-message">{message}</p>} {/* Added general message display */}


            <table className="admin-employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>UID/RfidTag</th> 
                  <th>Actions</th>
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
                    
                    {/* ---------------------------------------------------------------- */}
                    {/* 💡 RESTORED: UID/RfidTag COLUMN LOGIC (The Fix) 💡 */}
                    {/* ---------------------------------------------------------------- */}
                    <td>
                      {editingRfid.employee_id === emp.employee_id ? (
                        // Edit Mode: Show input field and Save button
                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                          <input
                            type="text"
                            value={editingRfid.rfid_value}
                            // Assuming you have setEditingRfid function in your state
                            onChange={(e) => setEditingRfid(prev => ({ ...prev, rfid_value: e.target.value }))}
                            placeholder="Enter New UID"
                            style={{ padding: '5px', width: '150px', border: '1px solid #ddd', borderRadius: '4px' }}
                          />
                          <button
                            // Assuming you have handleUpdateRfid function defined
                            onClick={() => handleUpdateRfid(emp.employee_id, editingRfid.rfid_value)}
                            className="admin-action-btn1" 
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        // Display Mode: Show current tag and Add/Edit button
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ minWidth: '100px', fontWeight: emp.rfid_tag ? 'normal' : 'bold', color: emp.rfid_tag ? '#333' : '#e74c3c' }}>
                            {/* Display rfid_tag (assuming your employee object now includes it), or 'Not Set' */}
                            {emp.rfid_tag || 'Not Set'} 
                          </span>
                          <button
                            onClick={() => {
                              // Set the employee ID and the current tag value to activate edit mode
                              setEditingRfid({ employee_id: emp.employee_id, rfid_value: emp.rfid_tag || '' });
                              setRfidMessage(''); // Clear any previous message
                            }}
                            className="admin-action-btn2">
                            {emp.rfid_tag ? 'Edit' : 'Add'}
                          </button>
                        </div>
                      )}
                    </td>
                    {/* ---------------------------------------------------------------- */}

                    {/* Action Button (Delete User) */}
                    <td>
                        <button
                              onClick={() => handleUpdateRfid(emp.employee_id, editingRfid.rfid_value)}
                              className="admin-action-btn3" >
                              Delete User
                          </button>
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
