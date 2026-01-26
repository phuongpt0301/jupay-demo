/**
 * TypeScript interfaces and types for JuPay Mobile Demo
 * 
 * This file contains all the core type definitions used throughout the application,
 * including user models, transaction data, navigation types, and app state management.
 */

// ============================================================================
// Screen Navigation Types
// ============================================================================

/**
 * Enumeration of all available screens in the application
 */
export const ScreenType = {
  SPLASH: 'splash',
  WELCOME: 'welcome',
  LOGIN: 'login',
  VERIFY: 'verify',
  CREATE_ACCOUNT: 'create-account',
  FORGOT_PASSWORD: 'forgot-password',
  FORGOT_PASSWORD_VERIFY: 'forgot-password-verify',
  FORGOT_PASSWORD_CODE: 'forgot-password-code',
  FORGOT_PASSWORD_NEW: 'forgot-password-new',
  REGISTER_PERSONAL: 'register-personal',
  REGISTER_ADDRESS: 'register-address',
  REGISTER_DOCUMENTS: 'register-documents',
  REGISTER_SECURITY: 'register-security',
  REGISTER_VERIFICATION: 'register-verification',
  DASHBOARD: 'dashboard',
  ALL_SERVICES: 'all-services',
  ALL_TRANSACTIONS: 'all-transactions',
  SEND_MONEY: 'send-money',
  SEND_MONEY_AMOUNT: 'send-money-amount',
  SELECT_PAYMENT_METHOD: 'select-payment-method',
  REVIEW_PAYMENT: 'review-payment',
  PAYMENT_SUCCESS: 'payment-success',
  SELECT_RECIPIENT: 'select-recipient',
  ADD_RECIPIENT: 'add-recipient',
  PAYMENT: 'payment',
  TRANSACTIONS: 'transactions',
  PROFILE: 'profile',
  PAYMENT_CONFIRMATION: 'payment-confirmation',
  PAY_BILLS: 'pay-bills',
  PAY_OVERSEAS_BILLS: 'pay-overseas-bills',
  SEND_MONEY_ABROAD: 'send-money-abroad',
  MOBILE_TOPUP: 'mobile-topup',
  GIFT_CARDS: 'gift-cards',
  KYC_VERIFICATION_STEP1: 'kyc-verification-step1',
  KYC_VERIFICATION_STEP2: 'kyc-verification-step2',
  KYC_VERIFICATION_STEP3: 'kyc-verification-step3',
  KYC_VERIFICATION_STEP4: 'kyc-verification-step4',
  KYC_ADDRESS_REJECTED: 'kyc-address-rejected',
  KYC_COMPLIANCE_STATUS: 'kyc-compliance-status',
  MENU: 'menu',
  PROFILE_INFO: 'profile-info',
  PAYMENT_METHODS: 'payment-methods',
  NOTIFICATIONS: 'notifications',
  SECURITY_SETTINGS: 'security-settings',
  HELP_CENTER: 'help-center'
} as const;

export type ScreenType = typeof ScreenType[keyof typeof ScreenType];

/**
 * Core navigation interface for managing screen transitions
 */
export interface AppNavigation {
  currentScreen: ScreenType;
  navigationHistory: ScreenType[];
  navigateToScreen: (screen: ScreenType) => Promise<void>;
  goBack: () => Promise<void>;
}

/**
 * Navigation hook interface for components
 */
export interface NavigationHook {
  navigateWithLoading: (path: string, loadingMessage?: string) => void;
  isLoading: boolean;
  currentPath: string;
  goBack: () => void;
  isNavigationBlocked: boolean;
  getNavigationHistory: () => string[];
  clearNavigationHistory: () => void;
  cancelNavigation: () => void;
  cleanup: () => void;
  navigationError?: string | null;
}

/**
 * Authentication hook interface
 */
export interface UseAuthReturn {
  // State
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  refreshUserData: () => void;
  
  // Utilities
  checkAuthStatus: () => boolean;
  requireAuth: () => boolean;
}

/**
 * App state hook interface
 */
export interface UseAppStateReturn {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  accountBalance: number;
  
  // Loading state
  isLoading: boolean;
  loadingMessage: string;
  
  // Navigation state
  currentScreen: ScreenType;
  navigationHistory: ScreenType[];
  canGoBack: boolean;
  
  // Transaction state
  transactions: Transaction[];
  recentTransactions: Transaction[];
  
  // Payment methods
  paymentMethods: PaymentMethod[];
  defaultPaymentMethod: PaymentMethod | undefined;
  
  // Actions
  setLoading: (isLoading: boolean, message?: string) => void;
  addTransaction: (transaction: Transaction) => void;
  updateUserBalance: (balance: number) => void;
  setCurrentScreen: (screen: ScreenType) => void;
  addToNavigationHistory: (screen: ScreenType) => void;
  goBack: () => void;
  resetAppState: () => void;
  
  // Utilities
  getTransactionsByType: (type: Transaction['type']) => Transaction[];
  getRecentTransactions: (count?: number) => Transaction[];
}

// ============================================================================
// Loading State Management
// ============================================================================

/**
 * Loading state management interface
 */
export interface LoadingManager {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  isLoading: boolean;
  loadingMessage: string;
}

/**
 * Props for LoadingState component
 */
export interface LoadingStateProps {
  message?: string;
  duration?: number; // defaults to 3000ms
  onComplete: () => void;
  onError?: (error: Error) => void;
}

// ============================================================================
// User and Authentication Types
// ============================================================================

/**
 * User model representing authenticated user data
 */
export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  accountBalance: number;
  currency: string;
}

/**
 * Authentication credentials for login
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Authentication state information
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error?: string;
}

// ============================================================================
// Transaction and Payment Types
// ============================================================================

/**
 * Transaction model for payment history and records
 */
export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'bill_payment';
  amount: number;
  currency: string;
  recipient?: string;
  sender?: string;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  category?: string;
}

/**
 * Payment method information
 */
export interface PaymentMethod {
  id: string;
  type: 'bank_account' | 'card' | 'wallet';
  displayName: string;
  lastFourDigits?: string;
  isDefault?: boolean;
}

/**
 * Payment request model for processing payments
 */
export interface PaymentRequest {
  recipient: string;
  amount: number;
  currency: string;
  description?: string;
  paymentMethod: PaymentMethod;
}

/**
 * Payment confirmation data
 */
export interface PaymentConfirmation {
  transactionId: string;
  amount: number;
  currency: string;
  recipient: string;
  timestamp: Date;
  status: 'success' | 'failed';
  message?: string;
}

// ============================================================================
// Component Props Interfaces
// ============================================================================

/**
 * Props for ScreenContainer component
 */
export interface ScreenContainerProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

/**
 * Props for form input components
 */
export interface FormInputProps {
  label: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

/**
 * Props for button components
 */
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Props for transaction list item component
 */
export interface TransactionItemProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
}

// ============================================================================
// App State Management
// ============================================================================

/**
 * Global application state interface
 */
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  currentScreen: ScreenType;
  isLoading: boolean;
  loadingMessage: string;
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  navigationHistory: ScreenType[];
}

/**
 * App context interface for state management
 */
export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

/**
 * Action types for app state reducer
 */
export type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean; message?: string } }
  | { type: 'SET_CURRENT_SCREEN'; payload: ScreenType }
  | { type: 'ADD_TO_HISTORY'; payload: ScreenType }
  | { type: 'GO_BACK' }
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_USER_BALANCE'; payload: number }
  | { type: 'SET_PAYMENT_METHODS'; payload: PaymentMethod[] }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'RESET_STATE' };

// ============================================================================
// Demo Data and Service Types
// ============================================================================

/**
 * Demo data service interface
 */
export interface DemoDataService {
  getDemoUser: () => User;
  getDemoTransactions: () => Transaction[];
  getDemoPaymentMethods: () => PaymentMethod[];
  processPayment: (request: PaymentRequest) => Promise<PaymentConfirmation>;
  validateCredentials: (credentials: LoginCredentials) => boolean;
}

/**
 * Demo configuration options
 */
export interface DemoConfig {
  loadingDuration: number; // milliseconds
  autoNavigationDelay: number; // milliseconds
  simulateNetworkDelay: boolean;
  enableErrorSimulation: boolean;
}

// ============================================================================
// Form and Validation Types
// ============================================================================

/**
 * Form validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Form field configuration
 */
export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  validation?: (value: string) => string | undefined;
}

/**
 * Generic form state
 */
export interface FormState<T = Record<string, any>> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================================
// Error Handling Types
// ============================================================================

/**
 * Application error interface
 */
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

/**
 * Error boundary state
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// ============================================================================
// Responsive Design Types
// ============================================================================

/**
 * Viewport size information
 */
export interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Responsive breakpoints
 */
export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

/**
 * Async operation state
 */
export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Touch event data for mobile interactions
 */
export interface TouchEventData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

// ============================================================================
// Type Guards and Utilities
// ============================================================================

/**
 * Type guard to check if a value is a valid ScreenType
 */
export const isScreenType = (value: any): value is ScreenType => {
  return Object.values(ScreenType).includes(value);
};

/**
 * Type guard to check if a transaction is completed
 */
export const isCompletedTransaction = (transaction: Transaction): boolean => {
  return transaction.status === 'completed';
};

/**
 * Type guard to check if a user is authenticated
 */
export const isAuthenticatedUser = (user: User | null): user is User => {
  return user !== null && typeof user.id === 'string' && user.id.length > 0;
};

// ============================================================================
// Constants and Enums
// ============================================================================

/**
 * Default loading duration in milliseconds
 */
export const DEFAULT_LOADING_DURATION = 3000;

/**
 * Minimum touch target size for mobile accessibility
 */
export const MIN_TOUCH_TARGET_SIZE = 44;

/**
 * Default currency for the application
 */
export const DEFAULT_CURRENCY = 'USD';

/**
 * Maximum transaction amount
 */
export const MAX_TRANSACTION_AMOUNT = 10000;

/**
 * Demo user credentials
 */
export const DEMO_CREDENTIALS = {
  username: 'demo',
  password: 'demo123'
} as const;