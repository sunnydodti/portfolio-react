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
  usePortfolioDispatch,
  usePortfolioState,
} from './usePortfolio';

// Data fetching hooks
export {
  useProfileData,
  useWorkExperience,
  useProjects,
  useTechStack,
  useBasicProfile,
  useSocialLinks,
} from './useProfileData';

// UI state hooks (to be created)
// export { useBreakpoint } from './useBreakpoint';
// export { useLocalStorage } from './useLocalStorage';
// export { useDebounce } from './useDebounce';
// export { usePrevious } from './usePrevious';