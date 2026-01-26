/**
 * Tests for Demo Data Service
 * 
 * This test suite validates the demo data service functionality including
 * data generation, payment processing simulation, and credential validation.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { demoDataService, DemoDataServiceImpl, DEMO_USER, DEMO_PAYMENT_METHODS } from './demoDataService';
import { PaymentRequest, DEMO_CREDENTIALS, DEFAULT_CURRENCY } from '../types/index';

describe('DemoDataService', () => {
  let service: DemoDataServiceImpl;

  beforeEach(() => {
    service = new DemoDataServiceImpl();
  });

  describe('getDemoUser', () => {
    it('should return a valid user object', () => {
      const user = service.getDemoUser();
      
      expect(user).toBeDefined();
      expect(user.id).toBe('user_demo_001');
      expect(user.username).toBe('demo');
      expect(user.displayName).toBe('Alex Johnson');
      expect(user.email).toBe('alex.johnson@example.com');
      expect(user.phoneNumber).toBe('+1 (555) 123-4567');
      expect(user.accountBalance).toBe(2847.50);
      expect(user.currency).toBe(DEFAULT_CURRENCY);
    });

    it('should return a copy of the user object', () => {
      const user1 = service.getDemoUser();
      const user2 = service.getDemoUser();
      
      expect(user1).toEqual(user2);
      expect(user1).not.toBe(user2); // Different object references
    });
  });

  describe('getDemoTransactions', () => {
    it('should return an array of transactions', () => {
      const transactions = service.getDemoTransactions();
      
      expect(Array.isArray(transactions)).toBe(true);
      expect(transactions.length).toBeGreaterThan(0);
    });

    it('should return transactions with valid structure', () => {
      const transactions = service.getDemoTransactions();
      const transaction = transactions[0];
      
      expect(transaction).toHaveProperty('id');
      expect(transaction).toHaveProperty('type');
      expect(transaction).toHaveProperty('amount');
      expect(transaction).toHaveProperty('currency');
      expect(transaction).toHaveProperty('description');
      expect(transaction).toHaveProperty('timestamp');
      expect(transaction).toHaveProperty('status');
      
      expect(['sent', 'received', 'bill_payment']).toContain(transaction.type);
      expect(['completed', 'pending', 'failed']).toContain(transaction.status);
      expect(transaction.currency).toBe(DEFAULT_CURRENCY);
      expect(typeof transaction.amount).toBe('number');
      expect(transaction.amount).toBeGreaterThan(0);
    });

    it('should return transactions sorted by timestamp (newest first)', () => {
      const transactions = service.getDemoTransactions();
      
      for (let i = 1; i < transactions.length; i++) {
        expect(transactions[i - 1].timestamp.getTime()).toBeGreaterThanOrEqual(
          transactions[i].timestamp.getTime()
        );
      }
    });

    it('should return a copy of the transactions array', () => {
      const transactions1 = service.getDemoTransactions();
      const transactions2 = service.getDemoTransactions();
      
      expect(transactions1).toEqual(transactions2);
      expect(transactions1).not.toBe(transactions2); // Different array references
    });
  });

  describe('getDemoPaymentMethods', () => {
    it('should return an array of payment methods', () => {
      const paymentMethods = service.getDemoPaymentMethods();
      
      expect(Array.isArray(paymentMethods)).toBe(true);
      expect(paymentMethods.length).toBe(4);
    });

    it('should return payment methods with valid structure', () => {
      const paymentMethods = service.getDemoPaymentMethods();
      const method = paymentMethods[0];
      
      expect(method).toHaveProperty('id');
      expect(method).toHaveProperty('type');
      expect(method).toHaveProperty('displayName');
      expect(['bank_account', 'card', 'wallet']).toContain(method.type);
      expect(typeof method.displayName).toBe('string');
    });

    it('should have exactly one default payment method', () => {
      const paymentMethods = service.getDemoPaymentMethods();
      const defaultMethods = paymentMethods.filter(method => method.isDefault);
      
      expect(defaultMethods.length).toBe(1);
      expect(defaultMethods[0].displayName).toBe('Chase Checking');
    });

    it('should return a copy of the payment methods array', () => {
      const methods1 = service.getDemoPaymentMethods();
      const methods2 = service.getDemoPaymentMethods();
      
      expect(methods1).toEqual(methods2);
      expect(methods1).not.toBe(methods2); // Different array references
    });
  });

  describe('validateCredentials', () => {
    it('should validate correct demo credentials', () => {
      const isValid = service.validateCredentials({
        username: DEMO_CREDENTIALS.username,
        password: DEMO_CREDENTIALS.password
      });
      
      expect(isValid).toBe(true);
    });

    it('should reject incorrect username', () => {
      const isValid = service.validateCredentials({
        username: 'wrong',
        password: DEMO_CREDENTIALS.password
      });
      
      expect(isValid).toBe(false);
    });

    it('should reject incorrect password', () => {
      const isValid = service.validateCredentials({
        username: DEMO_CREDENTIALS.username,
        password: 'wrong'
      });
      
      expect(isValid).toBe(false);
    });

    it('should reject both incorrect username and password', () => {
      const isValid = service.validateCredentials({
        username: 'wrong',
        password: 'wrong'
      });
      
      expect(isValid).toBe(false);
    });
  });

  describe('processPayment', () => {
    it('should process a successful payment', async () => {
      const paymentRequest: PaymentRequest = {
        recipient: 'Test Recipient',
        amount: 100.00,
        currency: DEFAULT_CURRENCY,
        description: 'Test payment',
        paymentMethod: service.getDemoPaymentMethods()[0]
      };

      const confirmation = await service.processPayment(paymentRequest);
      
      expect(confirmation).toBeDefined();
      expect(confirmation.amount).toBe(paymentRequest.amount);
      expect(confirmation.currency).toBe(paymentRequest.currency);
      expect(confirmation.recipient).toBe(paymentRequest.recipient);
      expect(confirmation.transactionId).toBeDefined();
      expect(confirmation.timestamp).toBeInstanceOf(Date);
      expect(['success', 'failed']).toContain(confirmation.status);
    });

    it('should add successful payment to transaction history', async () => {
      const initialTransactions = service.getDemoTransactions();
      const initialCount = initialTransactions.length;

      const paymentRequest: PaymentRequest = {
        recipient: 'Test Recipient',
        amount: 50.00,
        currency: DEFAULT_CURRENCY,
        description: 'Test payment',
        paymentMethod: service.getDemoPaymentMethods()[0]
      };

      const confirmation = await service.processPayment(paymentRequest);
      
      if (confirmation.status === 'success') {
        const updatedTransactions = service.getDemoTransactions();
        expect(updatedTransactions.length).toBe(initialCount + 1);
        
        const newTransaction = updatedTransactions[0]; // Should be first (newest)
        expect(newTransaction.type).toBe('sent');
        expect(newTransaction.amount).toBe(paymentRequest.amount);
        expect(newTransaction.recipient).toBe(paymentRequest.recipient);
        expect(newTransaction.status).toBe('completed');
      }
    });

    it('should simulate network delay', async () => {
      const startTime = Date.now();
      
      const paymentRequest: PaymentRequest = {
        recipient: 'Test Recipient',
        amount: 25.00,
        currency: DEFAULT_CURRENCY,
        paymentMethod: service.getDemoPaymentMethods()[0]
      };

      await service.processPayment(paymentRequest);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should take at least 1500ms due to simulated delay
      expect(duration).toBeGreaterThanOrEqual(1400); // Allow some tolerance
    });
  });

  describe('utility methods', () => {
    it('should get recent transactions', () => {
      const recentTransactions = service.getRecentTransactions(3);
      
      expect(recentTransactions.length).toBeLessThanOrEqual(3);
      expect(Array.isArray(recentTransactions)).toBe(true);
    });

    it('should filter transactions by type', () => {
      const sentTransactions = service.getTransactionsByType('sent');
      
      expect(Array.isArray(sentTransactions)).toBe(true);
      sentTransactions.forEach(transaction => {
        expect(transaction.type).toBe('sent');
      });
    });

    it('should filter transactions by status', () => {
      const completedTransactions = service.getTransactionsByStatus('completed');
      
      expect(Array.isArray(completedTransactions)).toBe(true);
      completedTransactions.forEach(transaction => {
        expect(transaction.status).toBe('completed');
      });
    });

    it('should search transactions', () => {
      const searchResults = service.searchTransactions('coffee');
      
      expect(Array.isArray(searchResults)).toBe(true);
      // Should find transactions with 'coffee' in description or recipient
    });

    it('should get account balance', () => {
      const balance = service.getAccountBalance();
      
      expect(typeof balance).toBe('number');
      expect(balance).toBe(2847.50);
    });

    it('should get default payment method', () => {
      const defaultMethod = service.getDefaultPaymentMethod();
      
      expect(defaultMethod).toBeDefined();
      expect(defaultMethod?.isDefault).toBe(true);
      expect(defaultMethod?.displayName).toBe('Chase Checking');
    });

    it('should get demo recipients', () => {
      const recipients = service.getDemoRecipients();
      
      expect(Array.isArray(recipients)).toBe(true);
      expect(recipients.length).toBeGreaterThan(0);
      recipients.forEach(recipient => {
        expect(typeof recipient).toBe('string');
        expect(recipient.length).toBeGreaterThan(0);
      });
    });

    it('should reset demo data', () => {
      // Make a payment to change the state
      const paymentRequest: PaymentRequest = {
        recipient: 'Test',
        amount: 100,
        currency: DEFAULT_CURRENCY,
        paymentMethod: service.getDemoPaymentMethods()[0]
      };

      // Reset and verify state is restored
      service.resetDemoData();
      
      const balance = service.getAccountBalance();
      expect(balance).toBe(2847.50);
    });
  });

  describe('data integrity', () => {
    it('should maintain consistent transaction IDs', () => {
      const transactions = service.getDemoTransactions();
      const ids = transactions.map(t => t.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length); // All IDs should be unique
    });

    it('should have realistic transaction amounts', () => {
      const transactions = service.getDemoTransactions();
      
      transactions.forEach(transaction => {
        expect(transaction.amount).toBeGreaterThan(0);
        expect(transaction.amount).toBeLessThan(10000); // Reasonable upper limit
        expect(Number.isFinite(transaction.amount)).toBe(true);
      });
    });

    it('should have valid timestamps', () => {
      const transactions = service.getDemoTransactions();
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      
      transactions.forEach(transaction => {
        expect(transaction.timestamp).toBeInstanceOf(Date);
        expect(transaction.timestamp.getTime()).toBeLessThanOrEqual(now.getTime());
        expect(transaction.timestamp.getTime()).toBeGreaterThanOrEqual(thirtyDaysAgo.getTime());
      });
    });
  });
});

describe('Singleton demoDataService', () => {
  it('should export a working singleton instance', () => {
    expect(demoDataService).toBeDefined();
    expect(typeof demoDataService.getDemoUser).toBe('function');
    expect(typeof demoDataService.getDemoTransactions).toBe('function');
    expect(typeof demoDataService.getDemoPaymentMethods).toBe('function');
    expect(typeof demoDataService.processPayment).toBe('function');
    expect(typeof demoDataService.validateCredentials).toBe('function');
  });

  it('should return consistent data across calls', () => {
    const user1 = demoDataService.getDemoUser();
    const user2 = demoDataService.getDemoUser();
    
    expect(user1).toEqual(user2);
  });
});

describe('Exported demo data', () => {
  it('should export DEMO_USER constant', () => {
    expect(DEMO_USER).toBeDefined();
    expect(DEMO_USER.username).toBe('demo');
    expect(DEMO_USER.displayName).toBe('Alex Johnson');
  });

  it('should export DEMO_PAYMENT_METHODS constant', () => {
    expect(DEMO_PAYMENT_METHODS).toBeDefined();
    expect(Array.isArray(DEMO_PAYMENT_METHODS)).toBe(true);
    expect(DEMO_PAYMENT_METHODS.length).toBe(4);
  });
});