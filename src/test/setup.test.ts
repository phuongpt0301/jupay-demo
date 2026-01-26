import { describe, it, expect } from 'vitest'
import fc from 'fast-check'

describe('Test Environment Setup', () => {
  it('should have vitest working', () => {
    expect(true).toBe(true)
  })

  it('should have fast-check working for property-based testing', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return n === n // Identity property
      })
    )
  })

  it('should have jsdom environment available', () => {
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
  })
})