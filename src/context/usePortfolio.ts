/* ==========================================================================
   usePortfolio Hook - Separated for Fast Refresh compatibility
   ========================================================================== */

import React from 'react';
import { PortfolioContext, type PortfolioContextValue } from './PortfolioContextDefinition';

export const usePortfolio = (): PortfolioContextValue => {
  const context = React.useContext(PortfolioContext);

  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }

  return context;
};