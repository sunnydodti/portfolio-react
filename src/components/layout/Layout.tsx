import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { usePortfolio } from "../../hooks/usePortfolio";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state, dispatch } = usePortfolio();

  const handleSidebarToggle = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const handleSidebarClose = () => {
    dispatch({ type: "SET_SIDEBAR_OPEN", payload: false });
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
          onKeyDown={(e) => {
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
