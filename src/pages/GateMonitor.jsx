import React, { useState, useEffect } from 'react';

const GateMonitor = () => {
    const [rfidTag, setRfidTag] = useState('');
    const [logMessage, setLogMessage] = useState('');

    const handleScan = async (event) => {
        event.preventDefault();
        setLogMessage('Scanning...');
        try {
            const response = await fetch('https://localhost:7215/api/Gate/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rfidTag),
            });

            const data = await response.json();

            if (data.success) {
                setLogMessage(`SUCCESS: User ${data.userDetails.fullName} (${data.userDetails.employeeId}) logged ${data.userDetails.direction} at ${new Date(data.userDetails.timestamp).toLocaleString()}.`);
            } else {
                setLogMessage(`FAILED: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setLogMessage('An error occurred. Please check the backend server.');
        } finally {
            setRfidTag('');
        }
    };

    return (
        <div className="main-content">
            <div className="container dashboard-page-container">
                <h2>Gate Access Monitor</h2>
                <p>Simulate an RFID scan here.</p>
                <form onSubmit={handleScan} className="gate-form">
                    <div className="form-group">
                        <label htmlFor="rfidTag">RFID Tag ID</label>
                        <input
                            type="text"
                            id="rfidTag"
                            name="rfidTag"
                            value={rfidTag}
                            onChange={(e) => setRfidTag(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">
                        Scan Tag
                    </button>
                </form>
                {logMessage && <p className="log-message">{logMessage}</p>}
            </div>
        </div>
    );
};

export default GateMonitor;