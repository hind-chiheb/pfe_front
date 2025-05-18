// ----------------------------------------------------------------------------------
// FILE: src/contexts/AuthContext.jsx
// ----------------------------------------------------------------------------------
import React, { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/authService'; // Adjusted path

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('userData');
        if (currentToken) {
            setToken(currentToken);
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser && typeof parsedUser.name !== 'string' && parsedUser.name !== undefined && parsedUser.name !== null) {
                        parsedUser.name = String(parsedUser.name);
                    }
                    setUser(parsedUser);
                } catch (e) {
                    console.error("Failed to parse stored user data", e);
                    localStorage.removeItem('userData');
                }
            }
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        localStorage.setItem('authToken', data.token);
        if (data.user && typeof data.user.name !== 'string' && data.user.name !== undefined && data.user.name !== null) {
            data.user.name = String(data.user.name);
        }
        localStorage.setItem('userData', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return data.user;
    };

    const signup = async (userData) => {
        return await authService.signup(userData);
    };

    const logout = async () => {
        await authService.logout();
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = { user, token, isAuthenticated, isLoading, login, signup, logout, setIsAuthenticated };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
