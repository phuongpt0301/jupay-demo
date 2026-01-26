import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ScreenType } from '../types';
import { useAppContext, selectors } from '../context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

/**
 * ProtectedRoute Component
 *
 * Handles route protection and authentication requirements.
 * Redirects unauthenticated users to login screen.
 * Uses global app state for authentication checking.
 * Waits for app initialization before making routing decisions.
 *
 * Requirements: 4.1, 4.5, 4.4
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true
}) => {
  const location = useLocation();
  const { state } = useAppContext();

  // Check initialization and authentication status from global state
  const isInitialized = selectors.isInitialized(state);
  const isAuthenticated = selectors.isAuthenticated(state);

  // Wait for app initialization before making routing decisions
  if (!isInitialized) {
    return (
      <div className="screen" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e1e5e9',
            borderTopColor: '#1a1a1a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#666', fontSize: '0.875rem' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login with the current location as state
    return <Navigate to={`/${ScreenType.LOGIN}`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;