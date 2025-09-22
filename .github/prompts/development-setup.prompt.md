---
mode: agent
---

# Development Setup and Configuration

I need help setting up and configuring development tools for the React portfolio project.

**Project Requirements**:

- **Framework**: React 18+ with TypeScript strict mode
- **Build Tool**: Vite with optimized configuration
- **Styling**: Tailwind CSS with design system integration
- **Code Quality**: ESLint + Prettier with strict rules
- **Testing**: Vitest + React Testing Library
- **Development**: Hot reload, fast builds, and debugging support

**Configuration Areas**:

**Vite Configuration**:

- React plugin setup
- TypeScript configuration
- Path aliases (@/, @context/, etc.)
- Development server settings
- Build optimization
- Asset handling
- Environment variables

**TypeScript Setup**:

- Strict mode configuration
- Path mapping for imports
- Type checking for all files
- JSX configuration
- Declaration file generation
- Build targets and module resolution

**Tailwind CSS Integration**:

- Design token imports from `/context/styles/style.json`
- Custom utility generation
- Dark/light theme configuration
- Responsive breakpoint definitions
- Component class patterns
- PurgeCSS optimization

**ESLint + Prettier**:

- React and TypeScript rules
- Import order enforcement
- Accessibility linting (jsx-a11y)
- Code formatting standards
- Custom rule configurations
- Pre-commit hooks

**Testing Setup**:

- Vitest configuration
- React Testing Library setup
- jsdom environment
- Coverage reporting
- Test utilities and mocks
- Accessibility testing integration

**Development Environment**:

- VS Code workspace settings
- Debugging configuration
- Extension recommendations
- Build scripts and commands
- Environment variable handling
- Local development proxy

**File Structure**:

```
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind setup
├── eslint.config.js        # ESLint rules
├── vitest.config.ts        # Test configuration
├── .env.example            # Environment variables
└── .vscode/
    ├── settings.json       # VS Code settings
    └── extensions.json     # Recommended extensions
```

**Integration Requirements**:

- Context file access for wireframes and data
- Design token processing from JSON
- Automatic type generation from data
- Hot reload for all file changes
- Fast build times for development
- Production optimization

**Constraints**:

- Maintain TypeScript strict mode
- Follow our project structure
- Support all required features
- Optimize for development experience
- Ensure production readiness

Please provide complete configuration setup that enables efficient development while maintaining code quality and project standards.
