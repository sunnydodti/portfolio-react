/* ==========================================================================
   Debug Profile Component - Test profile loading
   ========================================================================== */

import React from 'react';
import { useProfileData } from '../../hooks/useProfileDataSimple';

export const DebugProfile: React.FC = () => {
  const { data, loading, error, refetch } = useProfileData();

  // Debug logging
  React.useEffect(() => {
    console.log('DebugProfile render - loading:', loading, 'error:', error, 'data:', data);
  }, [loading, error, data]);

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '8px',
        margin: '1rem'
      }}>
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '2rem', 
        backgroundColor: 'var(--color-error)',
        color: 'white',
        borderRadius: '8px',
        margin: '1rem'
      }}>
        <h3>Error loading profile data:</h3>
        <p>{error}</p>
        <button 
          onClick={refetch}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'white',
            color: 'var(--color-error)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ 
        padding: '2rem', 
        backgroundColor: 'var(--color-warning)',
        borderRadius: '8px',
        margin: '1rem'
      }}>
        <p>No profile data available</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: 'var(--color-surface)',
      borderRadius: '8px',
      margin: '1rem'
    }}>
      <h2>Profile Data Loaded Successfully! ✅</h2>
      <div style={{ textAlign: 'left' }}>
        <h3>Basic Info:</h3>
        <p><strong>Name:</strong> {data.profile?.name || 'N/A'}</p>
        <p><strong>Title:</strong> {data.profile?.title || 'N/A'}</p>
        <p><strong>Email:</strong> {data.profile?.email || 'N/A'}</p>
        <p><strong>Location:</strong> {data.profile?.location || 'N/A'}</p>
        
        <h3>Stats:</h3>
        <p><strong>Work Experience:</strong> {data.work_experience?.length || 0} jobs</p>
        <p><strong>Projects:</strong> {Object.keys(data.projects || {}).length || 0} project types</p>
        <p><strong>Tech Skills:</strong> {
          Object.values(data.tech_stack || {})
            .flat()
            .filter(skill => skill && typeof skill === 'object' && 'name' in skill)
            .length || 0
        } technologies</p>

        <h3>Raw Data Preview:</h3>
        <pre style={{ 
          backgroundColor: 'var(--color-background)',
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '200px',
          fontSize: '12px'
        }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};