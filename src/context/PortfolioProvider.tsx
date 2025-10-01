/* ==========================================================================
   Portfolio Provider - Component for global state management
   ========================================================================== */

import React, { useReducer, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type {
  ProfileData,
  ThemeMode,
  PageRoute,
  PortfolioState,
  Action,
} from '../types';
import { useProfileData } from '../hooks/useProfileData';
import {
  PortfolioContext,
  type PortfolioContextValue,
} from './PortfolioContextDefinition';

/* ========================================
   Action Types
   ======================================== */

type PortfolioAction =
  | Action<'SET_PROFILE_DATA', ProfileData>
  | Action<'SET_LOADING', boolean>
  | Action<'SET_ERROR', string | null>
  | Action<'SET_THEME', ThemeMode>
  | Action<'SET_CURRENT_PAGE', PageRoute>
  | Action<'TOGGLE_SIDEBAR'>
  | Action<'SET_SIDEBAR_OPEN', boolean>
  | Action<'CLEAR_DATA'>;

/* ========================================
   Initial State
   ======================================== */

const initialState: PortfolioState = {
  profile: null,
  loading: {
    isLoading: false,
    error: null,
    lastFetched: undefined,
  },
  theme: 'dark', // Default to dark theme as per requirements
  currentPage: 'home',
  sidebarOpen: false,
};

/* ========================================
   Reducer
   ======================================== */

const portfolioReducer = (
  state: PortfolioState,
  action: PortfolioAction
): PortfolioState => {
  switch (action.type) {
    case 'SET_PROFILE_DATA':
      return {
        ...state,
        profile: action.payload || null,
        loading: {
          isLoading: false,
          error: null,
          lastFetched: new Date().toISOString(),
        },
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          isLoading: action.payload ?? false,
        },
      };

    case 'SET_ERROR':
      return {
        ...state,
        loading: {
          ...state.loading,
          isLoading: false,
          error: action.payload ?? null,
        },
      };

    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload ?? 'dark',
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload ?? 'home',
      };

    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };

    case 'SET_SIDEBAR_OPEN':
      return {
        ...state,
        sidebarOpen: action.payload ?? false,
      };

    case 'CLEAR_DATA':
      return {
        ...initialState,
        theme: state.theme, // Preserve theme preference
      };

    default:
      return state;
  }
};

/* ========================================
   Provider Props
   ======================================== */

interface PortfolioProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
  initialPage?: PageRoute;
}

/* ========================================
   Theme Management
   ======================================== */

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved as ThemeMode;
    }
  }
  return 'dark'; // Default to dark theme
};

const applyTheme = (theme: ThemeMode) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;

    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      root.classList.toggle('dark', prefersDark);
      root.classList.toggle('light', !prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
      root.classList.toggle('light', theme === 'light');
    }

    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
  }
};

/* ========================================
   Provider Component
   ======================================== */

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
  initialTheme = undefined,
  initialPage = 'home',
}: PortfolioProviderProps) => {
  const [state, dispatch] = useReducer(portfolioReducer, {
    ...initialState,
    theme: initialTheme ?? getInitialTheme(),
    currentPage: initialPage ?? 'home',
  });

  const { data: profileData, loading, error, refetch } = useProfileData();

  // Update state when profile data changes
  useEffect(() => {
    if (profileData) {
      dispatch({ type: 'SET_PROFILE_DATA', payload: profileData });
    }
  }, [profileData]);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [loading]);

  useEffect(() => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, [error]);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(state.theme);
  }, [state.theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (state.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [state.theme]);

  // Action helpers
  const setTheme = useCallback((theme: ThemeMode) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  }, []);

  const setCurrentPage = useCallback((page: PageRoute) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  }, []);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: open });
  }, []);

  const clearData = useCallback(() => {
    dispatch({ type: 'CLEAR_DATA' });
  }, []);

  const refetchData = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Failed to refetch data:', error);
    }
  }, [refetch]);

  // Computed values
  const contextValue: PortfolioContextValue = {
    state,
    isLoading: state.loading.isLoading,
    hasError: !!state.loading.error,
    errorMessage: state.loading.error,
    isDataLoaded: !!state.profile,
    setTheme,
    setCurrentPage,
    toggleSidebar,
    setSidebarOpen,
    clearData,
    refetchData,
  };

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};
