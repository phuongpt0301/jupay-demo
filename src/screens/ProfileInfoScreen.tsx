import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, selectors } from '../context';
import './screens.css';

/**
 * ProfileInfoScreen Component
 * Display user profile information
 */
const ProfileInfoScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const user = selectors.getCurrentUser(state);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditPhoto = () => {
    alert('Edit photo functionality');
  };

  return (
    <div className="screen profile-info-screen">
      <div className="profile-info-container">
        {/* Header */}
        <div className="profile-info-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Profile Photo */}
        <div className="profile-photo-section">
          <div className="profile-photo-wrapper">
            <div className="profile-photo-large">JS</div>
            <button className="edit-photo-btn" onClick={handleEditPhoto}>
              📷
            </button>
          </div>
          <div className="singpass-badge">
            <span className="badge-icon">✓</span>
            SINGPASS VERIFIED
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="profile-field">
            <label className="profile-label">Full Name</label>
            <p className="profile-value">{user?.displayName || 'Jason Siyam'}</p>
          </div>

          <div className="profile-field">
            <label className="profile-label">NRIC / FIN</label>
            <p className="profile-value">T1234***E</p>
          </div>

          <div className="profile-field">
            <label className="profile-label">Email</label>
            <p className="profile-value">{user?.email || 'jason.siyam@example.com'}</p>
          </div>

          <div className="profile-field">
            <label className="profile-label">Phone</label>
            <p className="profile-value">{user?.phoneNumber || '+65 9123 4567'}</p>
          </div>

          <div className="profile-field">
            <label className="profile-label">Date of Birth</label>
            <p className="profile-value">15 Aug 1990</p>
          </div>

          <div className="profile-field">
            <label className="profile-label">Nationality</label>
            <p className="profile-value">Singaporean</p>
          </div>

          <div className="profile-field">
            <label className="profile-label">Address</label>
            <p className="profile-value">
              12 Marina Blvd, #24-01, MBFC Tower 3,<br />
              Singapore 018982
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoScreen;
