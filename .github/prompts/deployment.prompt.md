---
mode: agent
---

# Build and Deployment Configuration

I need help configuring the build and deployment process for the React portfolio to deploy to static hosting platforms.

**Deployment Targets**:

- **Primary**: Vercel/Netlify for main deployment (sunnydodti.com)
- **Secondary**: GitHub Pages for backup hosting
- **Requirements**: Static site generation, optimized builds, fast CDN delivery

**Build Requirements**:

**Production Optimization**:

- Minimize bundle size through code splitting and tree shaking
- Optimize assets (images, fonts, CSS, JS)
- Generate production-ready builds with Vite
- Implement proper caching strategies
- SEO optimization with meta tags and structured data

**Environment Configuration**:

- Environment variables for different deployment stages
- API endpoint configuration (main repo data URLs)
- Domain and subdomain setup
- SSL certificate configuration
- CDN integration for static assets

**Performance Targets**:

- **Lighthouse Score**: 95+ overall (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Bundle Size**: Initial load <500KB compressed
- **Time to Interactive**: <3s on 3G networks

**Build Process**:

**Static Generation**:

- Pre-build data fetching from main repository
- Static HTML generation for all routes
- Asset optimization and compression
- Sitemap and robots.txt generation
- Service worker for offline capabilities (optional)

**Asset Optimization**:

- Image optimization and responsive images
- Font optimization and preloading
- CSS purging and minification
- JavaScript minification and compression
- SVG optimization for icons

**SEO Configuration**:

- Meta tags for all pages
- Open Graph and Twitter Card tags
- Structured data (JSON-LD) for professional profile
- Canonical URLs and sitemap
- Analytics integration (Google Analytics/Plausible)

**Deployment Configuration**:

**Vercel Setup**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "framework": "vite"
}
```

**Environment Variables**:

- `VITE_API_BASE_URL`: Main repository data endpoint
- `VITE_SITE_URL`: Canonical site URL
- `VITE_ANALYTICS_ID`: Analytics tracking ID
- `NODE_ENV`: Environment setting

**CI/CD Pipeline**:

- Automated builds on git push
- TypeScript type checking in CI
- ESLint and Prettier validation
- Test execution and coverage reports
- Accessibility auditing in CI
- Performance testing integration

**Domain Configuration**:

- Custom domain setup (sunnydodti.com)
- SSL certificate automation
- CDN configuration for global delivery
- Redirect rules (www → non-www, HTTP → HTTPS)
- Subdomain routing if needed

**Monitoring and Analytics**:

- Error tracking and monitoring
- Performance monitoring
- User analytics and behavior tracking
- Core Web Vitals monitoring
- Uptime monitoring

**Backup and Recovery**:

- GitHub Pages as backup deployment
- Automated backup of build artifacts
- Rollback procedures for failed deployments
- Database-free architecture for reliability

**Security Considerations**:

- Content Security Policy (CSP) headers
- HTTPS enforcement
- Secure headers configuration
- XSS and injection protection
- Asset integrity verification

**Requirements**:

- Maintain all functionality in static build
- Preserve performance optimizations
- Include proper error handling for production
- Implement graceful degradation for network issues
- Support progressive enhancement

Please provide complete build and deployment configuration that achieves our performance targets while ensuring reliable, secure, and scalable hosting.
