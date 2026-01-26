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
    <div className="screen notifications-screen">
      <div className="notifications-container">
        {/* Header */}
        <div className="notifications-header">
          <button className="back-btn" onClick={handleBack}>←</button>
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
              <button
                className={`toggle-switch ${alert.enabled ? 'active' : ''}`}
                onClick={() => toggleTransactionAlert(alert.id)}
              >
                <span className="toggle-slider"></span>
              </button>
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
              <button
                className={`toggle-switch ${alert.enabled ? 'active' : ''}`}
                onClick={() => togglePromotional(alert.id)}
              >
                <span className="toggle-slider"></span>
              </button>
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
              <button
                className={`toggle-switch ${alert.enabled ? 'active' : ''}`}
                onClick={() => toggleSecurity(alert.id)}
              >
                <span className="toggle-slider"></span>
              </button>
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
