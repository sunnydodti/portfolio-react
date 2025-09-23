/* ==========================================================================
   Hooks Index - Export all custom hooks
   ========================================================================== */

// Portfolio context hooks
export {
  usePortfolio,
  useTheme,
  useCurrentPage,
  useSidebar,
  useProfile,
  useLoadingState,
  usePortfolioState,
} from './usePortfolio';

// Enhanced data fetching hooks
export {
  useEnhancedProfileData,
} from './useEnhancedProfileData';

// Data fetching hooks
export {
  useProfileData,
} from './useProfileData';

// UI state hooks (to be created)
// export { useBreakpoint } from './useBreakpoint';
// export { useLocalStorage } from './useLocalStorage';
// export { useDebounce } from './useDebounce';
// export { usePrevious } from './usePrevious';