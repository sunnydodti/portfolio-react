/* ==========================================================================
   Profile Data Hook - Fetch and manage portfolio profile data
   ========================================================================== */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ProfileData, FetchResult } from '../types';

/* ========================================
   Configuration
   ======================================== */

const API_CONFIG = {
  // Primary data source from main repository
  PRIMARY_ENDPOINT: 'https://raw.githubusercontent.com/sunnydodti/sunnydodti/main/data/profiles/default.json',
  
  // Fallback endpoints (if needed)
  FALLBACK_ENDPOINTS: [
    // Add additional fallback endpoints here if available
  ],
  
  // Local fallback data path
  LOCAL_DATA_PATH: '/context/data/profiles/default.json',
  
  // Request configuration
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Cache configuration
  CACHE_KEY: 'portfolio-profile-data',
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
} as const;

/* ========================================
   Types
   ======================================== */

interface UseProfileDataOptions {
  /**
   * Skip initial data fetch on mount
   */
  skip?: boolean;
  
  /**
   * Force refresh data ignoring cache
   */
  forceRefresh?: boolean;
  
  /**
   * Enable/disable caching
   */
  enableCache?: boolean;
  
  /**
   * Custom endpoints to try
   */
  endpoints?: string[];
  
  /**
   * Fallback to local data if remote fails
   */
  fallbackToLocal?: boolean;
}

interface CacheEntry {
  data: ProfileData;
  timestamp: number;
  source: 'remote' | 'local' | 'fallback';
}

/* ========================================
   Cache Utilities
   ======================================== */

/**
 * Get cached profile data
 */
const getCachedData = (enableCache: boolean): ProfileData | null => {
  if (!enableCache || typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(API_CONFIG.CACHE_KEY);
    if (!cached) return null;
    
    const entry: CacheEntry = JSON.parse(cached);
    const isExpired = Date.now() - entry.timestamp > API_CONFIG.CACHE_TTL;
    
    if (isExpired) {
      localStorage.removeItem(API_CONFIG.CACHE_KEY);
      return null;
    }
    
    return entry.data;
  } catch (error) {
    console.warn('Failed to parse cached data:', error);
    localStorage.removeItem(API_CONFIG.CACHE_KEY);
    return null;
  }
};

/**
 * Cache profile data
 */
const setCachedData = (data: ProfileData, source: CacheEntry['source'], enableCache: boolean): void => {
  if (!enableCache || typeof window === 'undefined') return;
  
  try {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      source,
    };
    
    localStorage.setItem(API_CONFIG.CACHE_KEY, JSON.stringify(entry));
  } catch (error) {
    console.warn('Failed to cache data:', error);
  }
};

/* ========================================
   Data Fetching Functions
   ======================================== */

/**
 * Fetch data from a single endpoint with retry logic
 */
const fetchFromEndpoint = async (
  url: string, 
  attempt: number = 1
): Promise<ProfileData> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
  
  try {
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
    
    const data = await response.json();
    
    // Basic validation
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format received');
    }
    
    return data as ProfileData;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (attempt < API_CONFIG.RETRY_ATTEMPTS) {
      console.warn(`Attempt ${attempt} failed for ${url}:`, error);
      
      // Exponential backoff
      const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return fetchFromEndpoint(url, attempt + 1);
    }
    
    throw error;
  }
};

/**
 * Fetch data from multiple endpoints with fallback logic
 */
const fetchProfileData = async (endpoints: string[]): Promise<{
  data: ProfileData;
  source: 'remote' | 'fallback';
}> => {
  const allEndpoints = [
    API_CONFIG.PRIMARY_ENDPOINT,
    ...API_CONFIG.FALLBACK_ENDPOINTS,
    ...endpoints,
  ];
  
  let lastError: Error | null = null;
  
  for (const [index, endpoint] of allEndpoints.entries()) {
    try {
      console.info(`Attempting to fetch from endpoint ${index + 1}/${allEndpoints.length}:`, endpoint);
      
      const data = await fetchFromEndpoint(endpoint);
      const source = index === 0 ? 'remote' : 'fallback';
      
      console.info(`Successfully fetched data from ${source} source`);
      return { data, source };
    } catch (error) {
      console.warn(`Failed to fetch from endpoint ${index + 1}:`, error);
      lastError = error as Error;
    }
  }
  
  throw new Error(`All endpoints failed. Last error: ${lastError?.message || 'Unknown error'}`);
};

/**
 * Fetch local fallback data
 */
const fetchLocalData = async (): Promise<ProfileData> => {
  try {
    console.info('Attempting to fetch local fallback data...');
    
    // Try to import the local data file
    const localData = await import('../../context/data/profiles/default.json');
    
    if (!localData.default || typeof localData.default !== 'object') {
      throw new Error('Invalid local data format');
    }
    
    console.info('Successfully loaded local fallback data');
    return localData.default as unknown as ProfileData;
  } catch (error) {
    console.error('Failed to load local fallback data:', error);
    throw new Error('Local fallback data is not available');
  }
};

/* ========================================
   Main Hook
   ======================================== */

/**
 * Custom hook to fetch and manage portfolio profile data
 * 
 * @param options - Configuration options for data fetching
 * @returns Profile data, loading state, error state, and refetch function
 */
export const useProfileData = (options: UseProfileDataOptions = {}): FetchResult<ProfileData> => {
  const {
    skip = false,
    forceRefresh = false,
    enableCache = true,
    endpoints = [],
    fallbackToLocal = true,
  } = options;
  
  // State management
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to track mounted state
  const isMountedRef = useRef<boolean>(true);
  
  // Ref to prevent duplicate requests
  const fetchingRef = useRef<boolean>(false);
  
  /**
   * Main data fetching function
   */
  const fetchData = useCallback(async (): Promise<void> => {
    // Prevent duplicate requests
    if (fetchingRef.current) {
      console.info('Fetch already in progress, skipping...');
      return;
    }
    
    fetchingRef.current = true;
    
    try {
      setLoading(true);
      setError(null);
      
      // Try to get cached data first (unless force refresh)
      if (!forceRefresh && enableCache) {
        const cachedData = getCachedData(enableCache);
        if (cachedData) {
          console.info('Using cached data');
          if (isMountedRef.current) {
            setData(cachedData);
            setLoading(false);
          }
          return;
        }
      }
      
      let profileData: ProfileData;
      let source: 'remote' | 'local' | 'fallback' = 'remote';
      
      try {
        // Try remote endpoints first
        const result = await fetchProfileData(endpoints);
        profileData = result.data;
        source = result.source;
      } catch (remoteError) {
        console.error('All remote endpoints failed:', remoteError);
        
        if (fallbackToLocal) {
          // Try local fallback data
          try {
            profileData = await fetchLocalData();
            source = 'local';
          } catch (localError) {
            throw new Error(`Remote fetch failed: ${remoteError}. Local fallback failed: ${localError}`);
          }
        } else {
          throw remoteError;
        }
      }
      
      // Cache the successful result
      if (enableCache) {
        setCachedData(profileData, source, enableCache);
      }
      
      // Update state if component is still mounted
      if (isMountedRef.current) {
        setData(profileData);
        setError(null);
      }
      
    } catch (fetchError) {
      console.error('Failed to fetch profile data:', fetchError);
      
      if (isMountedRef.current) {
        setError(
          fetchError instanceof Error 
            ? fetchError.message 
            : 'Failed to load profile data'
        );
        setData(null);
      }
    } finally {
      fetchingRef.current = false;
      
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [endpoints, enableCache, forceRefresh, fallbackToLocal]);
  
  /**
   * Manual refetch function
   */
  const refetch = useCallback(async (): Promise<void> => {
    // Clear cache before refetching
    if (enableCache && typeof window !== 'undefined') {
      localStorage.removeItem(API_CONFIG.CACHE_KEY);
    }
    
    await fetchData();
  }, [fetchData, enableCache]);
  
  // Initial data fetch on mount
  useEffect(() => {
    if (!skip) {
      fetchData();
    }
    
    // Cleanup function
    return () => {
      isMountedRef.current = false;
    };
  }, [skip, fetchData]);
  
  // Set mounted state
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  return {
    data,
    loading,
    error,
    refetch,
  };
};

/* ========================================
   Specialized Hooks
   ======================================== */

/**
 * Hook for getting just the work experience data
 */
export const useWorkExperience = () => {
  const { data, loading, error, refetch } = useProfileData();
  
  return {
    data: data?.work_experience || null,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for getting just the projects data
 */
export const useProjects = () => {
  const { data, loading, error, refetch } = useProfileData();
  
  return {
    data: data?.projects || null,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for getting just the tech stack data
 */
export const useTechStack = () => {
  const { data, loading, error, refetch } = useProfileData();
  
  return {
    data: data?.tech_stack || null,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for getting just the basic profile info
 */
export const useBasicProfile = () => {
  const { data, loading, error, refetch } = useProfileData();
  
  return {
    data: data?.profile || null,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for getting just the social links
 */
export const useSocialLinks = () => {
  const { data, loading, error, refetch } = useProfileData();
  
  return {
    data: {
      links: data?.links || null,
      social_links: data?.social_links || null,
    },
    loading,
    error,
    refetch,
  };
};