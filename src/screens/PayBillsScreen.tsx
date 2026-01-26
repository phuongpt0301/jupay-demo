import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

interface Bill {
  id: string;
  name: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'paid';
}

/**
 * PayBillsScreen Component
 * Pay utility bills, credit cards, insurance, and government bills
 */
const PayBillsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [bills] = useState<Bill[]>([
    { id: '1', name: 'SP Services', dueDate: '25 Oct', amount: 125.50, status: 'pending' },
    { id: '2', name: 'DBS Bank', dueDate: '28 Oct', amount: 890.00, status: 'pending' },
    { id: '3', name: 'AIA Singapore', dueDate: '30 Oct', amount: 210.00, status: 'pending' }
  ]);

  const totalDue = bills.reduce((sum, bill) => sum + bill.amount, 0);

  const handleBack = () => {
    navigate(-1);
  };

  const handleManageBillers = () => {
    alert('Manage Billers functionality');
  };

  const handleCategoryClick = (category: string) => {
    alert(`${category} category selected`);
  };

  const handleBillClick = (bill: Bill) => {
    alert(`Pay ${bill.name} - SGD ${bill.amount}`);
  };

  const handleAddBill = () => {
    alert('Add new bill functionality');
  };

  return (
    <div className="screen pay-bills-screen">
      <div className="pay-bills-container">
        {/* Header */}
        <div className="pay-bills-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="pay-bills-title">Pay Bills</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Manage Billers Button */}
        <button className="manage-billers-btn" onClick={handleManageBillers}>
          Manage Billers
        </button>

        {/* Bill Categories */}
        <div className="bill-categories">
          <button className="bill-category-card" onClick={() => handleCategoryClick('Utilities')}>
            <div className="category-icon">⚡</div>
            <span className="category-name">Utilities</span>
          </button>

          <button className="bill-category-card" onClick={() => handleCategoryClick('Credit Cards')}>
            <div className="category-icon">💳</div>
            <span className="category-name">Credit Cards</span>
          </button>

          <button className="bill-category-card" onClick={() => handleCategoryClick('Insurance')}>
            <div className="category-icon">🛡️</div>
            <span className="category-name">Insurance</span>
          </button>

          <button className="bill-category-card" onClick={() => handleCategoryClick('Government')}>
            <div className="category-icon">🏛️</div>
            <span className="category-name">Government</span>
          </button>
        </div>

        {/* Bills Summary */}
        <div className="bills-summary">
          <div className="summary-header">
            <div>
              <h3 className="summary-title">3 bills due this month</h3>
              <p className="summary-amount">SGD {totalDue.toFixed(2)}</p>
            </div>
          </div>

          {/* Bills List */}
          <div className="bills-list">
            {bills.map(bill => (
              <button key={bill.id} className="bill-item" onClick={() => handleBillClick(bill)}>
                <div className="bill-info">
                  <span className="bill-name">{bill.name}</span>
                  <span className="bill-due">Due: {bill.dueDate}</span>
                </div>
                <div className="bill-payment">
                  <span className="bill-amount">SGD {bill.amount.toFixed(2)}</span>
                  <span className="bill-status">{bill.status === 'pending' ? 'Pending' : 'Paid'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add Bill Button */}
        <button className="floating-add-btn" onClick={handleAddBill}>+</button>
      </div>
    </div>
  );
};

export default PayBillsScreen;
