# Portfolio React - AI Development Prompts

## 🤖 Context Awareness Prompts

Use these prompts when working with AI assistants on the portfolio-react repository to ensure proper context and adherence to project standards.

---

## 📋 Initial Context Prompt

```
I'm working on a React TypeScript portfolio implementation for Sunny Dodti. This is part of a multi-technology portfolio ecosystem. Here's the key context:

**Project**: React implementation of Sunny Dodti's professional portfolio
**Tech Stack**: React 18+, TypeScript, Vanilla CSS with CSS Variables, Vite, React Router
**Design**: Visually stunning modern portfolio with scrollable sections and rich visual effects
**Data Source**: Fetches from main repository's JSON endpoints
**Local Context**: `/context/` folder contains wireframes, data samples, and style guides

**Key Requirements**:
1. **CREATE VISUALLY GORGEOUS DESIGN** - Focus on stunning visual appeal and modern aesthetics
2. Use wireframes in `/project-context/wireframes/` as layout structure reference only (NOT exact design - just building blocks)
3. Follow the beautiful color palette from `/data/styles/pallet-demo-dark-light.html` for actual styling
4. Add rich visual elements: gradients, shadows, animations, micro-interactions
5. Allow natural scrolling with smooth section transitions and animations
6. Use design tokens from `/project-context/data/styles/style.json`
7. Implement TypeScript strictly (no `any` types)
8. Maintain CSS variables and semantic class approach
9. Ensure responsive design (mobile-first)
10. Target Lighthouse score 95+
11. Follow WCAG 2.1 AA accessibility standards

Please help me with [SPECIFIC_TASK] while adhering to these standards.
```

---

## 🏗️ Component Development Prompts

### Creating New Components

```
I need to create a new React component based on the wireframe reference. Here are the details:

**Wireframe Reference**: `/project-context/wireframes/[PAGE_NAME].html` - section `[CSS_SELECTOR]`
**Component Purpose**: [DESCRIPTION]
**Required Props**: [PROP_LIST]
**Styling Requirements**:
- Use CSS variables and semantic classes following our design system
- Dark theme colors from style tokens
- Responsive behavior: [BREAKPOINT_REQUIREMENTS]
- Accessibility features: [A11Y_REQUIREMENTS]

Please create a TypeScript React component that matches the wireframe exactly, includes proper prop types, and follows our styling guidelines.
```

### Refactoring Components

```
I need to refactor an existing component to better match our standards:

**Current Component**: [COMPONENT_PATH]
**Issues**: [LIST_OF_ISSUES]
**Wireframe Reference**: [WIREFRAME_SECTION]
**Requirements**:
- Improve TypeScript types
- Optimize CSS classes and variables
- Enhance accessibility
- Match wireframe design more closely
- Maintain existing functionality

Please refactor this component while preserving all current features.
```

---

## 🎨 Styling & Design Prompts

### Implementing Design System

```
I need to implement styling that matches our design system:

**Design Tokens**: Use colors and spacing from `/project-context/data/styles/style.json`
**Wireframe Section**: [SPECIFIC_WIREFRAME_AREA]
**Requirements**:
- Dark theme primary (#1a1a1a background, #2a2a2a surfaces)
- Primary blue (#4a90e2) for interactive elements
- Proper spacing using design system tokens
- Responsive behavior for mobile/tablet/desktop
- Hover states and transitions

Create CSS classes with variables that implement this design system correctly.
```

### Responsive Design

```
I need to make this component responsive following our mobile-first approach:

**Component**: [COMPONENT_NAME]
**Breakpoints**:
- Mobile (<768px): [MOBILE_BEHAVIOR]
- Tablet (768-1023px): [TABLET_BEHAVIOR]
- Desktop (1024px+): [DESKTOP_BEHAVIOR]

**Layout Requirements**:
- Sidebar collapses on mobile
- Grid adjustments per breakpoint
- Single viewport rule (no scrolling on desktop)

Please implement responsive classes using CSS media queries with our breakpoint system.
```

---

## 📊 Data Integration Prompts

### Data Fetching

```
I need to implement data fetching for portfolio content:

**Data Source**: Main repository endpoint or `/project-context/data/default.json` fallback
**Data Shape**: Based on TypeScript interfaces in `/src/types/portfolio.ts`
**Requirements**:
- Fetch from remote JSON endpoint primarily
- Fallback to local context data
- Proper loading and error states
- TypeScript type safety
- React hook pattern

Please create a custom hook that handles this data fetching pattern.
```

### Type Definitions

```
I need to create/update TypeScript types based on our data structure:

**Data Reference**: `/project-context/data/default.json`
**Requirements**:
- Strict TypeScript interfaces
- No `any` types allowed
- Proper optional/required fields
- Nested object types
- Array element types
- Export interfaces for component props

Generate complete TypeScript type definitions from the JSON structure.
```

---

## 🚀 Performance & Optimization Prompts

### Performance Optimization

```
I need to optimize this React component/feature for performance:

**Target**: [COMPONENT_OR_FEATURE]
**Current Issues**: [PERFORMANCE_ISSUES]
**Requirements**:
- Lighthouse score 95+
- Minimal bundle size
- Efficient re-renders
- Proper code splitting
- Image optimization
- Accessibility maintenance

Please optimize while maintaining all functionality and accessibility features.
```

### Bundle Analysis

```
Help me analyze and optimize the bundle size:

**Current Bundle**: [SIZE_INFO]
**Goals**:
- Reduce initial bundle size
- Implement proper code splitting
- Optimize dependencies
- Lazy load components appropriately

**Constraints**:
- Maintain all current features
- Keep TypeScript strict mode
- Preserve accessibility features

Provide optimization recommendations with implementation details.
```

---

## ♿ Accessibility Prompts

### Accessibility Implementation

```
I need to ensure this component meets WCAG 2.1 AA standards:

**Component**: [COMPONENT_NAME]
**Requirements**:
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels
- Color contrast compliance
- Focus management
- Skip links where appropriate

Please review and enhance the accessibility features while maintaining the visual design.
```

### Accessibility Testing

```
Help me create accessibility tests for this component:

**Component**: [COMPONENT_PATH]
**Testing Requirements**:
- Automated accessibility testing
- Keyboard navigation tests
- Screen reader simulation
- Color contrast validation
- Focus management testing

Provide test code using React Testing Library and axe-core.
```

---

## 🧪 Testing Prompts

### Unit Testing

```
I need comprehensive tests for this React component:

**Component**: [COMPONENT_NAME]
**Testing Requirements**:
- All component props and states
- User interaction scenarios
- Error boundary behavior
- Accessibility features
- Responsive behavior simulation

**Testing Stack**: Vitest + React Testing Library
**Coverage Target**: 95%+

Please create thorough test suites with proper mocking and assertions.
```

### Integration Testing

```
I need integration tests for this feature:

**Feature**: [FEATURE_NAME]
**Test Scenarios**:
- Data fetching and display
- User interactions across components
- Route navigation
- Error handling
- Loading states

Create integration tests that validate the complete user workflows.
```

---

## 🔧 Development Workflow Prompts

### Setup & Configuration

```
I need help setting up/configuring this development tool:

**Tool**: [TOOL_NAME]
**Project Requirements**:
- React 18+ with TypeScript
- CSS variables configuration
- Vite build system
- ESLint + Prettier
- Vitest testing

**Integration Needs**:
- Design token imports
- Context file access
- Proper path aliases
- Development server setup

Please provide complete configuration with explanations.
```

### Debugging Issues

```
I'm encountering this issue in the React portfolio:

**Issue**: [PROBLEM_DESCRIPTION]
**Context**: [RELEVANT_CONTEXT]
**Environment**: [DEV_ENV_DETAILS]
**Expected Behavior**: [WHAT_SHOULD_HAPPEN]
**Actual Behavior**: [WHAT_IS_HAPPENING]

**Project Constraints**:
- Must maintain TypeScript strict mode
- Must follow our component patterns
- Must preserve accessibility features
- Must match wireframe design

Please help diagnose and fix this issue.
```

---

## 📚 Documentation Prompts

### Code Documentation

```
I need to document this component/feature:

**Item**: [COMPONENT_OR_FEATURE]
**Documentation Type**: [JSDoc/README/COMMENTS]
**Requirements**:
- TypeScript prop interfaces
- Usage examples
- Accessibility notes
- Responsive behavior
- Dependencies and context needs

Create comprehensive documentation following our project standards.
```

---

## 🔄 Deployment Prompts

### Build & Deployment

```
I need help with deployment configuration:

**Platform**: github pages/pages.dev
**Requirements**:
- Optimized production build
- Environment variable setup
- Domain configuration (sunny.persist.site)
- Performance optimization
- SEO configuration

**Project Needs**:
- Static generation where possible
- Proper asset optimization
- Error boundary handling

Please provide deployment configuration and optimization recommendations.
```

---

## Usage Instructions

1. **Copy the relevant prompt** for your current task
2. **Fill in the bracketed placeholders** with your specific details
3. **Add any additional context** specific to your situation
4. **Include relevant file paths** from the project
5. **Mention wireframe references** when working on UI components

These prompts ensure AI assistants understand the project context, requirements, and constraints while helping you build a professional, accessible, and performant React portfolio.
