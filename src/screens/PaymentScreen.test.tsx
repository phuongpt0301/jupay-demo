import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import PaymentScreen from './PaymentScreen';
import { demoDataService } from '../services/demoDataService';

// Mock the navigation hook
jest.mock('../hooks/useNavigationWithLoading', () => ({
  __esModule: true,
  default: () => ({
    navigateWithLoading: jest.fn(),
    isLoading: false,
    currentPath: '/payment',
    goBack: jest.fn(),
    isNavigationBlocked: false,
    getNavigationHistory: jest.fn(() => []),
    clearNavigationHistory: jest.fn(),
    cancelNavigation: jest.fn(),
    cleanup: jest.fn()
  })
}));

// Mock the demo data service
jest.mock('../services/demoDataService', () => ({
  demoDataService: {
    getDemoRecipients: jest.fn(() => ['John Doe', 'Jane Smith', 'Bob Johnson']),
    processPayment: jest.fn(),
    getDemoUser: jest.fn(() => ({
      id: 'test-user',
      username: 'testuser',
      displayName: 'Test User',
      email: 'test@example.com',
      phoneNumber: '+1234567890',
      accountBalance: 1000,
      currency: 'USD'
    })),
    getDemoTransactions: jest.fn(() => []),
    getDemoPaymentMethods: jest.fn(() => [
      {
        id: 'pm_001',
        type: 'bank_account',
        displayName: 'Chase Checking',
        lastFourDigits: '4521',
        isDefault: true
      },
      {
        id: 'pm_002',
        type: 'card',
        displayName: 'Visa Credit Card',
        lastFourDigits: '8934',
        isDefault: false
      }
    ])
  }
}));

/**
 * Test wrapper component that provides necessary context
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AppProvider>
      {children}
    </AppProvider>
  </BrowserRouter>
);

describe('PaymentScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders payment form with all required fields', () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    // Check for form fields
    expect(screen.getByLabelText(/recipient name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/payment amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/payment description/i)).toBeInTheDocument();
    expect(screen.getByText(/payment method/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send payment/i })).toBeInTheDocument();
  });

  it('shows recipient suggestions when typing', async () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    const recipientInput = screen.getByLabelText(/recipient name/i);
    
    // Type in recipient field
    fireEvent.change(recipientInput, { target: { value: 'John' } });
    
    // Should show suggestions
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /send payment/i });
    
    // Try to submit empty form
    fireEvent.click(submitButton);
    
    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/recipient is required/i)).toBeInTheDocument();
      expect(screen.getByText(/amount is required/i)).toBeInTheDocument();
    });
  });

  it('validates amount input correctly', async () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    const amountInput = screen.getByLabelText(/payment amount/i);
    const submitButton = screen.getByRole('button', { name: /send payment/i });
    
    // Test invalid amount
    fireEvent.change(amountInput, { target: { value: 'invalid' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid amount/i)).toBeInTheDocument();
    });
    
    // Test amount exceeding balance
    fireEvent.change(amountInput, { target: { value: '2000' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/insufficient balance/i)).toBeInTheDocument();
    });
  });

  it('allows payment method selection', () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    // Should show payment methods
    expect(screen.getByText(/chase checking/i)).toBeInTheDocument();
    expect(screen.getByText(/visa credit card/i)).toBeInTheDocument();
    
    // Click on a payment method
    const visaCard = screen.getByText(/visa credit card/i).closest('button');
    if (visaCard) {
      fireEvent.click(visaCard);
      expect(visaCard).toHaveClass('selected');
    }
  });

  it('shows payment summary when amount is entered', () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    const amountInput = screen.getByLabelText(/payment amount/i);
    const recipientInput = screen.getByLabelText(/recipient name/i);
    
    // Enter amount and recipient
    fireEvent.change(amountInput, { target: { value: '100' } });
    fireEvent.change(recipientInput, { target: { value: 'John Doe' } });
    
    // Should show payment summary
    expect(screen.getByText(/payment summary/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100\.00/)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  it('handles successful payment submission', async () => {
    // Mock successful payment
    (demoDataService.processPayment as jest.Mock).mockResolvedValue({
      transactionId: 'txn_123',
      amount: 100,
      currency: 'USD',
      recipient: 'John Doe',
      timestamp: new Date(),
      status: 'success',
      message: 'Payment successful'
    });

    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    // Fill out form
    const recipientInput = screen.getByLabelText(/recipient name/i);
    const amountInput = screen.getByLabelText(/payment amount/i);
    const submitButton = screen.getByRole('button', { name: /send payment/i });
    
    fireEvent.change(recipientInput, { target: { value: 'John Doe' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    
    // Submit form
    fireEvent.click(submitButton);
    
    // Should call processPayment
    await waitFor(() => {
      expect(demoDataService.processPayment).toHaveBeenCalledWith({
        recipient: 'John Doe',
        amount: 100,
        currency: 'USD',
        description: 'Payment to John Doe',
        paymentMethod: expect.objectContaining({
          id: 'pm_001',
          displayName: 'Chase Checking'
        })
      });
    });
  });

  it('handles payment failure', async () => {
    // Mock failed payment
    (demoDataService.processPayment as jest.Mock).mockResolvedValue({
      transactionId: 'txn_123',
      amount: 100,
      currency: 'USD',
      recipient: 'John Doe',
      timestamp: new Date(),
      status: 'failed',
      message: 'Payment failed'
    });

    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    // Fill out form
    const recipientInput = screen.getByLabelText(/recipient name/i);
    const amountInput = screen.getByLabelText(/payment amount/i);
    const submitButton = screen.getByRole('button', { name: /send payment/i });
    
    fireEvent.change(recipientInput, { target: { value: 'John Doe' } });
    fireEvent.change(amountInput, { target: { value: '100' } });
    
    // Submit form
    fireEvent.click(submitButton);
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/payment failed/i)).toBeInTheDocument();
    });
  });

  it('formats amount input correctly', () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    const amountInput = screen.getByLabelText(/payment amount/i);
    
    // Test numeric input
    fireEvent.change(amountInput, { target: { value: '123.45' } });
    expect(amountInput).toHaveValue('123.45');
    
    // Test non-numeric input (should be filtered)
    fireEvent.change(amountInput, { target: { value: 'abc123def' } });
    expect(amountInput).toHaveValue('123');
  });

  it('shows available balance', () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    // Should show available balance
    expect(screen.getByText(/available: \$1,000\.00/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <PaymentScreen />
      </TestWrapper>
    );

    // Check for proper labels and ARIA attributes
    const recipientInput = screen.getByLabelText(/recipient name/i);
    const amountInput = screen.getByLabelText(/payment amount/i);
    
    expect(recipientInput).toHaveAttribute('aria-label');
    expect(amountInput).toHaveAttribute('aria-label');
    expect(amountInput).toHaveAttribute('aria-describedby');
  });
});