---
mode: agent
---

# Performance Optimization

I need to optimize React components and features for maximum performance while maintaining functionality and accessibility.

**Performance Targets**:

- **Lighthouse Score**: 95+ overall
- **Bundle Size**: Minimal initial load
- **Runtime Performance**: Efficient re-renders
- **Loading Speed**: Fast initial paint and interactivity
- **Accessibility**: Maintain WCAG 2.1 AA compliance

**Optimization Areas**:

**Code Splitting**:

- Lazy load page components
- Dynamic imports for heavy features
- Route-based code splitting
- Component-level splitting where appropriate

**Bundle Optimization**:

- Analyze and reduce bundle size
- Tree shake unused dependencies
- Optimize import statements
- Use production builds effectively

**React Performance**:

- Optimize component re-renders with React.memo
- Use useCallback and useMemo appropriately
- Implement proper key props for lists
- Avoid unnecessary state updates

**Asset Optimization**:

- Image optimization and lazy loading
- SVG optimization for icons
- Font loading optimization
- CSS purging and minification

**Runtime Optimization**:

- Efficient event handlers
- Debounce/throttle user interactions
- Virtual scrolling for large lists
- Proper cleanup in useEffect hooks

**Constraints**:

- Maintain all current features and functionality
- Preserve TypeScript strict mode
- Keep accessibility features intact
- Maintain wireframe design fidelity
- Follow our component patterns

**Measurement Tools**:

- Lighthouse auditing
- Bundle analyzer
- React DevTools Profiler
- Performance monitoring

Please provide optimization recommendations and implementations that achieve our performance targets while maintaining code quality and user experience.
