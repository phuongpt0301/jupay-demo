import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * ReviewPaymentScreen Component
 * Review payment details before confirmation
 */
const ReviewPaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipient, amount, purpose, reference, paymentMethod, fee, total } = location.state || {};
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleConfirmPayment = () => {
    if (agreeToTerms) {
      navigate(`/${ScreenType.PAYMENT_SUCCESS}`, {
        state: { recipient, amount, purpose, reference, total }
      });
    }
  };

  const handleEditDetails = () => {
    navigate(-1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="review-payment-screen">
      <div className="review-payment-container">
        {/* Header */}
        <div className="review-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="review-title">Review Payment</h1>
        </div>

        {/* Payment Details */}
        <div className="review-details-card">
          <div className="review-row">
            <span className="review-label">To:</span>
            <div className="review-value-right">
              <span className="review-value-main">{recipient || 'John Tan'}</span>
              <span className="review-value-sub">(DBS ••••1234)</span>
            </div>
          </div>

          <div className="review-row">
            <span className="review-label">Amount:</span>
            <span className="review-value">S${amount || '500.00'}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Purpose:</span>
            <span className="review-value">{purpose || 'Family Support'}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Reference:</span>
            <span className="review-value">{reference || 'Birthday gift'}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Payment Method:</span>
            <span className="review-value">{paymentMethod === 'wallet' ? 'OxPay Wallet' : 'Credit Card'}</span>
          </div>

          <div className="review-divider"></div>

          <div className="review-row">
            <span className="review-label">Fee:</span>
            <span className="review-value">S${fee?.toFixed(2) || '2.50'}</span>
          </div>

          <div className="review-row total-row">
            <span className="review-label-total">Total:</span>
            <span className="review-value-total">S${total?.toFixed(2) || '502.50'}</span>
          </div>

          <div className="review-row">
            <span className="review-label">Processing:</span>
            <span className="review-value">3 business days</span>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="terms-agreement">
          <label className="checkbox-label" htmlFor="terms-checkbox">
            <input
              id="terms-checkbox"
              type="checkbox"
              className="checkbox-input"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <span className="checkbox-text">I agree to terms and conditions</span>
          </label>
        </div>

        {/* Confirm Button */}
        <button
          className="confirm-payment-btn"
          onClick={handleConfirmPayment}
          disabled={!agreeToTerms}
        >
          <div className="fingerprint-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50752 10C7.50752 9.33966 7.7701 8.70645 8.23701 8.23951C8.70392 7.77258 9.33721 7.51006 9.99756 7.51001C10.4559 7.51001 10.8276 7.88162 10.8276 8.34001C10.8276 8.79842 10.4559 9.17001 9.99756 9.17001C9.77744 9.17009 9.56629 9.25757 9.41066 9.4132C9.25512 9.56883 9.16756 9.77989 9.16756 10C9.16756 10.8879 9.0814 12.157 8.94703 13.4083C8.89814 13.8641 8.4892 14.1939 8.03356 14.1451C7.57787 14.0962 7.24798 13.6874 7.29678 13.2317C7.42799 12.0097 7.50752 10.8052 7.50752 10Z" fill="#565E6D" />
              <path d="M10.8351 10.9447C10.8351 10.4863 11.2067 10.1147 11.6651 10.1147C12.1236 10.1147 12.4951 10.4863 12.4951 10.9447C12.4951 11.9295 12.4956 13.2842 12.389 14.6571C12.2834 16.0165 12.0685 17.4665 11.606 18.6231C11.4357 19.0486 10.9527 19.256 10.5271 19.0859C10.1016 18.9157 9.89426 18.4326 10.0643 18.007C10.4316 17.0888 10.6319 15.8411 10.7338 14.5282C10.8347 13.2285 10.8351 11.9354 10.8351 10.9447Z" fill="#565E6D" />
              <path d="M15.2259 17.6758C15.136 18.1253 14.6987 18.4174 14.2491 18.3275C13.7998 18.2375 13.5085 17.8001 13.5983 17.3507L15.2259 17.6758ZM14.9073 14.1807C15.335 14.2223 15.6552 14.5813 15.6571 15.0018L15.653 15.0869C15.5903 15.7315 15.3249 17.1807 15.2259 17.6758L13.5983 17.3507C13.6985 16.8497 13.9476 15.4769 14.0011 14.9264L14.0133 14.8421C14.0962 14.4297 14.4796 14.1391 14.9073 14.1807Z" fill="#565E6D" />
              <path d="M0.870117 9.98002C0.870117 8.06386 1.47298 6.19625 2.59334 4.64176C3.71378 3.08723 5.29505 1.92448 7.11295 1.31851C8.93083 0.712551 10.8937 0.693661 12.7228 1.26502C14.4375 1.80071 15.9534 2.8298 17.0835 4.21946L17.304 4.50234L17.3518 4.57286C17.5686 4.93315 17.4815 5.4061 17.1378 5.66385C16.794 5.92158 16.3157 5.87257 16.0306 5.56335L15.9763 5.49769L15.7955 5.26669C14.8709 4.12971 13.6305 3.2879 12.2275 2.84964C10.7311 2.38219 9.12546 2.39769 7.63819 2.8934C6.15094 3.38915 4.85718 4.34026 3.94047 5.61198C3.02374 6.88386 2.53012 8.41223 2.53012 9.98002C2.53012 10.4384 2.15851 10.81 1.70012 10.81C1.24172 10.81 0.870117 10.4384 0.870117 9.98002Z" fill="#565E6D" />
              <path d="M1.67795 12.5L1.76305 12.5041C2.18158 12.5466 2.50795 12.9002 2.50795 13.33C2.50795 13.7598 2.18158 14.1134 1.76305 14.1559L1.67795 14.16H1.66984C1.21145 14.16 0.839844 13.7884 0.839844 13.33C0.839844 12.8716 1.21145 12.5 1.66984 12.5H1.67795Z" fill="#565E6D" />
              <path d="M18.0046 7.52623C18.4259 7.44081 18.8379 7.69098 18.9627 8.0928L18.9838 8.17466L19.0113 8.35139C19.0368 8.54868 19.0548 8.80374 19.068 9.0695C19.0868 9.44599 19.0992 9.90855 19.1029 10.4029C19.1101 11.3856 19.0831 12.5301 18.9959 13.4027C18.9502 13.8588 18.5434 14.1916 18.0873 14.146C17.6312 14.1003 17.2984 13.6934 17.344 13.2373C17.4227 12.4502 17.4499 11.373 17.4429 10.415C17.4394 9.93885 17.4279 9.50036 17.4105 9.15217C17.4012 8.96717 17.3908 8.82125 17.3813 8.71368L17.3561 8.50535L17.344 8.42111C17.3024 8.0025 17.5836 7.61178 18.0046 7.52623Z" fill="#565E6D" />
              <path d="M4.53514 7.99337C4.71417 7.61276 5.15596 7.422 5.56129 7.56459C5.9666 7.70718 6.19165 8.13246 6.09302 8.5413L6.0687 8.62314C5.91244 9.06744 5.83299 9.53506 5.83364 10.0059V10.0076C5.83364 12.4043 5.46184 14.8234 5.04498 16.2277L4.96068 16.4952C4.81563 16.9299 4.34582 17.1646 3.91102 17.0196C3.4763 16.8746 3.24167 16.4047 3.38659 15.97L3.45792 15.7414C3.81609 14.5285 4.17364 12.2792 4.17364 10.0076C4.1728 9.34839 4.28398 8.69377 4.50272 8.072L4.53514 7.99337Z" fill="#565E6D" />
              <path d="M6.89288 16.443C7.00746 16.0382 7.41233 15.7782 7.83555 15.8529C8.28678 15.9327 8.58798 16.3629 8.5083 16.8142L8.46132 17.0517C8.34039 17.6049 8.14891 18.1415 8.00901 18.5812C7.87007 19.0179 7.40335 19.2597 6.96664 19.121C6.52996 18.9821 6.28811 18.5153 6.42682 18.0787C6.61555 17.4855 6.78645 17.0185 6.87343 16.5257L6.89288 16.443Z" fill="#565E6D" />
              <path d="M14.1547 11.65V9.98921L14.1459 9.71688C14.1045 9.08301 13.918 8.46574 13.5996 7.91338C13.2355 7.28221 12.7115 6.75812 12.0806 6.3936C11.4497 6.02914 10.7342 5.83691 10.0056 5.83676C9.27684 5.83664 8.5608 6.02845 7.92976 6.3928C7.53278 6.62198 7.025 6.48582 6.7958 6.08885C6.56673 5.69188 6.70282 5.18405 7.09976 4.95488C7.9832 4.44486 8.98551 4.17662 10.0056 4.17676C11.0257 4.17692 12.028 4.44539 12.9114 4.9557C13.7947 5.46605 14.5277 6.2005 15.0375 7.08419C15.547 7.96781 15.8153 8.96997 15.8147 9.99004V11.65C15.8147 12.1084 15.4432 12.48 14.9847 12.48C14.5263 12.48 14.1547 12.1084 14.1547 11.65Z" fill="#565E6D" />
            </svg>
          </div>
          <span>Confirm Payment</span>
        </button>

        {/* Edit Details Link */}
        <button className="edit-details-link" onClick={handleEditDetails}>
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default ReviewPaymentScreen;
