import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ScreenType } from '../types';
import './screens.css';

const newPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

/**
 * ForgotPasswordNewScreen Component
 * Set a New Password
 */
const ForgotPasswordNewScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onChange',
  });

  const newPassword = watch('newPassword', '');
  const confirmPassword = watch('confirmPassword', '');

  // Re-validate confirmPassword when newPassword changes
  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [newPassword, confirmPassword, trigger]);

  // Password validation rules for UI display
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

  const onSubmit = (data: NewPasswordFormData) => {
    console.log('Reset password:', data);
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate(`/${ScreenType.LOGIN}`);
  };

  const handleBack = () => {
    navigate(`/${ScreenType.FORGOT_PASSWORD_CODE}`);
  };

  return (
    <div className="forgot-password-screen">
      <div className="forgot-password-container new-password-container">
        {/* Header */}
        <div className="new-password-header">
          <button className="back-btn-simple" onClick={handleBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="new-password-title">Set a New Password</h1>
        </div>

        <div className="border" />

        <form onSubmit={handleSubmit(onSubmit)}>
        {/* New Password Input */}
        <div className="form-group">
          <label className="form-label-new">New Password</label>
          <div className="password-input-wrapper">
            <input
              type={showNewPassword ? 'text' : 'password'}
              className={`form-input-new ${errors.newPassword ? 'input-error' : ''}`}
              placeholder="Enter your new password"
              {...register('newPassword')}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0004 3.3606C11.9317 3.36067 13.8196 3.93425 15.4246 5.00844C16.9292 6.01551 18.1219 7.42007 18.8718 9.06277L19.0161 9.3951L19.0267 9.42266C19.1477 9.74877 19.1629 10.1034 19.0721 10.4367L19.0267 10.5777C19.0233 10.5869 19.0199 10.5962 19.0161 10.6052C18.2798 12.3907 17.0296 13.9177 15.4246 14.992C13.9199 15.999 12.1665 16.5655 10.3619 16.6325L10.0004 16.6398C8.06898 16.6398 6.18049 16.0662 4.57541 14.992C3.07059 13.9848 1.87809 12.5797 1.12815 10.9367L0.983871 10.6052C0.980128 10.5962 0.97675 10.5869 0.97333 10.5777C0.835039 10.2051 0.835085 9.79533 0.97333 9.42266L0.983871 9.3951C1.72023 7.60966 2.9704 6.0827 4.57541 5.00844C6.18049 3.93418 8.06898 3.3606 10.0004 3.3606ZM10.0004 5.0206C8.39777 5.0206 6.8305 5.49658 5.49861 6.38799C4.17523 7.27378 3.14288 8.53024 2.53039 9.99976C3.14287 11.4695 4.17503 12.7265 5.49861 13.6124C6.8305 14.5038 8.39777 14.9798 10.0004 14.9798L10.3003 14.9741C11.7977 14.9185 13.2528 14.4481 14.5013 13.6124C15.8249 12.7266 16.8563 11.4694 17.4688 9.99976C16.8563 8.53041 15.8247 7.27372 14.5013 6.38799C13.1696 5.49665 11.6029 5.02067 10.0004 5.0206Z" fill="#565E6D" />
                <path d="M11.6599 10.0002C11.6599 9.08336 10.9167 8.34018 9.99993 8.34018C9.08311 8.34018 8.33993 9.08336 8.33993 10.0002C8.33993 10.917 9.08311 11.6602 9.99993 11.6602C10.9167 11.6602 11.6599 10.917 11.6599 10.0002ZM13.3199 10.0002C13.3199 11.8337 11.8335 13.3202 9.99993 13.3202C8.16635 13.3202 6.67993 11.8337 6.67993 10.0002C6.67993 8.16659 8.16635 6.68018 9.99993 6.68018C11.8335 6.68018 13.3199 8.16659 13.3199 10.0002Z" fill="#565E6D" />
              </svg>

            </button>
          </div>
          <div className='password-hint-container'>
            <div className={`password-hint-block ${hasMinLength ? 'valid' : ''}`} />
            <div className={`password-hint-block ${hasUppercase ? 'valid' : ''}`} />
            <div className={`password-hint-block ${hasNumber ? 'valid' : ''}`} />
          </div>
          <p className="password-hint">Enter your password</p>
        </div>

        {/* Confirm Password Input */}
        <div className="form-group">
          <label className="form-label-new">Confirm New Password</label>
          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className={`form-input-new ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Confirm your new password"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0004 3.3606C11.9317 3.36067 13.8196 3.93425 15.4246 5.00844C16.9292 6.01551 18.1219 7.42007 18.8718 9.06277L19.0161 9.3951L19.0267 9.42266C19.1477 9.74877 19.1629 10.1034 19.0721 10.4367L19.0267 10.5777C19.0233 10.5869 19.0199 10.5962 19.0161 10.6052C18.2798 12.3907 17.0296 13.9177 15.4246 14.992C13.9199 15.999 12.1665 16.5655 10.3619 16.6325L10.0004 16.6398C8.06898 16.6398 6.18049 16.0662 4.57541 14.992C3.07059 13.9848 1.87809 12.5797 1.12815 10.9367L0.983871 10.6052C0.980128 10.5962 0.97675 10.5869 0.97333 10.5777C0.835039 10.2051 0.835085 9.79533 0.97333 9.42266L0.983871 9.3951C1.72023 7.60966 2.9704 6.0827 4.57541 5.00844C6.18049 3.93418 8.06898 3.3606 10.0004 3.3606ZM10.0004 5.0206C8.39777 5.0206 6.8305 5.49658 5.49861 6.38799C4.17523 7.27378 3.14288 8.53024 2.53039 9.99976C3.14287 11.4695 4.17503 12.7265 5.49861 13.6124C6.8305 14.5038 8.39777 14.9798 10.0004 14.9798L10.3003 14.9741C11.7977 14.9185 13.2528 14.4481 14.5013 13.6124C15.8249 12.7266 16.8563 11.4694 17.4688 9.99976C16.8563 8.53041 15.8247 7.27372 14.5013 6.38799C13.1696 5.49665 11.6029 5.02067 10.0004 5.0206Z" fill="#565E6D" />
                <path d="M11.6599 10.0002C11.6599 9.08336 10.9167 8.34018 9.99993 8.34018C9.08311 8.34018 8.33993 9.08336 8.33993 10.0002C8.33993 10.917 9.08311 11.6602 9.99993 11.6602C10.9167 11.6602 11.6599 10.917 11.6599 10.0002ZM13.3199 10.0002C13.3199 11.8337 11.8335 13.3202 9.99993 13.3202C8.16635 13.3202 6.67993 11.8337 6.67993 10.0002C6.67993 8.16659 8.16635 6.68018 9.99993 6.68018C11.8335 6.68018 13.3199 8.16659 13.3199 10.0002Z" fill="#565E6D" />
              </svg>

            </button>
          </div>
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Password Requirements */}
        <div className="password-requirements">
          <div className={`requirement ${hasMinLength ? 'met' : ''}`}>
            <span className="requirement-icon">{hasMinLength ? '✓' : '✕'}</span>
            <span>At least 8 characters</span>
          </div>
          <div className={`requirement ${hasUppercase ? 'met' : ''}`}>
            <span className="requirement-icon">{hasUppercase ? '✓' : '✕'}</span>
            <span>At least one uppercase letter</span>
          </div>
          <div className={`requirement ${hasNumber ? 'met' : ''}`}>
            <span className="requirement-icon">{hasNumber ? '✓' : '✕'}</span>
            <span>At least one number</span>
          </div>
          <div className={`requirement ${hasSpecialChar ? 'met' : ''}`}>
            <span className="requirement-icon">{hasSpecialChar ? '✓' : '✕'}</span>
            <span>At least one special character</span>
          </div>
        </div>

        {/* Reset Password Button */}
        <button
          type="submit"
          className="reset-password-btn"
          disabled={!isValid}
        >
          Reset Password
        </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="#dcfce7" />
                <path d="M8 12L11 15L16 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="modal-title">Password Reset Successful!</h2>
            <p className="modal-message">Your password has been reset successfully. You can now login with your new password.</p>
            <button className="modal-btn" onClick={handleModalClose}>
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordNewScreen;
