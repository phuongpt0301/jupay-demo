/**
 * Services Index
 * 
 * Central export point for all service modules in the JuPay Mobile Demo.
 * This provides a clean import interface for components and other modules.
 */

// Demo Data Service
export { demoDataService, DemoDataServiceImpl, DEMO_USER, DEMO_PAYMENT_METHODS } from './demoDataService';

// Re-export types for convenience
export type {
  DemoDataService,
  User,
  Transaction,
  PaymentMethod,
  PaymentRequest,
  PaymentConfirmation,
  LoginCredentials
} from '../types/index';