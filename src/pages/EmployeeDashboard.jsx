import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaUserCircle,
    FaHeadset,
    FaFileAlt,
    FaCalendarAlt,
    FaTasks
} from 'react-icons/fa';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import './Dashboard.css'; // Import the new CSS file
import LeaveRequest from './Leaverequest'; // Import the LeaveRequest component
import HelpDesk from './Helpdesk'; // Import the HelpDesk component
import MyReports from './MyReports';
import MyTasks from './MyTasks';
import Login from './Login';

// Sample data for the graph
const sampleEmployeeData = {
    "name": "John Doe",
    "age": 30,
    "number": "9876543210",
    "entry": "09:00 AM",
    "exit": "05:00 PM",
    "picture": "https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    "dailyLogs": [
        { "date": "Apr 01", "entry": 9.0, "exit": 17.0, "hours": 8.0 },
        { "date": "Apr 02", "entry": 8.75, "exit": 16.5, "hours": 7.75 },
        { "date": "Apr 03", "entry": 9.25, "exit": 17.75, "hours": 8.5 },
        { "date": "Apr 04", "entry": 9.0, "exit": 18.0, "hours": 9.0 },
        { "date": "Apr 05", "entry": 8.5, "exit": 17.0, "hours": 8.5 },
        { "date": "Apr 06", "entry": 9.0, "exit": 17.5, "hours": 8.5 },
        { "date": "Apr 07", "entry": 9.1, "exit": 17.67, "hours": 8.57 },
        { "date": "Apr 08", "entry": 8.83, "exit": 16.83, "hours": 8.0 },
        { "date": "Apr 09", "entry": 9.08, "exit": 17.33, "hours": 8.25 },
        { "date": "Apr 10", "entry": 9.0, "exit": 17.0, "hours": 8.0 }
    ]
};

const EmployeeDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeContent, setActiveContent] = useState('recentActivity');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user2'));
        
        if (user && user.role === 'employee') {
            setUserData(user);
            setLoading(false); // No need to fetch logs, so we can set loading to false directly
        } else {
            navigate('/login');
        }
    }, [navigate]);

    if (!userData || loading) {
        return <div>Loading dashboard...</div>;
    }

    const handleNavClick = (contentId) => {
        setActiveContent(contentId);
    };

    const renderRightColumnContent = () => {
        switch (activeContent) {
            case 'leaveRequests':
                return <LeaveRequest />;
            case 'myTasks':
                return <MyTasks />;
            case 'myReports':
                return <MyReports />;
            case 'helpDesk':
                return <HelpDesk />;
            case 'recentActivity':
            default:
                // The graph now uses the sample data
                return (
                    <div>
                        <div className="graph-section">
                            <h3>Daily Gate Access Activity</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={sampleEmployeeData.dailyLogs}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="entry" stroke="#8884d8" name="Entry Time (hr)" />
                                    <Line type="monotone" dataKey="exit" stroke="#82ca9d" name="Exit Time (hr)" />
                                    <Line type="monotone" dataKey="hours" stroke="#ff7300" name="Working Hours" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="employee-main-content">
            <div className="dashboard-split-screen">
                {/* Left Column */}
                <div className="dashboard-column dashboard-left-column">
                    <div className="profile-card">
                        <img src="https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0" className='user-pic' alt="User profile" />
                        <div className='profile-details'>
                            <p><b>Name:</b> {userData.fullName}</p>
                            <p className="profile-detail"><b>Emp ID:</b> {userData.employeeId}</p>
                            <p><b>Department:</b> {userData.department}</p>
                            <p className="profile-detail"><b>Role:</b>{userData.role}</p>
                        </div> 
                    </div>
                    <div className="dashboard-nav-card">
                        <div className="nav-item" onClick={() => handleNavClick('leaveRequests')}><FaCalendarAlt className="nav-icon" /><span><b>Leave Requests</b></span></div>
                        <div className="nav-item" onClick={() => handleNavClick('myTasks')}><FaTasks className="nav-icon" /><span><b>My Tasks</b></span></div>
                        <div className="nav-item" onClick={() => handleNavClick('myReports')}><FaFileAlt className="nav-icon" /><span><b>My Reports</b></span></div>
                        <div className="nav-item" onClick={() => handleNavClick('helpDesk')}><FaHeadset className="nav-icon" /><span><b>Help Desk</b></span></div>
                    </div>
                </div>

               
                

                {/* Right Column */}
                <div className="dashboard-column dashboard-right-column">
                    {renderRightColumnContent()}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;