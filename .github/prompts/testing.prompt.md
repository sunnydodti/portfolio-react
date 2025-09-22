---
mode: agent
---

# Testing Implementation

I need comprehensive testing for React components and features to ensure reliability and maintainability.

**Testing Stack**:

- **Framework**: Vitest
- **React Testing**: React Testing Library
- **Accessibility**: @axe-core/react
- **Coverage Target**: 95%+
- **TypeScript**: Full type safety in tests

**Testing Categories**:

**Unit Testing**:

- Component rendering with various props
- User interaction scenarios (clicks, form inputs, keyboard)
- State changes and side effects
- Error boundary behavior
- Conditional rendering logic
- Hook functionality and edge cases

**Integration Testing**:

- Data fetching and display workflows
- User interactions across multiple components
- Route navigation and state persistence
- Error handling across component boundaries
- Loading states and data synchronization

**Accessibility Testing**:

- Automated accessibility auditing with axe-core
- Keyboard navigation workflows
- Screen reader compatibility
- Color contrast validation
- Focus management testing
- ARIA attribute verification

**Performance Testing**:

- Component render performance
- Bundle size impact
- Memory leak detection
- Interaction responsiveness
- Large dataset handling

**Visual Regression Testing**:

- Component appearance consistency
- Responsive behavior verification
- Theme switching validation
- Animation and transition testing

**Test Patterns**:

**Component Tests**:

- Render with required props
- Test all prop variations
- User event simulation
- State and effect testing
- Error scenarios
- Accessibility checks

**Hook Tests**:

- Custom hook functionality
- Dependency array behavior
- Cleanup functions
- Error handling
- Loading states
- Data transformation

**Integration Tests**:

- End-to-end user workflows
- API integration scenarios
- Route navigation testing
- Context provider testing
- Error boundary integration

**Requirements**:

- Follow React Testing Library best practices
- Test behavior, not implementation details
- Include accessibility assertions
- Maintain test performance
- Provide clear test descriptions
- Mock external dependencies appropriately

**Coverage Goals**:

- Statements: 95%+
- Branches: 90%+
- Functions: 95%+
- Lines: 95%+

Please create comprehensive test suites that validate functionality, accessibility, and user experience while following testing best practices.
