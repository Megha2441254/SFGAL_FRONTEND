import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();
  console.log(emailOrId);
  console.log(password);
  console.log( role);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://localhost:7215/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_id: emailOrId,
          password: password,
          role_select: role,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("the data is" , data);
        if (data.success) {
          if (data.user && data.user.role) {
            
            localStorage.setItem('user', JSON.stringify({
            ...data.user,
            emailOrId,
            password,
            role
          }));
            
            if (role === 'admin'&& (emailOrId==="admin1@gatesense.com" || emailOrId==="admin2@gatesense.com")) {
              console.log(data.user.role)
              navigate('/admin');
              alert('Login successful! Redirecting...');
            } else if(role === 'employee' && emailOrId!=="admin1@gatesense.com" && role !== 'admin'){
              navigate('/employee');
              alert('Login successful! Redirecting...');
            }
            else{
              alert('Invalid role or email. Please try again.');
            }
          } else {
            alert('Login successful, but user data is incomplete. Please check the backend response.');
          }
        } else {
          alert('Login failed: ' + data.message);
        }
      } else {
        const errorData = await response.json();
        alert('Login failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email_id" className="form-label">Email</label>
            <input
              type="text"
              id="email_id"
              name="email_id"
              placeholder="Enter your email"
              value={emailOrId}
              onChange={(e) => setEmailOrId(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role_select" className="form-label">Login As</label>
            <select
              id="role_select"
              name="role_select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;