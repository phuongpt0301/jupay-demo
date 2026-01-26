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

  return (
    <div className="screen profile-info-screen">
      <div className="profile-info-container">
        {/* Header */}
        <div className="profile-info-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Profile Photo */}
        <div className="profile-photo-section">
          <div className="profile-photo-wrapper">
            <div className="profile-photo-large">JS</div>
            <div className="edit-photo-btn">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="30" height="30" fill="white" />
                <rect x="1" y="1" width="30" height="30" stroke="#9095A0" stroke-width="2" />
                <path d="M22.03 13.9902C22.03 13.8125 21.9594 13.6422 21.8337 13.5165C21.7237 13.4065 21.5795 13.3387 21.4261 13.3235L21.36 13.3202H19.35C19.1512 13.3202 18.9623 13.2322 18.835 13.0794L17.3609 11.3102H14.6391L13.1649 13.0794C13.0376 13.2322 12.8488 13.3202 12.65 13.3202H10.64C10.4623 13.3202 10.2919 13.3909 10.1663 13.5165C10.0406 13.6422 9.97 13.8125 9.97 13.9902L9.97 20.0202C9.97 20.1979 10.0406 20.3683 10.1663 20.4939C10.2919 20.6196 10.4623 20.6902 10.64 20.6902L21.36 20.6902C21.5377 20.6902 21.7081 20.6196 21.8337 20.4939C21.9594 20.3683 22.03 20.1979 22.03 20.0202V13.9902ZM23.37 20.0202C23.37 20.5533 23.1581 21.0644 22.7811 21.4414C22.4042 21.8183 21.8931 22.0302 21.36 22.0302L10.64 22.0302C10.1069 22.0302 9.59582 21.8183 9.21887 21.4414C8.84193 21.0644 8.63 20.5533 8.63 20.0202V13.9902C8.63 13.4571 8.84193 12.946 9.21887 12.5691C9.59582 12.1921 10.1069 11.9802 10.64 11.9802H12.3359L13.8101 10.211L13.8611 10.1573C13.9852 10.0381 14.151 9.97021 14.325 9.97021H17.675L17.749 9.97414C17.92 9.99312 18.0785 10.0774 18.19 10.211L19.6641 11.9802H21.36L21.5589 11.99C22.019 12.0358 22.4514 12.2393 22.7811 12.5691C23.1581 12.946 23.37 13.4571 23.37 13.9902V20.0202Z" fill="#171A1F" />
                <path d="M17.34 16.6702C17.34 15.9302 16.7401 15.3302 16 15.3302C15.2599 15.3302 14.66 15.9302 14.66 16.6702C14.66 17.4103 15.2599 18.0102 16 18.0102C16.7401 18.0102 17.34 17.4103 17.34 16.6702ZM18.68 16.6702C18.68 18.1503 17.4801 19.3502 16 19.3502C14.5199 19.3502 13.32 18.1503 13.32 16.6702C13.32 15.1901 14.5199 13.9902 16 13.9902C17.4801 13.9902 18.68 15.1901 18.68 16.6702Z" fill="#171A1F" />
              </svg>
            </div>
          </div>
          <div className="singpass-badge">
            <div className="badge-icon">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_0_1573)">
                  <path d="M11.36 6.50006C11.36 3.81596 9.18412 1.64006 6.5 1.64006C3.8159 1.64006 1.64 3.81596 1.64 6.50006C1.64 9.18418 3.8159 11.3601 6.5 11.3601C9.18412 11.3601 11.36 9.18418 11.36 6.50006ZM12.44 6.50006C12.44 9.78061 9.78055 12.4401 6.5 12.4401C3.21943 12.4401 0.559998 9.78061 0.559998 6.50006C0.559998 3.21949 3.21943 0.560059 6.5 0.560059C9.78055 0.560059 12.44 3.21949 12.44 6.50006Z" fill="#171A1F" />
                  <path d="M7.77938 5.00153C7.99144 4.82855 8.3041 4.84074 8.5018 5.03845C8.69954 5.23615 8.71175 5.54881 8.53873 5.76093L8.5018 5.80202L6.3418 7.96202C6.1441 8.15977 5.83144 8.17197 5.61938 7.99896L5.57824 7.96202L4.49823 6.88202L4.46131 6.84093C4.28832 6.62881 4.30052 6.31615 4.49823 6.11846C4.69593 5.92077 5.00859 5.90856 5.22069 6.08152L5.26182 6.11846L5.96002 6.81663L7.73824 5.03845L7.77938 5.00153Z" fill="#171A1F" />
                </g>
                <defs>
                  <clipPath id="clip0_0_1573">
                    <rect width="13" height="13" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
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
