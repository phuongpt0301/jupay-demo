import React from 'react';
import type { ScreenContainerProps } from '../types';
import { useNavigationWithLoading } from '../hooks';
import LoadingState from './LoadingState';
import './ScreenContainer.css';

/**
 * ScreenContainer Component
 * 
 * Mobile-optimized container layout for all app screens.
 * Provides consistent viewport, navigation, loading state integration, and error handling.
 * 
 * Features:
 * - Mobile-first responsive design
 * - Optional screen titles and back navigation
 * - Touch-friendly interface elements (44px minimum touch targets)
 * - Loading state integration with interaction blocking
 * - Navigation error display and handling
 * - Consistent mobile viewport and layout
 * 
 * Requirements: 1.2, 1.5, 4.2, 4.5
 */
const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  title,
  showBackButton = false,
  onBack,
  className = ''
}) => {
  const { isLoading, goBack, navigationError } = useNavigationWithLoading();

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  /**
   * Prevent interactions during loading
   */
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (isLoading) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div 
      className={`screen-container ${className} ${isLoading ? 'loading' : ''}`}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Navigation Error Display */}
      {navigationError && (
        <div className="navigation-error" role="alert">
          <div className="error-content">
            <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span className="error-message">{navigationError}</span>
          </div>
        </div>
      )}

      {/* Header with title and back navigation */}
      {(title || showBackButton) && (
        <header className="screen-header">
          {showBackButton && (
            <button
              className="back-button"
              onClick={handleBack}
              disabled={isLoading}
              aria-label="Go back"
              type="button"
            >
              <svg 
                className="back-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 18l-6-6 6-6" 
                />
              </svg>
              <span className="back-text">Back</span>
            </button>
          )}
          
          {title && (
            <h1 className="screen-title">
              {title}
            </h1>
          )}
        </header>
      )}

      {/* Main content area */}
      <main className="screen-content">
        {children}
      </main>

      {/* Loading overlay */}
      {isLoading && (
        <LoadingState
          message="Loading..."
          onComplete={() => {
            // Loading completion is handled by the navigation hook
          }}
        />
      )}
    </div>
  );
};

export default ScreenContainer;