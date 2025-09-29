import React from 'react';
import { useProfileData } from '../hooks/useProfileData';
import { Card } from '../components/common';
import { Spinner } from '../components/common/Loading';

interface ContactCardProps {
  title: string;
  value: string;
  icon: string;
  href?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, value, icon, href }) => {
  const content = (
    <div className="contact-card-content">
      <div className="contact-icon">{icon}</div>
      <div className="contact-info">
        <div className="contact-title">{title}</div>
        <div className="contact-value">{value}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Card variant="bordered" className="contact-card clickable">
        <a href={href} className="contact-link">
          {content}
        </a>
      </Card>
    );
  }

  return (
    <Card variant="bordered" className="contact-card">
      {content}
    </Card>
  );
};

interface SocialLinkProps {
  platform: string;
  url: string;
  icon: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ platform, url, icon }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-link"
    >
      <span className="social-icon">{icon}</span>
      <span className="social-platform">{platform}</span>
    </a>
  );
};

export const Contact: React.FC = () => {
  const { data: profileData, loading, error } = useProfileData();

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <Spinner size="lg" />
          <p>Loading contact information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <h2>Unable to load contact information</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>No contact information available</h2>
          <p>Contact details will be displayed here once loaded.</p>
        </div>
      </div>
    );
  }

  const { profile, links } = profileData;

  return (
    <div className="page-container contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">Let&apos;s Connect</h1>
            <h2 className="hero-subtitle">Get in Touch with Me</h2>
          </div>
          <p className="hero-description">
            I&apos;m always interested in new opportunities, collaborations, and conversations. 
            Feel free to reach out through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section">
        <h3 className="section-title">Contact Information</h3>
        <div className="contact-cards-grid">
          <ContactCard
            title="Email"
            value={profile.email}
            icon="@"
            href={`mailto:${profile.email}`}
          />
          
          {profile.phone && (
            <ContactCard
              title="Phone"
              value={profile.phone}
              icon="#"
              href={`tel:${profile.phone}`}
            />
          )}

          <ContactCard
            title="Location"
            value={profile.location}
            icon="*"
          />

          <ContactCard
            title="Status"
            value="Open to opportunities"
            icon="+"
          />
        </div>
      </section>

      {/* Social Media Section */}
      {links && (
        <section className="social-section">
          <h3 className="section-title">Social Media & Profiles</h3>
          <div className="social-links-grid">
            {links.linkedin && (
              <SocialLink
                platform="LinkedIn"
                url={links.linkedin}
                icon="in"
              />
            )}
            
            {links.github && (
              <SocialLink
                platform="GitHub"
                url={links.github}
                icon="gh"
              />
            )}
            
            {links.portfolio && (
              <SocialLink
                platform="Portfolio"
                url={links.portfolio}
                icon="pf"
              />
            )}
            
            {links.resume && (
              <SocialLink
                platform="Resume"
                url={links.resume}
                icon="cv"
              />
            )}
          </div>
        </section>
      )}

      {/* Professional Summary Section */}
      <section className="professional-summary-section">
        <Card variant="bordered" className="professional-summary-card">
          <div className="summary-header">
            <h3 className="section-title">Professional Summary</h3>
          </div>
          <div className="summary-content">
            <p className="bio-text">{profile.about}</p>
            
            <div className="summary-highlights">
              <div className="highlight-item">
                <span className="highlight-label">Current Role:</span>
                <span className="highlight-value">{profile.title}</span>
              </div>
              
              <div className="highlight-item">
                <span className="highlight-label">Location:</span>
                <span className="highlight-value">{profile.location}</span>
              </div>
              
              <div className="highlight-item">
                <span className="highlight-label">Availability:</span>
                <span className="highlight-value">Open to new opportunities</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <Card variant="bordered" className="cta-card">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Work Together?</h3>
            <p className="cta-description">
              Whether you have a project in mind, want to discuss opportunities, 
              or just want to say hello, I&apos;d love to hear from you.
            </p>
            <div className="cta-actions">
              <a 
                href={`mailto:${profile.email}`}
                className="cta-button primary"
              >
                Send Email
              </a>
              {links?.linkedin && (
                <a 
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button secondary"
                >
                  Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
