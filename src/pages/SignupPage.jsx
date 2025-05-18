// ----------------------------------------------------------------------------------
// FILE: src/pages/SignupPage.jsx
// ----------------------------------------------------------------------------------
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjusted path
import AuthPageLayout from '../components/Auth/AuthPageLayout'; // Adjusted path
import Message from '../components/UI/Message'; // Adjusted path

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        if (!name || !email || !password || !confirmPassword) {
            setMessage({ text: 'Please fill in all fields.', type: 'error' }); return;
        }
        if (password !== confirmPassword) {
            setMessage({ text: 'Passwords do not match.', type: 'error' }); return;
        }
        if (password.length < 6) {
            setMessage({ text: 'Password must be at least 6 characters long.', type: 'error' }); return;
        }
        setIsSubmitting(true);
        try {
            const response = await signup({ name, email, password });
            const successText = (response && typeof response.message === 'string') ? response.message : 'Signup successful! Redirecting to login...';
            setMessage({ text: successText, type: 'success' });
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errorText = (err && err.message) ? String(err.message) : 'An error occurred during signup.';
            setMessage({ text: errorText, type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthPageLayout title="Create Your Account" containerClass="signup-container">
            <form onSubmit={handleSubmit} id="signup-form">
                {/* Form groups... */}
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={isSubmitting} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isSubmitting} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" disabled={isSubmitting} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength="6" disabled={isSubmitting} />
                </div>
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing up...' : 'Sign Up'}</button>
                {message.text && <Message text={message.text} type={message.type} id="message-area" />}
                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </AuthPageLayout>
    );
}
export default SignupPage;
