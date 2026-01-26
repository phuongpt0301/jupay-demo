import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * SendMoneyScreen Component
 * Send Money to Anyone - Shows new payment option and recent beneficiaries
 */
const SendMoneyScreen: React.FC = () => {
  const navigate = useNavigate();

  const recentBeneficiaries = [
    { id: 1, name: 'Alice Wonderland' },
    { id: 2, name: 'Bob The Builder' },
    { id: 3, name: 'Charlie Chaplin' },
    { id: 4, name: 'Diana Prince' },
  ];

  const handleNewPayment = () => {
    navigate(`/${ScreenType.ADD_RECIPIENT}`);
  };

  const handleReceiptClick = () => {
    // Navigate to payment screen with selected beneficiary
    // navigate(`/${ScreenType.PAYMENT}`, { state: { recipient: beneficiary.name } });
    navigate(`/${ScreenType.SELECT_RECIPIENT}`);
  };

  const handleViewAllTransactions = () => {
    navigate(`/${ScreenType.ALL_TRANSACTIONS}`);
  };

  return (
    <div className="send-money-screen">
      <div className="send-money-container">
        {/* Header */}
        <div className="send-money-header">
          <h1 className="send-money-title">Send Money to Anyone</h1>
          <div className="header-icons">
            <button className="icon-send-btn notification-btn">
              <span className="notification-badge">5</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7646 17.0187C11.0106 16.6774 11.4802 16.5713 11.8523 16.7861C12.2246 17.001 12.3678 17.4609 12.1952 17.8447L12.1564 17.92C11.9378 18.2984 11.6236 18.6126 11.2453 18.8311C10.8669 19.0496 10.4372 19.1649 10.0003 19.165C9.56328 19.165 9.13376 19.0496 8.75528 18.8311C8.42403 18.6399 8.14191 18.3754 7.93014 18.0586L7.84342 17.92L7.80451 17.8447C7.632 17.4609 7.7752 17.001 8.14737 16.7861C8.51956 16.5713 8.98909 16.6774 9.2351 17.0187L9.28133 17.09L9.34134 17.1808C9.40741 17.2669 9.49066 17.3394 9.58528 17.394C9.71136 17.4667 9.8547 17.505 10.0003 17.505C10.1459 17.5049 10.2892 17.4668 10.4153 17.394C10.5414 17.3212 10.6456 17.2161 10.7184 17.09L10.7646 17.0187Z" fill="#171A1F" />
                <path d="M14.1498 6.67499C14.1498 5.57448 13.7129 4.51906 12.9348 3.74081C12.1565 2.96253 11.1005 2.52499 9.99981 2.52499C8.89923 2.52505 7.84383 2.96258 7.06561 3.74081C6.2874 4.51907 5.84979 5.57439 5.84979 6.67499L5.84655 7.03487C5.81102 8.79854 5.51248 10.0592 5.04735 11.0439C4.55727 12.0813 3.90692 12.751 3.3606 13.315L16.6398 13.315C16.0923 12.7507 15.4429 12.0806 14.9531 11.0439C14.4567 9.99333 14.1498 8.62889 14.1498 6.67499ZM15.8098 6.67499C15.8098 8.45509 16.0886 9.56248 16.4534 10.3346C16.7276 10.9151 17.0656 11.3415 17.4503 11.7587L17.8499 12.1786L17.8678 12.1981C18.0843 12.436 18.2272 12.7316 18.2787 13.0491C18.3302 13.3665 18.2888 13.6921 18.1588 13.9861C18.0286 14.2802 17.8155 14.5304 17.546 14.7059C17.31 14.8595 17.0393 14.9508 16.7597 14.9709L16.6398 14.975L3.35979 14.975C3.03807 14.9747 2.72304 14.8809 2.4536 14.7051C2.18415 14.5293 1.97143 14.2789 1.84164 13.9845C1.71189 13.6902 1.67053 13.3642 1.72248 13.0467C1.77446 12.7293 1.91753 12.434 2.13424 12.1964L2.15126 12.1778L2.55087 11.7587C2.93501 11.3417 3.27199 10.9151 3.54622 10.3346C3.88817 9.6107 4.15458 8.59221 4.18655 7.00083L4.18979 6.67499C4.18979 5.13408 4.80235 3.65592 5.89194 2.56632C6.98145 1.47698 8.45908 0.865048 9.99981 0.86499C11.5406 0.86499 13.0189 1.47681 14.1085 2.56632C15.198 3.65592 15.8098 5.13408 15.8098 6.67499Z" fill="#171A1F" />
              </svg>
            </button>
            <button className="icon-send-btn profile-btn" onClick={() => navigate(`/${ScreenType.PROFILE}`)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9799 17.4899L14.9799 15.8299C14.9799 15.1696 14.7173 14.5364 14.2504 14.0694C13.8418 13.6609 13.3062 13.4087 12.7363 13.3521L12.4899 13.3399L7.50986 13.3399C6.84947 13.3399 6.21632 13.6025 5.74936 14.0694C5.28239 14.5364 5.01986 15.1696 5.01986 15.8299L5.01986 17.4899C5.01986 17.9483 4.64826 18.3199 4.18986 18.3199C3.73147 18.3199 3.35986 17.9483 3.35986 17.4899L3.35986 15.8299C3.35986 14.7293 3.79741 13.674 4.57568 12.8957C5.35396 12.1175 6.40922 11.6799 7.50986 11.6799L12.4899 11.6799L12.6957 11.6848C13.7214 11.7357 14.6944 12.1661 15.4241 12.8957C16.2023 13.674 16.6399 14.7293 16.6399 15.8299L16.6399 17.4899C16.6399 17.9483 16.2683 18.3199 15.8099 18.3199C15.3515 18.3199 14.9799 17.9483 14.9799 17.4899Z" fill="#565E6D" />
                <path d="M12.4901 5.82993C12.4901 4.45475 11.3753 3.33993 10.0001 3.33993C8.62487 3.33993 7.5101 4.45475 7.5101 5.82993C7.5101 7.20512 8.62487 8.31993 10.0001 8.31993C11.3753 8.31993 12.4901 7.20512 12.4901 5.82993ZM14.1501 5.82993C14.1501 8.12191 12.2921 9.97993 10.0001 9.97993C7.70812 9.97993 5.8501 8.12191 5.8501 5.82993C5.8501 3.53795 7.70812 1.67993 10.0001 1.67993C12.2921 1.67993 14.1501 3.53795 14.1501 5.82993Z" fill="#565E6D" />
              </svg>
            </button>
          </div>
        </div>

        {/* New Payment Card */}
        <button className="new-payment-card" onClick={handleNewPayment}>
          <div className="new-payment-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#171A1F" />
              <path d="M11 19L11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5L13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19Z" fill="#171A1F" />
            </svg>
          </div>
          <span className="new-payment-text">New Payment</span>
        </button>

        {/* Recent Beneficiaries */}
        <div className="beneficiaries-section">
          <h2 className="section-title">Recent Beneficiaries</h2>
          <div className="beneficiaries-list">
            {recentBeneficiaries.map(beneficiary => (
              <button
                key={beneficiary.id}
                className="beneficiary-item"
                onClick={() => handleReceiptClick()}
              >
                <div className="beneficiary-avatar">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#9095A0" />
                    <path d="M21.5 22H18.5C16.0145 22 14 24.0145 14 26.5C14 26.5 16.25 27.5 20 27.5C23.75 27.5 26 26.5 26 26.5C26 24.0145 23.9855 22 21.5 22Z" stroke="white" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="square" />
                    <path d="M16.5 16C16.5 14.067 18.067 12.5 20 12.5C21.933 12.5 23.5 14.067 23.5 16C23.5 17.933 21.933 20 20 20C18.067 20 16.5 17.933 16.5 16Z" stroke="white" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="square" />
                  </svg>
                </div>
                <span className="beneficiary-name">{beneficiary.name}</span>
                <div className="beneficiary-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.92327 4.43316C7.22715 4.12928 7.70772 4.11053 8.03372 4.37642L8.09695 4.43316L13.0769 9.41317C13.4011 9.73729 13.4011 10.2627 13.0769 10.5868L8.09695 15.5668C7.77281 15.891 7.24741 15.891 6.92327 15.5668C6.59914 15.2427 6.59914 14.7173 6.92327 14.3932L11.3164 9.99998L6.92327 5.60683L6.86654 5.5436C6.60065 5.21761 6.6194 4.73703 6.92327 4.43316Z" fill="#171A1F" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="send-summary">
          <p className="summary-text">Sent S$1,250 this month</p>
          <button className="view-all-link" onClick={handleViewAllTransactions}>
            View All Transactions
          </button>
        </div>

        {/* Footer Note */}
        <div className="send-footer">
          <p>Funds delivered in 3 business days</p>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyScreen;
