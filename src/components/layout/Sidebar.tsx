import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useProfileData } from "../../hooks/useProfileData";
import {
  HomeIcon,
  ExperienceIcon,
  ProjectsIcon,
  TechStackIcon,
  ContactIcon,
} from "../icons";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
}

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
  { path: "/", label: "Home", icon: <HomeIcon size={18} /> },
  { path: "/experience", label: "Experience", icon: <ExperienceIcon size={18} /> },
  { path: "/projects", label: "Projects", icon: <ProjectsIcon size={18} /> },
  { path: "/tech-stack", label: "Tech Stack", icon: <TechStackIcon size={18} /> },
  { path: "/contact", label: "Contact", icon: <ContactIcon size={18} /> },
];

const socialLinks = [
  { url: "https://github.com", icon: "GH", label: "GitHub" },
  { url: "https://linkedin.com", icon: "LI", label: "LinkedIn" },
  { url: "mailto:contact@example.com", icon: "@", label: "Email" },
  { url: "https://twitter.com", icon: "TW", label: "Twitter" },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { data: profile } = useProfileData();

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Profile Header Section */}
      <div className="profile-header">
        <div className="profile-pic">
          <span className="profile-initials">
            {profile?.profile?.name
              ?.split(" ")
              .map((n: string) => n[0])
              .join("") || "SD"}
          </span>
        </div>
        <div className="profile-name">
          {profile?.profile?.name || "Sunny Dodti"}
        </div>
        <div className="profile-title">
          {profile?.profile?.title || "Senior Software Developer"}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={handleNavClick}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* Social Icons */}
        <div className="social-icons">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              title={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <div className="footer-text">
          <div>© 2024 Sunny Dodti</div>
          <div>Built with React & TypeScript</div>
        </div>
      </div>
    </aside>
  );
};
