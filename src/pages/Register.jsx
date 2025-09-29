import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('employee');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://localhost:7215/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: fullName,
                    employee_id: employeeId,
                    email: email,
                    password: password,
                    department: department,
                    role: role
                }),
            });

            const data = await response.json();

            if (data.success) {
                const userData = {
                    fullName: fullName,
                    employeeId: employeeId,
                    email: email,
                    department: department,
                    role: role,
                };
                localStorage.setItem('user2', JSON.stringify(userData));
                console.log("the registered user data is", userData);

                alert('Registration successful! You can now log in.');
                navigate('/login');
            } else {
                alert('Registration failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className="main-content">
            <div className="login-container2">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="full_name">Full Name</label>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="employee_id">Employee ID</label>
                        <input
                            type="text"
                            id="employee_id"
                            name="employee_id"
                            placeholder="Enter your employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <select
                            id="department"
                            name="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select your department</option>
                            <option value="Quality Assurance">Quality Assurance</option>
                            <option value="Sales and Marketing">Sales and Marketing</option>
                            <option value="Quality Control">Quality Control</option>
                            <option value="Production">Production</option>
                            <option value="Finance and Accounting">Finance and Accounting</option>
                            <option value="Human Resources">Human Resources</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="employee"
                                    checked={role === 'employee'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Employee
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={role === 'admin'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Admin
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;