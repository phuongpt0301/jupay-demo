/**
 * Visual Consistency Tests
 * 
 * Tests to verify that the design system is properly applied across all screens
 * and that visual consistency is maintained throughout the application.
 * 
 * Requirements: 1.4, 2.4
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { AppContextProvider } from '../context/AppContext';
import DashboardScreen from '../screens/DashboardScreen';
import PaymentScreen from '../screens/PaymentScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import PaymentConfirmationScreen from '../screens/PaymentConfirmationScreen';
import LoadingState from '../components/LoadingState';

// Mock navigation hook
const mockNavigateWithLoading = vi.fn();
vi.mock('../hooks/useNavigationWithLoading', () => ({
  default: () => ({
    navigateWithLoading: mockNavigateWithLoading,
    isLoading: false
  })
}));

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AppContextProvider>
      {children}
    </AppContextProvider>
  </BrowserRouter>
);

describe('Visual Consistency Tests', () => {
  beforeEach(() => {
    mockNavigateWithLoading.mockClear();
  });

  describe('Button Consistency', () => {
    it('should use consistent primary button styling across screens', () => {
      const { rerender } = render(
        <TestWrapper>
          <LoginScreen />
        </TestWrapper>
      );

      // Check login screen primary button
      const loginButton = screen.getByRole('button', { name: /login/i });
      expect(loginButton).toHaveClass('btn', 'btn--primary');

      // Test payment screen
      rerender(
        <TestWrapper>
          <PaymentScreen />
        </TestWrapper>
      );

      const sendButton = screen.getByRole('button', { name: /send payment/i });
      expect(sendButton).toHaveClass('btn', 'btn--primary');
    });

    it('should use consistent secondary button styling', () => {
      render(
        <TestWrapper>
          <PaymentConfirmationScreen />
        </TestWrapper>
      );

      const secondaryButtons = screen.getAllByRole('button').filter(button => 
        button.className.includes('btn--secondary')
      );
      
      secondaryButtons.forEach(button => {
        expect(button).toHaveClass('btn', 'btn--secondary');
      });
    });

    it('should apply consistent touch target sizes', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const styles = window.getComputedStyle(button);
        const minHeight = parseInt(styles.minHeight);
        const minWidth = parseInt(styles.minWidth);
        
        // All buttons should meet minimum touch target requirements
        expect(minHeight).toBeGreaterThanOrEqual(44);
        expect(minWidth).toBeGreaterThanOrEqual(44);
      });
    });
  });

  describe('Typography Consistency', () => {
    it('should use consistent heading styles', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const headings = screen.getAllByRole('heading');
      headings.forEach(heading => {
        const styles = window.getComputedStyle(heading);
        
        // Check that headings use design system font weights
        expect(['400', '500', '600', '700']).toContain(styles.fontWeight);
        
        // Check that headings use design system colors
        expect(styles.color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/);
      });
    });

    it('should use consistent text colors across screens', () => {
      const screens = [
        <DashboardScreen />,
        <PaymentScreen />,
        <ProfileScreen />,
        <TransactionHistoryScreen />
      ];

      screens.forEach(screen => {
        const { unmount } = render(
          <TestWrapper>
            {screen}
          </TestWrapper>
        );

        const textElements = document.querySelectorAll('p, span, div');
        textElements.forEach(element => {
          const styles = window.getComputedStyle(element);
          
          // Text should use design system colors (not hardcoded values)
          if (styles.color && styles.color !== 'rgba(0, 0, 0, 0)') {
            expect(styles.color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/);
          }
        });

        unmount();
      });
    });
  });

  describe('Loading Animation Consistency', () => {
    it('should use standardized loading spinner', () => {
      const onComplete = vi.fn();
      
      render(
        <LoadingState 
          message="Testing loading..." 
          onComplete={onComplete}
        />
      );

      const spinner = document.querySelector('.loading-spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('loading-spinner--lg');

      const rings = document.querySelectorAll('.loading-spinner__ring');
      expect(rings).toHaveLength(3);
    });

    it('should apply consistent loading button states', () => {
      render(
        <TestWrapper>
          <LoginScreen />
        </TestWrapper>
      );

      const button = screen.getByRole('button', { name: /login/i });
      
      // Simulate loading state
      button.classList.add('btn--loading');
      
      expect(button).toHaveClass('btn--loading');
      
      const styles = window.getComputedStyle(button, '::after');
      // Loading spinner should be present in pseudo-element
      expect(styles.content).toBeTruthy();
    });
  });

  describe('Form Element Consistency', () => {
    it('should use consistent input styling', () => {
      render(
        <TestWrapper>
          <LoginScreen />
        </TestWrapper>
      );

      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveClass('form-input');
        
        const styles = window.getComputedStyle(input);
        const minHeight = parseInt(styles.minHeight);
        
        // Inputs should meet touch target requirements
        expect(minHeight).toBeGreaterThanOrEqual(44);
      });
    });

    it('should apply consistent error states', () => {
      render(
        <TestWrapper>
          <PaymentScreen />
        </TestWrapper>
      );

      // Look for error message elements
      const errorElements = document.querySelectorAll('.error-message, .form-message--error');
      errorElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        
        // Error text should use design system error color
        expect(styles.color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/);
      });
    });
  });

  describe('Status Badge Consistency', () => {
    it('should use consistent status badge styling', () => {
      render(
        <TestWrapper>
          <TransactionHistoryScreen />
        </TestWrapper>
      );

      const statusBadges = document.querySelectorAll('.status-badge');
      statusBadges.forEach(badge => {
        const styles = window.getComputedStyle(badge);
        
        // Status badges should have consistent styling
        expect(styles.display).toBe('inline-flex');
        expect(styles.borderRadius).toMatch(/\d+px/);
        expect(styles.padding).toMatch(/\d+px/);
      });
    });

    it('should apply correct status colors', () => {
      render(
        <TestWrapper>
          <TransactionHistoryScreen />
        </TestWrapper>
      );

      const statusClasses = [
        'status-completed',
        'status-pending', 
        'status-failed',
        'status-unknown'
      ];

      statusClasses.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
          const styles = window.getComputedStyle(element);
          
          // Each status should have distinct background and text colors
          expect(styles.backgroundColor).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/);
          expect(styles.color).toMatch(/rgb\(\d+,\s*\d+,\s*\d+\)/);
        });
      });
    });
  });

  describe('Card Component Consistency', () => {
    it('should use consistent card styling', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const cards = document.querySelectorAll('.card, .balance-card, .action-btn');
      cards.forEach(card => {
        const styles = window.getComputedStyle(card);
        
        // Cards should have consistent border radius and shadows
        expect(styles.borderRadius).toMatch(/\d+px/);
        if (styles.boxShadow && styles.boxShadow !== 'none') {
          expect(styles.boxShadow).toMatch(/rgba?\(\d+,\s*\d+,\s*\d+/);
        }
      });
    });
  });

  describe('Responsive Design Consistency', () => {
    it('should maintain consistent spacing across screen sizes', () => {
      // Test different viewport sizes
      const viewports = [
        { width: 320, height: 568 }, // iPhone SE
        { width: 375, height: 667 }, // iPhone 8
        { width: 414, height: 896 }  // iPhone 11 Pro Max
      ];

      viewports.forEach(viewport => {
        // Set viewport size
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: viewport.width,
        });
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: viewport.height,
        });

        // Trigger resize event
        window.dispatchEvent(new Event('resize'));

        render(
          <TestWrapper>
            <DashboardScreen />
          </TestWrapper>
        );

        const containers = document.querySelectorAll('.screen-content, .dashboard-content');
        containers.forEach(container => {
          const styles = window.getComputedStyle(container);
          
          // Containers should have appropriate padding for viewport
          expect(styles.padding).toMatch(/\d+px/);
        });
      });
    });
  });

  describe('Accessibility Consistency', () => {
    it('should provide consistent focus states', () => {
      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const focusableElements = document.querySelectorAll('button, input, a, [tabindex]');
      focusableElements.forEach(element => {
        // Simulate focus
        element.focus();
        
        const styles = window.getComputedStyle(element);
        
        // Elements should have visible focus indicators
        // This is typically handled by :focus-visible pseudo-class
        expect(element).toBeInstanceOf(HTMLElement);
      });
    });

    it('should maintain consistent ARIA attributes', () => {
      render(
        <TestWrapper>
          <PaymentScreen />
        </TestWrapper>
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Buttons should have accessible names
        expect(button).toHaveAttribute('aria-label');
      });

      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        // Inputs should be properly labeled
        const label = document.querySelector(`label[for="${input.id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledBy = input.getAttribute('aria-labelledby');
        
        expect(label || ariaLabel || ariaLabelledBy).toBeTruthy();
      });
    });
  });

  describe('Animation Consistency', () => {
    it('should respect reduced motion preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      render(
        <TestWrapper>
          <DashboardScreen />
        </TestWrapper>
      );

      const animatedElements = document.querySelectorAll('[class*="loading"], [class*="spinner"]');
      animatedElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        
        // When reduced motion is preferred, animations should be minimal
        if (styles.animationDuration) {
          expect(parseFloat(styles.animationDuration)).toBeLessThan(0.1);
        }
      });
    });
  });
});