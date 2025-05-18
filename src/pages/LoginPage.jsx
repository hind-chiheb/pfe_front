// ----------------------------------------------------------------------------------
// FILE: src/pages/LoginPage.jsx
// ----------------------------------------------------------------------------------
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjusted path
import AuthPageLayout from '../components/Auth/AuthPageLayout'; // Adjusted path
import Message from '../components/UI/Message'; // Adjusted path

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setIsSubmitting(true);
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            const errorMessage = (err && err.message) ? String(err.message) : 'An error occurred during login.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthPageLayout title="Student Portal Login" containerClass="login-container">
            <form onSubmit={handleSubmit} id="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isSubmitting} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isSubmitting} />
                </div>
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
                {error && <Message text={error} type="error" id="error-message" />}
                <div className="signup-link">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </form>
        </AuthPageLayout>
    );
}
export default LoginPage;