/* ==========================================================================
   API & Service Types - HTTP client and data service interfaces
   ========================================================================== */

import type { ProfileData } from './portfolio';

/* ========================================
   HTTP Client Types
   ======================================== */

/**
 * HTTP methods supported by the API client
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * HTTP request configuration
 */
export interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTTL?: number;
}

/**
 * HTTP response interface
 */
export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

/**
 * HTTP error interface
 */
export interface HttpError extends Error {
  status?: number;
  statusText?: string;
  response?: HttpResponse;
  config?: RequestConfig;
  isNetworkError?: boolean;
  isTimeoutError?: boolean;
}

/* ========================================
   API Response Types
   ======================================== */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  version?: string;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string | number;
    message: string;
    details?: Record<string, unknown>;
    stack?: string; // Only in development
  };
  timestamp: string;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * API endpoints configuration
 */
export interface ApiEndpoints {
  profile: string;
  experience: string;
  projects: string;
  techStack: string;
  education: string;
  awards: string;
  health: string;
}

/* ========================================
   Data Fetching State Types
   ======================================== */

/**
 * Loading state for async operations
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Data fetching result
 */
export interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Async operation state
 */
export interface AsyncState<T> {
  data: T | null;
  state: LoadingState;
  error: string | null;
  lastFetched?: Date;
  isFetching: boolean;
  isStale: boolean;
}

/**
 * Cache entry metadata
 */
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  key: string;
  tags?: string[];
}

/* ========================================
   Service Configuration Types
   ======================================== */

/**
 * API client configuration
 */
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
  cache?: boolean;
  cacheTTL?: number;
  fallbackData?: Partial<ProfileData>;
  endpoints: ApiEndpoints;
}

/**
 * Profile service configuration
 */
export interface ProfileServiceConfig {
  primaryEndpoint: string;
  fallbackEndpoints: string[];
  localDataPath?: string;
  cacheEnabled: boolean;
  cacheTTL: number;
  retryAttempts: number;
  retryDelay: number;
}

/**
 * Cache service configuration
 */
export interface CacheConfig {
  enabled: boolean;
  defaultTTL: number;
  maxSize: number;
  storage: 'memory' | 'localStorage' | 'sessionStorage';
  prefix: string;
  compression?: boolean;
}

/* ========================================
   Portfolio Data Service Types
   ======================================== */

/**
 * Profile data service interface
 */
export interface ProfileService {
  getProfile(): Promise<ProfileData>;
  getExperience(): Promise<ProfileData['work_experience']>;
  getProjects(): Promise<ProfileData['projects']>;
  getTechStack(): Promise<ProfileData['tech_stack']>;
  getEducation(): Promise<ProfileData['education']>;
  refreshData(): Promise<void>;
  clearCache(): void;
}

/**
 * Data source types
 */
export type DataSource = 'remote' | 'fallback' | 'cache' | 'local';

/**
 * Data fetch options
 */
export interface FetchOptions {
  source?: DataSource;
  forceRefresh?: boolean;
  timeout?: number;
  retries?: number;
  fallbackToLocal?: boolean;
}

/**
 * Data validation result
 */
export interface ValidationResult<T> {
  isValid: boolean;
  data: T | null;
  errors: string[];
  warnings: string[];
}

/* ========================================
   Real-time Data Types
   ======================================== */

/**
 * WebSocket connection state
 */
export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';

/**
 * Real-time data update
 */
export interface DataUpdate<T> {
  type: 'create' | 'update' | 'delete';
  entity: string;
  id: string;
  data: T;
  timestamp: string;
}

/**
 * Subscription options
 */
export interface SubscriptionOptions {
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

/* ========================================
   Analytics & Metrics Types
   ======================================== */

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  fetchTime: number;
  cacheHitRate: number;
  errorRate: number;
  averageResponseTime: number;
  totalRequests: number;
}

/**
 * Usage analytics
 */
export interface UsageAnalytics {
  pageViews: Record<string, number>;
  userInteractions: Record<string, number>;
  sessionDuration: number;
  bounceRate: number;
}

/**
 * Error tracking
 */
export interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  message: string;
  source: string;
  stackTrace?: string;
  userAgent?: string;
  url?: string;
  userId?: string;
}

/* ========================================
   Development & Testing Types
   ======================================== */

/**
 * Mock data configuration
 */
export interface MockConfig {
  enabled: boolean;
  delay?: number;
  errorRate?: number;
  responseVariants?: string[];
}

/**
 * API testing configuration
 */
export interface TestConfig {
  mockEnabled: boolean;
  testEndpoints: boolean;
  validateSchema: boolean;
  logRequests: boolean;
}

/**
 * Development utilities
 */
export interface DevUtils {
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableMocking: boolean;
  enableCaching: boolean;
  enableAnalytics: boolean;
}

/* ========================================
   Type Guards and Utilities
   ======================================== */

/**
 * Type guard for API response
 */
export interface TypeGuard<T> {
  (value: unknown): value is T;
}

/**
 * Schema validation function
 */
export interface SchemaValidator<T> {
  validate(data: unknown): ValidationResult<T>;
  schema: unknown; // JSON Schema or similar
}

/**
 * Data transformer function
 */
export interface DataTransformer<TInput, TOutput> {
  transform(input: TInput): TOutput;
  reverse?(output: TOutput): TInput;
}

/* ========================================
   Service Factory Types
   ======================================== */

/**
 * Service dependencies
 */
export interface ServiceDependencies {
  httpClient: HttpClient;
  cache?: CacheService;
  logger?: Logger;
  analytics?: AnalyticsService;
  validator?: SchemaValidator<ProfileData>;
}

/**
 * HTTP client interface
 */
export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<HttpResponse<T>>;
  delete<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>>;
  request<T>(config: RequestConfig & { url: string }): Promise<HttpResponse<T>>;
}

/**
 * Cache service interface
 */
export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
  keys(pattern?: string): Promise<string[]>;
}

/**
 * Logger interface
 */
export interface Logger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/**
 * Analytics service interface
 */
export interface AnalyticsService {
  track(event: string, properties?: Record<string, unknown>): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
  page(name: string, properties?: Record<string, unknown>): void;
}

/* ========================================
   Advanced Service Types
   ======================================== */

/**
 * Service registry for dependency injection
 */
export interface ServiceRegistry {
  register<T>(name: string, service: T): void;
  get<T>(name: string): T;
  has(name: string): boolean;
  unregister(name: string): void;
}

/**
 * Middleware function for HTTP requests
 */
export type RequestMiddleware = (
  config: RequestConfig,
  next: (config: RequestConfig) => Promise<HttpResponse>
) => Promise<HttpResponse>;

/**
 * Response interceptor
 */
export type ResponseInterceptor = <T>(
  response: HttpResponse<T>
) => HttpResponse<T> | Promise<HttpResponse<T>>;

/**
 * Error interceptor
 */
export type ErrorInterceptor = (
  error: HttpError
) => HttpError | Promise<HttpError>;

/**
 * Service health check result
 */
export interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  latency?: number;
  error?: string;
  timestamp: string;
}

/**
 * Batch request configuration
 */
export interface BatchRequest {
  id: string;
  method: HttpMethod;
  url: string;
  data?: unknown;
  headers?: Record<string, string>;
}

/**
 * Batch response
 */
export interface BatchResponse<T = unknown> {
  id: string;
  status: number;
  data: T;
  error?: string;
}