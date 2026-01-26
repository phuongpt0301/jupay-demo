import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigationWithLoading } from '../hooks/useNavigationWithLoading';
import LoadingState from '../components/LoadingState';

/**
 * Demo component to showcase the useNavigationWithLoading hook
 */
const NavigationDemo: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </BrowserRouter>
  );
};

const HomePage: React.FC = () => {
  const { navigateWithLoading, isLoading, currentPath, getNavigationHistory } = useNavigationWithLoading();

  if (isLoading) {
    return <LoadingState message="Navigating..." onComplete={() => {}} />;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Navigation Hook Demo</h1>
      <p>Current Path: {currentPath}</p>
      <p>Navigation History: {JSON.stringify(getNavigationHistory())}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => navigateWithLoading('/page1', 'Going to Page 1...')}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            fontSize: '16px',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          Go to Page 1
        </button>
        
        <button 
          onClick={() => navigateWithLoading('/page2', 'Going to Page 2...')}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            fontSize: '16px',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          Go to Page 2
        </button>
      </div>
    </div>
  );
};

const Page1: React.FC = () => {
  const { navigateWithLoading, goBack, isLoading, currentPath, getNavigationHistory } = useNavigationWithLoading();

  if (isLoading) {
    return <LoadingState message="Navigating..." onComplete={() => {}} />;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Page 1</h1>
      <p>Current Path: {currentPath}</p>
      <p>Navigation History: {JSON.stringify(getNavigationHistory())}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => goBack()}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            fontSize: '16px',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          Go Back
        </button>
        
        <button 
          onClick={() => navigateWithLoading('/page2', 'Going to Page 2...')}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            fontSize: '16px',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          Go to Page 2
        </button>
        
        <button 
          onClick={() => navigateWithLoading('/', 'Going Home...')}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            fontSize: '16px',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

const Page2: React.FC = () => {
  const { navigateWithLoading, goBack, isLoading, currentPath, getNavigationHistory } = useNavigationWithLoading();

  if (isLoading) {
    return <LoadingState message="Navigating..." onComplete={() => {}} />;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Page 2</h1>
      <p>Current Path: {currentPath}</p>
      <p>Navigation History: {JSON.stringify(getNavigationHistory())}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => goBack()}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            fontSize: '16px',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          Go Back
        </button>
        
        <button 
          onClick={() => navigateWithLoading('/page1', 'Going to Page 1...')}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            fontSize: '16px',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          Go to Page 1
        </button>
        
        <button 
          onClick={() => navigateWithLoading('/', 'Going Home...')}
          style={{ 
            padding: '10px 20px', 
            margin: '5px', 
            fontSize: '16px',
            minHeight: '44px',
            minWidth: '44px'
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NavigationDemo;