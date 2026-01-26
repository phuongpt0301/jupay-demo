import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import LoadingState from './LoadingState';

describe('LoadingState Component', () => {
  let mockOnComplete: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnComplete = vi.fn();
    // Mock timers for testing
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    // Restore body overflow
    document.body.style.overflow = '';
  });

  it('renders with default loading message', () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders with custom loading message', () => {
    const customMessage = 'Processing payment...';
    render(<LoadingState message={customMessage} onComplete={mockOnComplete} />);
    
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('displays spinner animation elements', () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    const spinner = document.querySelector('.loading-spinner');
    expect(spinner).toBeInTheDocument();
    
    const spinnerRings = document.querySelectorAll('.spinner-ring');
    expect(spinnerRings).toHaveLength(3);
  });

  it('displays progress bar', () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    const progressBar = document.querySelector('.loading-progress');
    expect(progressBar).toBeInTheDocument();
    
    const progressBarFill = document.querySelector('.loading-progress-bar');
    expect(progressBarFill).toBeInTheDocument();
  });

  it('blocks body scrolling when mounted', () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scrolling when unmounted', () => {
    const { unmount } = render(<LoadingState onComplete={mockOnComplete} />);
    
    expect(document.body.style.overflow).toBe('hidden');
    
    unmount();
    
    expect(document.body.style.overflow).toBe('');
  });

  it('calls onComplete after default duration (3 seconds)', async () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    expect(mockOnComplete).not.toHaveBeenCalled();
    
    // Fast-forward time by 3 seconds
    vi.advanceTimersByTime(3000);
    
    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onComplete after custom duration', async () => {
    const customDuration = 5000;
    render(<LoadingState duration={customDuration} onComplete={mockOnComplete} />);
    
    expect(mockOnComplete).not.toHaveBeenCalled();
    
    // Fast-forward time by less than custom duration
    vi.advanceTimersByTime(4000);
    expect(mockOnComplete).not.toHaveBeenCalled();
    
    // Fast-forward to complete custom duration
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('updates progress over time', () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    const progressBar = document.querySelector('.loading-progress-bar') as HTMLElement;
    
    // Initial progress should be 0%
    expect(progressBar.style.width).toBe('0%');
    
    // Advance time and check progress updates
    vi.advanceTimersByTime(1500); // Half of 3000ms
    
    // Progress should be approximately 50% (allowing for some variance due to timing)
    const progressWidth = parseFloat(progressBar.style.width);
    expect(progressWidth).toBeGreaterThan(40);
    expect(progressWidth).toBeLessThan(60);
  });

  it('prevents event propagation on interaction', () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    const loadingState = screen.getByRole('dialog');
    
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
    const stopPropagationSpy = vi.spyOn(clickEvent, 'stopPropagation');
    
    loadingState.dispatchEvent(clickEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Loading');
    
    const message = screen.getByText('Loading...');
    expect(message).toHaveAttribute('aria-live', 'polite');
    
    // Check for screen reader content
    expect(screen.getByText(/Loading progress:/)).toBeInTheDocument();
  });

  it('cleans up timers on unmount', () => {
    const { unmount } = render(<LoadingState onComplete={mockOnComplete} />);
    
    // Unmount before completion
    unmount();
    
    // Advance time past when it would have completed
    vi.advanceTimersByTime(5000);
    
    // onComplete should not be called after unmount
    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  it('handles touch events to prevent interactions', () => {
    render(<LoadingState onComplete={mockOnComplete} />);
    
    const loadingState = screen.getByRole('dialog');
    
    const touchStartEvent = new TouchEvent('touchstart', { bubbles: true });
    const touchMoveEvent = new TouchEvent('touchmove', { bubbles: true });
    const touchEndEvent = new TouchEvent('touchend', { bubbles: true });
    
    const preventDefaultSpy1 = vi.spyOn(touchStartEvent, 'preventDefault');
    const preventDefaultSpy2 = vi.spyOn(touchMoveEvent, 'preventDefault');
    const preventDefaultSpy3 = vi.spyOn(touchEndEvent, 'preventDefault');
    
    loadingState.dispatchEvent(touchStartEvent);
    loadingState.dispatchEvent(touchMoveEvent);
    loadingState.dispatchEvent(touchEndEvent);
    
    expect(preventDefaultSpy1).toHaveBeenCalled();
    expect(preventDefaultSpy2).toHaveBeenCalled();
    expect(preventDefaultSpy3).toHaveBeenCalled();
  });
});