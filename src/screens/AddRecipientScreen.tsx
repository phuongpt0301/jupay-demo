import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ScreenType } from '../types';
import './screens.css';

const addRecipientSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  relationship: z
    .string()
    .min(1, 'Please select a relationship'),
  bank: z
    .string()
    .min(1, 'Please select a bank'),
  accountType: z
    .string()
    .min(1, 'Please select an account type'),
  accountNumber: z
    .string()
    .min(1, 'Account number is required')
    .regex(/^\d{8,20}$/, 'Please enter a valid account number (8-20 digits)'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  mobile: z
    .string()
    .regex(/^\+?[0-9\s]{8,20}$/, 'Please enter a valid mobile number')
    .optional()
    .or(z.literal('')),
});

type AddRecipientFormData = z.infer<typeof addRecipientSchema>;

/**
 * AddRecipientScreen Component
 * Add New Recipient - Form to add new beneficiary
 */
const AddRecipientScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyModalType, setVerifyModalType] = useState<'success' | 'error'>('success');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<AddRecipientFormData>({
    resolver: zodResolver(addRecipientSchema),
    mode: 'onChange',
  });

  const accountNumber = watch('accountNumber', '');

  const onSubmit = (data: AddRecipientFormData) => {
    console.log('Recipient data:', data);
    navigate(`/${ScreenType.SEND_MONEY_AMOUNT}`);
  };

  const handleVerifyAccount = () => {
    if (accountNumber && /^\d{8,20}$/.test(accountNumber)) {
      setVerifyModalType('success');
    } else {
      setVerifyModalType('error');
    }
    setShowVerifyModal(true);
  };

  const handleCloseVerifyModal = () => {
    setShowVerifyModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="add-recipient-screen">
      <div className="add-recipient-container">
        {/* Header */}
        <div className="add-recipient-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="add-recipient-title">Add New Recipient</h1>
        </div>

        <div className="border"></div>

        {/* Form */}
        <form className="add-recipient-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Details Section */}
          <div className="form-section">
            <h2 className="form-section-title">Personal Details</h2>

            <div className="form-group">
              <label className="form-label-new">Full Name</label>
              <input
                type="text"
                className={`form-input-new ${errors.fullName ? 'input-error' : ''}`}
                placeholder="Enter full name"
                {...register('fullName')}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label-new">Relationship</label>
              <select
                className={`form-select ${errors.relationship ? 'input-error' : ''}`}
                {...register('relationship')}
              >
                <option value="">Select relationship</option>
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
              {errors.relationship && (
                <span className="error-message">{errors.relationship.message}</span>
              )}
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="form-section">
            <h2 className="form-section-title">Bank Details</h2>

            <div className="form-group">
              <label className="form-label-new">Bank</label>
              <select
                className={`form-select ${errors.bank ? 'input-error' : ''}`}
                {...register('bank')}
              >
                <option value="">Select bank</option>
                <option value="dbs">DBS Bank</option>
                <option value="ocbc">OCBC Bank</option>
                <option value="uob">UOB Bank</option>
                <option value="posb">POSB</option>
                <option value="other">Other</option>
              </select>
              {errors.bank && (
                <span className="error-message">{errors.bank.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label-new">Account Type</label>
              <select
                className={`form-select ${errors.accountType ? 'input-error' : ''}`}
                {...register('accountType')}
              >
                <option value="">Select account type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="fixed">Fixed Deposit</option>
              </select>
              {errors.accountType && (
                <span className="error-message">{errors.accountType.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label-new">Account Number</label>
              <input
                type="text"
                className={`form-input-new ${errors.accountNumber ? 'input-error' : ''}`}
                placeholder="Enter account number"
                {...register('accountNumber')}
              />
              {errors.accountNumber && (
                <span className="error-message">{errors.accountNumber.message}</span>
              )}
            </div>

            <button
              type="button"
              className="verify-account-btn"
              onClick={handleVerifyAccount}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_725)">
                  <path d="M14.0299 7.99988C14.0299 4.66961 11.3302 1.96988 7.99988 1.96988C4.66961 1.96988 1.96988 4.66961 1.96988 7.99988C1.96988 11.3302 4.66961 14.0299 7.99988 14.0299C11.3302 14.0299 14.0299 11.3302 14.0299 7.99988ZM15.3699 7.99988C15.3699 12.0702 12.0702 15.3699 7.99988 15.3699C3.92955 15.3699 0.629883 12.0702 0.629883 7.99988C0.629883 3.92955 3.92955 0.629883 7.99988 0.629883C12.0702 0.629883 15.3699 3.92955 15.3699 7.99988Z" fill="#565E6D" />
                  <path d="M9.58751 6.14032C9.85062 5.92569 10.2386 5.94082 10.4838 6.18612C10.7292 6.43142 10.7443 6.81935 10.5297 7.08253L10.4838 7.13352L7.80384 9.81352C7.55855 10.0589 7.17062 10.074 6.90751 9.85934L6.85646 9.81352L5.51645 8.47352L5.47064 8.42253C5.25601 8.15935 5.27115 7.77142 5.51645 7.52614C5.76174 7.28085 6.14968 7.26571 6.41283 7.48031L6.46387 7.52614L7.33015 8.39238L9.53646 6.18612L9.58751 6.14032Z" fill="#565E6D" />
                </g>
                <defs>
                  <clipPath id="clip0_1_725">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Verify Account
            </button>
          </div>

          {/* Contact Section */}
          <div className="form-section">
            <h2 className="form-section-title">Contact (optional)</h2>

            <div className="form-group">
              <label className="form-label-new">Email</label>
              <input
                type="email"
                className={`form-input-new ${errors.email ? 'input-error' : ''}`}
                placeholder="beneficiary@example.com"
                {...register('email')}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label-new">Mobile</label>
              <input
                type="tel"
                className={`form-input-new ${errors.mobile ? 'input-error' : ''}`}
                placeholder="+65 XXXX XXXX"
                {...register('mobile')}
              />
              {errors.mobile && (
                <span className="error-message">{errors.mobile.message}</span>
              )}
            </div>
          </div>

          {/* KYC Notice */}
          <div className="kyc-notice">
            <p>Beneficiary will need to complete KYC for transactions over S$500</p>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="save-continue-btn"
            disabled={!isValid}
          >
            Save & Continue
          </button>
        </form>
      </div>

      {/* Verify Account Modal */}
      {showVerifyModal && (
        <div className="modal-overlay" onClick={handleCloseVerifyModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-icon ${verifyModalType}`}>
              {verifyModalType === 'success' ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="#dcfce7" />
                  <path d="M8 12L11 15L16 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" fill="#fee2e2" />
                  <path d="M12 8V12M12 16H12.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <h2 className="modal-title">
              {verifyModalType === 'success' ? 'Account Verified!' : 'Verification Failed'}
            </h2>
            <p className="modal-message">
              {verifyModalType === 'success'
                ? 'The bank account has been verified successfully.'
                : 'Please enter a valid account number (8-20 digits) first.'}
            </p>
            <button className="modal-btn" onClick={handleCloseVerifyModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecipientScreen;
