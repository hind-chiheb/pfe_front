// ----------------------------------------------------------------------------------
// FILE: src/App.jsx (This is the simplified version)
// ----------------------------------------------------------------------------------
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return "Loading application...";
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppContent() {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return "Loading Application...";
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
