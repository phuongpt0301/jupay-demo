/**
 * Unit tests for TypeScript interfaces and types
 */

import { describe, it, expect } from 'vitest';
import {
  ScreenType,
  isScreenType,
  isCompletedTransaction,
  isAuthenticatedUser,
  DEFAULT_LOADING_DURATION,
  MIN_TOUCH_TARGET_SIZE,
  DEFAULT_CURRENCY,
  MAX_TRANSACTION_AMOUNT,
  DEMO_CREDENTIALS,
  type User,
  type Transaction,
  type PaymentRequest,
  type AppState,
  type LoadingManager,
  type NavigationHook,
  type PaymentMethod,
  type FormState,
  type ValidationResult
} from './index';

describe('TypeScript Types and Interfaces', () => {
  describe('ScreenType', () => {
    it('should contain all expected screen types', () => {
      expect(ScreenType.SPLASH).toBe('splash');
      expect(ScreenType.LOGIN).toBe('login');
      expect(ScreenType.DASHBOARD).toBe('dashboard');
      expect(ScreenType.PAYMENT).toBe('payment');
      expect(ScreenType.TRANSACTIONS).toBe('transactions');
      expect(ScreenType.PROFILE).toBe('profile');
      expect(ScreenType.PAYMENT_CONFIRMATION).toBe('payment-confirmation');
    });

    it('should work with isScreenType type guard', () => {
      expect(isScreenType('splash')).toBe(true);
      expect(isScreenType('login')).toBe(true);
      expect(isScreenType('invalid')).toBe(false);
      expect(isScreenType(null)).toBe(false);
      expect(isScreenType(undefined)).toBe(false);
    });
  });

  describe('User interface', () => {
    it('should create valid user objects', () => {
      const user: User = {
        id: 'user-123',
        username: 'testuser',
        displayName: 'Test User',
        email: 'test@example.com',
        phoneNumber: '+1234567890',
        accountBalance: 1000.50,
        currency: 'USD'
      };

      expect(user.id).toBe('user-123');
      expect(user.accountBalance).toBe(1000.50);
      expect(isAuthenticatedUser(user)).toBe(true);
    });

    it('should handle optional profile image', () => {
      const userWithImage: User = {
        id: 'user-123',
        username: 'testuser',
        displayName: 'Test User',
        email: 'test@example.com',
        phoneNumber: '+1234567890',
        accountBalance: 1000.50,
        currency: 'USD',
        profileImage: 'https://example.com/avatar.jpg'
      };

      expect(userWithImage.profileImage).toBe('https://example.com/avatar.jpg');
    });
  });

  describe('Transaction interface', () => {
    it('should create valid transaction objects', () => {
      const transaction: Transaction = {
        id: 'txn-123',
        type: 'sent',
        amount: 50.00,
        currency: 'USD',
        recipient: 'John Doe',
        description: 'Coffee payment',
        timestamp: new Date('2024-01-15T10:30:00Z'),
        status: 'completed'
      };

      expect(transaction.type).toBe('sent');
      expect(transaction.amount).toBe(50.00);
      expect(isCompletedTransaction(transaction)).toBe(true);
    });

    it('should handle different transaction types', () => {
      const sentTransaction: Transaction = {
        id: 'txn-1',
        type: 'sent',
        amount: 100,
        currency: 'USD',
        recipient: 'Alice',
        description: 'Payment',
        timestamp: new Date(),
        status: 'completed'
      };

      const receivedTransaction: Transaction = {
        id: 'txn-2',
        type: 'received',
        amount: 200,
        currency: 'USD',
        sender: 'Bob',
        description: 'Refund',
        timestamp: new Date(),
        status: 'pending'
      };

      expect(sentTransaction.type).toBe('sent');
      expect(receivedTransaction.type).toBe('received');
      expect(isCompletedTransaction(sentTransaction)).toBe(true);
      expect(isCompletedTransaction(receivedTransaction)).toBe(false);
    });
  });

  describe('PaymentRequest interface', () => {
    it('should create valid payment request objects', () => {
      const paymentMethod: PaymentMethod = {
        id: 'pm-123',
        type: 'card',
        displayName: 'Visa ****1234',
        lastFourDigits: '1234'
      };

      const paymentRequest: PaymentRequest = {
        recipient: 'Jane Doe',
        amount: 75.50,
        currency: 'USD',
        description: 'Dinner split',
        paymentMethod
      };

      expect(paymentRequest.recipient).toBe('Jane Doe');
      expect(paymentRequest.amount).toBe(75.50);
      expect(paymentRequest.paymentMethod.type).toBe('card');
    });
  });

  describe('AppState interface', () => {
    it('should create valid app state objects', () => {
      const appState: AppState = {
        user: null,
        isAuthenticated: false,
        currentScreen: ScreenType.SPLASH,
        isLoading: false,
        loadingMessage: '',
        transactions: [],
        paymentMethods: [],
        navigationHistory: []
      };

      expect(appState.isAuthenticated).toBe(false);
      expect(appState.currentScreen).toBe('splash');
      expect(appState.transactions).toEqual([]);
    });
  });

  describe('LoadingManager interface', () => {
    it('should define proper loading manager structure', () => {
      const mockLoadingManager: LoadingManager = {
        showLoading: (message?: string) => {},
        hideLoading: () => {},
        isLoading: false,
        loadingMessage: ''
      };

      expect(typeof mockLoadingManager.showLoading).toBe('function');
      expect(typeof mockLoadingManager.hideLoading).toBe('function');
      expect(mockLoadingManager.isLoading).toBe(false);
    });
  });

  describe('Form types', () => {
    it('should create valid form state objects', () => {
      interface LoginForm {
        username: string;
        password: string;
      }

      const formState: FormState<LoginForm> = {
        values: {
          username: 'testuser',
          password: 'password123'
        },
        errors: {
          username: '',
          password: ''
        },
        touched: {
          username: true,
          password: false
        },
        isSubmitting: false,
        isValid: true
      };

      expect(formState.values.username).toBe('testuser');
      expect(formState.isValid).toBe(true);
    });

    it('should create valid validation results', () => {
      const validResult: ValidationResult = {
        isValid: true,
        errors: {}
      };

      const invalidResult: ValidationResult = {
        isValid: false,
        errors: {
          username: 'Username is required',
          password: 'Password must be at least 8 characters'
        }
      };

      expect(validResult.isValid).toBe(true);
      expect(invalidResult.isValid).toBe(false);
      expect(Object.keys(invalidResult.errors)).toHaveLength(2);
    });
  });

  describe('Constants', () => {
    it('should have correct constant values', () => {
      expect(DEFAULT_LOADING_DURATION).toBe(3000);
      expect(MIN_TOUCH_TARGET_SIZE).toBe(44);
      expect(DEFAULT_CURRENCY).toBe('USD');
      expect(MAX_TRANSACTION_AMOUNT).toBe(10000);
    });

    it('should have demo credentials', () => {
      expect(DEMO_CREDENTIALS.username).toBe('demo');
      expect(DEMO_CREDENTIALS.password).toBe('demo123');
    });
  });

  describe('Type guards', () => {
    it('should correctly identify authenticated users', () => {
      const validUser: User = {
        id: 'user-123',
        username: 'test',
        displayName: 'Test User',
        email: 'test@example.com',
        phoneNumber: '+1234567890',
        accountBalance: 100,
        currency: 'USD'
      };

      expect(isAuthenticatedUser(validUser)).toBe(true);
      expect(isAuthenticatedUser(null)).toBe(false);
    });

    it('should correctly identify completed transactions', () => {
      const completedTxn: Transaction = {
        id: 'txn-1',
        type: 'sent',
        amount: 100,
        currency: 'USD',
        description: 'Test',
        timestamp: new Date(),
        status: 'completed'
      };

      const pendingTxn: Transaction = {
        ...completedTxn,
        status: 'pending'
      };

      expect(isCompletedTransaction(completedTxn)).toBe(true);
      expect(isCompletedTransaction(pendingTxn)).toBe(false);
    });
  });
});