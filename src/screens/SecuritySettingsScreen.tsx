import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  time: string;
  isCurrent: boolean;
}

/**
 * SecuritySettingsScreen Component
 * Manage security settings and active sessions
 */
const SecuritySettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  const activeSessions: ActiveSession[] = [
    { id: '1', device: 'iPhone 14 Pro (This device)', location: 'Singapore', time: 'Just now', isCurrent: true },
    { id: '2', device: 'Chrome on MacOS', location: 'Singapore', time: '2 hrs ago', isCurrent: false }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleChangePIN = () => {
    alert('Change PIN functionality');
  };

  const handleChangePassword = () => {
    alert('Change Password functionality');
  };

  const handleLogOutOtherDevices = () => {
    if (confirm('Are you sure you want to log out all other devices?')) {
      alert('Logged out from all other devices');
    }
  };

  return (
    <div className="screen security-settings-screen">
      <div className="security-settings-container">
        {/* Header */}
        <div className="security-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="security-title">Security Settings</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Security Status */}
        <div className="security-status-card">
          <span className="security-icon">🛡️</span>
          <div className="security-status-info">
            <h3 className="security-status-title">Security is Strong</h3>
            <p className="security-status-desc">2FA Enabled • Biometrics Active</p>
          </div>
        </div>

        {/* Authentication */}
        <div className="security-section">
          <h3 className="security-section-title">AUTHENTICATION</h3>

          <div className="security-item">
            <span className="security-item-icon">👆</span>
            <span className="security-item-label">Face ID / Touch ID</span>
            <button
              className={`toggle-switch ${biometricsEnabled ? 'active' : ''}`}
              onClick={() => setBiometricsEnabled(!biometricsEnabled)}
            >
              <span className="toggle-slider"></span>
            </button>
          </div>

          <button className="security-item clickable" onClick={handleChangePIN}>
            <span className="security-item-icon">🔒</span>
            <span className="security-item-label">Change PIN</span>
            <span className="arrow-icon">→</span>
          </button>

          <button className="security-item clickable" onClick={handleChangePassword}>
            <span className="security-item-icon">🔄</span>
            <span className="security-item-label">Change Password</span>
            <span className="arrow-icon">→</span>
          </button>
        </div>

        {/* Active Sessions */}
        <div className="security-section">
          <h3 className="security-section-title">ACTIVE SESSIONS</h3>

          {activeSessions.map(session => (
            <div key={session.id} className="session-item">
              <span className="session-icon">{session.isCurrent ? '📱' : '💻'}</span>
              <div className="session-info">
                <span className="session-device">{session.device}</span>
                <span className="session-details">{session.location} • {session.time}</span>
              </div>
            </div>
          ))}

          <button className="log-out-devices-btn" onClick={handleLogOutOtherDevices}>
            Log Out Other Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsScreen;
