import React, { useState } from 'react';
import { useProfileData } from '../hooks/useProfileData';
import { Card, Badge } from '../components/common';
import { Spinner } from '../components/common/Loading';

type CategoryFilter = 'all' | 'programming_languages' | 'frameworks_libraries' | 'databases' | 'cloud_platforms' | 'development_tools' | 'other_technologies';

interface TechItem {
  name: string;
  proficiency?: string;
  years_experience?: number;
}

interface TechCategoryProps {
  title: string;
  technologies: (string | TechItem)[];
}

const TechCategory: React.FC<TechCategoryProps> = ({ title, technologies }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <Card variant="bordered" className="tech-category-card">
      <button 
        className="tech-category-header" 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`tech-category-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="category-info">
          <h3 className="category-title">{title}</h3>
          <span className="category-count">{technologies.length} technologies</span>
        </div>
        <div className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? '−' : '+'}
        </div>
      </button>

      {isExpanded && (
        <div 
          className="tech-category-content"
          id={`tech-category-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <div className="tech-grid">
            {technologies.map((tech, index) => {
              // Handle different data structures
              if (typeof tech === 'string') {
                return (
                  <div key={index} className="tech-item">
                    <div className="tech-name">{tech}</div>
                  </div>
                );
              } else if (tech.name) {
                return (
                  <div key={index} className="tech-item detailed">
                    <div className="tech-name">{tech.name}</div>
                    {tech.proficiency && (
                      <Badge variant="secondary">{tech.proficiency}</Badge>
                    )}
                    {tech.years_experience && (
                      <span className="tech-experience">{tech.years_experience} yrs</span>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </Card>
  );
};

export const TechStack: React.FC = () => {
  const { data: profileData, loading, error } = useProfileData();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <Spinner size="lg" />
          <p>Loading tech stack data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h2>Unable to load tech stack data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profileData?.tech_stack) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>No tech stack data available</h2>
          <p>Technology information will be displayed here once loaded.</p>
        </div>
      </div>
    );
  }

  const techStack = profileData.tech_stack;
  
  const categories = [
    { key: 'programming_languages', title: 'Programming Languages', data: techStack.programming_languages || [] },
    { key: 'frameworks_libraries', title: 'Frameworks & Libraries', data: techStack.frameworks_libraries || [] },
    { key: 'databases', title: 'Databases', data: techStack.databases || [] },
    { key: 'cloud_platforms', title: 'Cloud Platforms', data: techStack.cloud_platforms || [] },
    { key: 'development_tools', title: 'Development Tools', data: techStack.development_tools || [] },
    { key: 'other_technologies', title: 'Other Technologies', data: techStack.other_technologies || [] },
  ];

  const filteredCategories = activeFilter === 'all' 
    ? categories 
    : categories.filter(cat => cat.key === activeFilter);

  const totalTechnologies = categories.reduce((total, cat) => total + cat.data.length, 0);

  return (
    <div className="page-container tech-stack-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">Technology Stack</h1>
            <h2 className="hero-subtitle">Tools & Technologies I Work With</h2>
          </div>
          <p className="hero-description">
            A comprehensive overview of my technical skills across different domains and technologies
          </p>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="metrics-section">
        <h3 className="section-title">Tech Overview</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-value">{totalTechnologies}</div>
            <div className="metric-label">Total Technologies</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{categories.length}</div>
            <div className="metric-label">Categories</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{(techStack.programming_languages || []).length}</div>
            <div className="metric-label">Programming Languages</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{(techStack.frameworks_libraries || []).length}</div>
            <div className="metric-label">Frameworks</div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-categories-section">
        <div className="section-header">
          <h3 className="section-title">Technology Categories</h3>
          
          {/* Filter Buttons */}
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.key}
                className={`filter-btn ${activeFilter === category.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.key as CategoryFilter)}
              >
                {category.title} ({category.data.length})
              </button>
            ))}
          </div>
        </div>

        <div className="tech-categories-grid">
          {filteredCategories.map((category) => (
            <TechCategory
              key={category.key}
              title={category.title}
              technologies={category.data}
            />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="empty-filter-state">
            <p>No technologies found for the selected category.</p>
          </div>
        )}
      </section>
    </div>
  );
};
