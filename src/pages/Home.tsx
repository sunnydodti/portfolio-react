import React from "react";
import { useProfileData } from "../hooks/useProfileData";
import { DebugProfile } from "../components/debug/DebugProfile";
import { DevTestPanel } from "../components/debug/DevTestPanel";
import "./Home.css";

export const Home: React.FC = () => {
  const { data: profile, loading, error } = useProfileData();

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-state">
          <p>Error loading profile: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container home-page">
      {/* Development Test Panel */}
      <DevTestPanel />
      
      {/* Debug Profile Component */}
      <DebugProfile />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {profile?.profile?.name || "Sunny Dodti"}
          </h1>
          <h2 className="hero-subtitle">
            {profile?.profile?.title || "Senior Software Developer"}
          </h2>
          <p className="hero-description">
            {profile?.profile?.about ||
              "Developer at heart. Building apps & solving problems is my hobby."}
          </p>
          <div className="hero-location">
            📍 {profile?.profile?.location || "Mumbai, India"}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">3+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {profile?.work_experience?.length || 2}
            </div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {profile?.projects?.work?.length || 5}
            </div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">10+</div>
            <div className="stat-label">Technologies</div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="skills-preview">
        <h3 className="section-title">Core Technologies</h3>
        <div className="skills-grid">
          <div className="skill-badge">React</div>
          <div className="skill-badge">TypeScript</div>
          <div className="skill-badge">Node.js</div>
          <div className="skill-badge">Python</div>
          <div className="skill-badge">AWS</div>
          <div className="skill-badge">Docker</div>
        </div>
      </section>
    </div>
  );
};
