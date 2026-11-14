import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    // Wait until Laravel session verification finishes.
    if (loading) {
        return <p>Loading...</p>;
    }

    // Redirect unauthenticated participants to login.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Allow authenticated participants to proceed.
    return <Outlet />;
}

export default ProtectedRoute;
