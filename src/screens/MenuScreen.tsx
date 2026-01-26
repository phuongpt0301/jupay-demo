import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, selectors, appActions } from '../context';
import { ScreenType } from '../types';
import './screens.css';

/**
 * MenuScreen Component
 * Main menu with profile and settings navigation
 */
const MenuScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const user = selectors.getCurrentUser(state);

  const handleProfileInfo = () => {
    navigate(`/${ScreenType.PROFILE_INFO}`);
  };

  const handlePaymentMethods = () => {
    navigate(`/${ScreenType.PAYMENT_METHODS}`);
  };

  const handleNotifications = () => {
    navigate(`/${ScreenType.NOTIFICATIONS}`);
  };

  const handleSecurity = () => {
    navigate(`/${ScreenType.SECURITY_SETTINGS}`);
  };

  const handleHelpSupport = () => {
    navigate(`/${ScreenType.HELP_CENTER}`);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      dispatch(appActions.clearUser());
      navigate(`/${ScreenType.LOGIN}`, { replace: true });
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="screen menu-screen">
      <div className="menu-container">
        {/* Header */}
        <div className="menu-header">
          <h1 className="menu-title">Menu</h1>
          <button className="menu-close-btn" onClick={handleClose}>✕</button>
        </div>

        {/* Profile Card */}
        <div className="menu-profile-card">
          <div className="menu-avatar">👤</div>
          <div className="menu-profile-info">
            <span className="menu-profile-name">{user?.displayName || 'Jason Siyam'}</span>
            <span className="menu-profile-phone">+65 9123 4567</span>
          </div>
          <button className="menu-edit-btn" onClick={handleProfileInfo}>EDIT</button>
        </div>

        {/* Menu Items */}
        <div className="menu-items">
          <button className="menu-item" onClick={handleProfileInfo}>
            <span className="menu-item-icon">👤</span>
            <div className="menu-item-info">
              <span className="menu-item-title">Profile Information</span>
              <span className="menu-item-subtitle">Edit details</span>
            </div>
            <span className="arrow-icon">→</span>
          </button>

          <button className="menu-item" onClick={handlePaymentMethods}>
            <span className="menu-item-icon">💳</span>
            <div className="menu-item-info">
              <span className="menu-item-title">Payment Methods</span>
              <span className="menu-item-subtitle">Manage cards</span>
            </div>
            <span className="arrow-icon">→</span>
          </button>

          <button className="menu-item" onClick={handleNotifications}>
            <span className="menu-item-icon">🔔</span>
            <div className="menu-item-info">
              <span className="menu-item-title">Notifications</span>
              <span className="menu-item-subtitle">Preferences</span>
            </div>
            <span className="arrow-icon">→</span>
          </button>

          <button className="menu-item" onClick={handleSecurity}>
            <span className="menu-item-icon">🛡️</span>
            <div className="menu-item-info">
              <span className="menu-item-title">Security</span>
              <span className="menu-item-subtitle">2FA, Password</span>
            </div>
            <span className="arrow-icon">→</span>
          </button>

          <button className="menu-item" onClick={handleHelpSupport}>
            <span className="menu-item-icon">❓</span>
            <div className="menu-item-info">
              <span className="menu-item-title">Help & Support</span>
              <span className="menu-item-subtitle">FAQ, Contact</span>
            </div>
            <span className="arrow-icon">→</span>
          </button>
        </div>

        {/* Log Out */}
        <button className="menu-logout-btn" onClick={handleLogout}>
          <span className="logout-icon">↗️</span>
          Log Out
        </button>

        {/* App Version */}
        <p className="menu-version">App Version 11.0 • Build 2026.01.15</p>
      </div>
    </div>
  );
};

export default MenuScreen;
