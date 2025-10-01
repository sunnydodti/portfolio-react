/* ==========================================================================
   Portfolio Context Definition - Separate file for Fast Refresh compatibility
   ========================================================================== */

import { createContext } from 'react';
import type { ThemeMode, PageRoute, PortfolioState } from '../types';

/* ========================================
   Context Value Interface
   ======================================== */

export interface PortfolioContextValue {
  state: PortfolioState;

  // Computed values
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  isDataLoaded: boolean;

  // Action helpers
  setTheme: (theme: ThemeMode) => void;
  setCurrentPage: (page: PageRoute) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  clearData: () => void;
  refetchData: () => Promise<void>;
}

export const PortfolioContext = createContext<
  PortfolioContextValue | undefined
>(undefined);
