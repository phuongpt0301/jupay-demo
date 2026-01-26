import '@testing-library/jest-dom'

// Global test setup for JuPay Mobile Demo
// This file is run before all tests to set up the testing environment

// Setup viewport for mobile testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock IntersectionObserver for mobile components
if (typeof window !== 'undefined') {
  (window as any).IntersectionObserver = class IntersectionObserver {
    root = null
    rootMargin = '0px'
    thresholds = [0]
    
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return [] }
  }
}