/* ==========================================================================
   Loading Component - Loading states, spinners, and skeleton screens
   ========================================================================== */

import React from 'react';

// Warning Icon - Clean SVG outline
const WarningIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ==========================================================================
   Spinner Component - Animated loading spinner
   ========================================================================== */

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  'aria-label'?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
  'aria-label': ariaLabel = 'Loading',
}) => {
  const spinnerClasses = [
    'spinner',
    `spinner--${size}`,
    `spinner--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <svg className="spinner__svg" viewBox="0 0 24 24">
        <circle
          className="spinner__circle spinner__circle--background"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2"
        />
        <circle
          className="spinner__circle spinner__circle--progress"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
};

/* ==========================================================================
   Loading Overlay Component - Full-screen loading state
   ========================================================================== */

export interface LoadingOverlayProps {
  loading: boolean;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  message = 'Loading...',
  className = '',
}) => {
  if (!loading) return null;

  return (
    <div className={`loading-overlay ${className}`}>
      <div className="loading-overlay__content">
        <Spinner size="lg" variant="white" />
        <p className="loading-overlay__message">{message}</p>
      </div>
    </div>
  );
};

/* ==========================================================================
   Skeleton Component - Placeholder loading state
   ========================================================================== */

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  animation = 'pulse',
  className = '',
}) => {
  const skeletonClasses = [
    'skeleton',
    `skeleton--${variant}`,
    animation !== 'none' && `skeleton--${animation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={skeletonClasses}
      style={style}
      role="status"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/* ==========================================================================
   Loading Container Component - Wrapper with loading states
   ========================================================================== */

export interface LoadingContainerProps {
  loading: boolean;
  error?: string | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  className?: string;
}

export const LoadingContainer: React.FC<LoadingContainerProps> = ({
  loading,
  error,
  children,
  loadingComponent,
  errorComponent,
  className = '',
}) => {
  if (error) {
    return (
      <div
        className={`loading-container loading-container--error ${className}`}
      >
        {errorComponent || (
          <div className="loading-container__error">
            <div className="loading-container__error-icon">
              <WarningIcon />
            </div>
            <p className="loading-container__error-message">{error}</p>
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`loading-container loading-container--loading ${className}`}
      >
        {loadingComponent || (
          <div className="loading-container__loading">
            <Spinner size="lg" />
            <p className="loading-container__loading-message">Loading...</p>
          </div>
        )}
      </div>
    );
  }

  return <div className={`loading-container ${className}`}>{children}</div>;
};
