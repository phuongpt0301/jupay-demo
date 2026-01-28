import React, { useState } from 'react';
import { LoadingState, Modal, useModal } from '../components';

/**
 * Demo component to test LoadingState functionality
 */
const LoadingStateDemo: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [duration, setDuration] = useState(3000);
  const { modalState, showModal, hideModal } = useModal();

  const handleStartLoading = () => {
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    showModal({ title: 'Complete', message: 'Loading completed!', type: 'success' });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>LoadingState Component Demo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Loading Message:
          <input
            type="text"
            value={loadingMessage}
            onChange={(e) => setLoadingMessage(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Duration (ms):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>

      <button
        onClick={handleStartLoading}
        disabled={showLoading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: showLoading ? '#ccc' : '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: showLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {showLoading ? 'Loading...' : 'Start Loading'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <h2>Features being tested:</h2>
        <ul>
          <li>3-second timer (or custom duration)</li>
          <li>Visual feedback (spinner animation)</li>
          <li>Configurable loading message</li>
          <li>Interaction blocking during loading</li>
          <li>Progress bar animation</li>
          <li>Accessibility features</li>
        </ul>
      </div>

      {showLoading && (
        <LoadingState
          message={loadingMessage}
          duration={duration}
          onComplete={handleLoadingComplete}
        />
      )}

      <Modal
        isOpen={modalState.isOpen}
        onClose={hideModal}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </div>
  );
};

export default LoadingStateDemo;