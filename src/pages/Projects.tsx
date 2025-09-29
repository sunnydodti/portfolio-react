import React, { useState } from 'react';
import { useProfileData } from '../hooks/useProfileData';
import { Card, Badge } from '../components/common';
import { Spinner } from '../components/common/Loading';
import type { Project } from '../types/portfolio';

type ProjectFilter = 'all' | 'work' | 'academic' | 'personal' | 'open-source';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getStatusColor = (status: string): 'success' | 'primary' | 'warning' | 'error' | 'secondary' => {
    switch (status) {
      case 'completed': return 'success';
      case 'ongoing': return 'primary';
      case 'paused': return 'warning';
      case 'cancelled': return 'error';
      default: return 'secondary';
    }
  };

  const getProjectTypeIcon = (id: string) => {
    if (id.startsWith('W')) return 'WORK';
    if (id.startsWith('A')) return 'ACAD';
    if (id.startsWith('P')) return 'PERS';
    if (id.startsWith('O')) return 'OPEN';
    return 'PROJ';
  };

  return (
    <Card variant="bordered" hover={true} className="project-card">
      <div className="project-header">
        <div className="project-icon">
          {getProjectTypeIcon(project.id)}
        </div>
        
        <div className="project-info">
          <div className="project-meta">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-badges">
              <Badge variant={getStatusColor(project.status)}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              <span className="project-duration">
                {formatDate(project.start)} - {project.end ? formatDate(project.end) : 'Present'}
              </span>
            </div>
          </div>
          
          <p className="project-description">{project.description}</p>
          
          <div className="project-tech-preview">
            {project.tech_stack.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="secondary">{tech}</Badge>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="tech-more">+{project.tech_stack.length - 4} more</span>
            )}
          </div>
        </div>

        <button 
          className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="project-details">
          {project.details && project.details.length > 0 && (
            <div className="project-section">
              <h4 className="section-title">Project Details</h4>
              <ul className="detail-list">
                {project.details.map((detail, index) => (
                  <li key={index} className="detail-item">{detail}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="project-section">
            <h4 className="section-title">Technology Stack ({project.tech_stack.length})</h4>
            <div className="tech-tags">
              {project.tech_stack.map((tech, index) => (
                <Badge key={index} variant="primary">{tech}</Badge>
              ))}
            </div>
          </div>

          {(project.links?.repository || project.links?.demo || project.links?.documentation) && (
            <div className="project-section">
              <h4 className="section-title">Links</h4>
              <div className="project-links">
                {project.links.repository && (
                  <a href={project.links.repository} className="project-link" target="_blank" rel="noopener noreferrer">
                    Repository
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
                {project.links.documentation && (
                  <a href={project.links.documentation} className="project-link" target="_blank" rel="noopener noreferrer">
                    Documentation
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export const Projects: React.FC = () => {
  const { data: profileData, loading, error } = useProfileData();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <Spinner size="lg" />
          <p>Loading projects data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h2>Unable to load projects data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profileData?.projects) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>No projects data available</h2>
          <p>Project information will be displayed here once loaded.</p>
        </div>
      </div>
    );
  }

  const allProjects = [
    ...(profileData.projects.work || []),
    ...(profileData.projects.academic || []),
    ...(profileData.projects.personal || []),
    ...(profileData.projects.open_source || [])
  ];

  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : activeFilter === 'work' 
      ? profileData.projects.work || []
      : activeFilter === 'academic'
        ? profileData.projects.academic || []
        : activeFilter === 'personal'
          ? profileData.projects.personal || []
          : profileData.projects.open_source || [];

  const projectCounts = {
    all: allProjects.length,
    work: profileData.projects.work?.length || 0,
    academic: profileData.projects.academic?.length || 0,
    personal: profileData.projects.personal?.length || 0,
    'open-source': profileData.projects.open_source?.length || 0,
  };

  return (
    <div className="page-container projects-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">Projects Portfolio</h1>
            <h2 className="hero-subtitle">Building Innovative Solutions</h2>
          </div>
          <p className="hero-description">
            A showcase of my work across different domains - from enterprise applications to research projects
          </p>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="metrics-section">
        <h3 className="section-title">Project Overview</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-value">{allProjects.length}</div>
            <div className="metric-label">Total Projects</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{projectCounts.work}</div>
            <div className="metric-label">Work Projects</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{projectCounts.academic}</div>
            <div className="metric-label">Academic Projects</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">
              {new Set(allProjects.flatMap(p => p.tech_stack)).size}
            </div>
            <div className="metric-label">Technologies Used</div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="section-header">
          <h3 className="section-title">All Projects</h3>
          
          {/* Filter Buttons */}
          <div className="filter-buttons">
            {(['all', 'work', 'academic', 'personal', 'open-source'] as const).map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'all' ? 'All' : filter === 'open-source' ? 'Open Source' : 
                 filter.charAt(0).toUpperCase() + filter.slice(1)} ({projectCounts[filter]})
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-filter-state">
            <p>No projects found for the selected filter.</p>
          </div>
        )}
      </section>
    </div>
  );
};
