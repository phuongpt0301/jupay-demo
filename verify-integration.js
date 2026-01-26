/**
 * Integration Verification Script
 * 
 * This script verifies that all components are properly wired together
 * for complete user flows in the JuPay Mobile Demo.
 * 
 * Task 12.1: Wire all components together for complete user flows
 * Requirements: 5.5
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 JuPay Demo Integration Verification');
console.log('=====================================\n');

// Track verification results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  issues: []
};

function checkFile(path, description) {
  if (existsSync(path)) {
    console.log(`✅ ${description}`);
    results.passed++;
    return true;
  } else {
    console.log(`❌ ${description} - File not found: ${path}`);
    results.failed++;
    results.issues.push(`Missing file: ${path}`);
    return false;
  }
}

function checkFileContent(path, patterns, description) {
  if (!existsSync(path)) {
    console.log(`❌ ${description} - File not found: ${path}`);
    results.failed++;
    results.issues.push(`Missing file: ${path}`);
    return false;
  }
  
  try {
    const content = readFileSync(path, 'utf8');
    const missingPatterns = [];
    
    patterns.forEach(pattern => {
      if (typeof pattern === 'string') {
        if (!content.includes(pattern)) {
          missingPatterns.push(pattern);
        }
      } else if (pattern instanceof RegExp) {
        if (!pattern.test(content)) {
          missingPatterns.push(pattern.toString());
        }
      }
    });
    
    if (missingPatterns.length === 0) {
      console.log(`✅ ${description}`);
      results.passed++;
      return true;
    } else {
      console.log(`❌ ${description} - Missing patterns: ${missingPatterns.join(', ')}`);
      results.failed++;
      results.issues.push(`${path}: Missing patterns - ${missingPatterns.join(', ')}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${description} - Error reading file: ${error.message}`);
    results.failed++;
    results.issues.push(`${path}: Read error - ${error.message}`);
    return false;
  }
}

function checkWarning(condition, message) {
  if (condition) {
    console.log(`⚠️  ${message}`);
    results.warnings++;
    results.issues.push(`Warning: ${message}`);
  }
}

// 1. Core Infrastructure Files
console.log('1. 🏗️  Core Infrastructure');
console.log('---------------------------');

checkFile('src/App.tsx', 'Main App component exists');
checkFile('src/main.tsx', 'Main entry point exists');
checkFile('package.json', 'Package configuration exists');
checkFile('index.html', 'HTML entry point exists');

// 2. Type Definitions
console.log('\n2. 📝 Type Definitions');
console.log('----------------------');

checkFileContent('src/types/index.ts', [
  'interface User',
  'interface Transaction', 
  'interface PaymentRequest',
  'interface AppState',
  'enum ScreenType',
  'interface LoadingManager'
], 'Core TypeScript interfaces defined');

// 3. Router Configuration
console.log('\n3. 🛣️  Router Configuration');
console.log('---------------------------');

checkFileContent('src/router/AppRouter.tsx', [
  'BrowserRouter',
  'Routes',
  'Route',
  'ProtectedRoute',
  'ScreenType.SPLASH',
  'ScreenType.LOGIN',
  'ScreenType.DASHBOARD',
  'ScreenType.PAYMENT',
  'ScreenType.TRANSACTIONS',
  'ScreenType.PROFILE',
  'ScreenType.PAYMENT_CONFIRMATION'
], 'All routes properly configured');

checkFile('src/components/ProtectedRoute.tsx', 'Protected route component exists');
checkFile('src/components/NotFound.tsx', 'NotFound component exists');

// 4. Screen Components
console.log('\n4. 📱 Screen Components');
console.log('-----------------------');

const screens = [
  'SplashScreen',
  'LoginScreen', 
  'DashboardScreen',
  'PaymentScreen',
  'TransactionHistoryScreen',
  'ProfileScreen',
  'PaymentConfirmationScreen'
];

screens.forEach(screen => {
  checkFile(`src/screens/${screen}.tsx`, `${screen} component exists`);
});

checkFileContent('src/screens/index.ts', 
  screens.map(screen => `export { default as ${screen} }`),
  'All screens properly exported'
);

// 5. Core Components
console.log('\n5. 🧩 Core Components');
console.log('---------------------');

checkFile('src/components/ScreenContainer.tsx', 'ScreenContainer component exists');
checkFile('src/components/LoadingState.tsx', 'LoadingState component exists');

checkFileContent('src/components/LoadingState.tsx', [
  'interface LoadingStateProps',
  'duration?: number',
  'onComplete',
  'useEffect',
  'setTimeout'
], 'LoadingState implements 3-second timer');

// 6. Navigation System
console.log('\n6. 🧭 Navigation System');
console.log('-----------------------');

checkFile('src/hooks/useNavigationWithLoading.ts', 'Navigation hook exists');

checkFileContent('src/hooks/useNavigationWithLoading.ts', [
  'useNavigate',
  'navigateWithLoading',
  'isLoading',
  'setTimeout',
  '3000'
], 'Navigation hook implements loading states');

// 7. State Management
console.log('\n7. 🗄️  State Management');
console.log('-----------------------');

checkFile('src/context/AppContext.tsx', 'App context exists');

checkFileContent('src/context/AppContext.tsx', [
  'createContext',
  'useReducer',
  'AppProvider',
  'useAppContext',
  'SET_USER',
  'SET_LOADING',
  'SET_CURRENT_SCREEN',
  'ADD_TO_HISTORY'
], 'App context implements state management');

checkFile('src/hooks/useAppState.ts', 'App state hook exists');
checkFile('src/hooks/useAuth.ts', 'Auth hook exists');

// 8. Demo Data Service
console.log('\n8. 🎭 Demo Data Service');
console.log('-----------------------');

checkFile('src/services/demoDataService.ts', 'Demo data service exists');

checkFileContent('src/services/demoDataService.ts', [
  'getDemoUser',
  'getDemoTransactions',
  'getDemoPaymentMethods',
  'validateCredentials',
  'processPayment'
], 'Demo data service implements all required methods');

// 9. Styling and Mobile Optimization
console.log('\n9. 🎨 Styling and Mobile Optimization');
console.log('-------------------------------------');

checkFile('src/index.css', 'Global styles exist');
checkFile('src/styles/design-system.css', 'Design system styles exist');
checkFile('src/components/ScreenContainer.css', 'ScreenContainer styles exist');
checkFile('src/components/LoadingState.css', 'LoadingState styles exist');
checkFile('src/screens/screens.css', 'Screen styles exist');

checkFileContent('index.html', [
  'viewport',
  'width=device-width',
  'initial-scale=1.0'
], 'Mobile viewport meta tag configured');

// 10. Integration Tests
console.log('\n10. 🧪 Integration Tests');
console.log('------------------------');

checkFile('src/integration/complete-navigation-flow.test.tsx', 'Navigation flow tests exist');
checkFile('src/integration/end-to-end-user-flows.test.tsx', 'End-to-end flow tests exist');
checkFile('src/integration/state-management.test.tsx', 'State management tests exist');

// 11. App Entry Point Integration
console.log('\n11. 🚀 App Entry Point Integration');
console.log('----------------------------------');

checkFileContent('src/App.tsx', [
  'AppProvider',
  'AppRouter',
  './context',
  './router/AppRouter'
], 'App.tsx properly integrates context and router');

checkFileContent('src/main.tsx', [
  'createRoot',
  'App',
  'StrictMode'
], 'Main entry point properly configured');

// 12. Component Integration Verification
console.log('\n12. 🔗 Component Integration Verification');
console.log('-----------------------------------------');

// Check that screens use ScreenContainer
const screenFiles = screens.map(screen => `src/screens/${screen}.tsx`);
screenFiles.forEach(screenFile => {
  if (existsSync(screenFile)) {
    const content = readFileSync(screenFile, 'utf8');
    if (content.includes('ScreenContainer')) {
      console.log(`✅ ${screenFile.split('/').pop()} uses ScreenContainer`);
      results.passed++;
    } else {
      console.log(`⚠️  ${screenFile.split('/').pop()} may not use ScreenContainer`);
      results.warnings++;
    }
  }
});

// Check that screens use navigation hook
screenFiles.forEach(screenFile => {
  if (existsSync(screenFile)) {
    const content = readFileSync(screenFile, 'utf8');
    if (content.includes('useNavigationWithLoading') || content.includes('navigateWithLoading')) {
      console.log(`✅ ${screenFile.split('/').pop()} uses navigation with loading`);
      results.passed++;
    } else {
      console.log(`⚠️  ${screenFile.split('/').pop()} may not use loading navigation`);
      results.warnings++;
    }
  }
});

// 13. Loading State Integration
console.log('\n13. ⏳ Loading State Integration');
console.log('-------------------------------');

checkFileContent('src/hooks/useNavigationWithLoading.ts', [
  /setTimeout.*3000/,
  'setIsLoading(true)',
  'setIsLoading(false)'
], 'Navigation hook properly manages loading states');

// 14. Error Handling Integration
console.log('\n14. ⚠️  Error Handling Integration');
console.log('----------------------------------');

checkFileContent('src/components/NotFound.tsx', [
  'useNavigationWithLoading',
  'handleGoToDashboard',
  'handleGoToLogin',
  'handleReloadApp'
], 'NotFound component provides error recovery');

checkFileContent('src/components/ProtectedRoute.tsx', [
  'useAppContext',
  'isAuthenticated',
  'Navigate'
], 'ProtectedRoute handles authentication');

// 15. Data Flow Integration
console.log('\n15. 📊 Data Flow Integration');
console.log('----------------------------');

checkFileContent('src/context/AppContext.tsx', [
  'demoDataService',
  'localStorage',
  'useEffect'
], 'App context integrates with demo data and persistence');

// Summary
console.log('\n📋 Integration Verification Summary');
console.log('===================================');
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`⚠️  Warnings: ${results.warnings}`);

if (results.issues.length > 0) {
  console.log('\n🔍 Issues Found:');
  results.issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
}

const totalChecks = results.passed + results.failed;
const successRate = totalChecks > 0 ? ((results.passed / totalChecks) * 100).toFixed(1) : 0;

console.log(`\n📈 Success Rate: ${successRate}% (${results.passed}/${totalChecks})`);

if (results.failed === 0) {
  console.log('\n🎉 All critical integration checks passed!');
  console.log('✅ JuPay Demo components are properly wired together for complete user flows.');
} else {
  console.log('\n❌ Some integration issues found. Please address the failed checks above.');
}

if (results.warnings > 0) {
  console.log(`\n⚠️  ${results.warnings} warnings found. These may indicate areas for improvement.`);
}

console.log('\n🚀 Next Steps:');
console.log('1. Run the development server: npm run dev');
console.log('2. Open manual-end-to-end-test.html for comprehensive testing');
console.log('3. Test all user flows from splash screen to payment completion');
console.log('4. Verify loading states and error handling work correctly');

// Exit with appropriate code
process.exit(results.failed > 0 ? 1 : 0);