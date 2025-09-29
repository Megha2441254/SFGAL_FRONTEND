import React from 'react';
import { FaUsers, FaLock, FaChartLine, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import './AdminDashboard.css'; 

function AdminNavigation({ setActiveView, activeView, onLogout }) {
    const navItems = [
        { id: 'overview', label: 'Dashboard Overview', icon: FaTachometerAlt },
        { id: 'employees', label: 'Employee Management', icon: FaUsers },
        { id: 'access', label: 'Access Control', icon: FaLock },
        { id: 'reports', label: 'Reports & Analytics', icon: FaChartLine },
    ];

    return (
        <div className="admin-nav-wrapper">
            {/* Admin Profile/Role Card */}
            <div className="admin-profile-card">
                <img 
                    src="https://placehold.co/120x120/3f51b5/ffffff?text=ADMIN" 
                    className='admin-user-pic' 
                    alt="Admin profile" 
                />
                <div className='admin-profile-details'>
                    <p><b>Name:</b> Administrator</p>
                    <p><b>Role:</b> Super Admin</p>
                </div> 
            </div>

            {/* Navigation Buttons */}
            <div className="admin-nav-card">
                {navItems.map(item => (
                    <div
                        key={item.id}
                        className={`admin-nav-item ${activeView === item.id ? 'admin-nav-item-active' : ''}`}
                        onClick={() => setActiveView(item.id)}
                    >
                        <item.icon className="admin-nav-icon" />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Logout Button */}
            
        </div>
    );
}

export default AdminNavigation;