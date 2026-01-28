import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, useModal } from '../components';
import './screens.css';
import ProductImg from '../assets/product.png';

interface Telco {
  name: string;
  logo?: string;
}

interface RecentNumber {
  number: string;
}

/**
 * MobileTopUpScreen Component
 * Top up mobile phone credit
 */
const MobileTopUpScreen: React.FC = () => {
  const navigate = useNavigate();
  const { modalState, showModal, hideModal } = useModal();

  const telcos: Telco[] = [
    { name: 'SingTel' },
    { name: 'StarHub' },
    { name: 'M1' },
    { name: 'Circles.Life' },
    { name: 'GOMO' },
    { name: 'Heya' }
  ];

  const recentNumbers: RecentNumber[] = [
    { number: '+65 9123 4567' },
    { number: '+65 8876 5432' }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleTelcoClick = (telco: string) => {
    showModal({ title: 'Telco Selected', message: `Selected: ${telco}`, type: 'info' });
  };

  const handleInternationalTopUp = () => {
    showModal({ title: 'International Top-up', message: 'International Top-up', type: 'info' });
  };

  const handleRecentNumberClick = (number: string) => {
    showModal({ title: 'Top Up', message: `Top up ${number}`, type: 'info' });
  };

  return (
    <div className="mobile-topup-screen">
      <div className="mobile-topup-container">
        {/* Header */}
        <div className="topup-header">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.369 4.22462C11.7618 3.90427 12.3408 3.92686 12.7069 4.29298C13.073 4.65909 13.0956 5.2381 12.7753 5.63087L12.7069 5.70704L6.41399 12L12.7069 18.293L12.7753 18.3692C13.0956 18.7619 13.073 19.3409 12.7069 19.707C12.3408 20.0732 11.7618 20.0958 11.369 19.7754L11.2929 19.707L4.29289 12.707C3.90237 12.3165 3.90237 11.6835 4.29289 11.293L11.2929 4.29298L11.369 4.22462Z" fill="#565E6D" />
              <path d="M19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L19 11Z" fill="#565E6D" />
            </svg>
          </button>
          <h1 className="topup-title">Mobile Top-up</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Promotion Banner */}
        <div className="promotion-banner">
          <p className="promotion-text">Top-up S$50, get S$52 credit</p>
        </div>

        <div className="topup-content">
          {/* Select Telco */}
          <h3 className="section-title">Select Telco</h3>
          <div className="telco-grid">
            {telcos.map(telco => (
              <button
                key={telco.name}
                className="telco-card"
                onClick={() => handleTelcoClick(telco.name)}
              >
                <div className="telco-logo">
                  <img src={ProductImg} alt={telco.name} />
                </div>
                <span className="telco-name">{telco.name}</span>
              </button>
            ))}
          </div>

          {/* International Top-up */}
          <button className="international-topup-btn" onClick={handleInternationalTopUp}>
            <span className="globe-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_1734)">
                  <path d="M17.4701 10.0001C17.4701 5.87455 14.1257 2.53012 10.0001 2.53012C5.87455 2.53012 2.53012 5.87455 2.53012 10.0001C2.53012 14.1257 5.87455 17.4701 10.0001 17.4701C14.1257 17.4701 17.4701 14.1257 17.4701 10.0001ZM19.1301 10.0001C19.1301 15.0424 15.0424 19.1301 10.0001 19.1301C4.95776 19.1301 0.870117 15.0424 0.870117 10.0001C0.870117 4.95776 4.95776 0.870117 10.0001 0.870117C15.0424 0.870117 19.1301 4.95776 19.1301 10.0001Z" fill="#565E6D" />
                  <path d="M12.4869 9.73103C12.4274 7.2552 11.5492 4.87507 10.0001 2.95808C8.39496 4.94443 7.5101 7.42806 7.5101 10.0001L7.51334 10.2692C7.57275 12.7448 8.45123 15.1245 10.0001 17.0413C11.605 15.0551 12.4901 12.572 12.4901 10.0001L12.4869 9.73103ZM14.146 10.3097C14.0693 13.5014 12.8083 16.5551 10.6015 18.8724C10.4449 19.0368 10.2273 19.1301 10.0001 19.1301C9.77293 19.1301 9.5553 19.0368 9.39868 18.8724C7.19188 16.5551 5.93091 13.5014 5.85415 10.3097L5.8501 10.0001C5.8501 6.69682 7.12061 3.51998 9.39868 1.12787L9.46027 1.06951C9.60991 0.941381 9.80123 0.870117 10.0001 0.870117C10.2273 0.870117 10.4449 0.963384 10.6015 1.12787C12.8796 3.51998 14.1501 6.69682 14.1501 10.0001L14.146 10.3097Z" fill="#565E6D" />
                  <path d="M18.3001 9.16992C18.7585 9.16992 19.1301 9.54151 19.1301 9.99992C19.1301 10.4583 18.7585 10.8299 18.3001 10.8299L1.70012 10.8299C1.24172 10.8299 0.870117 10.4583 0.870117 9.99992C0.870117 9.54151 1.24172 9.16992 1.70012 9.16992L18.3001 9.16992Z" fill="#565E6D" />
                </g>
                <defs>
                  <clipPath id="clip0_1_1734">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            International Top-up
          </button>

          {/* Recent Numbers */}
          <h3 className="section-title">Recent numbers</h3>
          <div className="recent-numbers-list">
            {recentNumbers.map((item, index) => (
              <button
                key={index}
                className="recent-number-item"
                onClick={() => handleRecentNumberClick(item.number)}
              >
                <div className="phone-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_1745)">
                      <path d="M5.94156 0.873101C6.54286 0.869139 7.12524 1.08316 7.5813 1.47533C7.98208 1.82001 8.26189 2.28167 8.38209 2.79248L8.42342 3.01457L8.42425 3.02186L8.46484 3.29745C8.56759 3.93661 8.73284 4.56445 8.95927 5.17143L9.01596 5.34002C9.13373 5.73755 9.15067 6.15906 9.06377 6.56638C8.9645 7.03192 8.73384 7.45912 8.3991 7.7976L8.39586 7.80165L7.80177 8.39498C8.77775 9.92625 10.0769 11.2244 11.6081 12.2005L12.2055 11.6039L12.3368 11.484C12.6517 11.2142 13.0293 11.0262 13.4367 10.9393C13.9014 10.8402 14.3851 10.8763 14.83 11.043C15.4376 11.2698 16.0666 11.4363 16.7064 11.5391L16.9812 11.5788L16.9885 11.5796C17.5932 11.6649 18.1459 11.9696 18.5407 12.4356C18.9311 12.8962 19.1391 13.4833 19.1292 14.0866L19.13 16.5734L19.1275 16.7031C19.113 17.0054 19.0432 17.3029 18.9217 17.5809C18.7827 17.8986 18.579 18.1838 18.3235 18.4182C18.068 18.6525 17.7667 18.8316 17.4384 18.9426C17.151 19.0398 16.8483 19.083 16.546 19.0715L16.4162 19.0634C16.4113 19.063 16.4059 19.0623 16.4009 19.0618C13.718 18.7702 11.1408 17.8537 8.87652 16.3854C6.77126 15.0462 4.98598 13.26 3.64772 11.1541C2.17661 8.88103 1.26051 6.2931 0.974535 3.60059L0.972909 3.58763C0.941808 3.24343 0.983408 2.89629 1.09368 2.56877C1.20401 2.24119 1.38103 1.93975 1.61405 1.68446C1.84711 1.42915 2.13108 1.22514 2.4473 1.08547C2.76343 0.945853 3.10515 0.873435 3.45076 0.873101L5.94156 0.873101ZM3.36645 2.53797C3.28082 2.54696 3.1967 2.56869 3.11762 2.60362C3.01224 2.65018 2.91809 2.71873 2.84041 2.80382C2.7628 2.88885 2.70374 2.98896 2.66695 3.09805C2.63158 3.20308 2.6174 3.31427 2.62561 3.42471L2.68073 3.88023C2.96919 6.00069 3.69095 8.03906 4.80113 9.86856L5.04429 10.2576L5.04834 10.2633L5.28016 10.6167C6.3818 12.2493 7.78694 13.6553 9.41959 14.7569L9.773 14.988L9.77947 14.992L10.1669 15.2352C12.1143 16.4185 14.2991 17.1614 16.5678 17.4099C16.6823 17.4199 16.7979 17.407 16.9066 17.3702C17.016 17.3332 17.1166 17.2732 17.2017 17.1951C17.2867 17.117 17.3548 17.0221 17.4011 16.9163C17.4473 16.8103 17.4704 16.6955 17.47 16.5799V14.0866L17.4708 14.0664C17.4758 13.8629 17.4054 13.6641 17.2738 13.5087C17.1438 13.3554 16.9626 13.254 16.764 13.2243C15.9052 13.111 15.0621 12.9013 14.2505 12.5985L14.248 12.5977C14.0997 12.542 13.9385 12.5299 13.7836 12.5628C13.6284 12.5959 13.4855 12.6733 13.3726 12.7849L12.3222 13.8354C12.058 14.0996 11.6492 14.1546 11.3244 13.9699C9.11672 12.7145 7.28849 10.8864 6.03315 8.67867C5.84861 8.35389 5.90437 7.94584 6.16852 7.68169L7.21818 6.63042C7.32975 6.51759 7.40716 6.37546 7.44027 6.22028C7.47336 6.06509 7.46124 5.90357 7.40541 5.75502L7.4046 5.7534C7.10264 4.9442 6.8932 4.10339 6.77967 3.24719L6.76589 3.17263C6.7258 3.00255 6.63264 2.84893 6.49922 2.73411C6.36562 2.61922 6.19941 2.54966 6.02505 2.53554L5.94967 2.5331L3.45238 2.5331L3.36645 2.53797Z" fill="#171A1F" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1_1745">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="number-text">{item.number}</span>
                <div className="arrow-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8099 9.16992C16.2683 9.16992 16.6399 9.54151 16.6399 9.99992C16.6399 10.4583 16.2683 10.8299 15.8099 10.8299L4.18986 10.8299C3.73147 10.8299 3.35986 10.4583 3.35986 9.99992C3.35986 9.54151 3.73147 9.16992 4.18986 9.16992L15.8099 9.16992Z" fill="#171A1F" />
                    <path d="M9.42814 3.60332C9.73201 3.29944 10.2126 3.28069 10.5386 3.54658L10.6018 3.60332L16.4118 9.41335C16.736 9.73746 16.736 10.2629 16.4118 10.587L10.6018 16.397C10.2777 16.7212 9.75226 16.7212 9.42814 16.397C9.10403 16.0729 9.10403 15.5475 9.42814 15.2233L14.6513 10.0002L9.42814 4.77699L9.37146 4.71377C9.10552 4.38777 9.12428 3.9072 9.42814 3.60332Z" fill="#171A1F" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

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

export default MobileTopUpScreen;
