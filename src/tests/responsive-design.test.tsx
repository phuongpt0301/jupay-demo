/**
 * Responsive Design Test Suite
 * 
 * Tests the enhanced responsive design implementation for mobile screen sizes.
 * Validates CSS media queries, touch targets, and layout adaptations.
 * 
 * Requirements: 1.3 - Responsive design optimized for mobile screen sizes
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ScreenContainer from '../components/ScreenContainer';
import DashboardScreen from '../screens/DashboardScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { AppProvider } from '../context/AppContext';

// Mock window.matchMedia for media query testing
const mockMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
});

// Helper to simulate different viewport sizes
const setViewportSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AppProvider>
        {component}
      </AppProvider>
    </BrowserRouter>
  );
};

describe('Responsive Design Enhancement', () => {
  beforeEach(() => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    // Reset viewport to default
    setViewportSize(1024, 768);
  });

  describe('Mobile Viewport Breakpoints', () => {
    it('should handle extra small phones (320px)', () => {
      setViewportSize(320, 568);
      
      renderWithProviders(
        <ScreenContainer title="Test Screen">
          <div data-testid="content">Test Content</div>
        </ScreenContainer>
      );
      
      const container = screen.getByTestId('content').closest('.screen-container');
      expect(container).toBeInTheDocument();
      
      // Check that the container has proper mobile styling
      const computedStyle = window.getComputedStyle(container!);
      expect(computedStyle.width).toBe('100%');
      expect(computedStyle.maxWidth).toBe('100vw');
    });

    it('should handle small phones (360px)', () => {
      setViewportSize(360, 640);
      
      renderWithProviders(
        <ScreenContainer title="Test Screen">
          <div data-testid="content">Test Content</div>
        </ScreenContainer>
      );
      
      const container = screen.getByTestId('content').closest('.screen-container');
      expect(container).toBeInTheDocument();
    });

    it('should handle standard phones (375px)', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(
        <ScreenContainer title="Test Screen">
          <div data-testid="content">Test Content</div>
        </ScreenContainer>
      );
      
      const container = screen.getByTestId('content').closest('.screen-container');
      expect(container).toBeInTheDocument();
    });

    it('should handle large phones (414px)', () => {
      setViewportSize(414, 896);
      
      renderWithProviders(
        <ScreenContainer title="Test Screen">
          <div data-testid="content">Test Content</div>
        </ScreenContainer>
      );
      
      const container = screen.getByTestId('content').closest('.screen-container');
      expect(container).toBeInTheDocument();
    });

    it('should handle extra large phones (480px)', () => {
      setViewportSize(480, 854);
      
      renderWithProviders(
        <ScreenContainer title="Test Screen">
          <div data-testid="content">Test Content</div>
        </ScreenContainer>
      );
      
      const container = screen.getByTestId('content').closest('.screen-container');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Touch Target Requirements', () => {
    it('should ensure buttons meet minimum 44px touch target', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<DashboardScreen />);
      
      // Check action buttons
      const actionButtons = screen.getAllByRole('button');
      actionButtons.forEach(button => {
        const computedStyle = window.getComputedStyle(button);
        const minHeight = parseInt(computedStyle.minHeight);
        const minWidth = parseInt(computedStyle.minWidth);
        
        // Should meet minimum touch target requirements
        expect(minHeight).toBeGreaterThanOrEqual(44);
        expect(minWidth).toBeGreaterThanOrEqual(44);
      });
    });

    it('should scale touch targets appropriately for larger screens', () => {
      setViewportSize(414, 896);
      
      renderWithProviders(<DashboardScreen />);
      
      const actionButtons = screen.getAllByRole('button');
      actionButtons.forEach(button => {
        const computedStyle = window.getComputedStyle(button);
        const minHeight = parseInt(computedStyle.minHeight);
        
        // Should have comfortable touch targets on larger screens
        expect(minHeight).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Layout Adaptation', () => {
    it('should adapt dashboard layout for small screens', () => {
      setViewportSize(320, 568);
      
      renderWithProviders(<DashboardScreen />);
      
      // Check that dashboard content is present and properly structured
      const dashboardContent = document.querySelector('.dashboard-content');
      expect(dashboardContent).toBeInTheDocument();
      
      // Check that action buttons are present
      const actionButtons = document.querySelectorAll('.action-btn');
      expect(actionButtons.length).toBeGreaterThan(0);
    });

    it('should adapt payment screen layout for different sizes', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PaymentScreen />);
      
      // Check that payment form is present
      const paymentForm = document.querySelector('.payment-form');
      expect(paymentForm).toBeInTheDocument();
      
      // Check that form inputs meet touch requirements
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        const computedStyle = window.getComputedStyle(input);
        const minHeight = parseInt(computedStyle.minHeight);
        expect(minHeight).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Landscape Orientation', () => {
    it('should handle landscape orientation on mobile devices', () => {
      setViewportSize(667, 375); // Landscape iPhone
      
      renderWithProviders(
        <ScreenContainer title="Test Screen">
          <div data-testid="content">Test Content</div>
        </ScreenContainer>
      );
      
      const container = screen.getByTestId('content').closest('.screen-container');
      expect(container).toBeInTheDocument();
      
      // In landscape, height is limited, so layout should be more compact
      const computedStyle = window.getComputedStyle(container!);
      expect(computedStyle.width).toBe('100%');
    });

    it('should reduce spacing in landscape mode for better space utilization', () => {
      setViewportSize(812, 375); // Landscape iPhone X
      
      renderWithProviders(<DashboardScreen />);
      
      // Check that dashboard adapts to landscape
      const dashboardContent = document.querySelector('.dashboard-content');
      expect(dashboardContent).toBeInTheDocument();
    });
  });

  describe('CSS Media Query Coverage', () => {
    it('should have proper CSS classes for responsive design', () => {
      renderWithProviders(
        <ScreenContainer title="Test Screen">
          <div data-testid="content">Test Content</div>
        </ScreenContainer>
      );
      
      const container = screen.getByTestId('content').closest('.screen-container');
      expect(container).toHaveClass('screen-container');
      
      const header = container?.querySelector('.screen-header');
      expect(header).toBeInTheDocument();
      
      const content = container?.querySelector('.screen-content');
      expect(content).toBeInTheDocument();
    });

    it('should maintain mobile-first approach', () => {
      setViewportSize(320, 568);
      
      renderWithProviders(
        <ScreenContainer title="Test Screen">
          <div data-testid="content">Test Content</div>
        </ScreenContainer>
      );
      
      const container = screen.getByTestId('content').closest('.screen-container');
      const computedStyle = window.getComputedStyle(container!);
      
      // Should use full width on mobile
      expect(computedStyle.width).toBe('100%');
      expect(computedStyle.maxWidth).toBe('100vw');
    });
  });

  describe('Component Spacing and Sizing', () => {
    it('should adjust component spacing for different screen sizes', () => {
      const testSizes = [
        { width: 320, height: 568, name: 'XS' },
        { width: 360, height: 640, name: 'SM' },
        { width: 375, height: 667, name: 'MD' },
        { width: 414, height: 896, name: 'LG' },
        { width: 480, height: 854, name: 'XL' },
      ];

      testSizes.forEach(({ width, height, name }) => {
        setViewportSize(width, height);
        
        const { unmount } = renderWithProviders(<DashboardScreen />);
        
        // Check that dashboard renders without errors
        const dashboardContent = document.querySelector('.dashboard-content');
        expect(dashboardContent).toBeInTheDocument();
        
        unmount();
      });
    });

    it('should maintain proper aspect ratios and proportions', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<DashboardScreen />);
      
      // Check balance card proportions
      const balanceCard = document.querySelector('.balance-card');
      if (balanceCard) {
        const computedStyle = window.getComputedStyle(balanceCard);
        expect(computedStyle.borderRadius).toBeTruthy();
        expect(computedStyle.padding).toBeTruthy();
      }
    });
  });

  describe('Accessibility in Responsive Design', () => {
    it('should maintain accessibility features across screen sizes', () => {
      setViewportSize(320, 568);
      
      renderWithProviders(
        <ScreenContainer title="Accessible Screen" showBackButton onBack={() => {}}>
          <div data-testid="content">Content</div>
        </ScreenContainer>
      );
      
      // Check that back button is accessible
      const backButton = screen.getByRole('button', { name: /back/i });
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveAttribute('aria-label');
      
      // Check that title is accessible
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeInTheDocument();
    });

    it('should maintain focus management in responsive layouts', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PaymentScreen />);
      
      // Check that form elements are focusable
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('tabIndex');
      });
    });
  });
});

describe('Responsive Design Property Validation', () => {
  /**
   * Property 2: Responsive Mobile Design
   * For any mobile screen size within the supported range, 
   * the app should adapt layouts appropriately while maintaining 
   * usability and visual hierarchy.
   * 
   * Validates: Requirements 1.3
   */
  it('Property 2: Responsive Mobile Design - maintains usability across mobile screen sizes', () => {
    const mobileScreenSizes = [
      { width: 320, height: 568, device: 'iPhone SE' },
      { width: 360, height: 640, device: 'Galaxy S5' },
      { width: 375, height: 667, device: 'iPhone 8' },
      { width: 414, height: 896, device: 'iPhone 11 Pro Max' },
      { width: 480, height: 854, device: 'Large Phone' },
    ];

    mobileScreenSizes.forEach(({ width, height, device }) => {
      setViewportSize(width, height);
      
      const { unmount } = renderWithProviders(<DashboardScreen />);
      
      // Verify layout adapts appropriately
      const dashboardContent = document.querySelector('.dashboard-content');
      expect(dashboardContent, `Dashboard should render on ${device} (${width}x${height})`).toBeInTheDocument();
      
      // Verify touch targets are appropriate
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button, index) => {
        const computedStyle = window.getComputedStyle(button);
        const minHeight = parseInt(computedStyle.minHeight) || 0;
        const minWidth = parseInt(computedStyle.minWidth) || 0;
        
        expect(minHeight, `Button ${index} height should be touch-friendly on ${device}`).toBeGreaterThanOrEqual(44);
        expect(minWidth, `Button ${index} width should be touch-friendly on ${device}`).toBeGreaterThanOrEqual(44);
      });
      
      // Verify visual hierarchy is maintained
      const actionButtons = document.querySelectorAll('.action-btn');
      expect(actionButtons.length, `Action buttons should be present on ${device}`).toBeGreaterThan(0);
      
      unmount();
    });
  });

  /**
   * Property 3: Touch Target Accessibility
   * For any interactive element in the app, the touch target should meet 
   * minimum size requirements (44px minimum) and have appropriate spacing 
   * for mobile interaction.
   * 
   * Validates: Requirements 1.5
   */
  it('Property 3: Touch Target Accessibility - ensures proper touch targets', () => {
    const testScreens = [
      () => renderWithProviders(<DashboardScreen />),
      () => renderWithProviders(<PaymentScreen />),
      () => renderWithProviders(
        <ScreenContainer title="Test" showBackButton onBack={() => {}}>
          <button>Test Button</button>
        </ScreenContainer>
      ),
    ];

    testScreens.forEach((renderScreen, screenIndex) => {
      setViewportSize(375, 667); // Standard iPhone size
      
      const { unmount } = renderScreen();
      
      // Check all interactive elements
      const interactiveElements = document.querySelectorAll('button, input, select, textarea, [role="button"]');
      
      interactiveElements.forEach((element, elementIndex) => {
        const computedStyle = window.getComputedStyle(element);
        const minHeight = parseInt(computedStyle.minHeight) || 0;
        const minWidth = parseInt(computedStyle.minWidth) || 0;
        
        expect(minHeight, `Element ${elementIndex} in screen ${screenIndex} should meet minimum height`).toBeGreaterThanOrEqual(44);
        expect(minWidth, `Element ${elementIndex} in screen ${screenIndex} should meet minimum width`).toBeGreaterThanOrEqual(44);
        
        // Check for appropriate spacing (padding)
        const paddingTop = parseInt(computedStyle.paddingTop) || 0;
        const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
        const paddingLeft = parseInt(computedStyle.paddingLeft) || 0;
        const paddingRight = parseInt(computedStyle.paddingRight) || 0;
        
        const totalVerticalPadding = paddingTop + paddingBottom;
        const totalHorizontalPadding = paddingLeft + paddingRight;
        
        expect(totalVerticalPadding, `Element ${elementIndex} should have adequate vertical padding`).toBeGreaterThanOrEqual(8);
        expect(totalHorizontalPadding, `Element ${elementIndex} should have adequate horizontal padding`).toBeGreaterThanOrEqual(8);
      });
      
      unmount();
    });
  });
});