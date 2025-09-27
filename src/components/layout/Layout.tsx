import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { usePortfolio } from '../../hooks/usePortfolio';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state, toggleSidebar, setSidebarOpen } = usePortfolio();

  const handleSidebarToggle = () => {
    toggleSidebar();
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={state.sidebarOpen}
        onClose={handleSidebarClose}
        currentPage={state.currentPage}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Navigation (mobile header) */}
        <Header
          onMenuToggle={handleSidebarToggle}
          showMenuButton={!state.sidebarOpen}
        />

        {/* Page Content */}
        <div className="page-content">{children}</div>
      </main>

      {/* Mobile backdrop overlay */}
      {state.sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={handleSidebarClose}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              handleSidebarClose();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}
    </div>
  );
};
