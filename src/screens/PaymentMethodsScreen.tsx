import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, useModal } from '../components';
import './screens.css';

interface PaymentCard {
  id: string;
  lastFour: string;
  expiryDate: string;
  isDefault: boolean;
}

/**
 * PaymentMethodsScreen Component
 * Manage payment cards
 */
const PaymentMethodsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { modalState, showModal, hideModal } = useModal();
  const [cards, setCards] = useState<PaymentCard[]>([
    { id: '1', lastFour: '9010', expiryDate: '12/26', isDefault: false },
    { id: '2', lastFour: '4521', expiryDate: '09/25', isDefault: false }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSetDefault = (cardId: string) => {
    setCards(prev =>
      prev.map(card => ({ ...card, isDefault: card.id === cardId }))
    );
  };

  const handleEdit = (cardId: string) => {
    showModal({
      title: 'Edit Card',
      message: `Edit card ${cardId}`,
      type: 'info',
    });
  };

  const handleDelete = (cardId: string) => {
    showModal({
      title: 'Delete Card',
      message: 'Are you sure you want to delete this card?',
      type: 'warning',
      showCancel: true,
      onConfirm: () => {
        setCards(prev => prev.filter(card => card.id !== cardId));
      },
    });
  };

  const handleAddNewCard = () => {
    showModal({
      title: 'Add New Card',
      message: 'Add new card functionality',
      type: 'info',
    });
  };

  return (
    <div className="payment-methods-screen">
      <div className="payment-methods-container">
        {/* Header */}
        <div className="payment-methods-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="payment-methods-title">Payment Methods</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Cards List */}
        <div className="cards-list">
          {cards.map(card => (
            <div key={card.id} className="card-item">
              <div className="card-info-row">
                <div className="card-icon"></div>
                <div className="card-details">
                  <span className="card-number">•••• {card.lastFour}</span>
                  <span className="card-expiry">Expires {card.expiryDate}</span>
                </div>
                {card.isDefault && (
                  <span className="default-badge">DEFAULT</span>
                )}
              </div>

              <div className="card-actions">
                {!card.isDefault && (
                  <button
                    className="card-action-btn"
                    onClick={() => handleSetDefault(card.id)}
                  >
                    Set Default
                  </button>
                )}
                <button
                  className="card-action-btn"
                  onClick={() => handleEdit(card.id)}
                >
                  Edit
                </button>
                <button
                  className="card-action-btn delete"
                  onClick={() => handleDelete(card.id)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.47 4.16992C17.9284 4.16992 18.3 4.54153 18.3 4.99992C18.3 5.45831 17.9284 5.82992 17.47 5.82992L2.52995 5.82992C2.07156 5.82992 1.69995 5.45831 1.69995 4.99992C1.69995 4.54153 2.07156 4.16992 2.52995 4.16992L17.47 4.16992Z" fill="#565E6D" />
                    <path d="M3.35999 16.6497L3.35999 5.02971C3.35999 4.57131 3.73159 4.19971 4.18999 4.19971C4.64838 4.19971 5.01999 4.57131 5.01999 5.02971L5.01999 16.6497C5.01999 16.7948 5.10081 17.0093 5.29557 17.2041C5.49034 17.3989 5.70493 17.4797 5.84999 17.4797L14.15 17.4797C14.2951 17.4797 14.5096 17.3989 14.7044 17.2041C14.8991 17.0093 14.98 16.7948 14.98 16.6497L14.98 5.02971C14.98 4.57131 15.3516 4.19971 15.81 4.19971C16.2684 4.19971 16.64 4.57131 16.64 5.02971L16.64 16.6497C16.64 17.3346 16.3058 17.9501 15.878 18.3778C15.4503 18.8055 14.8349 19.1397 14.15 19.1397L5.84999 19.1397C5.16504 19.1397 4.54963 18.8055 4.1219 18.3778C3.69416 17.9501 3.35999 17.3346 3.35999 16.6497Z" fill="#565E6D" />
                    <path d="M12.49 4.98984L12.49 3.32984C12.49 3.18478 12.4091 2.9702 12.2144 2.77543C12.0196 2.58067 11.8051 2.49984 11.66 2.49984L8.33998 2.49984C8.19492 2.49984 7.98033 2.58067 7.78556 2.77543C7.5908 2.9702 7.50998 3.18478 7.50998 3.32984L7.50998 4.98984C7.50998 5.44824 7.13837 5.81984 6.67998 5.81984C6.22158 5.81984 5.84998 5.44824 5.84998 4.98984L5.84998 3.32984C5.84998 2.6449 6.18415 2.02949 6.61189 1.60176C7.03962 1.17402 7.65503 0.839844 8.33998 0.839844L11.66 0.839844C12.3449 0.839844 12.9603 1.17402 13.388 1.60176C13.8158 2.02949 14.15 2.6449 14.15 3.32984V4.98984C14.15 5.44824 13.7784 5.81984 13.32 5.81984C12.8616 5.81984 12.49 5.44824 12.49 4.98984Z" fill="#565E6D" />
                    <path d="M7.5 14.1596L7.5 9.17961C7.5 8.7212 7.87161 8.34961 8.33 8.34961C8.78841 8.34961 9.16 8.7212 9.16 9.17961L9.16 14.1596C9.16 14.618 8.78841 14.9896 8.33 14.9896C7.87161 14.9896 7.5 14.618 7.5 14.1596Z" fill="#565E6D" />
                    <path d="M10.84 14.1596L10.84 9.17961C10.84 8.7212 11.2116 8.34961 11.67 8.34961C12.1284 8.34961 12.5 8.7212 12.5 9.17961L12.5 14.1596C12.5 14.618 12.1284 14.9896 11.67 14.9896C11.2116 14.9896 10.84 14.618 10.84 14.1596Z" fill="#565E6D" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Card */}
        <button className="add-new-card-btn" onClick={handleAddNewCard}>
          <div className="plus-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.81 9.16992C16.2684 9.16992 16.64 9.54151 16.64 9.99992C16.64 10.4583 16.2684 10.8299 15.81 10.8299L4.18999 10.8299C3.73159 10.8299 3.35999 10.4583 3.35999 9.99992C3.35999 9.54151 3.73159 9.16992 4.18999 9.16992L15.81 9.16992Z" fill="#565E6D" />
              <path d="M9.17004 15.8099L9.17004 4.18986C9.17004 3.73147 9.54163 3.35986 10 3.35986C10.4585 3.35986 10.83 3.73147 10.83 4.18986L10.83 15.8099C10.83 16.2683 10.4585 16.6399 10 16.6399C9.54163 16.6399 9.17004 16.2683 9.17004 15.8099Z" fill="#565E6D" />
            </svg>
          </div>
          Add New Card
        </button>
      </div>

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

export default PaymentMethodsScreen;
