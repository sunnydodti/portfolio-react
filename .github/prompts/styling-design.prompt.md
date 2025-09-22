---
mode: agent
---

# Styling and Design System Implementation

I need to implement styling that matches our design system and wireframes.

**Design System Reference**:

- Design tokens in `/context/data/styles/style.json`
- Color palette demo in `/context/styles/pallet-demo-dark-light.html`
- Wireframes in `/context/wireframes/` for layout reference

**Styling Requirements**:

- **Dark Theme Primary**: #1a1a1a background, #2a2a2a surfaces
- **Primary Blue**: #4a90e2 for buttons and interactive elements
- **Text Colors**: #ffffff primary, #ccc secondary
- **Border Colors**: #555 for card borders
- **Spacing**: Use design system tokens for consistent spacing

**Responsive Design**:

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Sidebar collapses on mobile with hamburger menu
- Grid adjustments per breakpoint
- Single viewport rule (no scrolling on desktop)

**Tailwind Configuration**:

- Use utility classes based on design tokens
- Implement CSS custom properties for theme switching
- Follow component styling patterns from our guidelines
- Include hover states and transitions

**Requirements**:

- Match wireframe design exactly
- Use only design system colors (no hardcoded values)
- Implement proper responsive behavior
- Include smooth animations and transitions
- Maintain accessibility standards

Please implement styling that follows our design system and matches the wireframe specifications.
