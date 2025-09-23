import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as
      | 'light'
      | 'dark';
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      className={`theme-toggle ${theme} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
        </div>
      </div>
    </button>
  );
};
