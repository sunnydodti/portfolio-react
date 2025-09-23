# Project Context Summary - Portfolio React

## 📋 Quick Reference for AI Assistants

This file provides essential context for AI assistants working on the Sunny Dodti React Portfolio project.

---

## 🎯 Project Overview

**Repository**: `portfolio-react` (React implementation of Sunny Dodti's multi-technology portfolio)
**Purpose**: Professional portfolio showcasing software development skills and experience
**Tech Stack**: React 18+ | TypeScript | Vanilla CSS with CSS Variables | Vite | React Router
**Deployment**: github pages/pages.dev (primary domain: sunnydodti.com)

---

## 🏗️ Architecture Summary

### Repository Structure

```
portfolio-react/
├── src/
│   ├── components/          # React components (layout, common, sections)
│   ├── pages/              # Page components (Home, Experience, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript definitions
│   ├── services/           # API & data services
│   └── styles/             # Global styles & theme
├── context/                # Local dev context (gitignored)
│   ├── wireframes/         # Layout structure references (NOT exact design)
│   ├── data/               # JSON data samples
│   └── styles/             # Design system tokens + beautiful palette demo
└── .github/
    ├── instructions/       # Development guidelines
    └── prompts/            # AI assistant prompts
```

### Data Flow

```
Main Repo JSON → Fetch API → React Hooks → Components → UI
     ↓
Context/Local Fallback (for development)
```

---

## 🎨 Design System

### Visual Identity - **STUNNING VISUAL DESIGN**

- **Theme**: Beautiful dark-first design with rich gradients and elegant shadows
- **Color Palette**: Follow gorgeous `/data/styles/pallet-demo-dark-light.html` 
- **Visual Effects**: Rich gradients, layered shadows, smooth animations, micro-interactions
- **Layout**: Modern navigation + scrollable content with smooth transitions
- **Typography**: Inter font family with elegant hierarchy and visual rhythm
- **Interactive Elements**: Sophisticated hover effects, button animations, visual feedback

### Component Patterns - **VISUAL EXCELLENCE**

- **Navigation**: Beautiful sidebar or modern navigation with smooth animations
- **Cards**: Rich design with shadows, gradients, hover effects, visual depth
- **Buttons**: Multiple elegant variants with smooth animations and micro-interactions
- **Hero Section**: Dramatic backgrounds, elegant typography, smooth call-to-actions
- **Projects**: Rich project cards with image overlays and interactive elements
- **Skills**: Beautiful progress indicators, animated elements, visual grouping
- **Scrolling**: Natural scroll experience with section reveal animations
- **Responsive**: Mobile-first with stunning visuals maintained across all breakpoints

---

## 📊 Content Structure

### Page Hierarchy

1. **Home** (`/`) - Hero + stats + skills preview
2. **Experience** (`/experience`) - Work timeline with expandable cards
3. **Projects** (`/projects`) - Featured project grid with tech tags
4. **Tech Stack** (`/tech-stack`) - Categorized skills with ratings
5. **Contact** (`/contact`) - Contact info + social links

### Data Schema

```typescript
interface ProfileData {
  basic_info: PersonalInfo;
  work_experience: WorkExperience[];
  projects: ProjectData[];
  tech_stack: TechStack;
  education: Education[];
  links: SocialLinks;
}
```

---

## 🔧 Development Standards

### Code Quality

- **TypeScript**: Strict mode, no `any` types
- **ESLint**: Configured for React + TypeScript
- **Prettier**: Consistent code formatting
- **Testing**: Vitest + React Testing Library
- **Coverage**: 95%+ target

### Performance Targets

- **Lighthouse**: 95+ score across all metrics
- **Bundle Size**: Optimized with code splitting
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Proper meta tags and structure

### Styling Rules - **VISUAL EXCELLENCE FOCUS**

- **PRIORITY**: Create visually stunning, modern portfolio design
- **Framework**: Vanilla CSS with CSS Variables for rich visual effects
- **Design Source**: Follow beautiful `/data/styles/pallet-demo-dark-light.html` for colors and styling
- **Tokens**: Use design system from `/context/styles/style.json` for consistency
- **Visual Effects**: Rich gradients, elegant shadows, smooth animations, micro-interactions
- **No Hardcoding**: Always use CSS custom properties and semantic classes
- **Scrollable**: Allow natural scrolling with smooth section transitions
- **Responsive**: Mobile-first with stunning visuals maintained across all breakpoints

---

## 📁 Key Files Reference

### Essential Context Files (in `/context/`)

- `wireframes/home.html` - Home page layout reference
- `wireframes/experience.html` - Experience page structure
- `wireframes/projects.html` - Projects grid layout
- `wireframes/tech_stack.html` - Skills categorization
- `wireframes/contact.html` - Contact page design
- `data/default.json` - Complete profile data sample
- `styles/style.json` - Design system tokens & colors

### Configuration Files

- `vite.config.ts` - Build configuration with aliases
- `src/styles/variables.css` - CSS variables setup with design tokens
- `tsconfig.json` - TypeScript strict configuration
- `package.json` - Dependencies and scripts

---

## 🚀 Common Tasks & Patterns

### Creating Components

1. Reference wireframe structure in `/context/wireframes/` (layout only)
2. Define TypeScript interfaces for props
3. Implement using CSS variables and semantic classes
4. Add accessibility attributes
5. Create tests with React Testing Library
6. Document with JSDoc comments

### Data Integration

1. Create custom hooks for API calls
2. Implement fallback to local context data
3. Add loading and error states
4. Type responses with TypeScript interfaces
5. Handle edge cases gracefully

### Styling Implementation

1. Import design tokens from context
2. Use CSS variables and semantic classes
3. Implement responsive behavior
4. Add hover/focus states
5. Ensure dark theme compatibility
6. Test accessibility contrast ratios

---

## ⚠️ Critical Constraints

### Must Follow

- ✅ Wireframe layout structure (not exact design)
- ✅ Beautiful styling from palette demo
- ✅ TypeScript strict typing
- ✅ Accessibility standards
- ✅ Performance targets
- ✅ Design system consistency
- ✅ Single viewport rule (desktop)

### Never Do

- ❌ Hardcode colors or spacing
- ❌ Use `any` TypeScript types
- ❌ Break responsive design
- ❌ Ignore accessibility features
- ❌ Follow wireframe colors/styles exactly (use palette demo instead)
- ❌ Add vertical scrolling on desktop

---

## 🔗 External Dependencies

### Data Sources

- **Primary**: `https://raw.githubusercontent.com/sunnydodti/sunnydodti/refs/heads/dev/data/profiles/default.json`
- **Fallback**: `/context/data/default.json`
- **Styles**: `/context/styles/style.json`

### Related Repositories

- **Main Repo**: `sunnydodti/sunnydodti` (data & wireframes source)
- **Flutter**: `sunnydodti/portfolio-flutter` (sister implementation)
- **Angular**: `sunnydodti/portfolio-angular` (sister implementation)

---

## 📞 Quick Help

### When You Need To...

- **Layout structure**: Check `/context/wireframes/[page].html` for basic structure
- **Beautiful styling**: Follow `/data/styles/pallet-demo-dark-light.html` for colors & design
- **Style a component**: Reference `/context/styles/style.json`
- **Type data structures**: Use `/context/data/default.json` as reference
- **Debug responsiveness**: Test mobile/tablet/desktop breakpoints
- **Check accessibility**: Run axe-core tests and keyboard navigation
- **Optimize performance**: Use React DevTools Profiler

### Common Patterns

- **Fetch data**: Use custom hooks with error/loading states
- **Style components**: CSS variables + semantic classes
- **Handle responsive**: `useBreakpoint` hook + CSS media queries
- **Manage state**: Context API + useReducer for global state
- **Test components**: RTL + user-centric testing approach

---

**Remember**: This React portfolio is part of a larger ecosystem but should work independently. Always maintain consistency with the design system while showcasing React-specific best practices and modern development techniques.

**Last Updated**: September 23, 2025
