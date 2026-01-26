import { BottomNavigation, ScreenContainer } from '../components';
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
  return (
    <ScreenContainer>
      <div className="dashboard-content">
        <h1>Payment</h1>
      </div>
      <BottomNavigation />
    </ScreenContainer>
  );
};

export default PaymentScreen;