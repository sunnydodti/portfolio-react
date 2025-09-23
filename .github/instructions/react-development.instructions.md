---
applyTo: '**'
---

# React Development Guidelines - Sunny Dodti Portfolio

## 🎯 React-Specific Implementation Standards

This document provides React-specific guidelines for building Sunny Dodti's portfolio. Follow these standards to ensure consistency, performance, and maintainability.

## 📦 Required Dependencies

### Core Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.0",
  "typescript": "^4.9.0"
}
```

### UI & Styling

```json
{
  "framer-motion": "^8.0.0",
  "react-icons": "^4.7.0",
  "clsx": "^2.0.0"
}
```

### Build & Development

```json
{
  "vite": "^4.1.0",
  "@vitejs/plugin-react": "^3.1.0"
}
```

## � Design Implementation Guidelines

### Wireframes vs Design Clarification

**IMPORTANT**: The wireframes are structural references only, NOT the final design:

- **Wireframes** (`/context/wireframes/`): Use for layout structure, component placement, content organization
- **Actual Design** (`/data/styles/pallet-demo-dark-light.html`): Follow this beautiful palette for colors, styling, typography, shadows, gradients

### Visual Design Priority

**FOCUS: CREATE A VISUALLY STUNNING PORTFOLIO**

1. **Gorgeous Color Palette**: Follow the beautiful blue theme from palette demo with rich gradients
2. **Sophisticated Visual Effects**: Rich shadows, elegant gradients, smooth animations, micro-interactions  
3. **Layout Structure**: Use wireframes as building blocks for component organization (structure only)
4. **Beautiful Typography**: Inter font family with elegant hierarchy, proper spacing, and visual rhythm
5. **Interactive Polish**: Hover effects, button animations, loading states, visual feedback
6. **Scrollable Experience**: Allow natural scrolling with smooth section transitions and reveal animations
7. **Theme Support**: Ensure both light and dark modes work beautifully with smooth toggle transitions
8. **Professional Depth**: Layered shadows, visual depth, modern card designs, elegant spacing

### Key Visual Elements to Implement

- **Hero Section**: Dramatic gradients, elegant typography, smooth call-to-action animations
- **Project Cards**: Rich cards with hover effects, image overlays, interactive elements
- **Skills Section**: Beautiful progress indicators, animated skill bars, or elegant badges
- **Navigation**: Smooth sidebar or modern navigation with elegant transitions
- **Micro-interactions**: Button hover effects, click feedback, loading animations
- **Section Transitions**: Smooth scroll-triggered animations and visual separators

## �🏗️ Component Architecture

### Component Categories

#### 1. Layout Components (`/src/components/layout/`)

```typescript
// Sidebar.tsx - Main navigation sidebar
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
}

// Header.tsx - Top navigation bar
interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
  showBackButton?: boolean;
}

// Layout.tsx - Main layout wrapper
interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
}
```

#### 2. Common Components (`/src/components/common/`)

```typescript
// Card.tsx - Reusable card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  bordered?: boolean;
}

// Button.tsx - Styled button component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Badge.tsx - Skill badges and tags
interface BadgeProps {
  text: string;
  variant: 'skill' | 'tech' | 'category';
  icon?: React.ReactNode;
}
```

#### 3. Section Components (`/src/components/sections/`)

```typescript
// HeroSection.tsx - Landing hero section
interface HeroSectionProps {
  profile: ProfileData;
  onContactClick: () => void;
}

// ExperienceCard.tsx - Work experience cards
interface ExperienceCardProps {
  experience: WorkExperience;
  isExpanded: boolean;
  onToggle: () => void;
}

// ProjectCard.tsx - Project showcase cards
interface ProjectCardProps {
  project: ProjectData;
  featured?: boolean;
}

// SkillCard.tsx - Technology skill cards
interface SkillCardProps {
  skill: TechSkill;
  showRating?: boolean;
}
```

## 🎨 Styling Guidelines

### CSS Variables Configuration

```css
/* src/styles/globals.css */
:root {
  /* Design tokens from main portfolio system - Light Mode */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6; /* Primary blue light */
  --color-primary-600: #2563eb;
  --color-primary-400: #60a5fa; /* Primary blue dark */

  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-border-primary: #e2e8f0;

  /* Typography */
  --font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Menlo', 'Monaco', monospace;

  /* Spacing scale */
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-2xl: 3rem; /* 48px */

  /* Border radius */
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
}

.dark {
  /* Dark mode overrides */
  --color-primary-400: #60a5fa;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #e2e8f0;
  --color-border-primary: #334155;
}

/* Base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-sans);
  background-color: var(--color-background);
  color: var(--color-text-primary);
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
```

### Component Styling Patterns

```typescript
// ✅ Good: Use CSS classes with CSS variables
const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border-primary)',
    borderRadius: 'var(--border-radius-lg)',
    padding: 'var(--spacing-lg)',
    transition: hover ? 'border-color 0.2s ease' : undefined,
  };

  const hoverStyle: React.CSSProperties = hover ? {
    ':hover': {
      borderColor: 'var(--color-primary-400)',
    }
  } : {};

  return (
    <div
      className={`card ${hover ? 'card-hover' : ''} ${className}`}
      style={cardStyle}
    >
      {children}
    </div>
  );
};

// ✅ Good: CSS classes with conditional styling
import clsx from 'clsx';

const Button: React.FC<ButtonProps> = ({ variant, size, disabled, children, ...props }) => {
  return (
    <button
      className={clsx('btn', `btn-${variant}`, `btn-${size}`, {
        'btn-disabled': disabled,
      })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

/* Corresponding CSS */
.btn {
  font-weight: 500;
  border-radius: var(--border-radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  font-family: var(--font-family-sans);
}

.btn-primary {
  background-color: var(--color-primary-500);
  color: white;
}

.btn-primary:hover:not(.btn-disabled) {
  background-color: var(--color-primary-600);
}

.btn-secondary {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
}

.btn-sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: 0.875rem;
}

.btn-md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 1rem;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: 1.125rem;
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## 📊 Data Management

### TypeScript Types

```typescript
// src/types/portfolio.ts
export interface ProfileData {
  basic_info: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    avatar_url?: string;
  };
  work_experience: WorkExperience[];
  projects: ProjectData[];
  tech_stack: TechStack;
  education: Education[];
  interests_hobbies: string[];
  links: SocialLinks;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  key_responsibilities: string[];
  technologies_used: string[];
  achievements?: string[];
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  type: 'work' | 'personal' | 'academic';
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  featured: boolean;
}

export interface TechStack {
  programming_languages: TechSkill[];
  frameworks_libraries: TechSkill[];
  databases: TechSkill[];
  cloud_platforms: TechSkill[];
  devops_tools: TechSkill[];
  other_tools: TechSkill[];
}

export interface TechSkill {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years_experience: number;
  category: string;
}
```

### Data Fetching Hooks

```typescript
// src/hooks/useProfileData.ts
import { useState, useEffect } from 'react';
import { ProfileData } from '../types/portfolio';

export const useProfileData = () => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Fetch from main repository
        const response = await fetch(
          'https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const profileData = await response.json();
        setData(profileData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch profile data'
        );

        // Fallback to local data if available
        try {
          const fallbackData = await import('../data/default.json');
          setData(fallbackData.default);
        } catch {
          console.error('No fallback data available');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { data, loading, error, refetch: () => fetchProfile() };
};
```

### Context for Global State

```typescript
// src/context/PortfolioContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

interface PortfolioState {
  theme: 'light' | 'dark';
  currentPage: string;
  sidebarOpen: boolean;
  profileData: ProfileData | null;
}

type PortfolioAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_CURRENT_PAGE'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_PROFILE_DATA'; payload: ProfileData };

const PortfolioContext = createContext<{
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioAction>;
} | null>(null);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};
```

## 🚀 Performance Guidelines

### Code Splitting

```typescript
// src/pages/index.ts
import { lazy } from 'react';

export const Home = lazy(() => import('./Home'));
export const Experience = lazy(() => import('./Experience'));
export const Projects = lazy(() => import('./Projects'));
export const TechStack = lazy(() => import('./TechStack'));
export const Contact = lazy(() => import('./Contact'));
```

### Image Optimization

```typescript
// src/components/common/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={`${className} transition-opacity duration-300`}
      onLoad={(e) => {
        e.currentTarget.classList.add('opacity-100');
      }}
      onError={(e) => {
        e.currentTarget.src = '/images/placeholder.svg';
      }}
    />
  );
};
```

## 🧪 Testing Guidelines

### Component Testing

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../common/Button';

describe('Button', () => {
  it('renders with correct variant styles', () => {
    render(<Button variant="primary" size="md">Test Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-500');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" size="md" onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Testing

```typescript
// src/utils/accessibility.ts
export const checkAccessibility = async () => {
  const axe = await import('@axe-core/react');

  if (process.env.NODE_ENV === 'development') {
    axe.default(React, ReactDOM, 1000);
  }
};
```

## 📱 Responsive Implementation

### Breakpoint Usage

```typescript
// src/hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('sm');
      else if (width < 768) setBreakpoint('md');
      else if (width < 1024) setBreakpoint('lg');
      else if (width < 1280) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};
```

### Mobile-First Components

```typescript
// Example: Responsive sidebar
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const breakpoint = useBreakpoint();
  const isMobile = ['sm', 'md'].includes(breakpoint);

  const sidebarStyle: React.CSSProperties = {
    position: isMobile ? 'fixed' : 'static',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 50,
    width: '16rem', // 64 * 0.25rem
    backgroundColor: 'var(--color-surface-dark)',
    transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
    transition: 'transform 0.3s ease',
  };

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          style={backdropStyle}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className="sidebar"
        style={sidebarStyle}
      >
        {/* Sidebar content */}
      </aside>
    </>
  );
};
```

## 🔧 Development Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

This React implementation should deliver a modern, performant, and accessible portfolio that showcases both the content and the technical capabilities while maintaining consistency with the overall portfolio ecosystem.
