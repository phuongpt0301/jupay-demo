import React, { useEffect, useState, useCallback } from 'react';
import type { LoadingStateProps } from '../types';
import './LoadingState.css';

/**
 * LoadingState Component
 * 
 * Displays a loading screen with spinner animation and configurable message.
 * Automatically completes after specified duration (default 3 seconds).
 * Blocks user interactions while active.
 * Includes error handling for loading failures and timeouts.
 * 
 * Requirements: 2.1, 2.2, 2.5, 4.5
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  duration = 3000,
  onComplete,
  onError
}) => {
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  /**
   * Handle loading timeout or other errors
   */
  const handleLoadingError = useCallback((error: string) => {
    setHasError(true);
    setErrorMessage(error);
    
    // Restore scrolling
    document.body.style.overflow = '';
    
    // Call error callback if provided
    if (onError) {
      onError(new Error(error));
    }
  }, [onError]);

  /**
   * Retry loading
   */
  const handleRetry = useCallback(() => {
    setHasError(false);
    setErrorMessage('');
    setProgress(0);
    
    // Block scrolling again
    document.body.style.overflow = 'hidden';
  }, []);

  /**
   * Cancel loading and call completion
   */
  const handleCancel = useCallback(() => {
    setHasError(false);
    document.body.style.overflow = '';
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (hasError) {
      return; // Don't start loading if there's an error
    }

    // Block scrolling and interactions
    document.body.style.overflow = 'hidden';
    
    // Set up loading timeout (longer than expected duration)
    const loadingTimeout = setTimeout(() => {
      handleLoadingError('Loading is taking longer than expected');
    }, duration + 5000); // 5 seconds grace period
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 50)); // Update every 50ms
        return Math.min(newProgress, 100);
      });
    }, 50);

    // Complete loading after specified duration
    const timer = setTimeout(() => {
      try {
        clearInterval(progressInterval);
        clearTimeout(loadingTimeout);
        // Restore scrolling
        document.body.style.overflow = '';
        onComplete();
      } catch (error) {
        handleLoadingError('Failed to complete loading');
      }
    }, duration);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTimeout);
      clearInterval(progressInterval);
      document.body.style.overflow = '';
    };
  }, [duration, onComplete, hasError, handleLoadingError]);

  // Prevent event propagation to block interactions
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Render error state
  if (hasError) {
    return (
      <div 
        className="loading-state loading-state--error"
        role="dialog"
        aria-modal="true"
        aria-label="Loading Error"
      >
        <div className="loading-content">
          {/* Error Icon */}
          <div className="loading-error-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          
          {/* Error Message */}
          <p className="loading-error-message" aria-live="assertive">
            {errorMessage}
          </p>
          
          {/* Error Actions */}
          <div className="loading-error-actions">
            <button 
              onClick={handleRetry}
              className="btn btn-primary btn-sm"
              aria-label="Retry loading"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="23,4 23,10 17,10"></polyline>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"></path>
              </svg>
              Try Again
            </button>
            
            <button 
              onClick={handleCancel}
              className="btn btn-secondary btn-sm"
              aria-label="Cancel loading"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="loading-state"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
      onTouchEnd={handleInteraction}
      role="dialog"
      aria-modal="true"
      aria-label="Loading"
    >
      <div className="loading-content">
        {/* Spinner Animation */}
        <div className="loading-spinner loading-spinner--lg" aria-hidden="true">
          <div className="loading-spinner__ring"></div>
          <div className="loading-spinner__ring"></div>
          <div className="loading-spinner__ring"></div>
        </div>
        
        {/* Loading Message */}
        <p className="loading-message" aria-live="polite">
          {message}
        </p>
        
        {/* Progress Bar */}
        <div className="loading-progress" aria-hidden="true">
          <div 
            className="loading-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress Text for Screen Readers */}
        <div className="sr-only" aria-live="polite">
          Loading progress: {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingState;