import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { ScreenType } from '../types';
import './LoadingErrorBoundary.css';

interface LoadingErrorBoundaryProps {
  children: ReactNode;
  onLoadingError?: (error: Error) => void;
  fallbackMessage?: string;
  retryAction?: () => void;
}

interface LoadingErrorBoundaryState {
  hasLoadingError: boolean;
  error: Error | null;
  retryCount: number;
}

/**
 * LoadingErrorBoundary Component
 * 
 * Specialized error boundary for handling loading-related failures.
 * Provides specific fallback UI for loading timeouts, network errors,
 * and other loading-related issues.
 * 
 * Requirements: 4.5
 */
class LoadingErrorBoundary extends Component<LoadingErrorBoundaryProps, LoadingErrorBoundaryState> {
  private maxRetries = 3;
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(props: LoadingErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasLoadingError: false,
      error: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<LoadingErrorBoundaryState> {
    // Check if this is a loading-related error
    const isLoadingError = 
      error.name === 'ChunkLoadError' ||
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('NetworkError') ||
      error.message?.includes('timeout');

    if (isLoadingError) {
      return {
        hasLoadingError: true,
        error
      };
    }

    // Let other error boundaries handle non-loading errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('LoadingErrorBoundary caught a loading error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      retryCount: this.state.retryCount,
      timestamp: new Date().toISOString()
    });

    if (this.props.onLoadingError) {
      this.props.onLoadingError(error);
    }

    // Log loading error for analytics
    this.logLoadingError(error, errorInfo);
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  /**
   * Log loading error for debugging and analytics
   */
  private logLoadingError(error: Error, errorInfo: ErrorInfo) {
    try {
      const loadingErrorReport = {
        type: 'loading_error',
        message: error.message,
        name: error.name,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        retryCount: this.state.retryCount,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        connectionType: (navigator as any).connection?.effectiveType || 'unknown'
      };
      
      // Store in localStorage for demo purposes
      const existingErrors = JSON.parse(localStorage.getItem('jupay_loading_errors') || '[]');
      existingErrors.push(loadingErrorReport);
      localStorage.setItem('jupay_loading_errors', JSON.stringify(existingErrors.slice(-5))); // Keep last 5 errors
    } catch (reportingError) {
      console.error('Failed to log loading error:', reportingError);
    }
  }

  /**
   * Retry loading with exponential backoff
   */
  private handleRetry = () => {
    if (this.state.retryCount >= this.maxRetries) {
      return;
    }

    const retryDelay = Math.min(1000 * Math.pow(2, this.state.retryCount), 5000); // Max 5 seconds

    this.setState(prevState => ({
      retryCount: prevState.retryCount + 1
    }));

    // Show loading state during retry
    this.retryTimeout = setTimeout(() => {
      this.setState({
        hasLoadingError: false,
        error: null
      });

      // Call custom retry action if provided
      if (this.props.retryAction) {
        this.props.retryAction();
      }
    }, retryDelay);
  };

  /**
   * Navigate to a safe location
   */
  private handleNavigateToSafety = () => {
    try {
      // Clear any loading states
      localStorage.removeItem('jupay_loading_state');
      
      // Navigate to dashboard or login based on auth status
      const isAuthenticated = localStorage.getItem('jupay_auth_token');
      const safePath = isAuthenticated ? `/${ScreenType.DASHBOARD}` : `/${ScreenType.LOGIN}`;
      window.location.href = safePath;
    } catch (navError) {
      // Last resort: reload the app
      window.location.href = '/';
    }
  };

  /**
   * Reload the page to clear any loading issues
   */
  private handleReloadPage = () => {
    try {
      // Clear loading-related storage
      localStorage.removeItem('jupay_loading_state');
      sessionStorage.clear();
      
      window.location.reload();
    } catch (reloadError) {
      window.location.href = '/';
    }
  };

  /**
   * Get error type for better messaging
   */
  private getErrorType(): 'network' | 'chunk' | 'timeout' | 'generic' {
    const { error } = this.state;
    
    if (!error) return 'generic';
    
    if (error.name === 'ChunkLoadError' || error.message?.includes('Loading chunk')) {
      return 'chunk';
    }
    
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      return 'network';
    }
    
    if (error.message?.includes('timeout')) {
      return 'timeout';
    }
    
    return 'generic';
  }

  /**
   * Get user-friendly error message
   */
  private getErrorMessage(): string {
    const errorType = this.getErrorType();
    const { fallbackMessage } = this.props;
    
    if (fallbackMessage) {
      return fallbackMessage;
    }
    
    switch (errorType) {
      case 'network':
        return 'Unable to connect to the server. Please check your internet connection.';
      case 'chunk':
        return 'Failed to load application resources. This might be due to a network issue.';
      case 'timeout':
        return 'The request took too long to complete. Please try again.';
      default:
        return 'Something went wrong while loading. Please try again.';
    }
  }

  /**
   * Get retry button text based on retry count
   */
  private getRetryButtonText(): string {
    const { retryCount } = this.state;
    const remainingRetries = this.maxRetries - retryCount;
    
    if (remainingRetries <= 0) {
      return 'Max retries reached';
    }
    
    return `Try Again (${remainingRetries} attempts left)`;
  }

  render() {
    if (this.state.hasLoadingError) {
      const { retryCount } = this.state;
      const canRetry = retryCount < this.maxRetries;
      const errorType = this.getErrorType();
      const errorMessage = this.getErrorMessage();

      return (
        <div className="loading-error-boundary">
          <div className="loading-error-content">
            {/* Error Icon */}
            <div className="loading-error-icon">
              {errorType === 'network' ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6"></path>
                </svg>
              ) : errorType === 'chunk' ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
            </div>

            {/* Error Message */}
            <h2>Loading Failed</h2>
            <p className="loading-error-message">
              {errorMessage}
            </p>

            {/* Retry Information */}
            {retryCount > 0 && (
              <div className="retry-info">
                <p>Retry attempt: {retryCount}/{this.maxRetries}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="loading-error-actions">
              {canRetry && (
                <button 
                  onClick={this.handleRetry}
                  className="btn btn-primary"
                  disabled={this.retryTimeout !== null}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="23,4 23,10 17,10"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"></path>
                  </svg>
                  {this.getRetryButtonText()}
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
              
              <button 
                onClick={this.handleReloadPage}
                className="btn btn-outline"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="1,4 1,10 7,10"></polyline>
                  <polyline points="23,20 23,14 17,14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
                Reload Page
              </button>
            </div>

            {/* Technical Details */}
            <details className="loading-error-details">
              <summary>Technical Details</summary>
              <div className="loading-error-details-content">
                <p><strong>Error Type:</strong> {errorType}</p>
                <p><strong>Error Name:</strong> {this.state.error?.name || 'Unknown'}</p>
                <p><strong>Retry Count:</strong> {retryCount}/{this.maxRetries}</p>
                <p><strong>Connection:</strong> {(navigator as any).connection?.effectiveType || 'Unknown'}</p>
              </div>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default LoadingErrorBoundary;