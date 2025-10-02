import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling portfolio navigation
 * Centralizes all navigation logic for the portfolio sections
 */
export const usePortfolioNavigation = () => {
  const navigate = useNavigate();

  // Main section navigation
  const navigateToProjects = () => navigate('/projects');
  const navigateToContact = () => navigate('/contact');
  const navigateToExperience = () => navigate('/experience');
  const navigateToTechStack = () => navigate('/tech-stack');

  // Metric tile navigation
  const navigateToMetric = (section: string) => {
    switch (section) {
      case 'experience':
      case 'companies':
        navigate('/experience');
        break;
      case 'projects':
        navigate('/projects');
        break;
      case 'technologies':
        navigate('/tech-stack');
        break;
      default:
        break;
    }
  };

  // CTA action navigation
  const navigateToWorkPortfolio = () => navigate('/projects');
  const navigateToContactForm = () => navigate('/contact');
  const navigateToResume = () => navigate('/experience');

  return {
    // Direct navigation methods
    navigateToProjects,
    navigateToContact,
    navigateToExperience,
    navigateToTechStack,
    
    // Contextual navigation methods
    navigateToMetric,
    navigateToWorkPortfolio,
    navigateToContactForm,
    navigateToResume,
  };
};