/* ==========================================================================
   Portfolio Context Hooks - React hooks for portfolio context
   ========================================================================== */

import { useContext } from 'react';
import { PortfolioContext, type PortfolioContextValue } from '../context/PortfolioContextDefinition';

/* ========================================
   Main Hook
   ======================================== */

/**
 * Hook to access portfolio context
 * 
 * @throws Error if used outside of PortfolioProvider
 * @returns Portfolio context value
 */
export const usePortfolio = (): PortfolioContextValue => {
  const context = useContext(PortfolioContext);
  
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  
  return context;
};

/* ========================================
   Selector Hooks
   ======================================== */

/**
 * Hook to get current theme
 */
export const useTheme = () => {
  const { state, setTheme } = usePortfolio();
  
  return {
    theme: state.theme,
    setTheme,
    isDark: state.theme === 'dark' || 
            (state.theme === 'system' && 
             typeof window !== 'undefined' && 
             window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight: state.theme === 'light' || 
             (state.theme === 'system' && 
              typeof window !== 'undefined' && 
              !window.matchMedia('(prefers-color-scheme: dark)').matches),
  };
};

/**
 * Hook to get current page
 */
export const useCurrentPage = () => {
  const { state, setCurrentPage } = usePortfolio();
  
  return {
    currentPage: state.currentPage,
    setCurrentPage,
  };
};

/**
 * Hook to get sidebar state
 */
export const useSidebar = () => {
  const { state, toggleSidebar, setSidebarOpen } = usePortfolio();
  
  return {
    isOpen: state.sidebarOpen,
    toggle: toggleSidebar,
    setOpen: setSidebarOpen,
  };
};

/**
 * Hook to get profile data
 */
export const useProfile = () => {
  const { state, refetchData } = usePortfolio();
  
  return {
    profile: state.profile,
    isLoading: state.loading.isLoading,
    error: state.loading.error,
    lastFetched: state.loading.lastFetched,
    refetch: refetchData,
  };
};

/**
 * Hook to get loading state
 */
export const useLoadingState = () => {
  const { isLoading, hasError, errorMessage } = usePortfolio();
  
  return {
    isLoading,
    hasError,
    errorMessage,
  };
};

/* ========================================
   Development Helpers
   ======================================== */

/**
 * Development hook to get all context state (for debugging)
 */
export const usePortfolioState = () => {
  const { state } = usePortfolio();
  return state;
};