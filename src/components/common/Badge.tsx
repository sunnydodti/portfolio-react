/* ==========================================================================
   Badge Component - Labels, tags, and status indicators
   ========================================================================== */

import React from 'react';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill' | 'square';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  'aria-label'?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  icon,
  iconPosition = 'left',
  removable = false,
  onRemove,
  className = '',
  'aria-label': ariaLabel,
  id,
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    `badge--${shape}`,
    removable && 'badge--removable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    onRemove?.();
  };

  const handleRemoveKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onRemove?.();
    }
  };

  return (
    <span
      id={id}
      className={badgeClasses}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === 'left' && (
        <span className="badge__icon badge__icon--left" aria-hidden="true">
          {icon}
        </span>
      )}
      
      <span className="badge__text">
        {children}
      </span>
      
      {icon && iconPosition === 'right' && !removable && (
        <span className="badge__icon badge__icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
      
      {removable && (
        <button
          className="badge__remove"
          onClick={handleRemove}
          onKeyDown={handleRemoveKeyDown}
          aria-label="Remove"
          type="button"
        >
          <svg
            className="badge__remove-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

/* ==========================================================================
   Skill Badge Component - Specialized for technology skills
   ========================================================================== */

export interface SkillBadgeProps {
  skill: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsExperience?: number;
  icon?: React.ReactNode;
  showProficiency?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  proficiency,
  yearsExperience,
  icon,
  showProficiency = false,
  className = '',
  onClick,
}) => {
  const getProficiencyVariant = (prof?: string) => {
    switch (prof) {
      case 'expert':
        return 'success';
      case 'advanced':
        return 'primary';
      case 'intermediate':
        return 'info';
      case 'beginner':
        return 'warning';
      default:
        return 'default';
    }
  };

  const badgeClasses = [
    'skill-badge',
    onClick && 'skill-badge--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      className={badgeClasses} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View details for ${skill}` : undefined}
    >
      <Badge
        variant={showProficiency ? getProficiencyVariant(proficiency) : 'primary'}
        icon={icon}
        className="skill-badge__main"
      >
        {skill}
      </Badge>
      
      {showProficiency && (proficiency || yearsExperience) && (
        <div className="skill-badge__details">
          {proficiency && (
            <span className="skill-badge__proficiency">
              {proficiency.charAt(0).toUpperCase() + proficiency.slice(1)}
            </span>
          )}
          {yearsExperience && (
            <span className="skill-badge__experience">
              {yearsExperience}+ years
            </span>
          )}
        </div>
      )}
    </div>
  );
};