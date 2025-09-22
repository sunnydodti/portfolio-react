---
mode: agent
---

# Component Development

I need to create a new React component based on the wireframe reference.

**Wireframe Reference**: Check `/context/wireframes/[page].html` for the specific section
**Component Requirements**:

- Use TypeScript with strict typing (no `any` types)
- Follow Tailwind utility-first approach
- Match wireframe design exactly
- Implement proper responsive behavior
- Include accessibility features (ARIA labels, keyboard navigation)
- Use design tokens from `/context/data/styles/style.json`

**Styling Guidelines**:

- Dark theme colors: background #1a1a1a, surfaces #2a2a2a
- Primary blue #4a90e2 for interactive elements
- Responsive breakpoints: mobile (<768px), tablet (768-1023px), desktop (1024px+)
- Single viewport rule (no scrolling on desktop)
- Hover states and smooth transitions

**Component Structure**:

- Proper TypeScript interface for props
- React.FC component declaration
- Tailwind classes following our design system
- Accessibility attributes
- Error boundaries where appropriate

Please create a component that follows our project standards and matches the wireframe specification exactly.
