/* ==========================================================================
   Enhanced Profile Data Hook - Robust data fetching with validation
   ========================================================================== */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ProfileData, FetchResult } from '../types';
import { validateProfileData, sanitizeProfileData } from '../utils/dataValidation';

/* ========================================
   Configuration
   ======================================== */

const API_CONFIG = {
  // Primary endpoint (dev branch)
  PRIMARY_ENDPOINT: 'https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json',
  
  // Fallback endpoints
  FALLBACK_ENDPOINTS: [
    'https://raw.githubusercontent.com/sunnydodti/sunnydodti/main/data/profiles/default.json',
  ],
  
  // Local development endpoint
  LOCAL_ENDPOINT: '/context/data/profiles/default.json',
  
  // Request configuration
  TIMEOUT: 15000, // 15 seconds for better reliability
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 2000, // 2 seconds between retries
  
  // Cache configuration
  CACHE_KEY: 'portfolio-profile-data-v2',
  CACHE_TTL: 10 * 60 * 1000, // 10 minutes
} as const;

/* ========================================
   Hook Options
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
   * Enable local endpoint for development
   */
  enableLocal?: boolean;
  
  /**
   * Enable data validation
   */
  enableValidation?: boolean;
  
  /**
   * Custom error handler
   */
  onError?: (error: Error, context: string) => void;
  
  /**
   * Custom success handler
   */
  onSuccess?: (data: ProfileData, source: DataSource) => void;
}

type DataSource = 'cache' | 'local' | 'primary' | 'fallback';

/* ========================================
   Cache Management
   ======================================== */

interface CacheEntry {
  data: ProfileData;
  timestamp: number;
  source: DataSource;
  version: string;
}

const getCachedData = (): ProfileData | null => {
  try {
    const cached = localStorage.getItem(API_CONFIG.CACHE_KEY);
    if (!cached) return null;
    
    const entry: CacheEntry = JSON.parse(cached);
    const isExpired = Date.now() - entry.timestamp > API_CONFIG.CACHE_TTL;
    
    if (isExpired) {
      localStorage.removeItem(API_CONFIG.CACHE_KEY);
      return null;
    }
    
    console.log(`📦 Using cached data from ${entry.source} (${entry.version})`);
    return entry.data;
  } catch (error) {
    console.warn('Failed to read cache:', error);
    localStorage.removeItem(API_CONFIG.CACHE_KEY);
    return null;
  }
};

const setCachedData = (data: ProfileData, source: DataSource): void => {
  try {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      source,
      version: '2.0.0',
    };
    
    localStorage.setItem(API_CONFIG.CACHE_KEY, JSON.stringify(entry));
    console.log(`💾 Data cached from ${source}`);
  } catch (error) {
    console.warn('Failed to cache data:', error);
  }
};

/* ========================================
   Data Fetching Functions
   ======================================== */

const fetchFromEndpoint = async (
  url: string, 
  timeout: number = API_CONFIG.TIMEOUT
): Promise<ProfileData> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    console.log(`🌐 Fetching from: ${url}`);
    
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const rawData = await response.json();
    console.log(`✅ Raw data received from ${url}`);
    
    return rawData;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
    
    throw new Error('Unknown fetch error');
  }
};

const fetchWithRetry = async (
  url: string, 
  maxAttempts: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<ProfileData> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const data = await fetchFromEndpoint(url);
      
      if (attempt > 1) {
        console.log(`✅ Succeeded on attempt ${attempt}`);
      }
      
      return data;
    } catch (error) {
      lastError = error as Error;
      console.warn(`❌ Attempt ${attempt}/${maxAttempts} failed:`, error);
      
      if (attempt < maxAttempts) {
        const delay = API_CONFIG.RETRY_DELAY * attempt; // Exponential backoff
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
};

/* ========================================
   Main Hook
   ======================================== */

export const useEnhancedProfileData = (
  options: UseEnhancedProfileDataOptions = {}
): FetchResult<ProfileData> => {
  const {
    skipAutoFetch = false,
    forceRefresh = false,
    enableLocal = true,
    enableValidation = true,
    onError,
    onSuccess,
  } = options;
  
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(!skipAutoFetch);
  const [error, setError] = useState<string | null>(null);
  
  const isMountedRef = useRef(true);
  const fetchingRef = useRef(false);
  
  const fetchData = useCallback(async (): Promise<void> => {
    if (fetchingRef.current) {
      console.log('⏸️ Fetch already in progress, skipping...');
      return;
    }
    
    fetchingRef.current = true;
    
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first (unless force refresh)
      if (!forceRefresh) {
        const cachedData = getCachedData();
        if (cachedData) {
          if (isMountedRef.current) {
            setData(cachedData);
            setLoading(false);
            onSuccess?.(cachedData, 'cache');
          }
          return;
        }
      }
      
      let profileData: ProfileData;
      let source: DataSource;
      
      // Try endpoints in order of priority
      const endpoints = [
        ...(enableLocal ? [{ url: API_CONFIG.LOCAL_ENDPOINT, source: 'local' as const }] : []),
        { url: API_CONFIG.PRIMARY_ENDPOINT, source: 'primary' as const },
        ...API_CONFIG.FALLBACK_ENDPOINTS.map((url) => ({
          url,
          source: 'fallback' as const,
        })),
      ];
      
      let lastError: Error | null = null;
      
      for (const { url, source: endpointSource } of endpoints) {
        try {
          const rawData = await fetchWithRetry(url);
          
          // Validate data if enabled
          if (enableValidation) {
            const validation = validateProfileData(rawData);
            if (!validation.isValid) {
              throw new Error(`Data validation failed: ${validation.errors.join(', ')}`);
            }
            
            // Sanitize data
            const sanitizedData = sanitizeProfileData(rawData);
            if (!sanitizedData) {
              throw new Error('Data sanitization failed');
            }
            
            profileData = sanitizedData;
          } else {
            profileData = rawData as ProfileData;
          }
          
          source = endpointSource;
          console.log(`✅ Successfully loaded data from ${source}`);
          break;
        } catch (endpointError) {
          console.warn(`❌ Failed to load from ${endpointSource}:`, endpointError);
          lastError = endpointError as Error;
          
          // Don't continue trying if it's a local endpoint that failed
          if (endpointSource === 'local' && enableLocal) {
            console.log('🔄 Local endpoint failed, trying remote endpoints...');
          }
        }
      }
      
      // If we got here without setting profileData, all endpoints failed
      if (!profileData!) {
        throw new Error(
          `All endpoints failed. Last error: ${lastError?.message || 'Unknown error'}`
        );
      }
      
      // Cache successful data
      setCachedData(profileData, source!);
      
      if (isMountedRef.current) {
        setData(profileData);
        setLoading(false);
        onSuccess?.(profileData, source!);
      }
    } catch (fetchError) {
      const errorMessage = fetchError instanceof Error 
        ? fetchError.message 
        : 'Failed to load profile data';
      
      console.error('🚨 Data fetching failed:', errorMessage);
      
      if (isMountedRef.current) {
        setError(errorMessage);
        setLoading(false);
        onError?.(fetchError as Error, 'data-fetch');
      }
    } finally {
      fetchingRef.current = false;
    }
  }, [forceRefresh, enableLocal, enableValidation, onError, onSuccess]);
  
  // Auto-fetch on mount
  useEffect(() => {
    if (!skipAutoFetch) {
      fetchData();
    }
    
    return () => {
      isMountedRef.current = false;
    };
  }, [fetchData, skipAutoFetch]);
  
  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};