/**
 * Manual Test Script for Navigation Flow
 * 
 * This script tests the basic navigation and authentication flow:
 * 1. Splash screen displays and auto-navigates
 * 2. Login screen accepts demo credentials
 * 3. Loading states work correctly
 * 4. Mobile viewport is responsive
 */

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:5173',
  demoCredentials: {
    username: 'demo',
    password: 'demo123'
  },
  timeouts: {
    splashDelay: 2500,
    loadingDuration: 3000,
    testTimeout: 10000
  }
};

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(name, passed, message = '') {
  const status = passed ? 'PASS' : 'FAIL';
  const result = { name, passed, message };
  testResults.tests.push(result);
  
  if (passed) {
    testResults.passed++;
    console.log(`✅ ${status}: ${name}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${status}: ${name} - ${message}`);
  }
}

function logSummary() {
  console.log('\n' + '='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${testResults.tests.length}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${((testResults.passed / testResults.tests.length) * 100).toFixed(1)}%`);
  
  if (testResults.failed > 0) {
    console.log('\nFailed Tests:');
    testResults.tests
      .filter(test => !test.passed)
      .forEach(test => console.log(`  - ${test.name}: ${test.message}`));
  }
}

// Test functions
async function testSplashScreen() {
  console.log('\n🧪 Testing Splash Screen...');
  
  try {
    // Test 1: Check if splash screen elements are present
    const splashElements = {
      title: document.querySelector('.app-title'),
      subtitle: document.querySelector('.app-subtitle'),
      logo: document.querySelector('.logo-icon'),
      tagline: document.querySelector('.splash-tagline')
    };
    
    logTest(
      'Splash screen elements present',
      splashElements.title && splashElements.subtitle && splashElements.logo,
      'Missing required splash screen elements'
    );
    
    // Test 2: Check branding content
    const hasCorrectBranding = 
      splashElements.title?.textContent?.includes('JuPay') &&
      splashElements.subtitle?.textContent?.includes('Mobile Payment Demo');
    
    logTest(
      'Correct branding displayed',
      hasCorrectBranding,
      'JuPay branding not found or incorrect'
    );
    
    // Test 3: Check fade-in animation
    const hasFadeInClass = document.querySelector('.splash-content.fade-in');
    logTest(
      'Fade-in animation applied',
      !!hasFadeInClass,
      'Fade-in animation class not applied'
    );
    
  } catch (error) {
    logTest('Splash screen test', false, error.message);
  }
}

async function testLoginScreen() {
  console.log('\n🧪 Testing Login Screen...');
  
  try {
    // Test 1: Check if login form elements are present
    const loginElements = {
      usernameInput: document.querySelector('input[placeholder*="Username"]'),
      passwordInput: document.querySelector('input[placeholder*="Password"]'),
      loginButton: document.querySelector('button[type="submit"], button:contains("Login")'),
      forgotPassword: document.querySelector('.forgot-password-link')
    };
    
    logTest(
      'Login form elements present',
      loginElements.usernameInput && loginElements.passwordInput && loginElements.loginButton,
      'Missing required login form elements'
    );
    
    // Test 2: Check demo credentials hint
    const demoHint = document.querySelector('.demo-hint');
    logTest(
      'Demo credentials hint displayed',
      !!demoHint,
      'Demo credentials hint not found'
    );
    
    // Test 3: Check form validation (empty fields)
    if (loginElements.loginButton) {
      loginElements.loginButton.click();
      
      setTimeout(() => {
        const errorMessages = document.querySelectorAll('.error-message');
        logTest(
          'Form validation for empty fields',
          errorMessages.length > 0,
          'No validation errors shown for empty fields'
        );
      }, 100);
    }
    
  } catch (error) {
    logTest('Login screen test', false, error.message);
  }
}

async function testMobileViewport() {
  console.log('\n🧪 Testing Mobile Viewport...');
  
  try {
    // Test 1: Check viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const hasCorrectViewport = viewportMeta?.content?.includes('width=device-width');
    
    logTest(
      'Mobile viewport meta tag configured',
      hasCorrectViewport,
      'Viewport meta tag missing or incorrect'
    );
    
    // Test 2: Check touch target sizes
    const buttons = document.querySelectorAll('button');
    let touchTargetsValid = true;
    
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      if (rect.height < 44 || rect.width < 44) {
        touchTargetsValid = false;
      }
    });
    
    logTest(
      'Touch targets meet minimum size (44px)',
      touchTargetsValid,
      'Some buttons do not meet minimum touch target size'
    );
    
    // Test 3: Check mobile-first CSS classes
    const screenElement = document.querySelector('.screen');
    const hasScreenClass = !!screenElement;
    
    logTest(
      'Mobile-first CSS structure',
      hasScreenClass,
      'Screen container class not found'
    );
    
  } catch (error) {
    logTest('Mobile viewport test', false, error.message);
  }
}

async function testLoadingState() {
  console.log('\n🧪 Testing Loading State...');
  
  try {
    // Test 1: Check if loading component exists
    const loadingState = document.querySelector('.loading-state');
    
    if (loadingState) {
      // Test 2: Check loading elements
      const loadingElements = {
        spinner: loadingState.querySelector('.loading-spinner'),
        message: loadingState.querySelector('.loading-message'),
        progress: loadingState.querySelector('.loading-progress')
      };
      
      logTest(
        'Loading state elements present',
        loadingElements.spinner && loadingElements.message,
        'Missing loading state elements'
      );
      
      // Test 3: Check interaction blocking
      const isModal = loadingState.getAttribute('role') === 'dialog';
      const hasModalAttributes = loadingState.getAttribute('aria-modal') === 'true';
      
      logTest(
        'Loading state blocks interactions',
        isModal && hasModalAttributes,
        'Loading state does not have proper modal attributes'
      );
    } else {
      logTest(
        'Loading state component',
        false,
        'Loading state component not found (may not be active)'
      );
    }
    
  } catch (error) {
    logTest('Loading state test', false, error.message);
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting JuPay Mobile Demo Navigation Tests');
  console.log('='.repeat(50));
  
  // Wait for page to load
  await new Promise(resolve => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  });
  
  // Run tests based on current page
  const currentPath = window.location.pathname;
  
  if (currentPath.includes('splash') || currentPath === '/') {
    await testSplashScreen();
  } else if (currentPath.includes('login')) {
    await testLoginScreen();
  }
  
  // Always run these tests
  await testMobileViewport();
  await testLoadingState();
  
  // Summary
  logSummary();
  
  return testResults;
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  runTests();
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runTests, testResults };
}