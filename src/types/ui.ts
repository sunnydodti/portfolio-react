/* ==========================================================================
   UI Component Types - Interface definitions for UI components
   ========================================================================== */

import type { ReactNode, MouseEvent, KeyboardEvent, FormEvent } from 'react';

/* ========================================
   Base Component Types
   ======================================== */

/**
 * Standard props that all components should accept
 */
export interface BaseProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
  children?: ReactNode;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  disabled?: boolean;
}

/**
 * Props for components with loading states
 */
export interface LoadableProps {
  loading?: boolean;
  loadingText?: string;
  skeleton?: boolean;
}

/**
 * Props for components with error states
 */
export interface ErrorProps {
  error?: string | null;
  onRetry?: () => void;
}

/* ========================================
   Event Handler Types
   ======================================== */

/**
 * Click event handlers
 */
export interface ClickableProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onDoubleClick?: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * Keyboard event handlers
 */
export interface KeyboardProps {
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLElement>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLElement>) => void;
}

/**
 * Focus event handlers
 */
export interface FocusableProps {
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  autoFocus?: boolean;
  tabIndex?: number;
}

/* ========================================
   Component Variant Types
   ======================================== */

/**
 * Button component variants
 */
export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'cta'
  | 'social'
  | 'nav';

/**
 * Button sizes
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button shapes
 */
export type ButtonShape = 'square' | 'circle' | 'pill' | 'default';

/**
 * Card component variants
 */
export type CardVariant = 
  | 'default'
  | 'elevated'
  | 'outlined'
  | 'gradient'
  | 'glass'
  | 'experience'
  | 'project'
  | 'skill'
  | 'stats'
  | 'contact';

/**
 * Card sizes
 */
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Badge variants
 */
export type BadgeVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'skill'
  | 'tech'
  | 'category';

/**
 * Badge sizes
 */
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

/* ========================================
   Layout Component Types
   ======================================== */

/**
 * Sidebar component props
 */
export interface SidebarProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'fixed' | 'overlay' | 'push';
  width?: string | number;
}

/**
 * Header component props
 */
export interface HeaderProps extends BaseProps {
  title: string;
  subtitle?: string;
  showMenuButton?: boolean;
  showBackButton?: boolean;
  onMenuClick?: () => void;
  onBackClick?: () => void;
  actions?: ReactNode;
}

/**
 * Layout wrapper props
 */
export interface LayoutProps extends BaseProps {
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  currentPage: string;
}

/* ========================================
   Navigation Types
   ======================================== */

/**
 * Navigation item
 */
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
}

/**
 * Navigation group
 */
export interface NavGroup {
  id: string;
  label?: string;
  items: NavItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

/**
 * Navigation props
 */
export interface NavigationProps extends BaseProps {
  items?: NavItem[];
  groups?: NavGroup[];
  currentPath: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'tabs' | 'pills' | 'underline' | 'sidebar';
  onItemClick?: (item: NavItem) => void;
}

/* ========================================
   Form Component Types
   ======================================== */

/**
 * Input component props
 */
export interface InputProps extends BaseProps, DisableableProps, FocusableProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined' | 'underlined';
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChange?: (value: string, event: FormEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

/**
 * Select component props
 */
export interface SelectProps extends BaseProps, DisableableProps, FocusableProps {
  name?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  error?: string;
  helperText?: string;
  options: SelectOption[];
  onChange?: (value: string | string[]) => void;
  onSearch?: (query: string) => void;
}

/**
 * Select option
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: ReactNode;
}

/**
 * Textarea component props
 */
export interface TextareaProps extends BaseProps, DisableableProps, FocusableProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
  cols?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  variant?: 'default' | 'filled' | 'outlined';
  error?: string;
  helperText?: string;
  onChange?: (value: string, event: FormEvent<HTMLTextAreaElement>) => void;
}

/* ========================================
   Feedback Component Types
   ======================================== */

/**
 * Toast/notification types
 */
export type ToastType = 'info' | 'success' | 'warning' | 'error';

/**
 * Toast position
 */
export type ToastPosition = 
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Toast notification
 */
export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Modal component props
 */
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

/**
 * Tooltip component props
 */
export interface TooltipProps extends BaseProps {
  content: string | ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  arrow?: boolean;
  disabled?: boolean;
}

/* ========================================
   Data Display Types
   ======================================== */

/**
 * Avatar component props
 */
export interface AvatarProps extends BaseProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square' | 'rounded';
  fallbackIcon?: ReactNode;
  status?: 'online' | 'offline' | 'busy' | 'away';
  border?: boolean;
  onClick?: () => void;
}

/**
 * Progress component props
 */
export interface ProgressProps extends BaseProps {
  value: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'linear' | 'circular';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  animated?: boolean;
  striped?: boolean;
}

/**
 * Skeleton component props
 */
export interface SkeletonProps extends BaseProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | false;
  lines?: number;
}

/* ========================================
   Portfolio Specific Types
   ======================================== */

/**
 * Portfolio stats display
 */
export interface PortfolioStats {
  yearsExperience: number;
  projectsCompleted: number;
  technologiesUsed: number;
  currentRole: string;
}

/**
 * Stats card props
 */
export interface StatsCardProps extends BaseProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
    period: string;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

/**
 * Skill rating component props
 */
export interface SkillRatingProps extends BaseProps {
  skill: string;
  level: number; // 1-5 scale
  years?: number;
  showYears?: boolean;
  interactive?: boolean;
  onChange?: (level: number) => void;
}

/**
 * Timeline item
 */
export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  type?: 'work' | 'education' | 'project' | 'achievement';
  status?: 'completed' | 'current' | 'future';
}

/**
 * Timeline component props
 */
export interface TimelineProps extends BaseProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'compact' | 'detailed';
  showConnectors?: boolean;
}

/* ========================================
   Animation & Transition Types
   ======================================== */

/**
 * Animation variants
 */
export type AnimationType = 
  | 'fade'
  | 'slide'
  | 'scale'
  | 'rotate'
  | 'bounce'
  | 'pulse'
  | 'shake';

/**
 * Animation direction
 */
export type AnimationDirection = 
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'in'
  | 'out';

/**
 * Animation props
 */
export interface AnimationProps {
  type?: AnimationType;
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  repeat?: boolean | number;
  ease?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

/* ========================================
   Responsive & Breakpoint Types
   ======================================== */

/**
 * Responsive breakpoints
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Responsive value type
 */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

/**
 * Grid responsive props
 */
export interface ResponsiveGridProps extends BaseProps {
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<string | number>;
  rowGap?: ResponsiveValue<string | number>;
  columnGap?: ResponsiveValue<string | number>;
}

/* ========================================
   Utility Types for Components
   ======================================== */

/**
 * Component with forwarded ref
 */
export type ComponentWithRef<P = object, T = HTMLElement> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;

/**
 * Polymorphic component props
 */
export type PolymorphicProps<T extends React.ElementType, P = object> = P & {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, keyof P | 'as'>;

/**
 * Component state for controlled/uncontrolled patterns
 */
export interface ControlledState<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}