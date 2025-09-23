/* ==========================================================================
   Simple Profile Data Hook - Simplified version for debugging
   ========================================================================== */

import { useState, useEffect } from 'react';
import type { ProfileData } from '../types';

interface UseProfileDataResult {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProfileData = (): UseProfileDataResult => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching profile data from single source of truth...');
      
      // Single source of truth - GitHub endpoint only
      console.log('Fetching from: https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json');
      const response = await fetch(
        'https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json'
      );
      
      console.log('Remote response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const profileData = await response.json();
      console.log('✅ Remote profile data fetched successfully:', profileData);
      
      setData(profileData);
      setError(null);
      
    } catch (err) {
      console.error('❌ All endpoints failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    console.log('🔄 Manual refetch requested');
    fetchProfileData();
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return { data, loading, error, refetch };
};