/* ==========================================================================
   Development Test Component - Debug all functionality
   ========================================================================== */

import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioProvider';

export const DevTestPanel: React.FC = () => {
  const { state, setTheme, toggleSidebar } = usePortfolio();
  const [testResults, setTestResults] = useState<Record<string, string>>({});

  const runNetworkTest = async (name: string, url: string) => {
    try {
      const response = await fetch(url);
      const status = response.ok ? '✅ Success' : `❌ ${response.status}`;
      setTestResults(prev => ({
        ...prev,
        [name]: `${status} (${response.status})`,
      }));
      return response;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setTestResults(prev => ({
        ...prev,
        [name]: `❌ Error: ${errorMsg}`,
      }));
      throw error;
    }
  };

  const runAllTests = async () => {
    console.log('🧪 Running development tests...');

    // Test 1: Local context file
    await runNetworkTest(
      'Local Context',
      '/context/data/profiles/default.json'
    );

    // Test 2: GitHub raw content
    await runNetworkTest(
      'GitHub Raw',
      'https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json'
    );

    // Test 3: CORS test
    try {
      await fetch('https://httpbin.org/get');
      setTestResults(prev => ({ ...prev, CORS: '✅ CORS enabled' }));
    } catch {
      setTestResults(prev => ({ ...prev, CORS: '❌ CORS blocked' }));
    }
  };

  const testThemeToggle = () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    console.log('🎨 Theme toggled to:', newTheme);
  };

  const testSidebarToggle = () => {
    toggleSidebar();
    console.log('📱 Sidebar toggled:', !state.sidebarOpen);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'var(--color-surface)',
        border: '2px solid var(--color-border-primary)',
        borderRadius: 'var(--border-radius-lg)',
        padding: 'var(--spacing-md)',
        maxWidth: '300px',
        zIndex: 1000,
        fontSize: '12px',
      }}
    >
      <h3 style={{ margin: '0 0 var(--spacing-sm) 0' }}>🛠️ Dev Panel</h3>

      {/* Current State */}
      <div style={{ marginBottom: 'var(--spacing-sm)' }}>
        <strong>Current State:</strong>
        <div>Theme: {state.theme}</div>
        <div>Sidebar: {state.sidebarOpen ? 'Open' : 'Closed'}</div>
        <div>Page: {state.currentPage}</div>
      </div>

      {/* Theme Test */}
      <button
        onClick={testThemeToggle}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          borderRadius: 'var(--border-radius-sm)',
          marginBottom: 'var(--spacing-xs)',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Toggle Theme
      </button>

      {/* Sidebar Test */}
      <button
        onClick={testSidebarToggle}
        style={{
          backgroundColor: 'var(--color-surface-light)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-primary)',
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          borderRadius: 'var(--border-radius-sm)',
          marginBottom: 'var(--spacing-sm)',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Toggle Sidebar
      </button>

      {/* Network Tests */}
      <button
        onClick={runAllTests}
        style={{
          backgroundColor: 'var(--color-warning)',
          color: 'white',
          border: 'none',
          padding: 'var(--spacing-xs) var(--spacing-sm)',
          borderRadius: 'var(--border-radius-sm)',
          marginBottom: 'var(--spacing-sm)',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Run Network Tests
      </button>

      {/* Test Results */}
      <div>
        <strong>Test Results:</strong>
        {Object.entries(testResults).map(([name, result]) => (
          <div key={name} style={{ fontSize: '11px' }}>
            <strong>{name}:</strong> {result}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 'var(--spacing-sm)', fontSize: '10px' }}>
        <div>💡 Open browser console for detailed logs</div>
        <div>🌐 Check Network tab for fetch requests</div>
      </div>
    </div>
  );
};
