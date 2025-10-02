import React, { useState } from 'react';
import { useProfileData } from '../hooks/useProfileData';
import type { WorkExperience } from '../types/portfolio';
import { Card, Badge } from '../components/common';
import { Spinner } from '../components/common/Loading';

type TabType =
  | 'overview'
  | 'responsibilities'
  | 'technologies'
  | 'achievements';

interface ExperienceCardProps {
  experience: WorkExperience;
  isExpanded: boolean;
  onToggle: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  isExpanded,
  onToggle,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const getDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  const responsibilities = Array.isArray(experience.responsibilities)
    ? experience.responsibilities
    : [];

  return (
    <Card
      variant="bordered"
      padding="none"
      hover={true}
      className="experience-card"
    >
      <button
        className="experience-header"
        onClick={onToggle}
        onKeyDown={e => e.key === 'Enter' && onToggle()}
        aria-expanded={isExpanded}
      >
        <div className="company-logo">
          <span>{experience.company.substring(0, 2).toUpperCase()}</span>
        </div>

        <div className="experience-info">
          <h3 className="job-title">{experience.position}</h3>
          <div className="company-name">{experience.company}</div>
          <div className="job-meta">
            <span className="job-location">{experience.location}</span>
            <span className="job-duration">
              {formatDate(experience.start_date)} -{' '}
              {formatDate(experience.end_date)}
              {experience.current && <Badge variant="success">Current</Badge>}
            </span>
            <span className="duration-badge">
              {getDuration(experience.start_date, experience.end_date)}
            </span>
          </div>
        </div>

        <div className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? '−' : '+'}
        </div>
      </button>

      {isExpanded && (
        <div className="experience-details">
          <div className="details-tabs">
            <button
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === 'responsibilities' ? 'active' : ''}`}
              onClick={() => setActiveTab('responsibilities')}
            >
              Key Responsibilities
            </button>
            <button
              className={`tab ${activeTab === 'technologies' ? 'active' : ''}`}
              onClick={() => setActiveTab('technologies')}
            >
              Tech Stack
            </button>
            {experience.achievements && experience.achievements.length > 0 && (
              <button
                className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
                onClick={() => setActiveTab('achievements')}
              >
                Achievements
              </button>
            )}
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <p>
                  {experience.description ||
                    'Building innovative solutions and contributing to impactful projects.'}
                </p>

                <div className="overview-section">
                  <h4 className="overview-section-title">
                    Key Responsibilities
                  </h4>
                  <ul className="overview-list">
                    {responsibilities
                      .slice(0, 3)
                      .map((responsibility, index) => (
                        <li key={index} className="overview-item">
                          {responsibility}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="overview-section">
                  <h4 className="overview-section-title">
                    Primary Technologies
                  </h4>
                  <div className="overview-tech-preview">
                    {Object.entries(experience.tech_stack).map(
                      ([category, technologies]) => {
                        const hasTechnologies =
                          Array.isArray(technologies) &&
                          technologies.length > 0;

                        return hasTechnologies ? (
                          <div
                            key={category}
                            className="overview-tech-category"
                          >
                            <span className="overview-tech-label">
                              {category
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, l => l.toUpperCase())}
                              :
                            </span>
                            <div className="overview-tech-items">
                              {Array.isArray(technologies) ? (
                                // Check if it's an array of strings (like frontend, backend, etc.)
                                typeof technologies[0] === 'string' ? (
                                  technologies
                                    .slice(0, 4)
                                    .map((tech, index) => (
                                      <Badge key={index} variant="secondary">
                                        {tech}
                                      </Badge>
                                    ))
                                ) : (
                                  // It's an array of objects (like cloud providers)
                                  (
                                    technologies as {
                                      provider: string;
                                      services?: string[];
                                    }[]
                                  )
                                    .slice(0, 2)
                                    .map((provider, index) => (
                                      <Badge key={index} variant="info">
                                        {provider.provider}
                                      </Badge>
                                    ))
                                )
                              ) : (
                                <Badge variant="secondary">
                                  {String(technologies)}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ) : null;
                      }
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'responsibilities' && (
              <div className="responsibilities-content">
                <div className="content-header">
                  <h4 className="content-title">
                    Key Responsibilities & Achievements
                  </h4>
                </div>
                <ul className="responsibility-list">
                  {responsibilities.map((responsibility, index) => (
                    <li key={index} className="responsibility-item">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'technologies' && (
              <div className="technologies-content">
                <div className="content-header">
                  <h4 className="content-title">Technology Stack & Tools</h4>
                </div>
                {/* add spacint before below elements are displayed */}
                
                {Object.entries(experience.tech_stack).map(
                  ([category, technologies]) => {
                    const hasTechnologies =
                      Array.isArray(technologies) && technologies.length > 0;

                    if (!hasTechnologies) return null;

                    const techCount = Array.isArray(technologies)
                      ? technologies.length
                      : 1;

                    return (
                      <div key={category} className="tech-category">
                        <h4 className="tech-category-title">
                          {category
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, l => l.toUpperCase())}{' '}
                          ({techCount})
                        </h4>
                        <div className="tech-tags">
                          {Array.isArray(technologies) ? (
                            // Check if it's an array of strings (like frontend, backend, etc.)
                            typeof technologies[0] === 'string' ? (
                              technologies.map((tech, index) => (
                                <Badge key={index} variant="primary">
                                  {tech}
                                </Badge>
                              ))
                            ) : (
                              // It's an array of objects (like cloud providers)
                              (
                                technologies as {
                                  provider: string;
                                  services?: string[];
                                }[]
                              ).map((provider, index) => (
                                <div key={index} className="cloud-provider">
                                  <Badge variant="secondary">
                                    {provider.provider}
                                  </Badge>
                                  {provider.services?.map(
                                    (service: string, sIndex: number) => (
                                      <Badge key={sIndex} variant="info">
                                        {service}
                                      </Badge>
                                    )
                                  )}
                                </div>
                              ))
                            )
                          ) : (
                            <Badge variant="primary">
                              {String(technologies)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}

            {activeTab === 'achievements' &&
              experience.achievements &&
              experience.achievements.length > 0 && (
                <div className="achievements-content">
                  <ul className="achievement-list">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="achievement-item">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      )}
    </Card>
  );
};

export const Experience: React.FC = () => {
  const { data: profileData, loading, error } = useProfileData();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <Spinner size="lg" />
          <p>Loading experience data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h2>Unable to load experience data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (
    !profileData?.work_experience ||
    profileData.work_experience.length === 0
  ) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>No experience data available</h2>
          <p>Experience information will be displayed here once loaded.</p>
        </div>
      </div>
    );
  }

  const handleCardToggle = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Sort experiences by start date (most recent first)
  const sortedExperiences = [...profileData.work_experience].sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  return (
    <div className="page-container experience-page">
      {/* Hero Section - Following Home pattern */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">Professional Experience</h1>
            <h2 className="hero-subtitle">Software Development Journey</h2>
          </div>
          <p className="hero-description">
            My career progression across different roles and technologies in
            software development
          </p>
        </div>
      </section>

      {/* Metrics Section - Following Home pattern */}
      <section className="metrics-section">
        <h3 className="section-title">Career Overview</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-value">{sortedExperiences.length}</div>
            <div className="metric-label">Positions</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">
              {Math.max(
                ...sortedExperiences.map(exp => {
                  const start = new Date(exp.start_date);
                  const end = exp.end_date
                    ? new Date(exp.end_date)
                    : new Date();
                  return Math.ceil(
                    (end.getTime() - start.getTime()) /
                      (1000 * 60 * 60 * 24 * 365.25)
                  );
                })
              )}
              +
            </div>
            <div className="metric-label">Years</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">
              {new Set(sortedExperiences.map(exp => exp.company)).size}
            </div>
            <div className="metric-label">Companies</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">
              {sortedExperiences.reduce(
                (total, exp) =>
                  total +
                  (exp.responsibilities ? exp.responsibilities.length : 0),
                0
              )}
            </div>
            <div className="metric-label">Key Achievements</div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="experience-timeline-section">
        <h3 className="section-title">Work History</h3>

        <div className="experience-timeline">
          {sortedExperiences.map(experience => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              isExpanded={expandedCard === experience.id}
              onToggle={() => handleCardToggle(experience.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
