import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ScreenType } from '../types';
import './screens.css';

const countryCodes = [
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
];

const registerPersonalSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  nric: z
    .string()
    .min(1, 'NRIC/FIN is required')
    .regex(/^[STFG]\d{7}[A-Z]$/i, 'Please enter a valid NRIC/FIN (e.g. S1234567A)'),
  dob: z
    .string()
    .min(1, 'Date of birth is required'),
  countryCode: z
    .string()
    .min(1, 'Country code is required'),
  mobile: z
    .string()
    .min(1, 'Mobile number is required')
    .regex(/^\d{7,15}$/, 'Please enter a valid mobile number (7-15 digits)'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

type RegisterPersonalFormData = z.infer<typeof registerPersonalSchema>;

/**
 * RegisterPersonalScreen Component
 * Step 1 of 4 - Personal Details
 */
const RegisterPersonalScreen: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterPersonalFormData>({
    resolver: zodResolver(registerPersonalSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterPersonalFormData) => {
    console.log('Personal details:', data);
    navigate(`/${ScreenType.REGISTER_DOCUMENTS}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="register-screen">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <div className="register-header-text">
            <h1 className="register-title">Personal Details</h1>
            <p className="register-step">Step 1 of 4</p>
          </div>
        </div>

        <div className="border" />

        {/* Form */}
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label-new">Full Name (as in NRIC)</label>
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
            <label className="form-label-new">NRIC/FIN Number</label>
            <input
              type="text"
              className={`form-input-new ${errors.nric ? 'input-error' : ''}`}
              placeholder="e.g. S1234567A"
              {...register('nric')}
            />
            {errors.nric && (
              <span className="error-message">{errors.nric.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-new">Date of Birth</label>
            <div className="date-input-wrapper">
              <input
                type="date"
                className={`form-input-new ${errors.dob ? 'input-error' : ''}`}
                {...register('dob')}
              />
            </div>
            {errors.dob && (
              <span className="error-message">{errors.dob.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-new">Mobile Number</label>
            <div className="mobile-input-wrapper">
              <select
                className={`country-code-select ${errors.countryCode ? 'input-error' : ''}`}
                {...register('countryCode')}
                defaultValue="+65"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className={`form-input-new mobile-input ${errors.mobile ? 'input-error' : ''}`}
                placeholder="e.g. 91234567"
                {...register('mobile')}
              />
            </div>
            {errors.countryCode && (
              <span className="error-message">{errors.countryCode.message}</span>
            )}
            {errors.mobile && (
              <span className="error-message">{errors.mobile.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label-new">Email Address</label>
            <input
              type="email"
              className={`form-input-new ${errors.email ? 'input-error' : ''}`}
              placeholder="e.g. user@example.com"
              {...register('email')}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <button type="submit" className="register-continue-btn" disabled={!isValid}>
            Continue
          </button>

          <p className="register-hint">Using Singpass is faster and more secure</p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPersonalScreen;
