import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ScreenType } from '../types';
import './screens.css';

const createAccountSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the Terms and Privacy Policy'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

/**
 * CreateAccountScreen Component
 * Simple account creation with email and password
 */
const CreateAccountScreen: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    mode: 'onChange',
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  // Re-validate confirmPassword when password changes
  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger]);

  // Password validation rules for UI display
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const onSubmit = (data: CreateAccountFormData) => {
    console.log('Create account:', data);
    navigate(`/${ScreenType.FORGOT_PASSWORD_CODE}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="create-account-screen">
      <div className="create-account-container">
        {/* Header */}
        <div className="create-account-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="create-account-title">Create Account</h1>
        </div>

        <div className="border" />

        {/* Form */}
        <form className="create-account-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Address */}
          <div className="form-group-simple">
            <input
              type="email"
              className={`form-input-simple ${errors.email ? 'input-error' : ''}`}
              placeholder="Email Address"
              {...register('email')}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group-simple">
            <input
              type="password"
              className={`form-input-simple ${errors.password ? 'input-error' : ''}`}
              placeholder="Password"
              {...register('password')}
            />
          </div>

          <div className='password-hint-container'>
            <div className={`password-hint-block ${hasMinLength ? 'valid' : ''}`} />
            <div className={`password-hint-block ${hasUppercase ? 'valid' : ''}`} />
            <div className={`password-hint-block ${hasNumber ? 'valid' : ''}`} />
          </div>

          {/* Password Hint */}
          <p className="password-hint-simple">Enter a password</p>

          {/* Confirm Password */}
          <div className="form-group-simple">
            <input
              type="password"
              className={`form-input-simple ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Confirm Password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* Terms and Privacy Checkbox */}
          <div className="terms-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register('agreeToTerms')}
              />
              <span className="checkbox-text">Agree to Terms and Privacy Policy</span>
            </label>
            {errors.agreeToTerms && (
              <span className="error-message">{errors.agreeToTerms.message}</span>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="create-account-continue-btn"
            disabled={!isValid}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountScreen;
