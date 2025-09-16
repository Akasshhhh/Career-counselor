/**
 * Custom error classes for the Career Counselor AI
 */

export class CareerCounselorError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'CareerCounselorError';
  }
}

export class ValidationError extends CareerCounselorError {
  constructor(message: string, public readonly field?: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class SessionNotFoundError extends CareerCounselorError {
  constructor(sessionId: string) {
    super(`Chat session not found: ${sessionId}`, 'SESSION_NOT_FOUND');
    this.name = 'SessionNotFoundError';
  }
}

export class AIResponseError extends CareerCounselorError {
  constructor(message: string, public readonly details?: any) {
    super(message, 'AI_RESPONSE_ERROR');
    this.name = 'AIResponseError';
  }
}

export class DatabaseError extends CareerCounselorError {
  constructor(message: string, public readonly originalError?: Error) {
    super(message, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
  }
}

// Type guard for custom errors
export function isCareerCounselorError(error: unknown): error is CareerCounselorError {
  return error instanceof CareerCounselorError;
}

// Helper function to normalize errors
export function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === 'string') {
    return new Error(error);
  }
  return new Error('An unknown error occurred');
}
