---
mode: agent
---

# Component Development

I need to create a new React component based on the wireframe reference.

**Wireframe Reference**: Check `/context/wireframes/[page].html` for the specific section
**Component Requirements**:

- Use TypeScript with strict typing (no `any` types)
- Follow CSS variables and semantic class approach
- Use wireframes for layout structure only (NOT exact styling)
- Follow beautiful design from `/data/styles/pallet-demo-dark-light.html`
- Implement proper responsive behavior
- Include accessibility features (ARIA labels, keyboard navigation)
- Use design tokens from `/context/data/styles/style.json`

**Styling Guidelines**:

- **CRITICAL**: Follow the beautiful palette demo styling, not wireframe colors
- Dark mode: --bg-primary: #0f172a, --primary: #60a5fa, --surface: #1e293b
- Light mode: --bg-primary: #ffffff, --primary: #3b82f6, --surface: #f8fafc
- Use gradients: --gradient-hero, --gradient-card, --gradient-button
- Apply shadows: --shadow-sm, --shadow-md, --shadow-lg for depth
- Responsive breakpoints: mobile (<768px), tablet (768-1023px), desktop (1024px+)
- Single viewport rule (no scrolling on desktop)
- Smooth transitions and hover states with elegant animations

**Component Structure**:

- Proper TypeScript interface for props
- React.FC component declaration
- CSS variables and semantic classes following our design system
- Accessibility attributes
- Error boundaries where appropriate

Please create a component that follows our project standards and matches the wireframe specification exactly.
