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
    <div className="help-center-screen">
      <div className="help-center-container">
        {/* Header */}
        <div className="help-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="help-title">Help Center</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        <div className="help-center-content">
          {/* Search */}
          <div className="help-search">
            <div className="search-input-wrapper">
              <div className="search-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3025 13.3021C13.6064 12.9982 14.087 12.9795 14.413 13.2454L14.4762 13.3021L18.0783 16.9042L18.1359 16.9674C18.4015 17.2934 18.382 17.7741 18.0783 18.0778C17.7745 18.3816 17.2938 18.401 16.9678 18.1354L16.9046 18.0778L13.3025 14.4758L13.2458 14.4126C12.9799 14.0865 12.9987 13.606 13.3025 13.3021Z" fill="#171A1F" />
                  <path d="M14.9802 9.17001C14.9802 5.96124 12.379 3.36001 9.1702 3.36001C5.96142 3.36001 3.3602 5.96124 3.3602 9.17001C3.3602 12.3788 5.96142 14.98 9.1702 14.98C12.379 14.98 14.9802 12.3788 14.9802 9.17001ZM16.6402 9.17001C16.6402 13.2956 13.2958 16.64 9.1702 16.64C5.04463 16.64 1.7002 13.2956 1.7002 9.17001C1.7002 5.04445 5.04463 1.70001 9.1702 1.70001C13.2958 1.70001 16.6402 5.04445 16.6402 9.17001Z" fill="#171A1F" />
                </svg>
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* FAQs */}
          <div className="faq-section">
            <h3 className="faq-title">Frequently Asked Questions</h3>
            {faqs.map(faq => (
              <div key={faq.id} className="faq-item">
                <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                  <span>{faq.question}</span>
                  <div className={`faq-icon ${faq.expanded ? 'faq-icon-expanded' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5462 5.51655C11.8078 5.2549 12.232 5.2549 12.4936 5.51655C12.7553 5.7782 12.7553 6.20232 12.4936 6.46397L8.47359 10.484C8.21195 10.7456 7.78784 10.7456 7.52621 10.484L3.50619 6.46397L3.46039 6.41294C3.24576 6.14978 3.26089 5.76185 3.50619 5.51655C3.75149 5.27125 4.13942 5.25612 4.40258 5.47075L4.45361 5.51655L7.9999 9.06285L11.5462 5.51655Z" fill="#171A1F" />
                    </svg></div>
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
            <h1 className="contact-title">Contact Support</h1>

            <button className="contact-btn live-chat" onClick={handleLiveChat}>
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.64 4.1902C16.64 3.97006 16.5525 3.75902 16.3968 3.60336C16.2411 3.4477 16.0301 3.3602 15.81 3.3602L4.18995 3.3602C3.96982 3.3602 3.75877 3.4477 3.60312 3.60336C3.44746 3.75902 3.35995 3.97006 3.35995 4.1902L3.35995 15.4665L5.26312 13.5634L5.32391 13.5083C5.47161 13.3872 5.65732 13.3202 5.84995 13.3202L15.81 13.3202C16.0301 13.3202 16.2411 13.2327 16.3968 13.077C16.5525 12.9214 16.64 12.7103 16.64 12.4902L16.64 4.1902ZM18.3 12.4902C18.3 13.1506 18.0374 13.7837 17.5705 14.2507C17.1035 14.7177 16.4704 14.9802 15.81 14.9802L6.19362 14.9802L3.11679 18.057C2.87941 18.2944 2.52236 18.3654 2.21222 18.2369C1.90213 18.1085 1.69995 17.8058 1.69995 17.4702L1.69995 4.1902C1.69995 3.52981 1.96248 2.89666 2.42945 2.42969C2.89641 1.96272 3.52956 1.7002 4.18995 1.7002L15.81 1.7002C16.4703 1.7002 17.1035 1.96272 17.5705 2.42969C18.0374 2.89666 18.3 3.52981 18.3 4.1902L18.3 12.4902Z" fill="#565E6D" />
                </svg>

              </div>
              Live Chat
            </button>

            <button className="contact-btn email-support" onClick={handleEmailSupport}>
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.8542 5.13936C18.2408 4.89326 18.7541 5.00732 19.0002 5.39387C19.2463 5.78048 19.1323 6.29376 18.7458 6.53998L11.2831 11.293C11.2736 11.299 11.2643 11.3052 11.2547 11.3109C10.9223 11.5039 10.5499 11.6171 10.1677 11.6424L10.004 11.6473C9.56481 11.6473 9.13312 11.5314 8.75331 11.3109C8.74369 11.3052 8.73364 11.2991 8.72418 11.293L1.25416 6.53998L1.18527 6.49054C0.854967 6.22999 0.768936 5.75644 0.999653 5.39387C1.23043 5.03134 1.6961 4.90828 2.072 5.09721L2.14577 5.13936L9.59145 9.8778C9.71694 9.94968 9.85937 9.98727 10.004 9.98727L10.1126 9.98072C10.2188 9.96669 10.3214 9.93125 10.415 9.8778L17.8542 5.13936Z" fill="#565E6D" />
                  <path d="M17.4699 5.01979C17.4699 4.56139 17.0983 4.18979 16.6399 4.18979L3.35987 4.18979C2.90148 4.18979 2.52987 4.56139 2.52987 5.01979L2.52987 14.9798C2.52987 15.4382 2.90148 15.8098 3.35987 15.8098L16.6399 15.8098C17.0983 15.8098 17.4699 15.4382 17.4699 14.9798L17.4699 5.01979ZM19.1299 14.9798C19.1299 16.355 18.0151 17.4698 16.6399 17.4698L3.35987 17.4698C1.98469 17.4698 0.869873 16.355 0.869873 14.9798L0.869873 5.01979C0.869873 3.6446 1.98469 2.52979 3.35987 2.52979L16.6399 2.52979C18.0151 2.52979 19.1299 3.6446 19.1299 5.01979L19.1299 14.9798Z" fill="#565E6D" />
                </svg>
              </div>
              Email Support
            </button>

            <p className="support-hours">Available Mon-Fri, 9AM - 6PM SGT</p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="help-footer">
          <div className="footer-links">
            <button className="footer-link">Terms of Service</button>
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Licenses</button>
          </div>
          <p className="version-text">Version 11.0</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterScreen;
