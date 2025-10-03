import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioProvider';
import { Layout } from './components/layout';
import { Home, Experience, Projects, TechStack, Contact } from './pages';
import { ComponentDemo } from './pages/ComponentDemo';

// Get basename from environment variable or default to undefined
const getBasename = () => {
  const basename = import.meta.env.VITE_ROUTER_BASE;
  return basename && basename !== '/' ? basename : undefined;
};

// Component to handle GitHub Pages redirects
const GitHubPagesRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a stored redirect path from GitHub Pages 404 handler
    const redirectPath = sessionStorage.getItem('github-pages-redirect');
    if (redirectPath) {
      sessionStorage.removeItem('github-pages-redirect');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return null;
};

function App() {
  return (
    <PortfolioProvider>
      <Router basename={getBasename()}>
        <GitHubPagesRedirectHandler />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/demo" element={<ComponentDemo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
