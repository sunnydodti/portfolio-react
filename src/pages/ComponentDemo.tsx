/* ==========================================================================
   Component Demo - Test and showcase all common components
   ========================================================================== */

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  SkillBadge,
  Spinner,
  LoadingContainer,
  Skeleton,
} from '../components/common';
import { ProjectsIcon, ReactIcon, TypeScriptIcon, NodeIcon, TechIcon } from '../components/icons';
import './ComponentDemo.css';

export const ComponentDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadingTest = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleErrorTest = () => {
    setLoading(false);
    setError('This is a test error message');
  };

  const handleReset = () => {
    setLoading(false);
    setError(null);
  };

  return (
    <div className="component-demo">
      <div className="demo-section">
        <h2>Component Demo & Testing</h2>
        <p>
          Interactive showcase of all common components with various states and
          configurations.
        </p>
      </div>

      {/* Button Demo */}
      <div className="demo-section">
        <h3>Buttons</h3>
        <div className="demo-grid">
          <div className="demo-item">
            <h4>Variants</h4>
            <div className="button-group">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="demo-item">
            <h4>Sizes</h4>
            <div className="button-group">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="demo-item">
            <h4>States</h4>
            <div className="button-group">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button icon={<ProjectsIcon size={16} />}>With Icon</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Demo */}
      <div className="demo-section">
        <h3>Cards</h3>
        <div className="demo-grid">
          <Card variant="default" padding="md">
            <CardHeader>
              <h4>Default Card</h4>
            </CardHeader>
            <CardBody>
              <p>
                This is a default card with header, body, and footer sections.
              </p>
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">
                Action
              </Button>
            </CardFooter>
          </Card>

          <Card variant="elevated" padding="lg" hover>
            <CardHeader>
              <h4>Elevated Card</h4>
            </CardHeader>
            <CardBody>
              <p>
                This card has elevation and hover effects for better visual
                hierarchy.
              </p>
            </CardBody>
          </Card>

          <Card
            variant="glass"
            padding="md"
            interactive
            onClick={() => alert('Card clicked!')}
          >
            <CardBody>
              <h4>Interactive Glass Card</h4>
              <p>
                This glass card is interactive and clickable with beautiful
                backdrop effects.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Badge Demo */}
      <div className="demo-section">
        <h3>Badges & Tags</h3>
        <div className="demo-grid">
          <div className="demo-item">
            <h4>Badge Variants</h4>
            <div className="badge-group">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>

          <div className="demo-item">
            <h4>Skill Badges</h4>
            <div className="badge-group">
              <SkillBadge
                skill="React"
                proficiency="expert"
                yearsExperience={5}
                showProficiency
                icon={<ReactIcon size={16} />}
              />
              <SkillBadge
                skill="TypeScript"
                proficiency="advanced"
                yearsExperience={3}
                showProficiency
                icon={<TypeScriptIcon size={16} />}
              />
              <SkillBadge
                skill="Node.js"
                proficiency="intermediate"
                yearsExperience={2}
                showProficiency
                icon={<NodeIcon size={16} />}
              />
            </div>
          </div>

          <div className="demo-item">
            <h4>Removable & Shapes</h4>
            <div className="badge-group">
              <Badge removable onRemove={() => alert('Badge removed!')}>
                Removable
              </Badge>
              <Badge shape="pill">Pill Shape</Badge>
              <Badge shape="square">Square</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Demo */}
      <div className="demo-section">
        <h3>Loading States</h3>
        <div className="demo-grid">
          <div className="demo-item">
            <h4>Spinners</h4>
            <div className="spinner-group">
              <Spinner size="sm" variant="primary" />
              <Spinner size="md" variant="secondary" />
              <Spinner size="lg" variant="primary" />
              <Spinner size="xl" variant="secondary" />
            </div>
          </div>

          <div className="demo-item">
            <h4>Skeleton Loading</h4>
            <div className="skeleton-group">
              <Skeleton width="100%" height="20px" />
              <Skeleton width="80%" height="16px" />
              <Skeleton width="60%" height="16px" />
              <Skeleton variant="circular" width="40px" height="40px" />
            </div>
          </div>

          <div className="demo-item">
            <h4>Loading Container</h4>
            <div className="loading-test-controls">
              <Button size="sm" onClick={handleLoadingTest}>
                Test Loading
              </Button>
              <Button size="sm" onClick={handleErrorTest} variant="outline">
                Test Error
              </Button>
              <Button size="sm" onClick={handleReset} variant="ghost">
                Reset
              </Button>
            </div>

            <LoadingContainer loading={loading} error={error}>
              <Card padding="md">
                <CardBody>
                  <h4>Content Loaded Successfully! ✅</h4>
                  <p>
                    This content is shown when not loading and no error
                    occurred.
                  </p>
                </CardBody>
              </Card>
            </LoadingContainer>
          </div>
        </div>
      </div>

      {/* Interactive Tests */}
      <div className="demo-section">
        <h3>Interactive Tests</h3>
        <Card variant="bordered" padding="lg">
          <CardHeader>
            <h4>🧪 Component Testing Area</h4>
          </CardHeader>
          <CardBody>
            <div className="test-area">
              <p>
                Use the buttons above to test different loading states and
                interactions.
              </p>
              <div className="test-actions">
                <Button
                  variant="primary"
                  icon={<TechIcon size={16} />}
                  onClick={() => alert('Primary action executed!')}
                >
                  Primary Action
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => console.log('Secondary action logged')}
                >
                  Log Action
                </Button>
                <SkillBadge
                  skill="Interactive"
                  onClick={() => alert('Skill badge clicked!')}
                  icon={<span>👆</span>}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
