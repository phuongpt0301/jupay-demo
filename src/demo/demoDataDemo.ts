/**
 * Demo Data Service Integration Demo
 * 
 * This file demonstrates the demo data service functionality
 * and can be used to verify it works correctly.
 */

import { demoDataService } from '../services/demoDataService';
import { PaymentRequest } from '../types/index';

// Demo function to test the service
export const runDemoDataDemo = async () => {
  console.log('=== JuPay Demo Data Service Demo ===\n');

  // Test user data
  console.log('1. Demo User:');
  const user = demoDataService.getDemoUser();
  console.log(`   Name: ${user.displayName}`);
  console.log(`   Username: ${user.username}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Balance: ${user.currency} ${user.accountBalance.toFixed(2)}\n`);

  // Test payment methods
  console.log('2. Payment Methods:');
  const paymentMethods = demoDataService.getDemoPaymentMethods();
  paymentMethods.forEach((method, index) => {
    const defaultText = method.isDefault ? ' (Default)' : '';
    console.log(`   ${index + 1}. ${method.displayName}${defaultText}`);
    if (method.lastFourDigits) {
      console.log(`      Ending in: ${method.lastFourDigits}`);
    }
  });
  console.log();

  // Test transactions
  console.log('3. Recent Transactions:');
  const recentTransactions = demoDataService.getRecentTransactions(5);
  recentTransactions.forEach((transaction, index) => {
    const typeIcon = transaction.type === 'sent' ? '→' : 
                    transaction.type === 'received' ? '←' : '💳';
    const recipient = transaction.recipient || transaction.sender || 'Unknown';
    console.log(`   ${index + 1}. ${typeIcon} ${transaction.currency} ${transaction.amount.toFixed(2)} - ${recipient}`);
    console.log(`      ${transaction.description} (${transaction.status})`);
  });
  console.log();

  // Test credential validation
  console.log('4. Credential Validation:');
  const validCredentials = demoDataService.validateCredentials({
    username: 'demo',
    password: 'demo123'
  });
  const invalidCredentials = demoDataService.validateCredentials({
    username: 'wrong',
    password: 'wrong'
  });
  console.log(`   Valid demo credentials: ${validCredentials}`);
  console.log(`   Invalid credentials: ${invalidCredentials}\n`);

  // Test payment processing
  console.log('5. Payment Processing Demo:');
  const paymentRequest: PaymentRequest = {
    recipient: 'Test Recipient',
    amount: 50.00,
    currency: 'USD',
    description: 'Demo payment test',
    paymentMethod: paymentMethods[0]
  };

  console.log(`   Processing payment of ${paymentRequest.currency} ${paymentRequest.amount} to ${paymentRequest.recipient}...`);
  
  try {
    const confirmation = await demoDataService.processPayment(paymentRequest);
    console.log(`   Payment ${confirmation.status}!`);
    console.log(`   Transaction ID: ${confirmation.transactionId}`);
    console.log(`   Message: ${confirmation.message}\n`);

    if (confirmation.status === 'success') {
      console.log('6. Updated Account Balance:');
      const newBalance = demoDataService.getAccountBalance();
      console.log(`   New balance: ${user.currency} ${newBalance.toFixed(2)}\n`);

      console.log('7. Updated Transaction History:');
      const updatedTransactions = demoDataService.getRecentTransactions(3);
      updatedTransactions.forEach((transaction, index) => {
        const typeIcon = transaction.type === 'sent' ? '→' : 
                        transaction.type === 'received' ? '←' : '💳';
        const recipient = transaction.recipient || transaction.sender || 'Unknown';
        console.log(`   ${index + 1}. ${typeIcon} ${transaction.currency} ${transaction.amount.toFixed(2)} - ${recipient}`);
      });
    }
  } catch (error) {
    console.error('   Payment processing failed:', error);
  }

  console.log('\n=== Demo Complete ===');
};

// Export for use in other files
export default runDemoDataDemo;