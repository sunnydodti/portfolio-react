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

      console.log('🔄 Fetching profile data...');
      
      // Test local endpoint first for development
      console.log('Testing local endpoint: /context/data/profiles/default.json');
      
      try {
        const localResponse = await fetch('/context/data/profiles/default.json');
        console.log('Local response status:', localResponse.status, localResponse.statusText);
        
        if (localResponse.ok) {
          const localData = await localResponse.json();
          console.log('✅ Local data loaded successfully:', localData);
          setData(localData);
          return;
        } else {
          console.log('❌ Local endpoint failed, trying remote...');
        }
      } catch (localErr) {
        console.log('❌ Local fetch error:', localErr);
      }
      
      // Try remote endpoint
      console.log('Testing remote endpoint: GitHub raw content');
      const response = await fetch(
        'https://raw.githubusercontent.com/sunnydodti/sunnydodti/main/data/profiles/default.json'
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