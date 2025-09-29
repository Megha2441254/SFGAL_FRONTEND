// src/components/DetailedAttendanceGraph.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// This is a new component for the daily log cards at the bottom
const DailyLogCard = ({ date, entry, exit }) => {
    return (
        <div className="daily-log-card">
            <p className="log-date">{date}</p>
            <div className="log-times">
                <p>Entry: <span>{entry}</span></p>
                <p>Exit: <span>{exit}</span></p>
            </div>
            <button className="topup-button">Click here to Apply TopUp</button>
        </div>
    );
};

const DetailedAttendanceGraph = ({ accessLogs }) => {
    const chartData = {
        labels: accessLogs.map(log => log.date),
        datasets: [
            {
                data: accessLogs.map(log => log.status === 'present' ? 1 : 0),
                backgroundColor: accessLogs.map(log => log.status === 'present' ? '#007BFF' : '#DC3545'),
                barPercentage: 0.6,
                categoryPercentage: 0.6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                display: false,
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    const sampleDailyLogs = [
        { date: 'Sun, 14 Sep', entry: '09:00 AM', exit: '06:00 PM' },
        { date: 'Mon, 15 Sep', entry: '09:00 AM', exit: '06:00 PM' },
        { date: 'Tue, 16 Sep', entry: '09:00 AM', exit: '06:00 PM' },
        { date: 'Wed, 17 Sep', entry: '09:00 AM', exit: '06:00 PM' },
    ];

    return (
        <div className="detailed-graph-container">
            <div className="graph-header">
                <div className="month-selector">
                    <FaChevronLeft />
                    <span>September 2025</span>
                    <FaChevronRight />
                </div>
                <div className="averages">
                    <div>
                        <p>Month Avg.</p>
                        <p className="avg-time">10h 02m</p>
                    </div>
                    <div>
                        <p>Year Avg.</p>
                        <p className="avg-time">10h 05m</p>
                    </div>
                </div>
            </div>
            <div className="main-graph-area">
                <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="daily-log-section">
                <h3>Week Avg. <span className="avg-time">10h 07m</span></h3>
                <div className="daily-log-cards">
                    {sampleDailyLogs.map((log, index) => (
                        <DailyLogCard key={index} date={log.date} entry={log.entry} exit={log.exit} />
                    ))}
                    <div className="daily-log-card">
                        <FaChevronRight className="arrow-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedAttendanceGraph;