import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [cards, setCards] = useState<PaymentCard[]>([
    { id: '1', lastFour: '9010', expiryDate: '12/26', isDefault: true },
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
    alert(`Edit card ${cardId}`);
  };

  const handleDelete = (cardId: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      setCards(prev => prev.filter(card => card.id !== cardId));
    }
  };

  const handleAddNewCard = () => {
    alert('Add new card functionality');
  };

  return (
    <div className="screen payment-methods-screen">
      <div className="payment-methods-container">
        {/* Header */}
        <div className="payment-methods-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="payment-methods-title">Payment Methods</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Cards List */}
        <div className="cards-list">
          {cards.map(card => (
            <div key={card.id} className="card-item">
              <div className="card-info-row">
                <div className="card-icon">💳</div>
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
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Card */}
        <button className="add-new-card-btn" onClick={handleAddNewCard}>
          <span className="plus-icon">+</span>
          Add New Card
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodsScreen;
