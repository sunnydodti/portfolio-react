/* ==========================================================================
   Data Integration Demo - Test component to showcase data fetching capabilities
   ========================================================================== */

import React, { useState } from 'react';
import { useEnhancedProfileData } from '../../hooks/useEnhancedProfileData';
import { useProfileData } from '../../hooks/useProfileData';
import { logDataStructure, compareWithExpectedSchema, generateProfileDataTypes } from '../../utils/typeGeneration';
import './DataIntegrationDemo.css';

export const DataIntegrationDemo: React.FC = () => {
  const [activeHook, setActiveHook] = useState<'simple' | 'enhanced'>('enhanced');
  const [showRawData, setShowRawData] = useState(false);
  const [showGeneratedTypes, setShowGeneratedTypes] = useState(false);
  
  // Enhanced hook with validation
  const enhancedResult = useEnhancedProfileData({
    skipAutoFetch: activeHook !== 'enhanced',
    enableLocal: true,
    enableValidation: true,
    onSuccess: (data, source) => {
      console.log(`✅ Enhanced hook loaded data from ${source}`);
      logDataStructure(data);
    },
    onError: (error, context) => {
      console.error(`❌ Enhanced hook error in ${context}:`, error);
    },
  });
  
  // Simple hook for comparison
  const simpleResult = useProfileData();
  
  // Current result based on active hook
  const currentResult = activeHook === 'enhanced' ? enhancedResult : simpleResult;
  const { data, loading, error, refetch } = currentResult;
  
  // Schema comparison
  const schemaComparison = data ? compareWithExpectedSchema(data) : null;
  
  // Generated types
  const generatedTypes = data ? generateProfileDataTypes(data) : '';
  
  const handleAnalyzeData = () => {
    if (data) {
      logDataStructure(data);
    }
  };
  
  const handleClearCache = () => {
    localStorage.removeItem('portfolio-profile-data-v2');
    localStorage.removeItem('portfolio-profile-data');
    console.log('🗑️ Cache cleared');
  };
  
  return (
    <div className="data-integration-demo">
      <div className="demo-header">
        <h1>Data Integration Demo</h1>
        <p>Testing data fetching hooks and validation systems</p>
      </div>
      
      {/* Hook Selection */}
      <div className="demo-controls">
        <div className="hook-selection">
          <label>
            <input
              type="radio"
              name="hook"
              value="enhanced"
              checked={activeHook === 'enhanced'}
              onChange={(e) => setActiveHook(e.target.value as 'enhanced')}
            />
            Enhanced Hook (with validation)
          </label>
          <label>
            <input
              type="radio"
              name="hook"
              value="simple"
              checked={activeHook === 'simple'}
              onChange={(e) => setActiveHook(e.target.value as 'simple')}
            />
            Simple Hook
          </label>
        </div>
        
        <div className="demo-actions">
          <button onClick={refetch} disabled={loading}>
            {loading ? '⏳ Loading...' : '🔄 Refetch Data'}
          </button>
          <button onClick={handleAnalyzeData} disabled={!data}>
            📋 Analyze Structure
          </button>
          <button onClick={handleClearCache}>
            🗑️ Clear Cache
          </button>
        </div>
      </div>
      
      {/* Status Section */}
      <div className="demo-status">
        <div className={`status-card ${loading ? 'loading' : error ? 'error' : 'success'}`}>
          <h3>Status</h3>
          {loading && <p>⏳ Loading profile data...</p>}
          {error && <p>❌ Error: {error}</p>}
          {data && !loading && <p>✅ Data loaded successfully</p>}
        </div>
        
        {data && (
          <div className="data-summary">
            <h3>Data Summary</h3>
            <ul>
              <li>👤 Profile: {data.profile?.name || 'N/A'}</li>
              <li>💼 Work Experience: {data.work_experience?.length || 0} entries</li>
              <li>🚀 Projects: {
                data.projects ? Object.values(data.projects).flat().length : 0
              } total</li>
              <li>🛠️ Tech Stack: {
                data.tech_stack ? Object.values(data.tech_stack).flat().length : 0
              } technologies</li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Schema Validation */}
      {schemaComparison && (
        <div className="schema-validation">
          <h3>Schema Validation</h3>
          {schemaComparison.missing.length > 0 && (
            <div className="validation-section missing">
              <h4>⚠️ Missing Properties:</h4>
              <ul>
                {schemaComparison.missing.map(prop => (
                  <li key={prop}>{prop}</li>
                ))}
              </ul>
            </div>
          )}
          
          {schemaComparison.extra.length > 0 && (
            <div className="validation-section extra">
              <h4>➕ Extra Properties:</h4>
              <ul>
                {schemaComparison.extra.map(prop => (
                  <li key={prop}>{prop}</li>
                ))}
              </ul>
            </div>
          )}
          
          {schemaComparison.typeMismatches.length > 0 && (
            <div className="validation-section mismatched">
              <h4>🔧 Type Mismatches:</h4>
              <ul>
                {schemaComparison.typeMismatches.map((mismatch, index) => (
                  <li key={index}>{mismatch}</li>
                ))}
              </ul>
            </div>
          )}
          
          {schemaComparison.missing.length === 0 && 
           schemaComparison.extra.length === 0 && 
           schemaComparison.typeMismatches.length === 0 && (
            <p className="validation-success">✅ Schema validation passed!</p>
          )}
        </div>
      )}
      
      {/* Toggle Controls */}
      <div className="demo-toggles">
        <label>
          <input
            type="checkbox"
            checked={showRawData}
            onChange={(e) => setShowRawData(e.target.checked)}
          />
          Show Raw Data
        </label>
        <label>
          <input
            type="checkbox"
            checked={showGeneratedTypes}
            onChange={(e) => setShowGeneratedTypes(e.target.checked)}
          />
          Show Generated Types
        </label>
      </div>
      
      {/* Raw Data Display */}
      {showRawData && data && (
        <div className="raw-data">
          <h3>Raw Data</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      
      {/* Generated Types Display */}
      {showGeneratedTypes && generatedTypes && (
        <div className="generated-types">
          <h3>Generated TypeScript Types</h3>
          <pre>{generatedTypes}</pre>
        </div>
      )}
    </div>
  );
};