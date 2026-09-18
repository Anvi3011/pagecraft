import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wrap any route element that requires a logged-in user.
 * Usage: <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Still checking for an existing session — avoid a flash-redirect to /login
    return <div className="page-container"><p style={{ padding: '2rem' }}>Loading...</p></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
