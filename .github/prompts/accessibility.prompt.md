---
mode: agent
---

# Accessibility Implementation

I need to ensure components meet WCAG 2.1 AA accessibility standards while maintaining the visual design and functionality.

**Accessibility Requirements**:

- **WCAG 2.1 AA Compliance**: All components must meet these standards
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Color Contrast**: Meet contrast ratios for all text and interactive elements
- **Focus Management**: Visible focus indicators and logical tab order
- **Alternative Text**: Descriptive alt text for images and icons

**Implementation Areas**:

**Keyboard Navigation**:

- Tab order follows logical flow
- All interactive elements accessible via keyboard
- Proper focus trapping in modals/dropdowns
- Skip links for main content navigation
- Escape key handling for overlays

**ARIA Implementation**:

- Proper semantic HTML elements
- ARIA labels for complex interactions
- ARIA live regions for dynamic content
- ARIA expanded/collapsed states
- Role attributes where needed

**Visual Accessibility**:

- Color contrast ratios ≥ 4.5:1 for normal text
- Color contrast ratios ≥ 3:1 for large text
- Don't rely solely on color to convey information
- Focus indicators clearly visible
- Text resizable up to 200% without loss of functionality

**Interactive Elements**:

- Buttons vs links used appropriately
- Form labels properly associated
- Error messages clearly announced
- Loading states communicated to screen readers
- Interactive element states (disabled, active, etc.)

**Content Structure**:

- Proper heading hierarchy (h1, h2, h3, etc.)
- Landmark regions (main, nav, aside, etc.)
- Lists marked up correctly
- Tables with proper headers
- Meaningful link text

**Testing Requirements**:

- Automated testing with axe-core
- Manual keyboard navigation testing
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast validation
- Focus management verification

**Design Constraints**:

- Maintain exact wireframe visual design
- Preserve dark theme aesthetic
- Keep all interactive animations
- Follow our component patterns
- Use our design system colors

Please implement accessibility features that meet WCAG 2.1 AA standards while preserving the visual design and user experience of the portfolio.
