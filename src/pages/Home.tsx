import React from 'react';
import { useProfileData, usePortfolioNavigation } from '../hooks';
import { Card, CardBody, Button, SkillBadge } from '../components/common';
import {
  ReactIcon,
  TypeScriptIcon,
  NodeIcon,
  PythonIcon,
  CloudIcon,
  DockerIcon,
} from '../components/icons';

export const Home: React.FC = () => {
  const { data: profile, loading, error } = useProfileData();
  const {
    navigateToWorkPortfolio,
    navigateToContactForm,
    navigateToResume,
    navigateToMetric,
  } = usePortfolioNavigation();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Unable to load portfolio data</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="error-container">
        <h2>No portfolio data available</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="page-container home-page">
      {/* Hero Introduction - Focused and Clean */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">Sunny Dodti</h1>
            <h2 className="hero-subtitle">Software Developer</h2>
          </div>
          <p className="hero-description">
            {profile?.profile?.about ||
              'Developer at heart. Building apps & solving problems is my hobby.'}
          </p>
          <div className="hero-actions">
            <Button
              variant="primary"
              size="md"
              onClick={navigateToWorkPortfolio}
            >
              View My Work
            </Button>
            <Button variant="primary" size="md" onClick={navigateToContactForm}>
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Career Metrics - Clean Stats Row */}
      <section className="metrics-section">
        <h3 className="section-title">Career Overview</h3>
        <div className="metrics-grid">
          <div
            className="metric-item"
            onClick={() => navigateToMetric('experience')}
            onKeyDown={e => e.key === 'Enter' && navigateToMetric('experience')}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            aria-label="View work experience details"
          >
            <div className="metric-value">3+</div>
            <div className="metric-label">Years Experience</div>
          </div>
          <div
            className="metric-item"
            onClick={() => navigateToMetric('companies')}
            onKeyDown={e => e.key === 'Enter' && navigateToMetric('companies')}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            aria-label="View work experience at different companies"
          >
            <div className="metric-value">
              {profile?.work_experience?.length || 2}
            </div>
            <div className="metric-label">Companies</div>
          </div>
          <div
            className="metric-item"
            onClick={() => navigateToMetric('projects')}
            onKeyDown={e => e.key === 'Enter' && navigateToMetric('projects')}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            aria-label="View projects portfolio"
          >
            <div className="metric-value">6+</div>
            <div className="metric-label">Projects</div>
          </div>
          <div
            className="metric-item"
            onClick={() => navigateToMetric('technologies')}
            onKeyDown={e =>
              e.key === 'Enter' && navigateToMetric('technologies')
            }
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
            aria-label="View technology stack and skills"
          >
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
                icon={<ReactIcon size={18} />}
              />
              <SkillBadge
                skill="TypeScript"
                proficiency="advanced"
                icon={<TypeScriptIcon size={18} />}
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
                icon={<NodeIcon size={18} />}
              />
              <SkillBadge
                skill="Python"
                proficiency="intermediate"
                icon={<PythonIcon size={18} />}
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
                icon={<CloudIcon size={18} />}
              />
              <SkillBadge
                skill="Docker"
                proficiency="advanced"
                icon={<DockerIcon size={18} />}
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
          <h3>Let&apos;s Build Something Amazing Together</h3>
          <p>
            Ready to discuss your next project or explore collaboration
            opportunities?
          </p>
          <div className="next-steps-actions">
            <Button variant="primary" size="lg" onClick={navigateToContactForm}>
              Start a Conversation
            </Button>
            <Button variant="outline" size="lg" onClick={navigateToResume}>
              View Full Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
