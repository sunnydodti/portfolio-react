/* ==========================================================================
   Enhanced Profile Data Hook - Single Source of Truth
   ========================================================================== */

import { useState, useEffect, useCallback } from 'react';
import type { ProfileData } from '../types';
import { validateProfileData, sanitizeProfileData } from '../utils/dataValidation';

/* ========================================
   Configuration
   ======================================== */

const API_CONFIG = {
  // Single source of truth - main repository
  ENDPOINT: 'https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json',
  
  // Request configuration
  TIMEOUT: 15000, // 15 seconds for better reliability
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 2000, // 2 seconds between retries
  
  // Cache configuration
  CACHE_KEY: 'portfolio-profile-data-v2',
  CACHE_TTL: 10 * 60 * 1000, // 10 minutes
} as const;

/* ========================================
   Types
   ======================================== */

interface UseEnhancedProfileDataOptions {
  /**
   * Skip automatic data fetch on mount
   */
  skipAutoFetch?: boolean;
  
  /**
   * Force refresh, ignoring cache
   */
  forceRefresh?: boolean;
  
  /**
   * Enable data validation
   */
  enableValidation?: boolean;
  
  /**
   * Error callback
   */
  onError?: (error: Error) => void;
  
  /**
   * Success callback
   */
  onSuccess?: (data: ProfileData, source: DataSource) => void;
}

type DataSource = 'cache' | 'remote';

interface UseEnhancedProfileDataResult {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
  source: DataSource | null;
  refetch: () => void;
}

interface CacheEntry {
  data: ProfileData;
  timestamp: number;
  source: DataSource;
  version: string;
}

/* ========================================
   Cache Utilities
   ======================================== */

/**
 * Get cached data if valid
 */
const getCachedData = (): { data: ProfileData; source: DataSource } | null => {
  try {
    const cached = localStorage.getItem(API_CONFIG.CACHE_KEY);
    if (!cached) return null;

    const entry: CacheEntry = JSON.parse(cached);
    const isExpired = Date.now() - entry.timestamp > API_CONFIG.CACHE_TTL;

    if (isExpired) {
      localStorage.removeItem(API_CONFIG.CACHE_KEY);
      return null;
    }

    return { data: entry.data, source: entry.source };
  } catch (error) {
    console.warn('Failed to read cached data:', error);
    localStorage.removeItem(API_CONFIG.CACHE_KEY);
    return null;
  }
};

/**
 * Cache data to localStorage
 */
const setCachedData = (data: ProfileData, source: DataSource): void => {
  try {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      source,
      version: '2.0',
    };
    localStorage.setItem(API_CONFIG.CACHE_KEY, JSON.stringify(entry));
  } catch (error) {
    console.warn('Failed to cache data:', error);
  }
};

/* ========================================
   Fetch Utilities
   ======================================== */

/**
 * Fetch data with timeout and retry logic
 */
const fetchWithRetry = async (
  url: string,
  timeout: number = API_CONFIG.TIMEOUT,
  maxAttempts: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<ProfileData> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.info(`🔄 Fetching profile data (attempt ${attempt}/${maxAttempts})`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid content type: Expected JSON');
      }

      const data = await response.json() as ProfileData;

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format received');
      }

      console.info('✅ Profile data fetched successfully');
      return data;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      if (attempt === maxAttempts) {
        break;
      }

      // Exponential backoff with jitter
      const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1) + Math.random() * 1000;
      console.warn(`⚠️ Attempt ${attempt} failed: ${lastError.message}. Retrying in ${Math.round(delay)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error(`Failed to fetch data after ${maxAttempts} attempts: ${lastError!.message}`);
};

/* ========================================
   Main Fetch Function
   ======================================== */

/**
 * Fetch profile data from single source of truth
 */
const fetchProfileData = async (
  options: {
    enableValidation?: boolean;
    onError?: (error: Error) => void;
    onSuccess?: (data: ProfileData, source: DataSource) => void;
  } = {}
): Promise<{ data: ProfileData; source: DataSource }> => {
  const { enableValidation = true, onError, onSuccess } = options;

  try {
    console.info('🚀 Starting profile data fetch from single source of truth...');

    // Fetch from remote endpoint
    const rawData = await fetchWithRetry(API_CONFIG.ENDPOINT);

    // Validate data if enabled
    let data = rawData;
    if (enableValidation) {
      const validation = validateProfileData(rawData);
      
      if (!validation.isValid) {
        console.warn('⚠️ Data validation warnings:', validation.warnings);
        console.error('❌ Data validation errors:', validation.errors);
        
        if (validation.errors.length > 0) {
          throw new Error(`Data validation failed: ${validation.errors.join(', ')}`);
        }
      }

      // Sanitize the data
      const sanitized = sanitizeProfileData(rawData);
      if (!sanitized) {
        throw new Error('Data sanitization failed');
      }
      data = sanitized;
      console.info('✅ Data validated and sanitized successfully');
    }

    const source: DataSource = 'remote';
    
    // Cache the successful result
    setCachedData(data, source);

    // Call success callback
    if (onSuccess) {
      onSuccess(data, source);
    }

    console.info('✅ Profile data loaded successfully from remote source');
    return { data, source };

  } catch (error) {
    const finalError = error instanceof Error ? error : new Error('Failed to fetch profile data');
    console.error('❌ Profile data fetch failed:', finalError.message);
    
    // Call error callback
    if (onError) {
      onError(finalError);
    }
    
    throw finalError;
  }
};

/* ========================================
   Hook Implementation
   ======================================== */

/**
 * Enhanced profile data hook with validation and caching
 */
export const useEnhancedProfileData = (
  options: UseEnhancedProfileDataOptions = {}
): UseEnhancedProfileDataResult => {
  const {
    skipAutoFetch = false,
    forceRefresh = false,
    enableValidation = true,
    onError,
    onSuccess,
  } = options;

  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(!skipAutoFetch);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<DataSource | null>(null);

  const fetchData = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);

      // Try cache first unless force refresh
      if (!force && !forceRefresh) {
        const cached = getCachedData();
        if (cached) {
          console.info('📦 Using cached profile data');
          setData(cached.data);
          setSource(cached.source);
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const result = await fetchProfileData({
        enableValidation,
        onError,
        onSuccess,
      });

      setData(result.data);
      setSource(result.source);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile data';
      console.error('❌ Enhanced profile data fetch failed:', errorMessage);
      setError(errorMessage);
      setData(null);
      setSource(null);
    } finally {
      setLoading(false);
    }
  }, [forceRefresh, enableValidation, onError, onSuccess]);

  const refetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  // Initial fetch on mount
  useEffect(() => {
    if (!skipAutoFetch) {
      fetchData();
    }
  }, [fetchData, skipAutoFetch]);

  return {
    data,
    loading,
    error,
    source,
    refetch,
  };
};

export default useEnhancedProfileData;