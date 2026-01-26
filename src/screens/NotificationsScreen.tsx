import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

/**
 * NotificationsScreen Component
 * Manage notification preferences
 */
const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [transactionAlerts, setTransactionAlerts] = useState<NotificationSetting[]>([
    { id: 'payment-confirmations', title: 'Payment Confirmations', description: 'Receive receipts immediately', enabled: true },
    { id: 'failed-payments', title: 'Failed Payments', description: 'Alerts when transactions fail', enabled: true },
    { id: 'settlement-updates', title: 'Settlement Updates', description: 'Daily settlement reports', enabled: false }
  ]);

  const [promotional, setPromotional] = useState<NotificationSetting[]>([
    { id: 'offers-deals', title: 'Offers & Deals', description: 'Discounts and partner perks', enabled: false },
    { id: 'new-features', title: 'New Features', description: 'Product updates and news', enabled: true }
  ]);

  const [security, setSecurity] = useState<NotificationSetting[]>([
    { id: 'security-alerts', title: 'Security Alerts', description: 'Login attempts and password changes', enabled: true }
  ]);

  const [deliveryChannels, setDeliveryChannels] = useState({
    push: true,
    email: true,
    sms: false
  });

  const handleBack = () => {
    navigate(-1);
  };

  const toggleTransactionAlert = (id: string) => {
    setTransactionAlerts(prev =>
      prev.map(alert => alert.id === id ? { ...alert, enabled: !alert.enabled } : alert)
    );
  };

  const togglePromotional = (id: string) => {
    setPromotional(prev =>
      prev.map(alert => alert.id === id ? { ...alert, enabled: !alert.enabled } : alert)
    );
  };

  const toggleSecurity = (id: string) => {
    setSecurity(prev =>
      prev.map(alert => alert.id === id ? { ...alert, enabled: !alert.enabled } : alert)
    );
  };

  const toggleDeliveryChannel = (channel: 'push' | 'email' | 'sms') => {
    setDeliveryChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  return (
    <div className="notifications-screen">
      <div className="notifications-container">
        {/* Header */}
        <div className="notifications-header">
          <button className="back-btn" onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="notifications-title">Notifications</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Transaction Alerts */}
        <div className="notification-section">
          <h3 className="notification-section-title">TRANSACTION ALERTS</h3>
          {transactionAlerts.map(alert => (
            <div key={alert.id} className="notification-item">
              <div className="notification-info">
                <span className="notification-name">{alert.title}</span>
                <span className="notification-desc">{alert.description}</span>
              </div>
              <label className={`toggle-switch ${alert.enabled ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={alert.enabled}
                  onChange={() => toggleTransactionAlert(alert.id)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>

        {/* Promotional */}
        <div className="notification-section">
          <h3 className="notification-section-title">PROMOTIONAL</h3>
          {promotional.map(alert => (
            <div key={alert.id} className="notification-item">
              <div className="notification-info">
                <span className="notification-name">{alert.title}</span>
                <span className="notification-desc">{alert.description}</span>
              </div>
              <label className={`toggle-switch ${alert.enabled ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={alert.enabled}
                  onChange={() => togglePromotional(alert.id)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="notification-section">
          <h3 className="notification-section-title">SECURITY</h3>
          {security.map(alert => (
            <div key={alert.id} className="notification-item">
              <div className="notification-info">
                <span className="notification-name">{alert.title}</span>
                <span className="notification-desc">{alert.description}</span>
              </div>
              <label className={`toggle-switch ${alert.enabled ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={alert.enabled}
                  onChange={() => toggleSecurity(alert.id)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>

        {/* Delivery Channels */}
        <div className="notification-section">
          <h3 className="notification-section-title">DELIVERY CHANNELS</h3>
          <div className="delivery-channels">
            <button
              className={`channel-checkbox ${deliveryChannels.push ? 'checked' : ''}`}
              onClick={() => toggleDeliveryChannel('push')}
            >
              <span className="checkbox-box"></span>
              <span className="channel-label">Push</span>
            </button>
            <button
              className={`channel-checkbox ${deliveryChannels.email ? 'checked' : ''}`}
              onClick={() => toggleDeliveryChannel('email')}
            >
              <span className="checkbox-box"></span>
              <span className="channel-label">Email</span>
            </button>
            <button
              className={`channel-checkbox ${deliveryChannels.sms ? 'checked' : ''}`}
              onClick={() => toggleDeliveryChannel('sms')}
            >
              <span className="checkbox-box"></span>
              <span className="channel-label">SMS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;
