/* ==========================================================================
   Card Component - Flexible content container
   ========================================================================== */

import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  role?: string;
  tabIndex?: number;
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  interactive = false,
  className = '',
  onClick,
  onKeyDown,
  'aria-label': ariaLabel,
  role,
  tabIndex,
  id,
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hover && 'card--hover',
    interactive && 'card--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
    onKeyDown?.(event);
  };

  return (
    <div
      id={id}
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      role={interactive ? role || 'button' : role}
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
    >
      {children}
    </div>
  );
};

/* ==========================================================================
   Card Header Component
   ========================================================================== */

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
}) => <div className={`card__header ${className}`}>{children}</div>;

/* ==========================================================================
   Card Body Component
   ========================================================================== */

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
}) => <div className={`card__body ${className}`}>{children}</div>;

/* ==========================================================================
   Card Footer Component
   ========================================================================== */

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => <div className={`card__footer ${className}`}>{children}</div>;
