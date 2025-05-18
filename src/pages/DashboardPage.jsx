// ----------------------------------------------------------------------------------
// FILE: src/pages/DashboardPage.jsx
// ----------------------------------------------------------------------------------
import React, { useState, useEffect, useRef } from 'react'; // Added useRef
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjusted path
import { courseService } from '../services/courseService'; // Adjusted path
import DashboardHeader from '../components/Layout/DashboardHeader'; // Adjusted path
import DashboardFooter from '../components/Layout/DashboardFooter'; // Adjusted path
import CourseList from '../components/Course/CourseList'; // Adjusted path

function DashboardPage() {
    const { user, token, logout, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState({
        studentName: (user && typeof user.name === 'string') ? user.name : 'Student',
        enrolled: [], available: [], finished: [],
    });
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
    const [isLoadingData, setIsLoadingData] = useState(true);
    const clearMessageTimeout = useRef(null);

    const showStatusMessage = (text, type, duration = 3000) => {
        setStatusMessage({ text: String(text), type });
        if (clearMessageTimeout.current) clearTimeout(clearMessageTimeout.current);
        if (duration > 0) {
            clearMessageTimeout.current = setTimeout(() => setStatusMessage({ text: '', type: '' }), duration);
        }
    };

    useEffect(() => {
        return () => { if (clearMessageTimeout.current) clearTimeout(clearMessageTimeout.current); };
    }, []);

    const loadData = async () => {
        setIsLoadingData(true);
        try {
            const data = await courseService.fetchDashboardData(token);
            let finalName = 'Student';
            if (typeof data.student?.name === 'string' && data.student.name) finalName = data.student.name;
            else if (typeof user?.name === 'string' && user.name) finalName = user.name;
            setDashboardData({
                studentName: finalName,
                enrolled: data.enrolled || [], available: data.available || [], finished: data.finished || [],
            });
        } catch (err) {
            const errorText = (err && err.message) ? String(err.message) : 'Error loading dashboard data.';
            if (err.message === 'Unauthorized') {
                showStatusMessage('Session expired. Redirecting to login...', 'error', 0);
                await logout(); setIsAuthenticated(false); navigate('/login', { replace: true });
            } else {
                showStatusMessage(errorText, 'error');
                setDashboardData(prev => ({ ...prev, studentName: prev.studentName || 'Student', enrolled: [], available: [], finished: [] }));
            }
        } finally {
            setIsLoadingData(false);
        }
    };

    useEffect(() => {
        if (user && typeof user.name === 'string' && user.name !== dashboardData.studentName) {
            setDashboardData(prev => ({ ...prev, studentName: user.name }));
        } else if (user && typeof user.name !== 'string' && dashboardData.studentName !== 'Student' && user?.name !== undefined) {
            setDashboardData(prev => ({ ...prev, studentName: 'Student' }));
        }
        loadData();
    }, [user, token]); // Removed dashboardData.studentName from dependencies to avoid loop with user.name update

    const handleCourseAction = async (actionPromise, successMsg, actionName) => {
        showStatusMessage(`${actionName}...`, 'info', 0);
        try {
            const result = await actionPromise;
            const resultMessage = (result && typeof result.message === 'string') ? result.message : successMsg;
            showStatusMessage(resultMessage, 'success');
            loadData();
        } catch (err) {
            const errorText = (err && err.message) ? String(err.message) : `Failed to ${actionName.toLowerCase()}.`;
            showStatusMessage(errorText, 'error');
        }
    };

    const handleEnroll = (courseId) => handleCourseAction(courseService.enrollInCourse(courseId, token), 'Successfully enrolled!', 'Enrolling');
    const handleDisenroll = (courseId) => handleCourseAction(courseService.disenrollFromCourse(courseId, token), 'Successfully disenrolled!', 'Disenrolling');
    const handleMarkFinished = (courseId) => handleCourseAction(courseService.markCourseAsFinished(courseId, token), 'Course marked as finished!', 'Marking as finished');
    const handleLogout = async () => {
        showStatusMessage('Logging out...', 'info', 0); await logout(); navigate('/login');
    };

    return (
        <>
            <DashboardHeader studentName={dashboardData.studentName} onLogout={handleLogout} />
            <main className="dashboard-container">
                <CourseList title="My Enrolled Courses" courses={dashboardData.enrolled} statusType="enrolled" onDisenroll={handleDisenroll} onMarkFinished={handleMarkFinished} isLoading={isLoadingData && dashboardData.enrolled.length === 0} />
                <CourseList title="Available Courses" courses={dashboardData.available} statusType="available" onEnroll={handleEnroll} isLoading={isLoadingData && dashboardData.available.length === 0} />
                <CourseList title="My Finished Courses" courses={dashboardData.finished} statusType="finished" isLoading={isLoadingData && dashboardData.finished.length === 0} />
            </main>
            <DashboardFooter statusMessageText={statusMessage.text} statusMessageType={statusMessage.type} />
        </>
    );
}
export default DashboardPage;
