---
applyTo: "**"
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
  "tailwindcss": "^3.2.0",
  "@tailwindcss/typography": "^0.5.0",
  "@tailwindcss/forms": "^0.5.0",
  "framer-motion": "^8.0.0",
  "react-icons": "^4.7.0"
}
```

### Build & Development
```json
{
  "vite": "^4.1.0",
  "@vitejs/plugin-react": "^3.1.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

## 🏗️ Component Architecture

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

### Tailwind Configuration
```typescript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design tokens from main portfolio system
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... rest from style.json
          500: '#3b82f6',  // Primary blue light
          600: '#2563eb',
          // ...
        },
        background: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        surface: {
          light: '#f8fafc',
          dark: '#1e293b',
        },
        text: {
          primary: {
            light: '#0f172a',
            dark: '#f8fafc',
          },
          secondary: {
            light: '#475569',
            dark: '#e2e8f0',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
```

### CSS Custom Properties
```css
/* src/styles/globals.css */
:root {
  /* Light mode colors */
  --color-primary: theme('colors.primary.500');
  --color-background: theme('colors.background.light');
  --color-surface: theme('colors.surface.light');
  --color-text-primary: theme('colors.text.primary.light');
  --color-text-secondary: theme('colors.text.secondary.light');
}

.dark {
  /* Dark mode colors */
  --color-primary: theme('colors.primary.400');
  --color-background: theme('colors.background.dark');
  --color-surface: theme('colors.surface.dark');
  --color-text-primary: theme('colors.text.primary.dark');
  --color-text-secondary: theme('colors.text.secondary.dark');
}
```

### Component Styling Patterns
```typescript
// ✅ Good: Use Tailwind utility classes
const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`
      bg-surface-dark border-2 border-gray-600 rounded-lg p-6
      ${hover ? 'hover:border-primary-400 transition-colors duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// ✅ Good: Conditional styling with clsx
import clsx from 'clsx';

const Button: React.FC<ButtonProps> = ({ variant, size, disabled, children, ...props }) => {
  return (
    <button
      className={clsx(
        'font-medium rounded-md transition-colors duration-200',
        {
          'bg-primary-500 text-white hover:bg-primary-600': variant === 'primary',
          'bg-gray-600 text-white hover:bg-gray-700': variant === 'secondary',
          'border-2 border-primary-500 text-primary-500 hover:bg-primary-50': variant === 'outline',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        {
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
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
          'https://raw.githubusercontent.com/sunnydodti/sunnydodti/main/data/profiles/default.json'
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const profileData = await response.json();
        setData(profileData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile data');
        
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

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gray-900 transform transition-transform duration-300
        ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        lg:translate-x-0
      `}>
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