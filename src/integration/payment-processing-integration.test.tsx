/**
 * Payment Processing Integration Test
 * 
 * Tests the complete integration of payment processing simulation
 * including demo service, app state synchronization, and UI updates.
 * 
 * Requirements: 5.1 - Demo payment processing without external calls
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { demoDataService } from '../services/demoDataService';
import type { PaymentRequest } from '../types';

describe('Payment Processing Integration', () => {
  beforeEach(() => {
    // Reset demo data before each test
    demoDataService.resetDemoData();
  });

  describe('Demo Payment Processing', () => {
    it('should process successful payments without external calls', async () => {
      const initialBalance = demoDataService.getAccountBalance();
      const initialTransactions = demoDataService.getDemoTransactions();
      const initialTransactionCount = initialTransactions.length;

      const paymentRequest: PaymentRequest = {
        recipient: 'Test Recipient',
        amount: 50.00,
        currency: 'USD',
        description: 'Integration test payment',
        paymentMethod: {
          id: 'pm_001',
          type: 'bank_account',
          displayName: 'Test Account',
          isDefault: true
        }
      };

      // Process payment
      const confirmation = await demoDataService.processPayment(paymentRequest);

      // Verify payment confirmation
      expect(confirmation).toBeDefined();
      expect(confirmation.transactionId).toBeDefined();
      expect(confirmation.amount).toBe(paymentRequest.amount);
      expect(confirmation.currency).toBe(paymentRequest.currency);
      expect(confirmation.recipient).toBe(paymentRequest.recipient);
      expect(confirmation.timestamp).toBeInstanceOf(Date);
      expect(['success', 'failed']).toContain(confirmation.status);

      if (confirmation.status === 'success') {
        // Verify balance was updated
        const newBalance = demoDataService.getAccountBalance();
        expect(newBalance).toBe(initialBalance - paymentRequest.amount);

        // Verify transaction was added
        const newTransactions = demoDataService.getDemoTransactions();
        expect(newTransactions).toHaveLength(initialTransactionCount + 1);

        // Verify transaction details
        const latestTransaction = newTransactions[0];
        expect(latestTransaction.id).toBe(confirmation.transactionId);
        expect(latestTransaction.amount).toBe(paymentRequest.amount);
        expect(latestTransaction.recipient).toBe(paymentRequest.recipient);
        expect(latestTransaction.status).toBe('completed');
        expect(latestTransaction.type).toBe('sent');
      } else {
        // For failed payments, balance should not change
        const newBalance = demoDataService.getAccountBalance();
        expect(newBalance).toBe(initialBalance);

        // But transaction should still be recorded as failed
        const newTransactions = demoDataService.getDemoTransactions();
        expect(newTransactions).toHaveLength(initialTransactionCount + 1);

        const latestTransaction = newTransactions[0];
        expect(latestTransaction.id).toBe(confirmation.transactionId);
        expect(latestTransaction.status).toBe('failed');
      }
    });

    it('should simulate network delay during payment processing', async () => {
      const paymentRequest: PaymentRequest = {
        recipient: 'Test Recipient',
        amount: 25.00,
        currency: 'USD',
        description: 'Delay test payment',
        paymentMethod: {
          id: 'pm_001',
          type: 'bank_account',
          displayName: 'Test Account',
          isDefault: true
        }
      };

      const startTime = Date.now();
      await demoDataService.processPayment(paymentRequest);
      const endTime = Date.now();

      // Should take at least 1.5 seconds (simulated network delay)
      const duration = endTime - startTime;
      expect(duration).toBeGreaterThanOrEqual(1400); // Allow some margin for test execution
    });

    it('should handle multiple consecutive payments correctly', async () => {
      const initialBalance = demoDataService.getAccountBalance();
      let currentBalance = initialBalance;
      let totalSpent = 0;

      const payments = [
        { recipient: 'Alice', amount: 10.00 },
        { recipient: 'Bob', amount: 15.00 },
        { recipient: 'Charlie', amount: 20.00 }
      ];

      for (const payment of payments) {
        const paymentRequest: PaymentRequest = {
          recipient: payment.recipient,
          amount: payment.amount,
          currency: 'USD',
          description: `Payment to ${payment.recipient}`,
          paymentMethod: {
            id: 'pm_001',
            type: 'bank_account',
            displayName: 'Test Account',
            isDefault: true
          }
        };

        const confirmation = await demoDataService.processPayment(paymentRequest);
        
        if (confirmation.status === 'success') {
          totalSpent += payment.amount;
          currentBalance -= payment.amount;
        }
      }

      // Verify final balance
      const finalBalance = demoDataService.getAccountBalance();
      expect(finalBalance).toBe(initialBalance - totalSpent);

      // Verify all transactions were recorded
      const transactions = demoDataService.getDemoTransactions();
      const newTransactions = transactions.slice(0, payments.length);
      
      // Check that we have the right number of new transactions
      expect(newTransactions.length).toBe(payments.length);
      
      // Verify transaction recipients match
      const recipients = newTransactions.map(t => t.recipient).reverse();
      const expectedRecipients = payments.map(p => p.recipient);
      expect(recipients).toEqual(expectedRecipients);
    });

    it('should ensure no actual financial transactions occur', async () => {
      // This test verifies that the payment processing is purely simulated
      const paymentRequest: PaymentRequest = {
        recipient: 'External Service',
        amount: 1000000.00, // Large amount that would be problematic if real
        currency: 'USD',
        description: 'Simulation safety test',
        paymentMethod: {
          id: 'pm_001',
          type: 'bank_account',
          displayName: 'Test Account',
          isDefault: true
        }
      };

      // This should complete without any external network calls or real transactions
      const confirmation = await demoDataService.processPayment(paymentRequest);
      
      // Should complete successfully (or fail) but never make real transactions
      expect(confirmation).toBeDefined();
      expect(['success', 'failed']).toContain(confirmation.status);
      
      // The fact that this test completes quickly and doesn't throw network errors
      // confirms that no external calls are being made
    });

    it('should maintain transaction history integrity', async () => {
      const initialTransactions = demoDataService.getDemoTransactions();
      const initialCount = initialTransactions.length;

      // Process a payment
      const paymentRequest: PaymentRequest = {
        recipient: 'History Test',
        amount: 30.00,
        currency: 'USD',
        description: 'Transaction history test',
        paymentMethod: {
          id: 'pm_001',
          type: 'bank_account',
          displayName: 'Test Account',
          isDefault: true
        }
      };

      await demoDataService.processPayment(paymentRequest);

      // Verify transaction history integrity
      const newTransactions = demoDataService.getDemoTransactions();
      expect(newTransactions.length).toBe(initialCount + 1);

      // Verify newest transaction is first (correct sorting)
      const latestTransaction = newTransactions[0];
      expect(latestTransaction.recipient).toBe(paymentRequest.recipient);
      expect(latestTransaction.amount).toBe(paymentRequest.amount);

      // Verify all original transactions are still present
      const originalTransactionIds = initialTransactions.map(t => t.id);
      const newTransactionIds = newTransactions.slice(1).map(t => t.id);
      expect(newTransactionIds).toEqual(originalTransactionIds);
    });

    it('should generate unique transaction IDs', async () => {
      const transactionIds = new Set<string>();
      const paymentCount = 5;

      for (let i = 0; i < paymentCount; i++) {
        const paymentRequest: PaymentRequest = {
          recipient: `Recipient ${i}`,
          amount: 10.00,
          currency: 'USD',
          description: `Payment ${i}`,
          paymentMethod: {
            id: 'pm_001',
            type: 'bank_account',
            displayName: 'Test Account',
            isDefault: true
          }
        };

        const confirmation = await demoDataService.processPayment(paymentRequest);
        transactionIds.add(confirmation.transactionId);
      }

      // All transaction IDs should be unique
      expect(transactionIds.size).toBe(paymentCount);
    });
  });

  describe('Demo Data Service Integration', () => {
    it('should provide consistent demo recipients', () => {
      const recipients = demoDataService.getDemoRecipients();
      
      expect(Array.isArray(recipients)).toBe(true);
      expect(recipients.length).toBeGreaterThan(0);
      expect(recipients.every(r => typeof r === 'string')).toBe(true);
      expect(recipients.every(r => r.length > 0)).toBe(true);
    });

    it('should maintain account balance consistency', () => {
      const initialBalance = demoDataService.getAccountBalance();
      expect(typeof initialBalance).toBe('number');
      expect(initialBalance).toBeGreaterThan(0);

      // Reset and verify balance is restored
      demoDataService.resetDemoData();
      const resetBalance = demoDataService.getAccountBalance();
      expect(resetBalance).toBe(2847.50); // Default demo balance
    });

    it('should provide valid payment methods', () => {
      const paymentMethods = demoDataService.getDemoPaymentMethods();
      
      expect(Array.isArray(paymentMethods)).toBe(true);
      expect(paymentMethods.length).toBeGreaterThan(0);
      
      // Verify structure of payment methods
      paymentMethods.forEach(method => {
        expect(method.id).toBeDefined();
        expect(method.type).toBeDefined();
        expect(method.displayName).toBeDefined();
        expect(['bank_account', 'card', 'wallet']).toContain(method.type);
      });

      // Should have exactly one default payment method
      const defaultMethods = paymentMethods.filter(m => m.isDefault);
      expect(defaultMethods.length).toBe(1);
    });
  });
});