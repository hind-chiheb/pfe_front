// ----------------------------------------------------------------------------------
// FILE: src/services/authService.js
// ----------------------------------------------------------------------------------
// import { API_BASE_URL } from './apiConfig'; // Uncomment if using apiConfig.js

const AUTH_API_BASE_URL = '/api'; // Or use API_BASE_URL from apiConfig.js

export const authService = {
    login: async (credentials) => {
        const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Login failed (Status: ${response.status})` }));
            throw new Error(errorData.message || `Login failed. Status: ${response.status}`);
        }
        return response.json();
    },

    signup: async (userData) => {
        const response = await fetch(`${AUTH_API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Signup failed (Status: ${response.status})` }));
            throw new Error(errorData.message || `Signup failed. Status: ${response.status}`);
        }
        return response.json();
    },

    logout: async () => {
        try {
            await fetch(`${AUTH_API_BASE_URL}/logout`, { method: 'POST' });
        } catch (error) {
            console.warn('Logout API call failed, proceeding with client-side logout:', error);
        }
    }
};