/* ==========================================================================
   Type Exports - Central export for all TypeScript types
   ========================================================================== */

// Portfolio data types
export type {
  // Core portfolio data
  ProfileData,
  BasicProfile,
  SocialLinks,
  ExtendedSocialLinks,
  
  // Work experience
  WorkExperience,
  WorkTechStack,
  CloudProvider,
  
  // Projects
  ProjectsCollection,
  ProjectType,
  Project,
  ProjectStatus,
  ProjectAvailability,
  ProjectLinks,
  
  // Technology stack
  TechStack,
  TechSkill,
  TechCategory,
  SkillProficiency,
  
  // Education & awards
  Education,
  Award,
  AwardCategory,
  
  // Preferences & settings
  Preferences,
  WorkType,
  EmploymentType,
  
  // Metadata
  Metadata,
  
  // API responses
  ApiResponse,
  ApiError,
  
  // UI state
  LoadingState,
  PageRoute,
  ThemeMode,
  PortfolioState,
  
  // Component props
  BaseComponentProps,
  LoadableProps,
  InteractiveProps,
  
  // Filters
  ProjectFilters,
  TechFilters,
  ExperienceFilters,
  
  // Utilities
  DeepPartial,
  ProjectsByType,
  WithoutId,
  RequireFields,
  EnhancedProfileData,
} from './portfolio';

// UI component types
export type {
  // Base component types
  BaseProps,
  DisableableProps,
  LoadableProps as UILoadableProps,
  ErrorProps,
  
  // Event handlers
  ClickableProps,
  KeyboardProps,
  FocusableProps,
  
  // Component variants
  ButtonVariant,
  ButtonSize,
  ButtonShape,
  CardVariant,
  CardSize,
  BadgeVariant,
  BadgeSize,
  
  // Layout components
  SidebarProps,
  HeaderProps,
  LayoutProps,
  
  // Navigation
  NavItem,
  NavGroup,
  NavigationProps,
  
  // Form components
  InputProps,
  SelectProps,
  SelectOption,
  TextareaProps,
  
  // Feedback components
  ToastType,
  ToastPosition,
  Toast,
  ModalProps,
  TooltipProps,
  
  // Data display
  AvatarProps,
  ProgressProps,
  SkeletonProps,
  
  // Portfolio specific
  PortfolioStats,
  StatsCardProps,
  SkillRatingProps,
  TimelineItem,
  TimelineProps,
  
  // Animation
  AnimationType,
  AnimationDirection,
  AnimationProps,
  
  // Responsive
  Breakpoint,
  ResponsiveValue,
  ResponsiveGridProps,
  
  // Utilities
  ComponentWithRef,
  PolymorphicProps,
  ControlledState,
} from './ui';

// API and service types
export type {
  // HTTP client
  HttpMethod,
  RequestConfig,
  HttpResponse,
  HttpError,
  
  // API responses
  ApiResponse as ServiceApiResponse,
  ApiErrorResponse,
  PaginatedResponse,
  ApiEndpoints,
  
  // Data fetching
  LoadingState as ServiceLoadingState,
  FetchResult,
  AsyncState,
  CacheEntry,
  
  // Service configuration
  ApiClientConfig,
  ProfileServiceConfig,
  CacheConfig,
  
  // Service interfaces
  ProfileService,
  DataSource,
  FetchOptions,
  ValidationResult,
  
  // Real-time data
  ConnectionState,
  DataUpdate,
  SubscriptionOptions,
  
  // Analytics
  PerformanceMetrics,
  UsageAnalytics,
  ErrorLog,
  
  // Development
  MockConfig,
  TestConfig,
  DevUtils,
  
  // Utilities
  TypeGuard,
  SchemaValidator,
  DataTransformer,
  
  // Service dependencies
  ServiceDependencies,
  HttpClient,
  CacheService,
  Logger,
  AnalyticsService,
  ServiceRegistry,
  
  // Middleware
  RequestMiddleware,
  ResponseInterceptor,
  ErrorInterceptor,
  HealthCheckResult,
  BatchRequest,
  BatchResponse,
} from './api';

/* ========================================
   Re-export Common React Types
   ======================================== */

export type {
  ReactNode,
  ReactElement,
  FC,
  Component,
  ComponentProps,
  ComponentType,
  RefObject,
  MutableRefObject,
  ForwardedRef,
  MouseEvent,
  KeyboardEvent,
  FormEvent,
  ChangeEvent,
  FocusEvent,
} from 'react';

/* ========================================
   Global Type Helpers
   ======================================== */

/**
 * Make all properties of T optional except those in K
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Extract keys from T where the value extends U
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Create a union type of all values in T
 */
export type ValueOf<T> = T[keyof T];

/**
 * Create a type with all properties set to a specific type
 */
export type AllPropsOfType<T, U> = {
  [K in keyof T]: U;
};

/**
 * Remove readonly modifier from all properties
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Add readonly modifier to all properties
 */
export type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Extract function parameter types
 */
export type FunctionParameters<T extends (...args: unknown[]) => unknown> = T extends (...args: infer P) => unknown ? P : never;

/**
 * Extract function return type
 */
export type FunctionReturnType<T extends (...args: unknown[]) => unknown> = T extends (...args: unknown[]) => infer R ? R : unknown;

/**
 * Create a promise type from T
 */
export type PromiseType<T> = T extends Promise<infer U> ? U : T;

/**
 * Create array element type from array type
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/* ========================================
   Portfolio-Specific Utility Types
   ======================================== */

/**
 * Extract project by ID from projects collection
 */
export type ProjectById<T extends string> = T extends `${infer Type}${string}`
  ? Type extends 'P' | 'W' | 'A' | 'O'
    ? Project & { id: T }
    : never
  : never;

/**
 * Create skills by category mapping
 */
export type SkillsByCategory = {
  [K in TechCategory]: TechSkill[];
};

// Re-export specific types needed for timeline entries
import type { WorkExperience, Project, TechCategory, TechSkill } from './portfolio';

/**
 * Experience timeline entry
 */
export type ExperienceTimelineEntry = Pick<
  WorkExperience,
  'id' | 'company' | 'position' | 'start_date' | 'end_date' | 'current'
> & {
  type: 'work';
  duration: string;
};

/**
 * Project timeline entry
 */
export type ProjectTimelineEntry = Pick<
  Project,
  'id' | 'title' | 'start' | 'end' | 'status'
> & {
  type: 'project';
  duration: string;
};

/**
 * Combined timeline entry
 */
export type TimelineEntry = ExperienceTimelineEntry | ProjectTimelineEntry;

/* ========================================
   Component Prop Helpers
   ======================================== */

/**
 * Extract component props from a component type
 */
export type PropsOf<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * Create a component props type with additional props
 */
export type ExtendProps<T, P> = T & P;

/**
 * Override specific props in a component props type
 */
export type OverrideProps<T, P> = Omit<T, keyof P> & P;

/**
 * Make specific props required in a component props type
 */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/* ========================================
   Event Handler Helpers
   ======================================== */

/**
 * Generic event handler type
 */
export type EventHandler<T = Element, E = Event> = (event: E & { currentTarget: T }) => void;

/**
 * Mouse event handler type
 */
export type MouseEventHandler<T = Element> = EventHandler<T, MouseEvent>;

/**
 * Keyboard event handler type
 */
export type KeyboardEventHandler<T = Element> = EventHandler<T, KeyboardEvent>;

/**
 * Form event handler type
 */
export type FormEventHandler<T = Element> = EventHandler<T, React.FormEvent>;

/**
 * Change event handler type
 */
export type ChangeEventHandler<T = Element> = EventHandler<T, React.ChangeEvent>;

/* ========================================
   State Management Helpers
   ======================================== */

/**
 * Action type for useReducer
 */
export type Action<T extends string = string, P = unknown> = {
  type: T;
  payload?: P;
};

/**
 * Reducer type
 */
export type Reducer<S, A extends Action> = (state: S, action: A) => S;

/**
 * Async action creator type
 */
export type AsyncAction<S, A extends Action> = (
  dispatch: (action: A) => void,
  getState: () => S
) => Promise<void> | void;