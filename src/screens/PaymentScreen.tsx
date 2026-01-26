import React, { useState, useEffect } from 'react';
import { ScreenType, type PaymentRequest, type PaymentMethod } from '../types';
import useNavigationWithLoading from '../hooks/useNavigationWithLoading';
import { useAppState } from '../hooks/useAppState';
import { useAuth } from '../hooks/useAuth';
import { ScreenContainer } from '../components';
import { demoDataService } from '../services/demoDataService';
import './screens.css';

/**
 * PaymentScreen Component
 * 
 * Payment screen for sending money with recipient input, amount entry,
 * and payment method selection. Includes form validation and mobile-friendly inputs.
 * Integrates with demo payment processing system and navigates to confirmation screen.
 * 
 * Features:
 * - Recipient selection/input with suggestions
 * - Amount input with number pad optimization
 * - Payment method selection interface
 * - Form validation with real-time feedback
 * - Mobile-optimized touch-friendly inputs
 * - Demo payment processing integration
 * - Navigation to PaymentConfirmationScreen on success
 * 
 * Requirements: 3.4, 5.1, 5.4
 */
const PaymentScreen: React.FC = () => {
  const { navigateWithLoading } = useNavigationWithLoading();
  const { user, paymentMethods, defaultPaymentMethod, addTransaction, updateUserBalance } = useAppState();
  const { refreshUserData } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    description: '',
    paymentMethodId: defaultPaymentMethod?.id || ''
  });
  
  // Validation and UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecipientSuggestions, setShowRecipientSuggestions] = useState(false);
  const [recipientSuggestions, setRecipientSuggestions] = useState<string[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(
    defaultPaymentMethod || null
  );

  // Demo recipients for suggestions
  const demoRecipients = demoDataService.getDemoRecipients();

  /**
   * Initialize payment method selection
   */
  useEffect(() => {
    if (!selectedPaymentMethod && paymentMethods.length > 0) {
      const defaultMethod = paymentMethods.find(method => method.isDefault) || paymentMethods[0];
      setSelectedPaymentMethod(defaultMethod);
      setFormData(prev => ({ ...prev, paymentMethodId: defaultMethod.id }));
    }
  }, [paymentMethods, selectedPaymentMethod]);

  /**
   * Filter recipient suggestions based on input
   */
  useEffect(() => {
    if (formData.recipient.length > 0) {
      const filtered = demoRecipients.filter(recipient =>
        recipient.toLowerCase().includes(formData.recipient.toLowerCase())
      );
      setRecipientSuggestions(filtered);
      setShowRecipientSuggestions(filtered.length > 0 && formData.recipient !== '');
    } else {
      setShowRecipientSuggestions(false);
      setRecipientSuggestions([]);
    }
  }, [formData.recipient, demoRecipients]);

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate recipient
    if (!formData.recipient.trim()) {
      newErrors.recipient = 'Recipient is required';
    } else if (formData.recipient.trim().length < 2) {
      newErrors.recipient = 'Recipient name must be at least 2 characters';
    }
    
    // Validate amount
    if (!formData.amount.trim()) {
      newErrors.amount = 'Amount is required';
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Please enter a valid amount';
      } else if (amount > (user?.accountBalance || 0)) {
        newErrors.amount = 'Insufficient balance';
      } else if (amount > 10000) {
        newErrors.amount = 'Amount cannot exceed $10,000';
      } else if (amount < 0.01) {
        newErrors.amount = 'Minimum amount is $0.01';
      }
    }
    
    // Validate payment method
    if (!formData.paymentMethodId) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input changes with validation
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  /**
   * Handle amount input with number formatting
   */
  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return;
    }
    
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      return;
    }
    
    handleInputChange('amount', numericValue);
  };

  /**
   * Handle recipient suggestion selection
   */
  const handleRecipientSuggestion = (recipient: string) => {
    setFormData(prev => ({ ...prev, recipient }));
    setShowRecipientSuggestions(false);
  };

  /**
   * Handle payment method selection
   */
  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setFormData(prev => ({ ...prev, paymentMethodId: method.id }));
    
    // Clear payment method error
    if (errors.paymentMethod) {
      setErrors(prev => ({ ...prev, paymentMethod: '' }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create payment request
      const paymentRequest: PaymentRequest = {
        recipient: formData.recipient.trim(),
        amount: parseFloat(formData.amount),
        currency: user?.currency || 'USD',
        description: formData.description.trim() || `Payment to ${formData.recipient.trim()}`,
        paymentMethod: selectedPaymentMethod!
      };
      
      // Process payment using demo service
      const confirmation = await demoDataService.processPayment(paymentRequest);
      
      if (confirmation.status === 'success') {
        // Refresh user data to sync with demo service changes
        refreshUserData();
        
        // Navigate to confirmation screen with payment data
        navigateWithLoading(
          `/${ScreenType.PAYMENT_CONFIRMATION}?transactionId=${confirmation.transactionId}`,
          'Processing payment...'
        );
      } else {
        // Handle payment failure - refresh data to include failed transaction
        refreshUserData();
        
        // Show error message to user
        setErrors({ submit: confirmation.message || 'Payment failed. Please try again.' });
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    navigateWithLoading(`/${ScreenType.DASHBOARD}`, 'Going back...');
  };

  /**
   * Format currency display
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: user?.currency || 'USD'
    }).format(amount);
  };

  /**
   * Get payment method display text
   */
  const getPaymentMethodDisplay = (method: PaymentMethod): string => {
    if (method.lastFourDigits) {
      return `${method.displayName} •••• ${method.lastFourDigits}`;
    }
    return method.displayName;
  };

  return (
    <ScreenContainer 
      title="Send Money" 
      showBackButton={true} 
      onBack={handleBack}
    >
      <div className="payment-content">
        <form className="payment-form" onSubmit={handleSubmit}>
          {/* Recipient Input */}
          <div className="form-field">
            <label htmlFor="recipient" className="form-label">
              Send to
            </label>
            <div className="recipient-input-container">
              <input
                id="recipient"
                type="text"
                placeholder="Enter recipient name"
                className={`form-input ${errors.recipient ? 'error' : ''}`}
                value={formData.recipient}
                onChange={(e) => handleInputChange('recipient', e.target.value)}
                onFocus={() => setShowRecipientSuggestions(recipientSuggestions.length > 0)}
                disabled={isSubmitting}
                autoComplete="off"
                aria-label="Recipient name"
                aria-describedby={errors.recipient ? 'recipient-error' : undefined}
              />
              
              {/* Recipient Suggestions */}
              {showRecipientSuggestions && (
                <div className="recipient-suggestions">
                  {recipientSuggestions.map((recipient, index) => (
                    <button
                      key={index}
                      type="button"
                      className="recipient-suggestion"
                      onClick={() => handleRecipientSuggestion(recipient)}
                      disabled={isSubmitting}
                    >
                      <div className="suggestion-icon">👤</div>
                      <span>{recipient}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.recipient && (
              <span id="recipient-error" className="error-message" role="alert">
                {errors.recipient}
              </span>
            )}
          </div>

          {/* Amount Input */}
          <div className="form-field">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <div className="amount-input-container">
              <span className="currency-symbol">$</span>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                className={`form-input amount-input ${errors.amount ? 'error' : ''}`}
                value={formData.amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                disabled={isSubmitting}
                aria-label="Payment amount"
                aria-describedby={errors.amount ? 'amount-error' : 'amount-balance'}
              />
            </div>
            <div id="amount-balance" className="balance-info">
              Available: {formatCurrency(user?.accountBalance || 0)}
            </div>
            {errors.amount && (
              <span id="amount-error" className="error-message" role="alert">
                {errors.amount}
              </span>
            )}
          </div>

          {/* Description Input (Optional) */}
          <div className="form-field">
            <label htmlFor="description" className="form-label">
              Description (Optional)
            </label>
            <input
              id="description"
              type="text"
              placeholder="What's this for?"
              className="form-input"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={isSubmitting}
              maxLength={100}
              aria-label="Payment description"
            />
          </div>

          {/* Payment Method Selection */}
          <div className="form-field">
            <label className="form-label">Payment Method</label>
            <div className="payment-methods">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`payment-method-option ${
                    selectedPaymentMethod?.id === method.id ? 'selected' : ''
                  }`}
                  onClick={() => handlePaymentMethodSelect(method)}
                  disabled={isSubmitting}
                  aria-label={`Select ${getPaymentMethodDisplay(method)}`}
                >
                  <div className="payment-method-icon">
                    {method.type === 'bank_account' && '🏦'}
                    {method.type === 'card' && '💳'}
                    {method.type === 'wallet' && '👛'}
                  </div>
                  <div className="payment-method-details">
                    <div className="payment-method-name">
                      {getPaymentMethodDisplay(method)}
                    </div>
                    <div className="payment-method-type">
                      {method.type.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  {selectedPaymentMethod?.id === method.id && (
                    <div className="payment-method-selected">✓</div>
                  )}
                </button>
              ))}
            </div>
            {errors.paymentMethod && (
              <span className="error-message" role="alert">
                {errors.paymentMethod}
              </span>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="submit-error" role="alert">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn btn--primary btn--full payment-submit-btn ${isSubmitting ? 'btn--loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Send Payment'}
          </button>
        </form>

        {/* Payment Summary (if amount is entered) */}
        {formData.amount && parseFloat(formData.amount) > 0 && (
          <div className="payment-summary">
            <h3>Payment Summary</h3>
            <div className="summary-row">
              <span>Amount:</span>
              <span className="summary-amount">
                {formatCurrency(parseFloat(formData.amount))}
              </span>
            </div>
            {selectedPaymentMethod && (
              <div className="summary-row">
                <span>From:</span>
                <span>{getPaymentMethodDisplay(selectedPaymentMethod)}</span>
              </div>
            )}
            {formData.recipient && (
              <div className="summary-row">
                <span>To:</span>
                <span>{formData.recipient}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </ScreenContainer>
  );
};

export default PaymentScreen;