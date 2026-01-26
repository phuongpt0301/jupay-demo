import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { ScreenType } from '../types';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'app' | 'screen' | 'component';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

/**
 * ErrorBoundary Component
 * 
 * React error boundary that catches JavaScript errors anywhere in the child
 * component tree and displays a fallback UI instead of crashing the app.
 * Provides different fallback strategies based on the error level.
 * 
 * Requirements: 4.5
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: this.generateErrorId()
    };
  }

  /**
   * Generate unique error ID for tracking
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Static method called when an error occurs
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  /**
   * Called when an error occurs - log error details
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      level: this.props.level || 'component',
      timestamp: new Date().toISOString()
    });

    // Update state with error info
    this.setState({
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to error tracking service (in a real app)
    this.reportError(error, errorInfo);
  }

  /**
   * Report error to tracking service (placeholder for real implementation)
   */
  private reportError(error: Error, errorInfo: ErrorInfo) {
    // In a real app, this would send to an error tracking service
    // like Sentry, Bugsnag, or custom logging endpoint
    try {
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        errorId: this.state.errorId,
        level: this.props.level || 'component'
      };
      
      // Store in localStorage for demo purposes
      const existingErrors = JSON.parse(localStorage.getItem('jupay_error_log') || '[]');
      existingErrors.push(errorReport);
      localStorage.setItem('jupay_error_log', JSON.stringify(existingErrors.slice(-10))); // Keep last 10 errors
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  /**
   * Retry the failed component
   */
  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        errorId: this.generateErrorId()
      });
    }
  };

  /**
   * Navigate to safe location
   */
  private handleNavigateToSafety = () => {
    try {
      // Try to navigate to dashboard or login
      const isAuthenticated = localStorage.getItem('jupay_auth_token');
      const safePath = isAuthenticated ? `/${ScreenType.DASHBOARD}` : `/${ScreenType.LOGIN}`;
      window.location.href = safePath;
    } catch (navError) {
      // Last resort: reload the app
      window.location.href = '/';
    }
  };

  /**
   * Reload the entire application
   */
  private handleReloadApp = () => {
    try {
      window.location.reload();
    } catch (reloadError) {
      // Force navigation to root
      window.location.href = '/';
    }
  };

  /**
   * Get error severity based on error type and level
   */
  private getErrorSeverity(): 'low' | 'medium' | 'high' | 'critical' {
    const { error } = this.state;
    const { level } = this.props;

    if (level === 'app') return 'critical';
    if (level === 'screen') return 'high';
    
    // Analyze error type
    if (error?.name === 'ChunkLoadError' || error?.message?.includes('Loading chunk')) {
      return 'medium'; // Network/loading issues
    }
    
    if (error?.name === 'TypeError' && error?.message?.includes('Cannot read prop')) {
      return 'medium'; // Common React errors
    }
    
    return 'low'; // Default component errors
  }

  /**
   * Render fallback UI based on error level and custom fallback
   */
  private renderFallback() {
    const { fallback, level } = this.props;
    const { error, errorId } = this.state;
    const severity = this.getErrorSeverity();
    const canRetry = this.retryCount < this.maxRetries;

    // Use custom fallback if provided
    if (fallback) {
      return fallback;
    }

    // App-level error - critical failure
    if (level === 'app' || severity === 'critical') {
      return (
        <div className="error-boundary error-boundary--critical">
          <div className="error-content">
            <div className="error-icon error-icon--critical">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            
            <h1>Application Error</h1>
            <p className="error-message">
              The application has encountered a critical error and needs to restart.
            </p>
            
            <div className="error-details">
              <p><strong>Error ID:</strong> <code>{errorId}</code></p>
              <p><strong>Error:</strong> {error?.message || 'Unknown error'}</p>
            </div>

            <div className="error-actions">
              <button 
                onClick={this.handleReloadApp}
                className="btn btn-primary"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="1,4 1,10 7,10"></polyline>
                  <polyline points="23,20 23,14 17,14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
                Restart Application
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Screen-level error - high severity
    if (level === 'screen' || severity === 'high') {
      return (
        <div className="error-boundary error-boundary--screen">
          <div className="error-content">
            <div className="error-icon error-icon--warning">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            
            <h2>Screen Error</h2>
            <p className="error-message">
              This screen encountered an error and couldn't load properly.
            </p>
            
            <div className="error-actions">
              {canRetry && (
                <button 
                  onClick={this.handleRetry}
                  className="btn btn-primary"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="23,4 23,10 17,10"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"></path>
                  </svg>
                  Try Again ({this.maxRetries - this.retryCount} attempts left)
                </button>
              )}
              
              <button 
                onClick={this.handleNavigateToSafety}
                className={canRetry ? "btn btn-secondary" : "btn btn-primary"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                Go to Safe Location
              </button>
            </div>
            
            <details className="error-details">
              <summary>Error Details</summary>
              <div className="error-details-content">
                <p><strong>Error ID:</strong> <code>{errorId}</code></p>
                <p><strong>Message:</strong> {error?.message || 'Unknown error'}</p>
                <p><strong>Retry Count:</strong> {this.retryCount}/{this.maxRetries}</p>
              </div>
            </details>
          </div>
        </div>
      );
    }

    // Component-level error - low to medium severity
    return (
      <div className="error-boundary error-boundary--component">
        <div className="error-content">
          <div className="error-icon error-icon--info">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          
          <h3>Component Error</h3>
          <p className="error-message">
            A component failed to load. The rest of the app should work normally.
          </p>
          
          <div className="error-actions">
            {canRetry && (
              <button 
                onClick={this.handleRetry}
                className="btn btn-sm btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="23,4 23,10 17,10"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"></path>
                </svg>
                Retry
              </button>
            )}
          </div>
          
          <details className="error-details">
            <summary>Technical Details</summary>
            <div className="error-details-content">
              <p><strong>Error ID:</strong> <code>{errorId}</code></p>
              <p><strong>Component:</strong> {level || 'Unknown'}</p>
            </div>
          </details>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderFallback();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;