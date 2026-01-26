import React, { useState } from 'react';
import { ScreenType } from '../types';
import useNavigationWithLoading from '../hooks/useNavigationWithLoading';
import { useAppState, useAuth } from '../hooks';
import { ScreenContainer } from '../components';
import './screens.css';

/**
 * ProfileScreen Component
 * 
 * User profile and settings screen with comprehensive account management options.
 * Displays user profile information, app settings, preferences, and provides
 * access to help and support features. All functionality is demo-only without
 * real external integrations.
 * 
 * Features:
 * - User profile information display with real user data
 * - Settings and preferences sections with demo functionality
 * - Help and support links (demo)
 * - Security and privacy options
 * - Account management actions
 * - Mobile-optimized responsive design
 * - Integration with app state management
 * 
 * Requirements: 3.5
 */
const ProfileScreen: React.FC = () => {
  const { navigateWithLoading } = useNavigationWithLoading();
  const { user, accountBalance } = useAppState();
  const { logout } = useAuth();
  
  // Local state for settings toggles (demo functionality)
  const [settings, setSettings] = useState({
    notifications: true,
    biometricAuth: false,
    darkMode: false,
    autoLock: true,
    transactionAlerts: true,
    marketingEmails: false
  });

  /**
   * Handle logout action
   */
  const handleLogout = () => {
    logout();
  };

  /**
   * Navigate back to dashboard
   */
  const handleBackToDashboard = () => {
    navigateWithLoading(`/${ScreenType.DASHBOARD}`, 'Loading dashboard...');
  };

  /**
   * Handle settings toggle (demo functionality)
   */
  const handleSettingToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    // Show demo feedback
    setTimeout(() => {
      alert(`Demo: ${setting} setting ${!settings[setting] ? 'enabled' : 'disabled'}`);
    }, 100);
  };

  /**
   * Handle demo help actions
   */
  const handleHelpAction = (action: string) => {
    switch (action) {
      case 'faq':
        alert('Demo: FAQ section would open here with frequently asked questions about payments, security, and account management.');
        break;
      case 'contact':
        alert('Demo: Contact support would open here with phone, email, and chat options.');
        break;
      case 'tutorial':
        alert('Demo: App tutorial would start here, guiding users through key features.');
        break;
      case 'feedback':
        alert('Demo: Feedback form would open here for users to submit suggestions and report issues.');
        break;
      default:
        alert('Demo: This help feature is not yet implemented.');
    }
  };

  /**
   * Handle demo security actions
   */
  const handleSecurityAction = (action: string) => {
    switch (action) {
      case 'changePassword':
        alert('Demo: Change password form would open here with current and new password fields.');
        break;
      case 'twoFactor':
        alert('Demo: Two-factor authentication setup would open here with SMS and authenticator app options.');
        break;
      case 'deviceManagement':
        alert('Demo: Device management would show list of logged-in devices with options to revoke access.');
        break;
      case 'loginHistory':
        alert('Demo: Login history would show recent login attempts with timestamps and locations.');
        break;
      default:
        alert('Demo: This security feature is not yet implemented.');
    }
  };

  /**
   * Handle demo account actions
   */
  const handleAccountAction = (action: string) => {
    switch (action) {
      case 'editProfile':
        alert('Demo: Edit profile form would open here to update name, email, phone, and profile picture.');
        break;
      case 'paymentMethods':
        alert('Demo: Payment methods management would show linked cards and bank accounts with options to add/remove.');
        break;
      case 'transactionLimits':
        alert('Demo: Transaction limits settings would allow users to set daily/monthly spending limits.');
        break;
      case 'closeAccount':
        alert('Demo: Account closure process would start here with confirmation steps and data export options.');
        break;
      default:
        alert('Demo: This account feature is not yet implemented.');
    }
  };

  /**
   * Format currency display
   */
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <ScreenContainer title="Profile" showBackButton>
      <div className="profile-content">
        
        {/* User Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user?.displayName || 'Demo User'}</h2>
            <p className="profile-email">{user?.email || 'demo@jupay.com'}</p>
            <p className="profile-balance">
              Balance: {formatCurrency(accountBalance, user?.currency)}
            </p>
          </div>
          <button 
            onClick={() => handleAccountAction('editProfile')}
            className="edit-profile-btn"
            aria-label="Edit profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
        </div>

        {/* Account Information Section */}
        <div className="profile-section">
          <h3 className="section-title">Account Information</h3>
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{user?.displayName || 'Demo User'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user?.email || 'demo@jupay.com'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{user?.phoneNumber || '+1 (555) 123-4567'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">User ID</span>
              <span className="detail-value">{user?.id || 'demo-user-001'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Currency</span>
              <span className="detail-value">{user?.currency || 'USD'}</span>
            </div>
          </div>
        </div>

        {/* Account Management Section */}
        <div className="profile-section">
          <h3 className="section-title">Account Management</h3>
          <div className="action-list">
            <button 
              onClick={() => handleAccountAction('paymentMethods')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">Payment Methods</span>
                <span className="action-subtitle">Manage cards and bank accounts</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>

            <button 
              onClick={() => handleAccountAction('transactionLimits')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">Transaction Limits</span>
                <span className="action-subtitle">Set spending and transfer limits</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Settings and Preferences Section */}
        <div className="profile-section">
          <h3 className="section-title">Settings & Preferences</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Push Notifications</span>
                <span className="setting-subtitle">Receive payment and security alerts</span>
              </div>
              <button 
                onClick={() => handleSettingToggle('notifications')}
                className={`toggle-switch ${settings.notifications ? 'active' : ''}`}
                aria-label={`${settings.notifications ? 'Disable' : 'Enable'} notifications`}
              >
                <div className="toggle-slider"></div>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Biometric Authentication</span>
                <span className="setting-subtitle">Use fingerprint or face ID</span>
              </div>
              <button 
                onClick={() => handleSettingToggle('biometricAuth')}
                className={`toggle-switch ${settings.biometricAuth ? 'active' : ''}`}
                aria-label={`${settings.biometricAuth ? 'Disable' : 'Enable'} biometric authentication`}
              >
                <div className="toggle-slider"></div>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Auto-Lock</span>
                <span className="setting-subtitle">Lock app when inactive</span>
              </div>
              <button 
                onClick={() => handleSettingToggle('autoLock')}
                className={`toggle-switch ${settings.autoLock ? 'active' : ''}`}
                aria-label={`${settings.autoLock ? 'Disable' : 'Enable'} auto-lock`}
              >
                <div className="toggle-slider"></div>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Transaction Alerts</span>
                <span className="setting-subtitle">Get notified of all transactions</span>
              </div>
              <button 
                onClick={() => handleSettingToggle('transactionAlerts')}
                className={`toggle-switch ${settings.transactionAlerts ? 'active' : ''}`}
                aria-label={`${settings.transactionAlerts ? 'Disable' : 'Enable'} transaction alerts`}
              >
                <div className="toggle-slider"></div>
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <span className="setting-title">Marketing Emails</span>
                <span className="setting-subtitle">Receive promotional content</span>
              </div>
              <button 
                onClick={() => handleSettingToggle('marketingEmails')}
                className={`toggle-switch ${settings.marketingEmails ? 'active' : ''}`}
                aria-label={`${settings.marketingEmails ? 'Disable' : 'Enable'} marketing emails`}
              >
                <div className="toggle-slider"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="profile-section">
          <h3 className="section-title">Security & Privacy</h3>
          <div className="action-list">
            <button 
              onClick={() => handleSecurityAction('changePassword')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">Change Password</span>
                <span className="action-subtitle">Update your login password</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>

            <button 
              onClick={() => handleSecurityAction('twoFactor')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">Two-Factor Authentication</span>
                <span className="action-subtitle">Add extra security to your account</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>

            <button 
              onClick={() => handleSecurityAction('deviceManagement')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">Device Management</span>
                <span className="action-subtitle">Manage logged-in devices</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>

            <button 
              onClick={() => handleSecurityAction('loginHistory')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">Login History</span>
                <span className="action-subtitle">View recent login activity</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Help and Support Section */}
        <div className="profile-section">
          <h3 className="section-title">Help & Support</h3>
          <div className="action-list">
            <button 
              onClick={() => handleHelpAction('faq')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">FAQ</span>
                <span className="action-subtitle">Frequently asked questions</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>

            <button 
              onClick={() => handleHelpAction('contact')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">Contact Support</span>
                <span className="action-subtitle">Get help from our team</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>

            <button 
              onClick={() => handleHelpAction('tutorial')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="5,3 19,12 5,21 5,3"></polygon>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">App Tutorial</span>
                <span className="action-subtitle">Learn how to use JuPay</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>

            <button 
              onClick={() => handleHelpAction('feedback')}
              className="action-item"
            >
              <div className="action-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div className="action-details">
                <span className="action-title">Send Feedback</span>
                <span className="action-subtitle">Help us improve the app</span>
              </div>
              <div className="action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <button 
            onClick={handleBackToDashboard}
            className="btn btn--secondary btn--full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9,22 9,12 15,12 15,22"></polyline>
            </svg>
            Back to Dashboard
          </button>
          
          <button 
            onClick={handleLogout}
            className="btn btn--danger btn--full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </ScreenContainer>
  );
};

export default ProfileScreen;