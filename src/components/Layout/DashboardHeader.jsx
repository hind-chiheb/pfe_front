// ----------------------------------------------------------------------------------
// FILE: src/components/Layout/DashboardHeader.jsx
// ----------------------------------------------------------------------------------
import React from 'react';

function DashboardHeader({ studentName, onLogout }) {
    const displayName = (typeof studentName === 'string' && studentName) ? studentName : 'Student';
    return (
        <header>
            <h1>Student Dashboard</h1>
            <p>Welcome, <span id="student-name">{displayName}</span>!</p>
            <button id="logout-button" onClick={onLogout}>Logout</button>
        </header>
    );
}
export default DashboardHeader;
