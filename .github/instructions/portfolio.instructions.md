---
applyTo: '**'
---

# Portfolio React - Development Guidelines

## 🎯 Project Context

This### Development Approach

1. **Structure First**: Build component layout based on wireframe structure
2. **Visual Excellence**: Apply stunning styling from palette demo with rich visual elements
3. **Polish & Animations**: Add sophisticated animations, micro-interactions, and visual effects
4. **Theme Integration**: Ensure both light/dark modes work beautifully with smooth transitions

## 🎨 Visual Design Excellence Guidelines

### Create Stunning Visual Appeal
The portfolio should be **visually gorgeous** and professional:

#### Hero Section
- **Dramatic Background**: Rich gradients, subtle patterns, or animated backgrounds
- **Typography Hierarchy**: Large, bold, elegant typography with proper spacing
- **Call-to-Action**: Beautifully designed buttons with hover animations
- **Professional Photo**: High-quality avatar with elegant framing/borders

#### Content Sections
- **Rich Cards**: Beautiful card designs with shadows, gradients, and hover effects
- **Visual Hierarchy**: Clear typography scales, proper spacing, visual breathing room
- **Interactive Elements**: Smooth hover states, click animations, visual feedback
- **Section Dividers**: Elegant transitions between sections with visual separators

#### Technology & Skills
- **Beautiful Icons**: High-quality icons with consistent styling
- **Progress Indicators**: Visually appealing skill bars or circular progress indicators
- **Interactive Badges**: Hover effects, animations, and visual grouping
- **Color Coordination**: Consistent color usage that ties into the main palette

#### Projects Showcase
- **Project Cards**: Rich, detailed cards with images, descriptions, and tech stacks
- **Image Galleries**: Beautiful project screenshots with overlay effects
- **Interactive Filters**: Smooth category filtering with animations
- **Detailed Views**: Modal or expansion states with rich content presentation

#### Visual Effects & Polish
- **Smooth Animations**: Page load animations, scroll-triggered effects, hover states
- **Gradient Overlays**: Rich background gradients that enhance readability
- **Shadow Depth**: Layered shadows that create visual depth and hierarchy
- **Micro-interactions**: Button press effects, loading states, visual feedback
- **Scrolling Experience**: Smooth scroll behavior with section reveal animations

## 🏗️ React Architecture Guidelines**React implementation** of Sunny Dodti's multi-technology portfolio system. This repository focuses specifically on delivering a modern, responsive React-based portfolio while maintaining design consistency with other portfolio implementations (Flutter, Angular, Vue, etc.).

## 📊 Portfolio Ecosystem Architecture

### Repository Role

- **Primary Purpose**: React/TypeScript implementation of Sunny Dodti's portfolio
- **Technology Stack**: React 18+, TypeScript, Vanilla CSS with CSS Variables, Vite
- **Target Deployment**: github pages/pages.dev (primary domain: sunnydodti.com)
- **Data Source**: Fetches profile data from main repository's JSON endpoints
- **Layout Reference**: `/context/wireframes/` (structural building blocks - not exact design)
- **Design Reference**: `/data/styles/pallet-demo-dark-light.html` (beautiful color palette and styling)

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
- **Implementation**: CSS custom properties (CSS variables) + vanilla CSS
- **Theme Support**: Light/dark mode switching
- **Consistency Rule**: NEVER hardcode colors - always use design tokens

```css
/* Required: Use CSS variables from design tokens */
:root {
  /* Light mode colors from style.json */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text-primary: #0f172a;
  /* ... other design tokens from style.json */
}

.dark {
  /* Dark mode colors from style.json */
  --color-primary-400: #60a5fa;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text-primary: #f8fafc;
  /* ... other dark mode tokens */
}
```

### Component Standards

- **Stunning Visual Design**: Create a visually gorgeous portfolio using `/data/styles/pallet-demo-dark-light.html`
- **Modern Scrollable Layout**: Allow natural scrolling with beautiful section transitions and visual hierarchy
- **Rich Visual Elements**: Use gradients, shadows, animations, and sophisticated typography
- **Wireframes as Structure**: Use `/context/wireframes/` as layout building blocks (NOT exact design)
- **Dark Theme First**: Default dark theme with smooth light/dark toggle animations
- **Elegant Navigation**: Beautiful modern navigation (sidebar, top nav, or innovative patterns)
- **Visual Polish**: Professional micro-interactions, hover effects, and smooth animations
- **Responsive Beauty**: Stunning appearance across all device sizes
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score 95+

## � Wireframes vs Design Guidelines

### Wireframe Usage (Structure Only)

The wireframes in `/context/wireframes/` are **structural references only**:

- ✅ **Use for**: Layout structure, component placement, content hierarchy
- ✅ **Use for**: Section organization (Hero, Experience, Projects, etc.)
- ✅ **Use for**: Responsive breakpoints and viewport organization
- ❌ **DO NOT use for**: Colors, typography, visual styling, exact spacing

### Actual Design Reference (Beautiful Styling)

Follow `/data/styles/pallet-demo-dark-light.html` for the actual beautiful design:

- ✅ **Use for**: Color palette, gradients, shadows, visual effects
- ✅ **Use for**: Typography hierarchy and text styling
- ✅ **Use for**: Button styles, card designs, component aesthetics
- ✅ **Use for**: Theme switching (light/dark mode)
- ✅ **Use for**: Professional, polished visual appearance

### Development Approach

1. **Structure First**: Build component layout based on wireframe structure
2. **Style Second**: Apply beautiful styling from palette demo
3. **Enhance Third**: Add animations, interactions, and polish
4. **Theme Integration**: Ensure both light/dark modes work perfectly

## �🏗️ React Architecture Guidelines

### Technology Stack

```json
{
  "framework": "React 18+",
  "language": "TypeScript",
  "styling": "Vanilla CSS with CSS Variables",
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
// ✅ Use CSS classes with CSS variables
<div className="background-dark text-primary border-primary">

// ✅ CSS variables for dynamic styling
<div style={{
  backgroundColor: 'var(--color-background)',
  color: 'var(--color-text-primary)',
  border: '1px solid var(--color-border-primary)'
}}>

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
    fetch(
      'https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json'
    )
      .then(res => res.json())
      .then(setProfile);
  }, []);

  return profile;
};
```

## 📱 Responsive Design Requirements

### Responsive Breakpoints

```css
/* Mobile First Approach with CSS Media Queries */
@media (min-width: 640px) {
  /* Small tablets */
}
@media (min-width: 768px) {
  /* Tablets */
}
@media (min-width: 1024px) {
  /* Small desktops */
}
@media (min-width: 1280px) {
  /* Large desktops */
}
@media (min-width: 1536px) {
  /* Extra large screens */
}
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

- **Profile Data**: `https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json`
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
