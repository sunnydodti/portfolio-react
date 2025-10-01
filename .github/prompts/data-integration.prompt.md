---
mode: agent
---

# Data Integration and TypeScript Types

I need to implement data fetching and TypeScript types for portfolio content.

**Data Sources**:

- **Primary**: Remote JSON endpoint from main repository
- **Fallback**: Local context data in `/project-context/data/default.json`
- **Reference**: Profile data structure and samples

**Data Fetching Requirements**:

- Fetch from main repository's JSON endpoints
- Implement proper loading and error states
- Fallback to local context data on failure
- Use React hook pattern for data management
- Handle offline scenarios gracefully

**TypeScript Requirements**:

- **Strict TypeScript**: No `any` types allowed
- Generate types from `/project-context/data/default.json` structure
- Proper interfaces for all data structures
- Optional/required field specifications
- Nested object and array types
- Export interfaces for component props

**Key Data Interfaces Needed**:

- `ProfileData` - Complete profile structure
- `WorkExperience` - Job history items
- `ProjectData` - Project showcase items
- `TechSkill` - Technology skills with proficiency
- `TechStack` - Categorized technology skills
- `SocialLinks` - Social media and contact links

**Hook Implementation**:

- Custom hook for profile data (`useProfileData`)
- Loading, error, and data states
- Automatic retries on failure
- TypeScript return types
- Proper error handling

**Data Flow**:

1. Attempt to fetch from remote endpoint
2. Fall back to local context data if remote fails
3. Provide loading states during fetch
4. Handle errors gracefully with user feedback
5. Cache data appropriately for performance

Please implement data fetching hooks and TypeScript types that follow our strict typing standards and provide robust data handling.
