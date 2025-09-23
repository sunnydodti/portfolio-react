import React from 'react';
import { useProfileData } from '../hooks/useProfileData';
import {
  LoadingContainer,
  Card,
  CardBody,
  Button,
  SkillBadge,
} from '../components/common';
import './Home.css';

export const Home: React.FC = () => {
  const { data: profile, loading, error } = useProfileData();

  return (
    <div className="page-container home-page">
      <LoadingContainer loading={loading} error={error}>
        {/* Hero Introduction - Focused and Clean */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-main">
              <h1 className="hero-title">
                {profile?.profile?.name || 'Sunny Dodti'}
              </h1>
              <h2 className="hero-subtitle">
                {profile?.profile?.title || 'Software Developer'}
              </h2>
            </div>
            <p className="hero-description">
              {profile?.profile?.about ||
                'Developer at heart. Building apps & solving problems is my hobby.'}
            </p>
            <div className="hero-actions">
              <Button variant="primary" size="md">
                View My Work
              </Button>
              <Button variant="outline" size="md">
                Get In Touch
              </Button>
            </div>
          </div>
        </section>

        {/* Professional Metrics - Clean Stats Row */}
        <section className="metrics-section">
          <h3 className="section-title">Professional Overview</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-value">3+</div>
              <div className="metric-label">Years Experience</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">
                {profile?.work_experience?.length || 2}
              </div>
              <div className="metric-label">Companies</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">6+</div>
              <div className="metric-label">Projects</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">10+</div>
              <div className="metric-label">Technologies</div>
            </div>
          </div>
        </section>

        {/* Current Focus - What I'm Working With */}
        <section className="current-focus-section">
          <h3 className="section-title">Current Technology Stack</h3>
          <div className="tech-categories">
            <div className="tech-category">
              <h4 className="category-title">Frontend</h4>
              <div className="tech-badges">
                <SkillBadge
                  skill="React"
                  proficiency="expert"
                  icon={<span>⚛️</span>}
                />
                <SkillBadge
                  skill="TypeScript"
                  proficiency="advanced"
                  icon={<span>🔷</span>}
                />
                <SkillBadge skill="Next.js" proficiency="advanced" />
              </div>
            </div>

            <div className="tech-category">
              <h4 className="category-title">Backend</h4>
              <div className="tech-badges">
                <SkillBadge
                  skill="Node.js"
                  proficiency="advanced"
                  icon={<span>🟢</span>}
                />
                <SkillBadge
                  skill="Python"
                  proficiency="intermediate"
                  icon={<span>🐍</span>}
                />
                <SkillBadge skill="Django" proficiency="intermediate" />
              </div>
            </div>

            <div className="tech-category">
              <h4 className="category-title">Cloud & DevOps</h4>
              <div className="tech-badges">
                <SkillBadge
                  skill="AWS"
                  proficiency="intermediate"
                  icon={<span>☁️</span>}
                />
                <SkillBadge
                  skill="Docker"
                  proficiency="advanced"
                  icon={<span>🐳</span>}
                />
                <SkillBadge skill="Azure" proficiency="intermediate" />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work Highlight */}
        <section className="recent-work-section">
          <h3 className="section-title">Recent Work</h3>
          <div className="work-highlight">
            <Card variant="glass" padding="lg">
              <CardBody>
                <div className="work-current">
                  <div className="work-info">
                    <h4>Software Engineer</h4>
                    <p className="company-name">Xoriant Solutions</p>
                    <p className="work-period">Aug 2023 - Present</p>
                  </div>
                  <div className="work-description">
                    <p>
                      Leading development of AI-powered document processing
                      systems and serverless architectures, delivering features
                      ahead of schedule with positive client feedback.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Next Steps - Clear Call to Action */}
        <section className="next-steps-section">
          <div className="next-steps-content">
            <h3>Let's Build Something Amazing Together</h3>
            <p>
              Ready to discuss your next project or explore collaboration
              opportunities?
            </p>
            <div className="next-steps-actions">
              <Button variant="primary" size="lg">
                Start a Conversation
              </Button>
              <Button variant="outline" size="lg">
                View Full Resume
              </Button>
            </div>
          </div>
        </section>
      </LoadingContainer>
    </div>
  );
};
