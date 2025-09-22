---
applyTo: "**"
---

# Portfolio React - Development Guidelines

## 🎯 Project Context

This is the **React implementation** of Sunny Dodti's multi-technology portfolio system. This repository focuses specifically on delivering a modern, responsive React-based portfolio while maintaining design consistency with other portfolio implementations (Flutter, Angular, Vue, etc.).

## 📊 Portfolio Ecosystem Architecture

### Repository Role
- **Primary Purpose**: React/TypeScript implementation of Sunny Dodti's portfolio
- **Technology Stack**: React 18+, TypeScript, Tailwind CSS, Vite
- **Target Deployment**: github pages/pages.dev (primary domain: sunnydodti.com)
- **Data Source**: Fetches profile data from main repository's JSON endpoints
- **Design Reference**: `/context/wireframes/` (local copies of wireframes for development)

### Connection to Main Portfolio System
```
sunnydodti (main repo)
├── /data/profiles/default.json        # Source of truth for profile data
├── /data/styles/style.json           # Design system & color palette
├── /portfolio/wireframes/            # Master wireframes
└── /portfolio/portfolio-react/       # THIS REPOSITORY
    ├── /context/                     # Local development context (gitignored)
    │   ├── /wireframes/             # Copied wireframes for reference
    │   ├── /data/                   # Local data copies for development
    │   └── /styles/                 # Local style references
    └── /src/                        # React application source
```

## 🎨 Design System Implementation

### Color Palette & Theming
- **Primary Source**: Main repo `/data/styles/style.json`
- **Implementation**: CSS custom properties + Tailwind config
- **Theme Support**: Light/dark mode switching
- **Consistency Rule**: NEVER hardcode colors - always use design tokens

```typescript
// Required: Use design tokens from main portfolio system
const theme = {
  colors: {
    primary: {
      light: '#3b82f6',  // From style.json
      dark: '#60a5fa'
    },
    background: {
      light: '#ffffff',
      dark: '#0f172a'
    }
    // ... other colors from style.json
  }
}
```

### Component Standards
- **Dark Theme First**: Default dark theme matching reference design
- **Sidebar Navigation**: Left sidebar layout as per wireframes
- **Single Viewport**: All content visible without scrolling (responsive)
- **Wireframe Fidelity**: Match `/context/wireframes/` layouts exactly
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score 95+

## 🏗️ React Architecture Guidelines

### Technology Stack
```json
{
  "framework": "React 18+",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "build": "Vite",
  "routing": "React Router v6",
  "state": "Context API + useReducer",
  "icons": "React Icons",
  "animations": "Framer Motion",
  "deployment": "Static PPages"
}
```

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Card, etc.)
│   ├── layout/          # Layout components (Sidebar, Header, etc.)
│   └── sections/        # Page sections (Hero, Experience, etc.)
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Experience.tsx  # Work experience
│   ├── Projects.tsx    # Project showcase
│   ├── TechStack.tsx   # Skills & technologies
│   └── Contact.tsx     # Contact information
├── hooks/              # Custom React hooks
├── services/           # API services & data fetching
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # Global styles & theme
└── data/               # Local data (development only)
```

### Component Development Rules

#### 1. Component Naming & Structure
```typescript
// ✅ Good: Clear naming and proper typing
interface HeroSectionProps {
  profile: ProfileData;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  profile, 
  onContactClick 
}) => {
  return (
    <section className="hero-section">
      {/* Component content */}
    </section>
  );
};
```

#### 2. Styling Guidelines
```typescript
// ✅ Use Tailwind classes based on design tokens
<div className="bg-background-dark text-text-primary border-border-primary">
  
// ✅ Custom styles for complex layouts
<div className="sidebar-layout">
  
// ❌ Never hardcode colors
<div style={{ backgroundColor: '#1a1a1a' }}>
```

#### 3. Data Fetching
```typescript
// ✅ Fetch from main repository endpoints
const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
  useEffect(() => {
    // Fetch from main repo's JSON endpoint
    fetch('https://raw.githubusercontent.com/sunnydodti/sunnydodti/main/data/profiles/default.json')
      .then(res => res.json())
      .then(setProfile);
  }, []);
  
  return profile;
};
```

## 📱 Responsive Design Requirements

### Breakpoints (Tailwind)
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
```

### Layout Specifications
- **Desktop (1024px+)**: Sidebar + main content layout
- **Tablet (768-1023px)**: Collapsible sidebar with hamburger menu
- **Mobile (<768px)**: Full-width layout with bottom navigation
- **Single Viewport Rule**: All content fits without vertical scrolling on desktop

## 🚀 Development Workflow

### Local Development Setup
1. **Context Sync**: Copy wireframes and data to `/context/` folder
2. **Environment Setup**: Configure Vite with proper proxy settings
3. **Theme Implementation**: Set up CSS custom properties from style.json
4. **Component Development**: Build components matching wireframes exactly
5. **Data Integration**: Connect to main repository's JSON endpoints
6. **Testing**: Cross-browser testing and accessibility validation

### File Dependencies
```bash
# Required context files (copied from main repo)
/context/wireframes/home.html           # Home page wireframe reference
/context/wireframes/experience.html     # Experience page wireframe
/context/wireframes/projects.html       # Projects page wireframe
/context/wireframes/tech_stack.html     # Tech stack wireframe
/context/wireframes/contact.html        # Contact page wireframe
/context/data/default.json             # Profile data copy (development)
/context/styles/style.json             # Design system reference
```

## 📋 Page Implementation Checklist

### Home Page (`/`)
- [ ] Sidebar with profile picture and navigation
- [ ] Hero section with name, title, and description
- [ ] Stats cards (experience years, current organization)
- [ ] Skills badges grid (top technologies)
- [ ] Social media links integration
- [ ] Dark theme implementation

### Experience Page (`/experience`)
- [ ] Work experience timeline
- [ ] Expandable company cards
- [ ] Key responsibilities tabs
- [ ] Technology stack per role
- [ ] Company logos and links
- [ ] Professional achievements

### Projects Page (`/projects`)
- [ ] Featured projects grid (2x2 layout)
- [ ] Project cards with descriptions
- [ ] Technology tags per project
- [ ] GitHub and live demo links
- [ ] Project filtering capabilities
- [ ] Hover animations

### Tech Stack Page (`/tech-stack`)
- [ ] Category tabs (Frontend, Backend, Database, DevOps, Cloud, Domain)
- [ ] Skill cards with proficiency ratings
- [ ] Years of experience per technology
- [ ] Interactive category switching
- [ ] Skill search and filtering

### Contact Page (`/contact`)
- [ ] "Let's Connect" hero section
- [ ] Email and location cards
- [ ] Social media integration
- [ ] Contact form (optional)
- [ ] Hire me call-to-action
- [ ] Professional networking links

## 🎯 Success Criteria

### Technical Requirements
- [ ] TypeScript strict mode enabled
- [ ] Zero ESLint warnings/errors
- [ ] 100% component type coverage
- [ ] Responsive design at all breakpoints
- [ ] Lighthouse performance score 95+
- [ ] Accessibility score 100%
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)

### Design Requirements
- [ ] Perfect wireframe fidelity
- [ ] Consistent dark theme implementation
- [ ] Smooth animations and transitions
- [ ] Professional typography and spacing
- [ ] Color scheme matching main portfolio system
- [ ] Interactive elements with proper feedback

### Data Requirements
- [ ] Real data integration from main repository
- [ ] Fallback handling for data loading states
- [ ] Error boundaries for robust error handling
- [ ] Offline-first capabilities (optional)
- [ ] SEO optimization with proper meta tags

## 🔗 Integration Points

### Main Repository Dependencies
- **Profile Data**: `https://raw.githubusercontent.com/sunnydodti/sunnydodti/main/data/profiles/default.json`
- **Style System**: Reference main repo's `/data/styles/style.json`
- **Wireframes**: Local copies in `/context/wireframes/`
- **Assets**: Shared images and icons from main repository

### Cross-Portfolio Consistency
- Same color palette across all technology implementations
- Consistent navigation structure and user experience
- Unified content and messaging
- Shared social media links and contact information
- Coordinated deployment and domain strategy

## 📞 Development Support

### Context Files Location
All development context files are stored in `/context/` directory:
- Wireframes for visual reference
- Data samples for development
- Style guides and design tokens
- Component specifications

### Best Practices
1. **Always refer to wireframes** before implementing components
2. **Use TypeScript strictly** - no `any` types allowed
3. **Follow accessibility guidelines** - proper ARIA labels and keyboard navigation
4. **Test responsive behavior** at all breakpoints
5. **Maintain performance** - lazy loading, code splitting, optimized builds
6. **Document component props** and usage patterns

Remember: This React portfolio is part of a larger multi-technology ecosystem. Maintain consistency while showcasing React-specific strengths and modern web development practices.