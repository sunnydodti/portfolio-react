---
mode: agent
---

# Responsive Design Implementation

I need to implement responsive design following our mobile-first approach and ensuring perfect layout across all devices.

**Responsive Strategy**:

- **Mobile-First**: Design starts with mobile (320px+) and scales up
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Single Viewport**: No vertical scrolling on desktop views
- **Flexible Layouts**: Adapt to various screen sizes gracefully

**Layout Behaviors by Breakpoint**:

**Mobile (<768px)**:

- Full-width layout
- Collapsed sidebar with hamburger menu
- Stacked content sections
- Touch-friendly interactive elements (44px minimum)
- Bottom navigation for quick access
- Single-column layouts

**Tablet (768-1023px)**:

- Collapsible sidebar with overlay
- Two-column layouts where appropriate
- Larger touch targets
- Optimized spacing for tablet interaction
- Landscape and portrait orientations

**Desktop (1024px+)**:

- Fixed sidebar navigation (240px width)
- Multi-column layouts
- Hover states and interactions
- Single viewport (all content visible without scrolling)
- Optimal spacing for mouse interaction

**Implementation Requirements**:

**Grid Systems**:

- CSS Grid for complex layouts
- Flexbox for component alignment
- Responsive grid columns (1-col mobile, 2-col tablet, 3-4 col desktop)
- Proper gap and spacing management

**Component Responsiveness**:

- Navigation: Sidebar → Hamburger menu → Bottom nav
- Cards: Full-width → 2-up → 3-up layouts
- Typography: Scaled font sizes per breakpoint
- Images: Responsive sizing and optimization
- Forms: Stack → Side-by-side layouts

**CSS Media Query Implementation**:

```css
/* Mobile-first utility classes */
.responsive-grid {
  @apply grid grid-cols-1 gap-4;
  @apply md:grid-cols-2 md:gap-6;
  @apply lg:grid-cols-3 lg:gap-8;
  @apply xl:grid-cols-4;
}
```

**Testing Requirements**:

- Test all breakpoints thoroughly
- Verify touch interactions on mobile/tablet
- Validate keyboard navigation across devices
- Check content reflow and readability
- Ensure no horizontal scrolling
- Validate single viewport rule on desktop

**Accessibility Considerations**:

- Maintain proper heading hierarchy across layouts
- Ensure touch targets meet minimum size requirements
- Preserve keyboard navigation flow
- Keep focus indicators visible at all breakpoints
- Maintain color contrast at all sizes

**Performance Considerations**:

- Mobile-optimized images and assets
- Progressive enhancement for larger screens
- Efficient CSS delivery
- Touch gesture optimization
- Minimal layout shifts

Please implement responsive design that provides optimal user experience across all devices while maintaining our design system and accessibility standards.
