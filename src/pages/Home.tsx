import React from "react";
import { useProfileData } from "../hooks/useProfileDataSimple";
import { LoadingContainer, Card, CardBody, Button, Badge, SkillBadge } from "../components/common";
import "./Home.css";

export const Home: React.FC = () => {
  const { data: profile, loading, error } = useProfileData();

  return (
    <div className="page-container home-page">
      <LoadingContainer loading={loading} error={error}>
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
            <SkillBadge skill="React" proficiency="expert" icon={<span>⚛️</span>} />
            <SkillBadge skill="TypeScript" proficiency="advanced" icon={<span>🔷</span>} />
            <SkillBadge skill="Node.js" proficiency="advanced" icon={<span>🟢</span>} />
            <SkillBadge skill="Python" proficiency="intermediate" icon={<span>🐍</span>} />
            <SkillBadge skill="AWS" proficiency="intermediate" icon={<span>☁️</span>} />
            <SkillBadge skill="Docker" proficiency="advanced" icon={<span>🐳</span>} />
          </div>
        </section>

        {/* Quick Access Actions */}
        <section className="actions-section">
          <Card variant="glass" padding="lg" className="actions-card">
            <CardBody>
              <h3>Ready to Connect?</h3>
              <p>Let&apos;s discuss your next project or explore collaboration opportunities.</p>
              <div className="actions-buttons">
                <Button variant="primary" size="lg" icon={<span>📧</span>}>
                  Get In Touch
                </Button>
                <Button variant="outline" size="lg" icon={<span>📄</span>}>
                  View Resume
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Development Demo Link */}
        <section className="demo-link-section">
          <Card variant="bordered" padding="md" interactive onClick={() => window.open('/demo', '_blank')}>
            <CardBody>
              <div className="demo-link-content">
                <span>🎨</span>
                <div>
                  <h4>Component Demo</h4>
                  <p>View all UI components and their variations</p>
                </div>
                <Badge variant="info" size="sm">New</Badge>
              </div>
            </CardBody>
          </Card>
        </section>
      </LoadingContainer>
    </div>
  );
};
