# Services

This directory contains service modules for the JuPay Mobile Demo application.

## Demo Data Service

The `demoDataService` provides realistic demo data and simulated functionality for the mobile payment app prototype.

### Features

- **User Data**: Realistic demo user profile with account balance
- **Transaction History**: Generated transaction history with various types (sent, received, bill payments)
- **Payment Methods**: Multiple payment method types (bank account, cards, wallet)
- **Payment Processing**: Simulated payment processing without actual financial transactions
- **Credential Validation**: Demo login credential validation
- **Data Management**: Utilities for filtering, searching, and managing demo data

### Usage

```typescript
import { demoDataService } from '../services/demoDataService';

// Get demo user
const user = demoDataService.getDemoUser();

// Get transaction history
const transactions = demoDataService.getDemoTransactions();

// Get payment methods
const paymentMethods = demoDataService.getDemoPaymentMethods();

// Process a demo payment
const paymentRequest = {
  recipient: 'John Doe',
  amount: 100.00,
  currency: 'USD',
  description: 'Test payment',
  paymentMethod: paymentMethods[0]
};

const confirmation = await demoDataService.processPayment(paymentRequest);
```

### Demo Credentials

- **Username**: `demo`
- **Password**: `demo123`

### Data Characteristics

- **Account Balance**: $2,847.50 (updates with payments)
- **Transaction Count**: ~15 realistic transactions over the last 30 days
- **Payment Methods**: 4 different methods including bank account, cards, and wallet
- **Transaction Types**: Sent payments, received payments, and bill payments
- **Transaction Status**: Mostly completed, some pending, few failed (realistic distribution)

### API Methods

#### Core Data Access
- `getDemoUser()`: Returns demo user profile
- `getDemoTransactions()`: Returns all transaction history
- `getDemoPaymentMethods()`: Returns available payment methods

#### Authentication
- `validateCredentials(credentials)`: Validates demo login credentials

#### Payment Processing
- `processPayment(request)`: Simulates payment processing with realistic delays

#### Utility Methods
- `getRecentTransactions(count)`: Get N most recent transactions
- `getTransactionsByType(type)`: Filter transactions by type
- `getTransactionsByStatus(status)`: Filter transactions by status
- `searchTransactions(query)`: Search transactions by description/recipient
- `getAccountBalance()`: Get current account balance
- `getDefaultPaymentMethod()`: Get the default payment method
- `getDemoRecipients()`: Get list of demo recipient names
- `resetDemoData()`: Reset all data to initial state

### Testing

The service includes comprehensive unit tests covering:
- Data integrity and structure validation
- Payment processing simulation
- Credential validation
- Utility method functionality
- Error handling and edge cases

Run tests with:
```bash
npm test src/services/demoDataService.test.ts
```

### Requirements Compliance

This service fulfills **Requirement 5.3**: Demo data population with realistic content, providing:
- Realistic user profiles and account information
- Diverse transaction history with proper categorization
- Multiple payment method types
- Proper data relationships and consistency
- No external API dependencies or real financial transactions