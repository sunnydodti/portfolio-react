import React from "react";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "../common/ThemeToggle";
import "./Header.css";

interface HeaderProps {
  onMenuToggle: () => void;
  showMenuButton?: boolean;
}

const pageLabels: Record<string, string> = {
  "/": "Home",
  "/experience": "Experience",
  "/projects": "Projects",
  "/tech-stack": "Tech Stack",
  "/contact": "Contact",
};

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  showMenuButton = true,
}) => {
  const location = useLocation();
  const currentPageLabel = pageLabels[location.pathname] || "Portfolio";

  return (
    <header className="header">
      {/* Left side - Menu button (mobile) */}
      <div className="header-left">
        {showMenuButton && (
          <button
            className="menu-button"
            onClick={onMenuToggle}
            aria-label="Toggle navigation menu"
          >
            <span className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        )}
        <h1 className="page-title">{currentPageLabel}</h1>
      </div>

      {/* Right side - Navigation arrows and theme toggle */}
      <div className="header-right">
        <ThemeToggle />
        <button
          className="nav-arrow"
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          ←
        </button>
        <button
          className="nav-arrow"
          onClick={() => window.history.forward()}
          aria-label="Go forward"
        >
          →
        </button>
      </div>
    </header>
  );
};
