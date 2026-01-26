import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import './screens.css';

/**
 * AddRecipientScreen Component
 * Add New Recipient - Form to add new beneficiary
 */
const AddRecipientScreen: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [bank, setBank] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSaveAndContinue = () => {
    // Validate and save recipient
    if (fullName && bank && accountNumber) {
      alert('Recipient added successfully!');
      navigate(`/${ScreenType.SEND_MONEY_AMOUNT}`);
    }
  };

  const handleVerifyAccount = () => {
    alert('Verifying account...');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="screen add-recipient-screen">
      <div className="add-recipient-container">
        {/* Header */}
        <div className="add-recipient-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="add-recipient-title">Add New Recipient</h1>
        </div>

        {/* Form */}
        <form className="add-recipient-form">
          {/* Personal Details Section */}
          <div className="form-section">
            <h2 className="form-section-title">Personal Details</h2>
            
            <div className="form-group">
              <label className="form-label-new">Full Name</label>
              <input
                type="text"
                className="form-input-new"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label-new">Relationship</label>
              <select
                className="form-select"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              >
                <option value="">Select relationship</option>
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="form-section">
            <h2 className="form-section-title">Bank Details</h2>
            
            <div className="form-group">
              <label className="form-label-new">Bank</label>
              <select
                className="form-select"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
              >
                <option value="">Select bank</option>
                <option value="dbs">DBS Bank</option>
                <option value="ocbc">OCBC Bank</option>
                <option value="uob">UOB Bank</option>
                <option value="posb">POSB</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label-new">Account Type</label>
              <select
                className="form-select"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="">Select account type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="fixed">Fixed Deposit</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label-new">Account Number</label>
              <input
                type="text"
                className="form-input-new"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <button 
              type="button" 
              className="verify-account-btn"
              onClick={handleVerifyAccount}
            >
              ⊙ Verify Account
            </button>
          </div>

          {/* Contact Section */}
          <div className="form-section">
            <h2 className="form-section-title">Contact (optional)</h2>
            
            <div className="form-group">
              <label className="form-label-new">Email</label>
              <input
                type="email"
                className="form-input-new"
                placeholder="beneficiary@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label-new">Mobile</label>
              <input
                type="tel"
                className="form-input-new"
                placeholder="+65 XXXX XXXX"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>

          {/* KYC Notice */}
          <div className="kyc-notice">
            <p>Beneficiary will need to complete KYC for transactions over S$500</p>
          </div>

          {/* Save Button */}
          <button 
            type="button" 
            className="save-continue-btn"
            onClick={handleSaveAndContinue}
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipientScreen;
