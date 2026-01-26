import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScreenType } from '../types';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../components/NotFound';
import { ErrorBoundary, LoadingErrorBoundary } from '../components';

// Import all screen components
import {
  WelcomeScreen,
  LoginScreen,
  VerifyScreen,
  CreateAccountScreen,
  ForgotPasswordScreen,
  ForgotPasswordVerifyScreen,
  ForgotPasswordCodeScreen,
  ForgotPasswordNewScreen,
  RegisterPersonalScreen,
  RegisterAddressScreen,
  RegisterDocumentsScreen,
  RegisterSecurityScreen,
  RegisterVerificationScreen,
  DashboardScreen,
  AllServicesScreen,
  AllTransactionsScreen,
  SendMoneyScreen,
  SendMoneyAmountScreen,
  SelectPaymentMethodScreen,
  ReviewPaymentScreen,
  PaymentSuccessScreen,
  SelectRecipientScreen,
  AddRecipientScreen,
  PaymentScreen,
  TransactionHistoryScreen,
  ProfileScreen,
  PaymentConfirmationScreen,
  PayBillsScreen,
  PayOverseasBillsScreen,
  SendMoneyAbroadScreen,
  MobileTopUpScreen,
  GiftCardsScreen,
  KYCVerificationStep1Screen,
  KYCVerificationStep2Screen,
  KYCVerificationStep3Screen,
  KYCAddressRejectedScreen,
  KYCComplianceStatusScreen,
  MenuScreen,
  ProfileInfoScreen,
  PaymentMethodsScreen,
  NotificationsScreen,
  SecuritySettingsScreen,
  HelpCenterScreen
} from '../screens';

/**
 * AppRouter Component
 * 
 * Main router configuration for the JuPay Mobile Demo.
 * Defines all app routes with protection and fallback handling.
 * Includes error boundaries for graceful error handling at the screen level.
 * 
 * Requirements: 4.1, 4.5
 */
const AppRouter: React.FC = () => {
  /**
   * Handle screen-level errors
   */
  const handleScreenError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error('Screen-level error occurred:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      currentPath: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  };

  /**
   * Handle loading-related errors
   */
  const handleLoadingError = (error: Error) => {
    console.error('Loading error occurred:', {
      error: error.message,
      currentPath: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  };

  /**
   * Wrap screen component with error boundaries
   */
  const withErrorBoundary = (Component: React.ComponentType, screenName: string) => {
    return (
      <ErrorBoundary 
        level="screen" 
        onError={handleScreenError}
      >
        <LoadingErrorBoundary 
          onLoadingError={handleLoadingError}
          fallbackMessage={`Failed to load ${screenName}. Please try again.`}
        >
          <Component />
        </LoadingErrorBoundary>
      </ErrorBoundary>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Splash Screen - Entry point */}
        <Route 
          path={`/${ScreenType.WELCOME}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(WelcomeScreen, 'Welcome Screen')}
            </ProtectedRoute>
          } 
        />
        
        {/* Login Screen - Authentication */}
        <Route 
          path={`/${ScreenType.LOGIN}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(LoginScreen, 'Login Screen')}
            </ProtectedRoute>
          } 
        />
        
        {/* Verify Screen - Singpass Verification */}
        <Route 
          path={`/${ScreenType.VERIFY}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(VerifyScreen, 'Verify Screen')}
            </ProtectedRoute>
          } 
        />
        
        {/* Create Account Screen */}
        <Route 
          path={`/${ScreenType.CREATE_ACCOUNT}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(CreateAccountScreen, 'Create Account')}
            </ProtectedRoute>
          } 
        />
        
        {/* Forgot Password Flow */}
        <Route 
          path={`/${ScreenType.FORGOT_PASSWORD}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(ForgotPasswordScreen, 'Forgot Password')}
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path={`/${ScreenType.FORGOT_PASSWORD_VERIFY}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(ForgotPasswordVerifyScreen, 'Verify Email')}
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path={`/${ScreenType.FORGOT_PASSWORD_CODE}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(ForgotPasswordCodeScreen, 'Enter Code')}
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path={`/${ScreenType.FORGOT_PASSWORD_NEW}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(ForgotPasswordNewScreen, 'New Password')}
            </ProtectedRoute>
          } 
        />
        
        {/* Registration Flow */}
        <Route 
          path={`/${ScreenType.REGISTER_PERSONAL}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(RegisterPersonalScreen, 'Register Personal')}
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path={`/${ScreenType.REGISTER_ADDRESS}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(RegisterAddressScreen, 'Register Address')}
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path={`/${ScreenType.REGISTER_DOCUMENTS}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(RegisterDocumentsScreen, 'Register Documents')}
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path={`/${ScreenType.REGISTER_SECURITY}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(RegisterSecurityScreen, 'Register Security')}
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path={`/${ScreenType.REGISTER_VERIFICATION}`} 
          element={
            <ProtectedRoute requireAuth={false}>
              {withErrorBoundary(RegisterVerificationScreen, 'Register Verification')}
            </ProtectedRoute>
          } 
        />
        
        {/* Dashboard Screen - Main hub (protected) */}
        <Route 
          path={`/${ScreenType.DASHBOARD}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(DashboardScreen, 'Dashboard')}
            </ProtectedRoute>
          } 
        />
        
        {/* All Services Screen (protected) */}
        <Route 
          path={`/${ScreenType.ALL_SERVICES}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(AllServicesScreen, 'All Services')}
            </ProtectedRoute>
          } 
        />
        
        {/* All Transactions Screen (protected) */}
        <Route 
          path={`/${ScreenType.ALL_TRANSACTIONS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(AllTransactionsScreen, 'All Transactions')}
            </ProtectedRoute>
          } 
        />
        
        {/* Send Money Screen (protected) */}
        <Route 
          path={`/${ScreenType.SEND_MONEY}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(SendMoneyScreen, 'Send Money')}
            </ProtectedRoute>
          } 
        />
        
        {/* Send Money Amount Screen (protected) */}
        <Route 
          path={`/${ScreenType.SEND_MONEY_AMOUNT}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(SendMoneyAmountScreen, 'Send Money Amount')}
            </ProtectedRoute>
          } 
        />
        
        {/* Select Payment Method Screen (protected) */}
        <Route 
          path={`/${ScreenType.SELECT_PAYMENT_METHOD}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(SelectPaymentMethodScreen, 'Select Payment Method')}
            </ProtectedRoute>
          } 
        />
        
        {/* Review Payment Screen (protected) */}
        <Route 
          path={`/${ScreenType.REVIEW_PAYMENT}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(ReviewPaymentScreen, 'Review Payment')}
            </ProtectedRoute>
          } 
        />
        
        {/* Payment Success Screen (protected) */}
        <Route 
          path={`/${ScreenType.PAYMENT_SUCCESS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(PaymentSuccessScreen, 'Payment Success')}
            </ProtectedRoute>
          } 
        />
        
        {/* Select Recipient Screen (protected) */}
        <Route 
          path={`/${ScreenType.SELECT_RECIPIENT}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(SelectRecipientScreen, 'Select Recipient')}
            </ProtectedRoute>
          } 
        />
        
        {/* Add Recipient Screen (protected) */}
        <Route 
          path={`/${ScreenType.ADD_RECIPIENT}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(AddRecipientScreen, 'Add Recipient')}
            </ProtectedRoute>
          } 
        />
        
        {/* Payment Screen - Send payments (protected) */}
        <Route 
          path={`/${ScreenType.PAYMENT}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(PaymentScreen, 'Payment Screen')}
            </ProtectedRoute>
          } 
        />
        
        {/* Transaction History Screen (protected) */}
        <Route 
          path={`/${ScreenType.TRANSACTIONS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(TransactionHistoryScreen, 'Transaction History')}
            </ProtectedRoute>
          } 
        />
        
        {/* Profile Screen - Settings (protected) */}
        <Route 
          path={`/${ScreenType.PROFILE}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(ProfileScreen, 'Profile Screen')}
            </ProtectedRoute>
          } 
        />
        
        {/* Payment Confirmation Screen (protected) */}
        <Route 
          path={`/${ScreenType.PAYMENT_CONFIRMATION}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(PaymentConfirmationScreen, 'Payment Confirmation')}
            </ProtectedRoute>
          } 
        />
        
        {/* Pay Bills Screen (protected) */}
        <Route 
          path={`/${ScreenType.PAY_BILLS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(PayBillsScreen, 'Pay Bills')}
            </ProtectedRoute>
          } 
        />
        
        {/* Pay Overseas Bills Screen (protected) */}
        <Route 
          path={`/${ScreenType.PAY_OVERSEAS_BILLS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(PayOverseasBillsScreen, 'Pay Overseas Bills')}
            </ProtectedRoute>
          } 
        />
        
        {/* Send Money Abroad Screen (protected) */}
        <Route 
          path={`/${ScreenType.SEND_MONEY_ABROAD}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(SendMoneyAbroadScreen, 'Send Money Abroad')}
            </ProtectedRoute>
          } 
        />
        
        {/* Mobile Top-up Screen (protected) */}
        <Route 
          path={`/${ScreenType.MOBILE_TOPUP}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(MobileTopUpScreen, 'Mobile Top-up')}
            </ProtectedRoute>
          } 
        />
        
        {/* Gift Cards Screen (protected) */}
        <Route 
          path={`/${ScreenType.GIFT_CARDS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(GiftCardsScreen, 'Gift Cards')}
            </ProtectedRoute>
          } 
        />
        
        {/* KYC Verification Step 1 Screen (protected) */}
        <Route 
          path={`/${ScreenType.KYC_VERIFICATION_STEP1}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(KYCVerificationStep1Screen, 'KYC Verification Step 1')}
            </ProtectedRoute>
          } 
        />
        
        {/* KYC Verification Step 2 Screen (protected) */}
        <Route 
          path={`/${ScreenType.KYC_VERIFICATION_STEP2}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(KYCVerificationStep2Screen, 'KYC Verification Step 2')}
            </ProtectedRoute>
          } 
        />
        
        {/* KYC Verification Step 3 Screen (protected) */}
        <Route 
          path={`/${ScreenType.KYC_VERIFICATION_STEP3}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(KYCVerificationStep3Screen, 'KYC Verification Step 3')}
            </ProtectedRoute>
          } 
        />
        
        {/* KYC Address Rejected Screen (protected) */}
        <Route 
          path={`/${ScreenType.KYC_ADDRESS_REJECTED}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(KYCAddressRejectedScreen, 'KYC Address Rejected')}
            </ProtectedRoute>
          } 
        />
        
        {/* KYC Compliance Status Screen (protected) */}
        <Route 
          path={`/${ScreenType.KYC_COMPLIANCE_STATUS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(KYCComplianceStatusScreen, 'KYC Compliance Status')}
            </ProtectedRoute>
          } 
        />
        
        {/* Menu Screen (protected) */}
        <Route 
          path={`/${ScreenType.MENU}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(MenuScreen, 'Menu')}
            </ProtectedRoute>
          } 
        />
        
        {/* Profile Info Screen (protected) */}
        <Route 
          path={`/${ScreenType.PROFILE_INFO}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(ProfileInfoScreen, 'Profile Info')}
            </ProtectedRoute>
          } 
        />
        
        {/* Payment Methods Screen (protected) */}
        <Route 
          path={`/${ScreenType.PAYMENT_METHODS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(PaymentMethodsScreen, 'Payment Methods')}
            </ProtectedRoute>
          } 
        />
        
        {/* Notifications Screen (protected) */}
        <Route 
          path={`/${ScreenType.NOTIFICATIONS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(NotificationsScreen, 'Notifications')}
            </ProtectedRoute>
          } 
        />
        
        {/* Security Settings Screen (protected) */}
        <Route 
          path={`/${ScreenType.SECURITY_SETTINGS}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(SecuritySettingsScreen, 'Security Settings')}
            </ProtectedRoute>
          } 
        />
        
        {/* Help Center Screen (protected) */}
        <Route 
          path={`/${ScreenType.HELP_CENTER}`} 
          element={
            <ProtectedRoute requireAuth={true}>
              {withErrorBoundary(HelpCenterScreen, 'Help Center')}
            </ProtectedRoute>
          } 
        />
        
        {/* Root redirect to splash screen */}
        <Route 
          path="/" 
          element={<Navigate to={`/${ScreenType.WELCOME}`} replace />} 
        />
        
        {/* Fallback for invalid routes */}
        <Route 
          path="*" 
          element={
            <ErrorBoundary level="screen" onError={handleScreenError}>
              <NotFound />
            </ErrorBoundary>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;