import { AppProvider } from './context';
import AppRouter from './router/AppRouter';
import { ErrorBoundary } from './components';
import './App.css';

/**
 * Main App Component
 * 
 * Root component that sets up the React Router configuration
 * and provides the main application structure with global state management.
 * Includes app-level error boundary for graceful error handling.
 * 
 * Requirements: 6.1, 6.2, 4.4, 6.4, 4.5
 */
function App() {
  /**
   * Handle app-level errors
   */
  const handleAppError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('App-level error occurred:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // In a real app, this would report to an error tracking service
    // For demo purposes, we'll store it locally
    try {
      const errorReport = {
        type: 'app_error',
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      const existingErrors = JSON.parse(localStorage.getItem('jupay_app_errors') || '[]');
      existingErrors.push(errorReport);
      localStorage.setItem('jupay_app_errors', JSON.stringify(existingErrors.slice(-3))); // Keep last 3 errors
    } catch (reportingError) {
      console.error('Failed to report app error:', reportingError);
    }
  };

  return (
    <ErrorBoundary 
      level="app" 
      onError={handleAppError}
    >
      <AppProvider>
        <div className="app">
          <div className="app-mobile-container">
            <AppRouter />
          </div>
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
