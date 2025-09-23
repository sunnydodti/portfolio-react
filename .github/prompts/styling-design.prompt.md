---
mode: agent
---

# Styling and Design System Implementation

I need to implement styling that matches our design system and wireframes.

**Design System Reference**:

- **IMPORTANT**: Follow the beautiful design from `/data/styles/pallet-demo-dark-light.html`
- Design tokens in `/context/data/styles/style.json`
- Wireframes in `/context/wireframes/` for layout structure only (NOT colors/styling)

**Styling Requirements**:

- **Follow Palette Demo**: Use the exact beautiful colors from `/data/styles/pallet-demo-dark-light.html`
- **Dark Mode**: --bg-primary: #0f172a, --surface-primary: #1e293b, --primary: #60a5fa
- **Light Mode**: --bg-primary: #ffffff, --surface-primary: #f8fafc, --primary: #3b82f6
- **Gradients**: Use the beautiful gradients from the demo (--gradient-hero, --gradient-card, --gradient-button)
- **Shadows**: Apply the elegant shadows (--shadow-sm, --shadow-md, --shadow-lg)
- **Typography**: Inter font family with proper font weights
- **Spacing**: Use design system tokens for consistent spacing

**Responsive Design**:

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Sidebar collapses on mobile with hamburger menu
- Grid adjustments per breakpoint
- Single viewport rule (no scrolling on desktop)

**CSS Variables Configuration**:

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
