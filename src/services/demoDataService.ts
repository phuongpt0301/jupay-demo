/**
 * Demo Data Service for JuPay Mobile Demo
 * 
 * This service provides realistic demo data for the mobile payment app prototype.
 * It generates user profiles, transaction history, payment methods, and handles
 * simulated payment processing without making actual financial transactions.
 * 
 * Requirements: 5.3 - Demo data population with realistic content
 */

import type {
  User,
  Transaction,
  PaymentMethod,
  PaymentRequest,
  PaymentConfirmation,
  LoginCredentials,
  DemoDataService
} from '../types/index';
import {
  DEMO_CREDENTIALS,
  DEFAULT_CURRENCY
} from '../types/index';

/**
 * Demo user data with realistic account information
 */
const DEMO_USER: User = {
  id: 'user_demo_001',
  username: 'demo',
  displayName: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phoneNumber: '+1 (555) 123-4567',
  profileImage: undefined, // Could be added later with avatar generation
  accountBalance: 2847.50,
  currency: DEFAULT_CURRENCY
};

/**
 * Demo payment methods with various types
 */
const DEMO_PAYMENT_METHODS: PaymentMethod[] = [
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
  },
  {
    id: 'pm_003',
    type: 'wallet',
    displayName: 'JuPay Wallet',
    lastFourDigits: undefined,
    isDefault: false
  },
  {
    id: 'pm_004',
    type: 'card',
    displayName: 'Mastercard Debit',
    lastFourDigits: '2156',
    isDefault: false
  }
];

/**
 * Generate realistic demo transaction history
 */
const generateDemoTransactions = (): Transaction[] => {
  const now = new Date();
  const transactions: Transaction[] = [];

  // Recent transactions (last 30 days)
  const transactionTemplates = [
    {
      type: 'sent' as const,
      amount: 125.00,
      recipient: 'Sarah Chen',
      description: 'Dinner split - Italian restaurant',
      category: 'Food & Dining'
    },
    {
      type: 'received' as const,
      amount: 50.00,
      sender: 'Mike Rodriguez',
      description: 'Movie tickets reimbursement',
      category: 'Entertainment'
    },
    {
      type: 'bill_payment' as const,
      amount: 89.99,
      recipient: 'Electric Company',
      description: 'Monthly electricity bill',
      category: 'Utilities'
    },
    {
      type: 'sent' as const,
      amount: 200.00,
      recipient: 'Emma Wilson',
      description: 'Rent contribution',
      category: 'Housing'
    },
    {
      type: 'received' as const,
      amount: 1200.00,
      sender: 'Acme Corp',
      description: 'Salary deposit',
      category: 'Income'
    },
    {
      type: 'sent' as const,
      amount: 45.67,
      recipient: 'Coffee Shop',
      description: 'Weekly coffee subscription',
      category: 'Food & Dining'
    },
    {
      type: 'bill_payment' as const,
      amount: 156.78,
      recipient: 'Internet Provider',
      description: 'Monthly internet service',
      category: 'Utilities'
    },
    {
      type: 'sent' as const,
      amount: 75.00,
      recipient: 'John Smith',
      description: 'Gas money for road trip',
      category: 'Transportation'
    },
    {
      type: 'received' as const,
      amount: 25.00,
      sender: 'Lisa Park',
      description: 'Lunch money return',
      category: 'Food & Dining'
    },
    {
      type: 'sent' as const,
      amount: 299.99,
      recipient: 'Tech Store',
      description: 'Wireless headphones',
      category: 'Shopping'
    },
    {
      type: 'bill_payment' as const,
      amount: 67.45,
      recipient: 'Phone Company',
      description: 'Mobile phone bill',
      category: 'Utilities'
    },
    {
      type: 'received' as const,
      amount: 150.00,
      sender: 'Freelance Client',
      description: 'Website design work',
      category: 'Income'
    },
    {
      type: 'sent' as const,
      amount: 32.50,
      recipient: 'Grocery Store',
      description: 'Weekly groceries',
      category: 'Food & Dining'
    },
    {
      type: 'sent' as const,
      amount: 85.00,
      recipient: 'David Kim',
      description: 'Concert ticket',
      category: 'Entertainment'
    },
    {
      type: 'bill_payment' as const,
      amount: 234.56,
      recipient: 'Insurance Company',
      description: 'Auto insurance premium',
      category: 'Insurance'
    }
  ];

  // Generate transactions with realistic timestamps
  transactionTemplates.forEach((template, index) => {
    const daysAgo = Math.floor(Math.random() * 30); // Random day in last 30 days
    const hoursAgo = Math.floor(Math.random() * 24); // Random hour
    const minutesAgo = Math.floor(Math.random() * 60); // Random minute
    
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(timestamp.getHours() - hoursAgo);
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

    // Determine status (most are completed, some pending, few failed)
    let status: Transaction['status'] = 'completed';
    const statusRandom = Math.random();
    if (statusRandom < 0.05) {
      status = 'failed';
    } else if (statusRandom < 0.15) {
      status = 'pending';
    }

    transactions.push({
      id: `txn_${String(index + 1).padStart(3, '0')}`,
      type: template.type,
      amount: template.amount,
      currency: DEFAULT_CURRENCY,
      recipient: template.recipient,
      sender: template.sender,
      description: template.description,
      timestamp,
      status,
      category: template.category
    });
  });

  // Sort by timestamp (newest first)
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

/**
 * Demo data service implementation
 */
class DemoDataServiceImpl implements DemoDataService {
  private transactions: Transaction[];

  constructor() {
    this.transactions = generateDemoTransactions();
  }

  /**
   * Get demo user data
   */
  getDemoUser(): User {
    return { ...DEMO_USER };
  }

  /**
   * Get demo transaction history
   */
  getDemoTransactions(): Transaction[] {
    return [...this.transactions];
  }

  /**
   * Get demo payment methods
   */
  getDemoPaymentMethods(): PaymentMethod[] {
    return [...DEMO_PAYMENT_METHODS];
  }

  /**
   * Simulate payment processing
   * This method simulates payment processing without making actual transactions
   */
  async processPayment(request: PaymentRequest): Promise<PaymentConfirmation> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate transaction ID
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    
    // Simulate success/failure (95% success rate)
    const isSuccess = Math.random() > 0.05;
    
    const confirmation: PaymentConfirmation = {
      transactionId,
      amount: request.amount,
      currency: request.currency,
      recipient: request.recipient,
      timestamp: new Date(),
      status: isSuccess ? 'success' : 'failed',
      message: isSuccess 
        ? `Payment of ${request.currency} ${request.amount.toFixed(2)} sent successfully to ${request.recipient}`
        : 'Payment failed. Please try again or contact support.'
    };

    // If successful, add to transaction history and update balance
    if (isSuccess) {
      const newTransaction: Transaction = {
        id: transactionId,
        type: 'sent',
        amount: request.amount,
        currency: request.currency,
        recipient: request.recipient,
        description: request.description || `Payment to ${request.recipient}`,
        timestamp: new Date(),
        status: 'completed',
        category: 'Transfer'
      };

      // Add to beginning of transactions array (newest first)
      this.transactions.unshift(newTransaction);

      // Update user balance (in a real app, this would be handled server-side)
      DEMO_USER.accountBalance -= request.amount;
    } else {
      // Add failed transaction to history for tracking
      const failedTransaction: Transaction = {
        id: transactionId,
        type: 'sent',
        amount: request.amount,
        currency: request.currency,
        recipient: request.recipient,
        description: request.description || `Payment to ${request.recipient}`,
        timestamp: new Date(),
        status: 'failed',
        category: 'Transfer'
      };

      // Add to beginning of transactions array (newest first)
      this.transactions.unshift(failedTransaction);
      
      // Note: Balance is not updated for failed transactions
    }

    return confirmation;
  }

  /**
   * Validate demo login credentials
   */
  validateCredentials(credentials: LoginCredentials): boolean {
    // For demo purposes, accept any credentials that have text
    // In production, this would validate against actual user database
    return (
      credentials.username.trim().length > 0 &&
      credentials.password.trim().length > 0
    );
  }

  /**
   * Get recent transactions (last N transactions)
   */
  getRecentTransactions(count: number = 5): Transaction[] {
    return this.transactions.slice(0, count);
  }

  /**
   * Get transactions by type
   */
  getTransactionsByType(type: Transaction['type']): Transaction[] {
    return this.transactions.filter(transaction => transaction.type === type);
  }

  /**
   * Get transactions by status
   */
  getTransactionsByStatus(status: Transaction['status']): Transaction[] {
    return this.transactions.filter(transaction => transaction.status === status);
  }

  /**
   * Search transactions by description or recipient
   */
  searchTransactions(query: string): Transaction[] {
    const lowercaseQuery = query.toLowerCase();
    return this.transactions.filter(transaction => 
      transaction.description.toLowerCase().includes(lowercaseQuery) ||
      transaction.recipient?.toLowerCase().includes(lowercaseQuery) ||
      transaction.sender?.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Get account balance
   */
  getAccountBalance(): number {
    return DEMO_USER.accountBalance;
  }

  /**
   * Get default payment method
   */
  getDefaultPaymentMethod(): PaymentMethod | undefined {
    return DEMO_PAYMENT_METHODS.find(method => method.isDefault);
  }

  /**
   * Generate additional demo recipients for payment forms
   */
  getDemoRecipients(): string[] {
    return [
      'Sarah Chen',
      'Mike Rodriguez',
      'Emma Wilson',
      'John Smith',
      'Lisa Park',
      'David Kim',
      'Jennifer Lee',
      'Robert Taylor',
      'Maria Garcia',
      'James Brown'
    ];
  }

  /**
   * Reset demo data to initial state
   */
  resetDemoData(): void {
    this.transactions = generateDemoTransactions();
    DEMO_USER.accountBalance = 2847.50;
  }
}

// Export singleton instance
export const demoDataService = new DemoDataServiceImpl();

// Export class for testing
export { DemoDataServiceImpl };

// Export demo data for direct access if needed
export {
  DEMO_USER,
  DEMO_PAYMENT_METHODS
};