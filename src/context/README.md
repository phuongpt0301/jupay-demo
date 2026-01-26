# Global App State Management

This directory contains the global state management system for the JuPay Mobile Demo application using React Context API.

## Overview

The global state management system provides:

- **Authentication State**: User login/logout and authentication status
- **User Data Management**: User profile, account balance, and preferences
- **Transaction Management**: Transaction history and real-time updates
- **Loading State Coordination**: Global loading states for consistent UX
- **Navigation History**: Track navigation for back button functionality

## Architecture

### Core Components

1. **AppContext.tsx** - Main context implementation with reducer and provider
2. **useAuth.ts** - Authentication-specific hook for login/logout operations
3. **useAppState.ts** - General app state hook for accessing global state

### State Structure

```typescript
interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentScreen: ScreenType;
  isLoading: boolean;
  loadingMessage: string;
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  navigationHistory: ScreenType[];
}
```

### Actions

The state is managed through a reducer with the following actions:

- `SET_USER` - Set authenticated user data
- `CLEAR_USER` - Clear user data and logout
- `SET_LOADING` - Set global loading state
- `SET_CURRENT_SCREEN` - Update current screen
- `ADD_TO_HISTORY` - Add screen to navigation history
- `GO_BACK` - Navigate to previous screen
- `SET_TRANSACTIONS` - Set transaction list
- `ADD_TRANSACTION` - Add new transaction
- `SET_PAYMENT_METHODS` - Set payment methods
- `RESET_STATE` - Reset entire app state

## Usage

### 1. Wrap App with Provider

```tsx
import { AppProvider } from './context';

function App() {
  return (
    <AppProvider>
      <YourAppComponents />
    </AppProvider>
  );
}
```

### 2. Use Authentication Hook

```tsx
import { useAuth } from './hooks/useAuth';

function LoginComponent() {
  const { login, logout, isAuthenticated, user } = useAuth();
  
  const handleLogin = async (credentials) => {
    const success = await login(credentials);
    if (success) {
      // Navigate to dashboard
    }
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome {user?.displayName}</div>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
}
```

### 3. Use App State Hook

```tsx
import { useAppState } from './hooks/useAppState';

function DashboardComponent() {
  const { 
    user, 
    accountBalance, 
    recentTransactions,
    setLoading,
    addTransaction 
  } = useAppState();
  
  return (
    <div>
      <h1>Welcome {user?.displayName}</h1>
      <p>Balance: ${accountBalance}</p>
      <TransactionList transactions={recentTransactions} />
    </div>
  );
}
```

### 4. Direct Context Access

```tsx
import { useAppContext, appActions } from './context';

function CustomComponent() {
  const { state, dispatch } = useAppContext();
  
  const handleAction = () => {
    dispatch(appActions.setLoading(true, 'Processing...'));
  };
  
  return <div>{state.isLoading ? 'Loading...' : 'Ready'}</div>;
}
```

## Features

### Authentication Management

- Automatic login/logout handling
- Persistent authentication state (localStorage)
- Demo credential validation
- User data loading on authentication

### Loading State Coordination

- Global loading states for consistent UX
- Loading messages for user feedback
- Automatic loading state management during navigation

### Transaction Management

- Real-time transaction updates
- Transaction history management
- Transaction filtering and searching
- Demo transaction generation

### Navigation History

- Track navigation for back button functionality
- Navigation state persistence
- Route protection based on authentication

### Data Persistence

- Authentication state persisted to localStorage
- Automatic state restoration on app reload
- Demo data reset functionality

## Error Handling

The context includes comprehensive error handling:

- Invalid context usage detection
- Authentication failure handling
- Data loading error recovery
- State corruption prevention

## Testing

The context is fully testable with:

- Unit tests for reducer functions
- Integration tests for authentication flow
- Mock providers for component testing
- State persistence testing

## Performance Considerations

- Selective re-rendering with proper selectors
- Memoized action creators
- Efficient state updates with immutable patterns
- Minimal context value changes

## Security Notes

- Demo credentials are hardcoded for prototype purposes
- No actual authentication tokens in production
- Local storage used only for demo state persistence
- All financial operations are simulated

## Requirements Fulfilled

- **4.4**: Navigation and User Flow - Navigation history management
- **6.4**: Technical Implementation - Modern React patterns and state management

This implementation provides a robust, scalable foundation for global state management that can be easily extended for production use.