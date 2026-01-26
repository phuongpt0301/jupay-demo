import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ScreenContainer from './ScreenContainer';

// Mock the navigation hook
const mockNavigateWithLoading = vi.fn();
const mockGoBack = vi.fn();
const mockIsLoading = vi.fn(() => false);

vi.mock('../hooks', () => ({
  useNavigationWithLoading: () => ({
    navigateWithLoading: mockNavigateWithLoading,
    isLoading: mockIsLoading(),
    goBack: mockGoBack,
    currentPath: '/test',
    isNavigationBlocked: false,
    getNavigationHistory: () => [],
    clearNavigationHistory: vi.fn(),
    cancelNavigation: vi.fn(),
    cleanup: vi.fn()
  })
}));

// Mock LoadingState component
vi.mock('./LoadingState', () => ({
  default: () => (
    <div data-testid="loading-state">Loading...</div>
  )
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ScreenContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders children content correctly', () => {
      renderWithRouter(
        <ScreenContainer>
          <div data-testid="test-content">Test Content</div>
        </ScreenContainer>
      );

      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom className when provided', () => {
      renderWithRouter(
        <ScreenContainer className="custom-class">
          <div>Content</div>
        </ScreenContainer>
      );

      const container = screen.getByRole('main').parentElement;
      expect(container).toHaveClass('screen-container', 'custom-class');
    });

    it('has proper mobile-optimized structure', () => {
      renderWithRouter(
        <ScreenContainer>
          <div>Content</div>
        </ScreenContainer>
      );

      const container = screen.getByRole('main').parentElement;
      expect(container).toHaveClass('screen-container');
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toHaveClass('screen-content');
    });
  });

  describe('Title Display', () => {
    it('displays title when provided', () => {
      renderWithRouter(
        <ScreenContainer title="Test Screen">
          <div>Content</div>
        </ScreenContainer>
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('Test Screen')).toBeInTheDocument();
    });

    it('does not render header when no title or back button', () => {
      renderWithRouter(
        <ScreenContainer>
          <div>Content</div>
        </ScreenContainer>
      );

      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('renders header with title only', () => {
      renderWithRouter(
        <ScreenContainer title="Test Title">
          <div>Content</div>
        </ScreenContainer>
      );

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.queryByLabelText('Go back')).not.toBeInTheDocument();
    });
  });

  describe('Back Navigation', () => {
    it('displays back button when showBackButton is true', () => {
      renderWithRouter(
        <ScreenContainer showBackButton>
          <div>Content</div>
        </ScreenContainer>
      );

      const backButton = screen.getByLabelText('Go back');
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveClass('back-button');
    });

    it('calls goBack when back button is clicked and no onBack provided', () => {
      renderWithRouter(
        <ScreenContainer showBackButton>
          <div>Content</div>
        </ScreenContainer>
      );

      const backButton = screen.getByLabelText('Go back');
      fireEvent.click(backButton);

      expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it('calls custom onBack when provided', () => {
      const mockOnBack = vi.fn();
      
      renderWithRouter(
        <ScreenContainer showBackButton onBack={mockOnBack}>
          <div>Content</div>
        </ScreenContainer>
      );

      const backButton = screen.getByLabelText('Go back');
      fireEvent.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
      expect(mockGoBack).not.toHaveBeenCalled();
    });

    it('renders both title and back button when both provided', () => {
      renderWithRouter(
        <ScreenContainer title="Test Screen" showBackButton>
          <div>Content</div>
        </ScreenContainer>
      );

      expect(screen.getByText('Test Screen')).toBeInTheDocument();
      expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    });
  });

  describe('Touch Target Accessibility', () => {
    it('back button meets minimum touch target size', () => {
      renderWithRouter(
        <ScreenContainer showBackButton>
          <div>Content</div>
        </ScreenContainer>
      );

      const backButton = screen.getByLabelText('Go back');
      
      // Check that the class is applied for touch target requirements
      expect(backButton).toHaveClass('back-button');
    });

    it('back button has proper accessibility attributes', () => {
      renderWithRouter(
        <ScreenContainer showBackButton>
          <div>Content</div>
        </ScreenContainer>
      );

      const backButton = screen.getByLabelText('Go back');
      expect(backButton).toHaveAttribute('type', 'button');
      expect(backButton).toHaveAttribute('aria-label', 'Go back');
    });
  });

  describe('Loading State Integration', () => {
    it('shows loading state when isLoading is true', () => {
      mockIsLoading.mockReturnValue(true);
      
      renderWithRouter(
        <ScreenContainer>
          <div>Content</div>
        </ScreenContainer>
      );

      expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    });

    it('applies loading class when loading', () => {
      mockIsLoading.mockReturnValue(true);
      
      renderWithRouter(
        <ScreenContainer>
          <div>Content</div>
        </ScreenContainer>
      );

      const container = screen.getByRole('main').parentElement;
      expect(container).toHaveClass('loading');
    });

    it('disables back button during loading', () => {
      mockIsLoading.mockReturnValue(true);
      
      renderWithRouter(
        <ScreenContainer showBackButton>
          <div>Content</div>
        </ScreenContainer>
      );

      const backButton = screen.getByLabelText('Go back');
      expect(backButton).toBeDisabled();
    });

    it('prevents interactions during loading', () => {
      mockIsLoading.mockReturnValue(true);
      
      renderWithRouter(
        <ScreenContainer>
          <div data-testid="content">Content</div>
        </ScreenContainer>
      );

      const container = screen.getByRole('main').parentElement;
      
      // Simulate click event
      const clickEvent = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
      const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation');
      
      container?.dispatchEvent(clickEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  describe('Mobile Viewport Consistency', () => {
    it('maintains mobile-first structure', () => {
      renderWithRouter(
        <ScreenContainer title="Mobile Test">
          <div>Mobile Content</div>
        </ScreenContainer>
      );

      const container = screen.getByRole('main').parentElement;
      expect(container).toHaveClass('screen-container');
      
      // Check that header exists for mobile navigation
      expect(screen.getByRole('banner')).toBeInTheDocument();
      
      // Check that main content area exists
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('provides proper semantic structure', () => {
      renderWithRouter(
        <ScreenContainer title="Semantic Test" showBackButton>
          <div>Content</div>
        </ScreenContainer>
      );

      // Header should be a banner landmark
      expect(screen.getByRole('banner')).toBeInTheDocument();
      
      // Main content should be a main landmark
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      // Title should be a proper heading
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderWithRouter(
        <ScreenContainer title="Empty Test">
          {null}
        </ScreenContainer>
      );

      expect(screen.getByText('Empty Test')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('handles multiple children correctly', () => {
      renderWithRouter(
        <ScreenContainer>
          <div data-testid="child1">Child 1</div>
          <div data-testid="child2">Child 2</div>
        </ScreenContainer>
      );

      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
    });

    it('handles long titles appropriately', () => {
      const longTitle = 'This is a very long title that might wrap on mobile devices';
      
      renderWithRouter(
        <ScreenContainer title={longTitle}>
          <div>Content</div>
        </ScreenContainer>
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
  });
});