// ----------------------------------------------------------------------------------
// FILE: src/services/courseService.js
// ----------------------------------------------------------------------------------
// import { API_BASE_URL } from './apiConfig'; // Uncomment if using apiConfig.js

const COURSE_API_BASE_URL = '/api'; // Or use API_BASE_URL from apiConfig.js

export const courseService = {
    fetchDashboardData: async (token) => {
        const response = await fetch(`${COURSE_API_BASE_URL}/dashboard`, {
            headers: { /* 'Authorization': `Bearer ${token}` */ }
        });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) throw new Error('Unauthorized');
            const errorText = await response.text();
            throw new Error(`Failed to fetch dashboard data: ${response.status} ${errorText}`);
        }
        return response.json();
    },

    enrollInCourse: async (courseId, token) => {
        const response = await fetch(`${COURSE_API_BASE_URL}/enroll`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', /* 'Authorization': `Bearer ${token}` */ },
            body: JSON.stringify({ courseId }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Enrollment failed (Status: ${response.status})`);
        }
        return response.json();
    },

    disenrollFromCourse: async (courseId, token) => {
        const response = await fetch(`${COURSE_API_BASE_URL}/disenroll`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', /* 'Authorization': `Bearer ${token}` */ },
            body: JSON.stringify({ courseId }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Disenrollment failed (Status: ${response.status})`);
        }
        return response.json();
    },

    markCourseAsFinished: async (courseId, token) => {
        const response = await fetch(`${COURSE_API_BASE_URL}/course/finish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', /* 'Authorization': `Bearer ${token}` */ },
            body: JSON.stringify({ courseId }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to mark as finished (Status: ${response.status})`);
        }
        return response.json();
    },
};
