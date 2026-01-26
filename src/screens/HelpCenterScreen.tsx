import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './screens.css';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

/**
 * HelpCenterScreen Component
 * FAQ and support contact
 */
const HelpCenterScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: '1', question: 'How do I top up my wallet?', answer: 'You can top up your wallet by...', expanded: false },
    { id: '2', question: 'Are there fees for overseas transfer?', answer: 'Fees vary depending on...', expanded: false },
    { id: '3', question: 'Is my card information safe?', answer: 'Yes, we use industry-standard encryption...', expanded: false },
    { id: '4', question: 'Can I cancel a transaction?', answer: 'Transactions can be cancelled if...', expanded: false }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFAQ = (id: string) => {
    setFaqs(prev =>
      prev.map(faq => faq.id === id ? { ...faq, expanded: !faq.expanded } : faq)
    );
  };

  const handleLiveChat = () => {
    alert('Opening live chat...');
  };

  const handleEmailSupport = () => {
    alert('Opening email support...');
  };

  return (
    <div className="screen help-center-screen">
      <div className="help-center-container">
        {/* Header */}
        <div className="help-header">
          <button className="back-btn" onClick={handleBack}>←</button>
          <h1 className="help-title">Help Center</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Search */}
        <div className="help-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQs */}
        <div className="faq-section">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          {faqs.map(faq => (
            <div key={faq.id} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <span>{faq.question}</span>
                <span className="faq-icon">{faq.expanded ? '∧' : '∨'}</span>
              </button>
              {faq.expanded && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="contact-support-section">
          <h3 className="contact-title">Contact Support</h3>

          <button className="contact-btn live-chat" onClick={handleLiveChat}>
            <span className="contact-icon">💬</span>
            Live Chat
          </button>

          <button className="contact-btn email-support" onClick={handleEmailSupport}>
            <span className="contact-icon">✉️</span>
            Email Support
          </button>

          <p className="support-hours">Available Mon-Fri, 9AM - 6PM SGT</p>
        </div>

        {/* Footer Links */}
        <div className="help-footer">
          <button className="footer-link">Terms of Service</button>
          <button className="footer-link">Privacy Policy</button>
          <button className="footer-link">Licenses</button>
          <p className="version-text">Version 11.0</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterScreen;
