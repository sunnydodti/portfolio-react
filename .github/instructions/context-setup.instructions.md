---
applyTo: '**'
---

# Context Setup Instructions - Portfolio React

## 🎯 Purpose

The `/context/` folder contains local copies of essential files from the main portfolio repository for independent development. This setup allows the React portfolio to work autonomously while maintaining connection to the broader portfolio ecosystem.

## 📁 Context Directory Structure

```
/context/                           # Local development context (gitignored)
├── wireframes/                    # Layout structure references (NOT exact design)
│   ├── home.html                  # Home layout structure
│   ├── experience.html            # Experience layout structure
│   ├── projects.html              # Projects layout structure
│   ├── tech_stack.html            # Tech stack layout structure
│   └── contact.html               # Contact layout structure
├── data/                          # Data references
│   ├── default.json               # Profile data copy
│   └── sample-responses/          # API response samples
├── styles/                        # Style system references
│   ├── style.json                 # Design system tokens
│   └── pallet-demo-dark-light.html # Beautiful color palette & design reference
└── docs/                          # Development documentation
    ├── wireframe-analysis.md      # Wireframe breakdown
    ├── component-mapping.md       # Component specifications
    └── data-structure.md          # Data schema documentation
```

## 🔄 Context Sync Process

### Initial Setup

Run this setup once when starting development:

```bash
# 1. Create context directory structure
mkdir -p project-context/wireframes
mkdir -p project-context/data/sample-responses
mkdir -p context/styles
mkdir -p context/docs

# 2. Copy wireframes from main repo
cp ../../wireframes/*.html project-context/wireframes/

# 3. Copy data files from main repo
cp ../../../data/profiles/default.json project-context/data/
cp ../../../data/styles/style.json context/styles/

# 4. Copy style demo
cp ../../../data/styles/pallet-demo-dark-light.html context/styles/palette-demo.html
```

### Regular Updates

Update context when main repository changes:

```bash
# Update wireframes (when layout changes)
cp ../../wireframes/*.html project-context/wireframes/

# Update profile data (when content changes)
cp ../../../data/profiles/default.json project-context/data/

# Update design system (when styles change)
cp ../../../data/styles/style.json context/styles/
```

### Automated Sync Script

Create `scripts/sync-context.sh`:

```bash
#!/bin/bash
# Sync context files from main repository

MAIN_REPO="../../../"
WIREFRAMES_DIR="../../wireframes/"
CONTEXT_DIR="./context/"

echo "🔄 Syncing context files from main repository..."

# Sync wireframes
echo "📄 Copying wireframes..."
cp "${WIREFRAMES_DIR}"*.html "${CONTEXT_DIR}wireframes/"

# Sync data
echo "📊 Copying data files..."
cp "${MAIN_REPO}data/profiles/default.json" "${CONTEXT_DIR}data/"
cp "${MAIN_REPO}data/styles/style.json" "${CONTEXT_DIR}styles/"

# Sync style demo
echo "🎨 Copying style references..."
cp "${MAIN_REPO}data/styles/pallet-demo-dark-light.html" "${CONTEXT_DIR}styles/palette-demo.html"

echo "✅ Context sync completed!"
```

## 📋 Context File Usage

### Wireframes (`/project-context/wireframes/`)

**Purpose**: Visual reference for component development

**Usage**:

- Open wireframes in browser for visual reference
- Match component layouts exactly to wireframe structure
- Use wireframes for responsive breakpoint planning
- Reference for dark theme color implementation

**Development Workflow**:

```typescript
// Example: Implementing home page components
// 1. Open project-context/wireframes/home.html in browser
// 2. Identify major sections: sidebar, hero, stats, skills
// 3. Create corresponding React components
// 4. Match styling to wireframe specifications
```

### Data (`/project-context/data/`)

**Purpose**: Development data and schema reference

**Usage**:

```typescript
// Use for TypeScript type generation
interface ProfileData {
  // Generated from project-context/data/default.json structure
}

// Fallback data during development
import fallbackData from '../project-context/data/default.json';

// API response testing
const sampleResponses = {
  profile: require('../project-context/data/sample-responses/profile.json'),
  // Add more samples as needed
};
```

### Styles (`/context/styles/`)

**Purpose**: Design system implementation reference

**Usage**:

```typescript
// Import design tokens
import styleTokens from '../context/styles/style.json';

// Generate CSS variables from tokens
const colors = {
  primary: styleTokens.colors.light_mode.primary,
  background: styleTokens.colors.light_mode.background,
  // ... rest of color mapping
};

// View color palette
// Open context/styles/palette-demo.html for color testing
```

## 🚫 Git Ignore Configuration

Add to `.gitignore`:

```gitignore
# Context files (local development only)
/context/

# Generated from context
/src/types/generated/
/src/styles/tokens.css

# Development artifacts
/temp/
/.vscode/settings.json
```

## 🔧 Development Integration

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@context': path.resolve(__dirname, './context'),
    },
  },
  // Serve context files during development
  server: {
    fs: {
      allow: ['..', './context'],
    },
  },
});
```

### Type Generation from Context

```typescript
// scripts/generate-types.ts
import fs from 'fs';
import path from 'path';

// Generate TypeScript types from project-context/data/default.json
const generateTypesFromData = () => {
  const dataPath = path.join(__dirname, '../project-context/data/default.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // Type generation logic
  const types = generateInterfacesFromObject(data);

  fs.writeFileSync(
    path.join(__dirname, '../src/types/generated/portfolio.ts'),
    types
  );
};
```

### Style Token Integration

```typescript
// scripts/generate-css-tokens.ts
import fs from 'fs';
import path from 'path';

const generateCSSTokens = () => {
  const stylePath = path.join(__dirname, '../context/styles/style.json');
  const styleData = JSON.parse(fs.readFileSync(stylePath, 'utf8'));

  const cssVars = Object.entries(styleData.colors.light_mode)
    .map(([key, value]) => `  --color-${key}: ${value};`)
    .join('\n');

  const cssContent = `
:root {
${cssVars}
}

.dark {
${Object.entries(styleData.colors.dark_mode)
  .map(([key, value]) => `  --color-${key}: ${value};`)
  .join('\n')}
}`;

  fs.writeFileSync(
    path.join(__dirname, '../src/styles/tokens.css'),
    cssContent
  );
};
```

## 📚 Context Documentation

### Component Mapping (`/context/docs/component-mapping.md`)

```markdown
# Component Mapping - Wireframe to React

## Home Page (home.html)

- `.sidebar` → `<Sidebar />` component
- `.hero-section` → `<HeroSection />` component
- `.stats-section` → `<StatsCards />` component
- `.skills-preview` → `<SkillsBadges />` component

## Experience Page (experience.html)

- `.experience-card` → `<ExperienceCard />` component
- `.experience-details` → `<ExperienceDetails />` component
- `.details-tabs` → `<TabNavigation />` component

[Continue for all pages...]
```

### Wireframe Analysis (`/context/docs/wireframe-analysis.md`)

```markdown
# Wireframe Analysis

## Layout Patterns

1. **Sidebar Navigation**: Consistent 240px width across all pages
2. **Dark Theme**: Primary background #1a1a1a, surface #2a2a2a
3. **Single Viewport**: No vertical scrolling on desktop views
4. **Grid Systems**: Various grid layouts per page section

## Color Usage

- Primary Blue: #4a90e2 (buttons, active states)
- Border Color: #555 (card borders)
- Text Primary: #ffffff (main text)
- Text Secondary: #ccc (supporting text)

[Detailed analysis continues...]
```

## 🔄 Workflow Integration

### Development Checklist

- [ ] Context files synced from main repository
- [ ] Wireframes accessible in `/project-context/wireframes/`
- [ ] Data schema understood from `/project-context/data/default.json`
- [ ] Design tokens imported from `/context/styles/style.json`
- [ ] Component mapping documented
- [ ] Type definitions generated from context data

### Regular Maintenance

1. **Weekly**: Sync context files from main repository
2. **Before major features**: Verify wireframe fidelity
3. **After design updates**: Update style tokens and regenerate CSS
4. **Before deployment**: Validate against latest main repository data

The context system ensures the React portfolio can develop independently while maintaining perfect synchronization with the broader portfolio ecosystem.
