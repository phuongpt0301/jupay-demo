import React, { useEffect } from 'react';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

/**
 * Modal Component
 * A reusable modal dialog to replace browser alert()
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  showCancel = false,
}) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#E8F5E9"/>
            <path d="M20 24L23 27L28 21" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="24" r="12" stroke="#4CAF50" strokeWidth="2"/>
          </svg>
        );
      case 'warning':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#FFF3E0"/>
            <path d="M24 18V26M24 30H24.01" stroke="#FF9800" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="12" stroke="#FF9800" strokeWidth="2"/>
          </svg>
        );
      case 'error':
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#FFEBEE"/>
            <path d="M21 21L27 27M27 21L21 27" stroke="#F44336" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="12" stroke="#F44336" strokeWidth="2"/>
          </svg>
        );
      default: // info
        return (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#E3F2FD"/>
            <path d="M24 20V20.01M24 24V28" stroke="#2196F3" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="12" stroke="#2196F3" strokeWidth="2"/>
          </svg>
        );
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-icon">{getIcon()}</div>
        
        {title && (
          <h2 id="modal-title" className="modal-title">{title}</h2>
        )}
        
        <p className="modal-message">{message}</p>
        
        <div className="modal-actions">
          {showCancel && (
            <button className="modal-btn modal-btn-cancel" onClick={onClose}>
              {cancelText}
            </button>
          )}
          <button className="modal-btn modal-btn-confirm" onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

// Custom hook for easier modal usage
export const useModal = () => {
  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    onConfirm?: () => void;
    showCancel?: boolean;
  }>({
    isOpen: false,
    message: '',
  });

  const showModal = (options: {
    title?: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    onConfirm?: () => void;
    showCancel?: boolean;
  }) => {
    setModalState({
      isOpen: true,
      ...options,
    });
  };

  const hideModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return { modalState, showModal, hideModal };
};
