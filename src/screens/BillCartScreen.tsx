import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenType } from '../types';
import { Modal, useModal } from '../components';
import './screens.css';

interface BillItem {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  selected: boolean;
}

// Initial bills data
const initialBills: BillItem[] = [
  { id: '1', name: 'SP Services', amount: 128.50, dueDate: '15 Mar', selected: true },
  { id: '2', name: 'SingTel', amount: 67.80, dueDate: '20 Mar', selected: true },
  { id: '3', name: 'DBS Credit Card', amount: 1200.00, dueDate: '25 Mar', selected: true },
];

/**
 * BillCartScreen Component
 * 
 * Shopping cart for bills with selection, deletion, and payment
 */
const BillCartScreen: React.FC = () => {
  const navigate = useNavigate();
  const { modalState, showModal, hideModal } = useModal();
  const [bills, setBills] = useState<BillItem[]>(initialBills);

  // Calculate totals based on selected bills
  const { subtotal, convenienceFee, total, selectedCount } = useMemo(() => {
    const selectedBills = bills.filter(bill => bill.selected);
    const subtotal = selectedBills.reduce((sum, bill) => sum + bill.amount, 0);
    const convenienceFee = 2.00;
    return {
      subtotal,
      convenienceFee,
      total: subtotal + convenienceFee,
      selectedCount: selectedBills.length
    };
  }, [bills]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleBill = (id: string) => {
    setBills(prev => prev.map(bill =>
      bill.id === id ? { ...bill, selected: !bill.selected } : bill
    ));
  };

  const handleDeleteBill = (id: string, name: string) => {
    showModal({
      title: 'Remove Bill',
      message: `Are you sure you want to remove "${name}" from your cart?`,
      type: 'warning',
      showCancel: true,
      onConfirm: () => {
        setBills(prev => prev.filter(bill => bill.id !== id));
      }
    });
  };

  const handleAddMoreBills = () => {
    navigate(`/${ScreenType.SELECT_PAYMENT_METHOD}`);
  };

  const handleProceedToPayment = () => {
    if (selectedCount === 0) {
      showModal({
        title: 'No Bills Selected',
        message: 'Please select at least one bill to proceed with payment.',
        type: 'warning'
      });
      return;
    }

    // Navigate to payment QR or payment method selection
    navigate(`/${ScreenType.REVIEW_PAYMENT}`, {
      state: {
        amount: total.toFixed(2),
        bills: bills.filter(b => b.selected),
        purpose: 'Bill Payment'
      }
    });
  };

  return (
    <div className="bill-cart-screen">
      <div className="bill-cart-container">
        {/* Header */}
        <div className="bill-cart-header">
          <button className="back-btn" onClick={handleBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#171A1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="bill-cart-title">Bill Cart ({bills.length} items)</h1>
        </div>

        <div className="border"></div>

        <div className="bill-cart-content">
          {/* Bills List */}
          <div className="bill-cart-list">
            {bills.map(bill => (
              <div key={bill.id} className="bill-cart-item">
                <input type="checkbox"
                  className={`bill-checkbox ${bill.selected ? 'checked' : ''}`}
                  checked={bill.selected}
                  onChange={() => handleToggleBill(bill.id)}
                  aria-label={bill.selected ? 'Deselect bill' : 'Select bill'}
                />

                <div className="bill-item-details">
                  <span className="bill-item-name">{bill.name}</span>
                  <span className="bill-item-amount">S${bill.amount.toFixed(2)}</span>
                  <span className="bill-item-due">Due: {bill.dueDate}</span>
                </div>

                <button
                  className="bill-delete-btn"
                  onClick={() => handleDeleteBill(bill.id, bill.name)}
                  aria-label={`Delete ${bill.name}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="#565E6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#565E6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}

            {bills.length === 0 && (
              <div className="bill-cart-empty">
                <p>No bills in your cart</p>
                <button className="add-bills-link" onClick={handleAddMoreBills}>
                  Add bills to pay
                </button>
              </div>
            )}
          </div>

          {/* Summary Section */}
          {bills.length > 0 && (
            <div className="bill-cart-summary">
              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">S${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Convenience fee:</span>
                <span className="summary-value">S${convenienceFee.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span className="summary-label-total">Total:</span>
                <span className="summary-value-total">S${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bill-cart-actions">
            <button className="add-more-bills-btn" onClick={handleAddMoreBills}>
              Add More Bills
            </button>
            <button
              className="proceed-payment-btn"
              onClick={handleProceedToPayment}
              disabled={selectedCount === 0}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        showCancel={modalState.showCancel}
        onConfirm={modalState.onConfirm}
      />
    </div>
  );
};

export default BillCartScreen;
