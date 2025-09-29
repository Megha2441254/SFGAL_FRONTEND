import React, { useState, useEffect } from 'react';
import '../index.css';
 
function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState(null);
  const [message, setMessage] = useState('');
 
  // Fetch all employees on mount
  useEffect(() => {
    fetch('https://localhost:7215/api/User/AllUsers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return response.json();
      })
      .then(data => setEmployees(data))
      .catch(error => console.error('Error:', error));
  }, []);
 
  // Search employee by name
  const handleSearch = () => {
    const result = employees.find(emp =>
      emp.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployee(result || null);
    setMessage('');
  };
 
  // Delete employee access logs
  const handleDelete = async () => {
    if (!filteredEmployee) return;
 
    try {
      const response = await fetch(`https://localhost:7215/api/Delete/users/employee/${filteredEmployee.employee_id}`, {
        method: 'DELETE'
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
 
  return (
    <div className="dashboard-container">
      <h1>Welcome, Admin!</h1>
      <p>This is your secure dashboard.</p>
 
      <div className="search-section">
        <input
          type="text"
          placeholder="Search employee by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
 
      {filteredEmployee ? (
        <div className="employee-details">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.R87PbOkdc695AAZ-_qrLYwHaHk?rs=1&pid=ImgDetMain"
            alt="Employee"
            className="employee-pic"
          />
          <h3>{filteredEmployee.full_name}</h3>
          <h3>Employee Details</h3>
          <p><strong>Name:</strong> {filteredEmployee.full_name}</p>
          <p><strong>Email:</strong> {filteredEmployee.email}</p>
          <p><strong>Employee ID:</strong> {filteredEmployee.employee_id}</p>
          <p><strong>Role:</strong> {filteredEmployee.role}</p>
          <p><strong>Department:</strong> {filteredEmployee.department}</p>
          <button
            onClick={handleDelete}
            style={{ backgroundColor: 'red', color: 'white', marginTop: '10px' }}
          >
            Delete Access Logs
          </button>
        </div>
      ) : (
        searchTerm && <p>No employee found with that name.</p>
      )}
 
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Dashboard;
 