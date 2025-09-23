/* ==========================================================================
   Profile Data Hook - Single Source of Truth
   ========================================================================== */

import { useState, useEffect, useCallback } from 'react';
import type { ProfileData } from '../types';

/* ========================================
   Configuration
   ======================================== */

const API_CONFIG = {
  // GitHub API endpoint (has proper CORS headers)
  ENDPOINT: 'https://api.github.com/repos/sunnydodti/sunnydodti/contents/data/profiles/default.json?ref=dev',
  
  // Request configuration
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second base delay
  
  // Cache configuration
  CACHE_KEY: 'portfolio-profile-data',
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
} as const;

/* ========================================
   Types
   ======================================== */

interface UseProfileDataResult {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface CacheEntry {
  data: ProfileData;
  timestamp: number;
  version: string;
}

/* ========================================
   Utilities
   ======================================== */

/**
 * Get cached data if valid
 */
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

    return entry.data;
  } catch (error) {
    console.warn('Failed to read cached data:', error);
    localStorage.removeItem(API_CONFIG.CACHE_KEY);
    return null;
  }
};

/**
 * Cache data to localStorage
 */
const setCachedData = (data: ProfileData): void => {
  try {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      version: '1.0',
    };
    localStorage.setItem(API_CONFIG.CACHE_KEY, JSON.stringify(entry));
  } catch (error) {
    console.warn('Failed to cache data:', error);
  }
};

/**
 * Fetch data with retry logic
 */
const fetchWithRetry = async (attempt = 1): Promise<ProfileData> => {
  try {
    console.info(`🔄 Fetching profile data (attempt ${attempt}/${API_CONFIG.RETRY_ATTEMPTS})`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(API_CONFIG.ENDPOINT, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-React-App',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const githubResponse = await response.json();
    
    // GitHub API returns base64 encoded content
    if (!githubResponse.content) {
      throw new Error('No content found in GitHub response');
    }

    // Decode base64 content
    const decodedContent = atob(githubResponse.content.replace(/\s/g, ''));
    const data = JSON.parse(decodedContent) as ProfileData;

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format received');
    }

    console.info('✅ Profile data loaded successfully');
    return data;

  } catch (error) {
    const isLastAttempt = attempt >= API_CONFIG.RETRY_ATTEMPTS;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (isLastAttempt) {
      console.error(`❌ Failed to fetch profile data after ${attempt} attempts:`, errorMessage);
      throw new Error(`Failed to load profile data: ${errorMessage}`);
    }

    // Exponential backoff with jitter
    const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1) + Math.random() * 1000;
    console.warn(`⚠️ Attempt ${attempt} failed: ${errorMessage}. Retrying in ${Math.round(delay)}ms...`);

    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(attempt + 1);
  }
};

/* ========================================
   Hook Implementation
   ======================================== */

/**
 * Profile data hook with single source of truth
 */
export const useProfileData = (): UseProfileDataResult => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Try cache first unless force refresh
      if (!forceRefresh) {
        const cachedData = getCachedData();
        if (cachedData) {
          console.info('📦 Using cached profile data');
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      // Fetch from remote endpoint
      const profileData = await fetchWithRetry();

      // Cache the data
      setCachedData(profileData);

      // Update state
      setData(profileData);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load profile data';
      console.error('❌ Profile data fetch failed:', errorMessage);
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  // Initial fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useProfileData;