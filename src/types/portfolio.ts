/* ==========================================================================
   Core Portfolio Data Types
   ========================================================================== */

/**
 * Main profile interface representing the complete portfolio data structure
 */
export interface ProfileData {
  profile: BasicProfile;
  links: SocialLinks;
  work_experience: WorkExperience[];
  projects: ProjectsCollection;
  tech_stack: TechStack;
  education: Education[];
  certifications: Certification[];
  awards: Award[];
  testimonials: Testimonial[];
  references: Reference[];
  interests_hobbies: InterestsHobbies;
  social_media: SocialMedia;
  preferences: Preferences;
  metadata: Metadata;
}

/* ========================================
   Profile & Personal Information
   ======================================== */

/**
 * Basic profile information
 */
export interface BasicProfile {
  name: string;
  title: string;
  about: string;
  location: string;
  email: string;
  phone: string | null;
}

/**
 * Social media and professional links
 */
export interface SocialLinks {
  website: string;
  portfolio: string;
  resume: string;
  github: string;
  linkedin: string;
}

/**
 * Extended social media links
 */
export interface ExtendedSocialLinks extends SocialLinks {
  twitter: string;
  youtube: string;
  instagram: string;
  facebook: string;
  medium: string;
  dev_to: string;
  hashnode: string;
  stackoverflow: string;
  discord: string;
  telegram: string;
}

/* ========================================
   Work Experience Types
   ======================================== */

/**
 * Work experience entry
 */
export interface WorkExperience {
  id: number;
  company: string;
  website: string;
  position: string;
  location: string;
  start_date: string; // ISO date string (YYYY-MM-DD)
  end_date: string; // empty string if current position
  current: boolean;
  description: string;
  responsibilities: string; // Changed from array to string based on API
  achievements: string; // Changed from array to string based on API
  awards: string; // Changed from number[] to string based on API
  tech_stack: WorkTechStack;
  projects: string; // Changed from array to string based on API
}

/**
 * Technology stack for work experience
 */
export interface WorkTechStack {
  programming_languages?: string[];
  frontend?: string[];
  backend?: string[];
  databases?: string[];
  cloud?: CloudProvider[];
  tools?: string[];
}

/**
 * Cloud provider with services
 */
export interface CloudProvider {
  provider: string;
  services: string[];
}

/* ========================================
   Projects Types
   ======================================== */

/**
 * Complete projects collection with categorization
 */
export interface ProjectsCollection {
  types: ProjectType[];
  academic: Project[];
  work: Project[];
  personal: Project[];
  open_source: Project[];
}

/**
 * Project type definition
 */
export interface ProjectType {
  type: 'personal' | 'work' | 'open-source' | 'academic';
  identifier: string;
  example: {
    id: string;
  };
}

/**
 * Individual project
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  details: string[];
  start: string; // YYYY-MM format
  end: string | null; // null if ongoing
  status: ProjectStatus;
  tech_stack: string[];
  availability?: ProjectAvailability[];
  links: ProjectLinks;
}

/**
 * Project status
 */
export type ProjectStatus = 'completed' | 'ongoing' | 'planned' | 'paused';

/**
 * Project availability platforms
 */
export type ProjectAvailability = 'Android' | 'iOS' | 'Web' | 'Windows' | 'macOS' | 'Linux';

/**
 * Project links
 */
export interface ProjectLinks {
  repository: string;
  documentation: string;
  demo: string;
  download?: string;
}

/* ========================================
   Technology Stack Types
   ======================================== */

/**
 * Complete technology stack categorized by domain
 */
export interface TechStack {
  ai: string[];
  programming_languages: string[];
  frameworks_libraries: string[];
  databases: string[];
  cloud_platforms: string[];
  development_tools: string[];
  version_control: string[];
  operating_systems: string[];
  other_technologies: string[];
}

/**
 * Individual technology skill with proficiency
 */
export interface TechSkill {
  name: string;
  category: TechCategory;
  proficiency: SkillProficiency;
  years_experience?: number;
  description?: string;
}

/**
 * Technology categories
 */
export type TechCategory = 
  | 'ai'
  | 'programming_languages'
  | 'frameworks_libraries'
  | 'databases'
  | 'cloud_platforms'
  | 'development_tools'
  | 'version_control'
  | 'operating_systems'
  | 'other_technologies';

/**
 * Skill proficiency levels
 */
export type SkillProficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/* ========================================
   Education Types
   ======================================== */

/**
 * Educational background
 */
export interface Education {
  id: number;
  institution: string;
  website: string;
  degree: string;
  field_of_study: string;
  location: string;
  completed_year: string;
  score: string;
  relevant_coursework: string[];
  achievements: string[];
  projects: string[];
}

/* ========================================
   Awards & Recognition
   ======================================== */

/**
 * Awards and recognition
 */
export interface Award {
  id: number;
  title: string;
  date: string; // ISO date string
  issuing_organization: string;
  description: string;
  category: string;
  link: string;
  social_media_posts: string;
}

/**
 * Award categories
 */
export type AwardCategory = 
  | 'academic'
  | 'professional'
  | 'certification'
  | 'competition'
  | 'recognition'
  | 'achievement';

/* ========================================
   Additional Data Types
   ======================================== */

/**
 * Certification information
 */
export interface Certification {
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date: string;
  credential_id: string;
  verification_link: string;
  description: string;
}

/**
 * Testimonial information
 */
export interface Testimonial {
  name: string;
  position: string;
  company: string;
  relationship: string;
  text: string;
  date: string;
  permission_to_contact: boolean;
}

/**
 * Reference information
 */
export interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
  years_known: string;
  permission_granted: boolean;
}

/**
 * Interests and hobbies
 */
export interface InterestsHobbies {
  professional_interests: string[];
  personal_hobbies: string[];
  volunteer_work: string[];
  community_involvement: string[];
}

/**
 * Social media links
 */
export interface SocialMedia {
  twitter: string;
  instagram: string;
  facebook: string;
  youtube: string;
  medium: string;
  dev_to: string;
  hashnode: string;
  stackoverflow: string;
  discord: string;
  telegram: string;
}

/* ========================================
   Preferences & Settings
   ======================================== */

/**
 * User preferences and career settings
 */
export interface Preferences {
  work_type: WorkType;
  employment_type: EmploymentType;
  preferred_technologies: string[];
  career_goals: string;
  availability: boolean;
}

/**
 * Work arrangement preferences
 */
export type WorkType = 'remote' | 'hybrid' | 'on-site' | 'flexible';

/**
 * Employment type preferences
 */
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'freelance';

/* ========================================
   Metadata Types
   ======================================== */

/**
 * Portfolio metadata
 */
export interface Metadata {
  version: string;
  last_updated: string; // ISO date string
  profile_type: string;
  visibility: 'public' | 'private' | 'restricted';
  template_version: string;
}

/* ========================================
   API Response Types
   ======================================== */

/**
 * API response wrapper for profile data
 */
export interface ApiResponse<T = ProfileData> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

/**
 * Error response from API
 */
export interface ApiError {
  status: 'error';
  message: string;
  code?: string | number;
  details?: Record<string, unknown>;
  timestamp: string;
}

/* ========================================
   UI State Types
   ======================================== */

/**
 * Loading states for data fetching
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastFetched?: string;
}

/**
 * Portfolio page navigation
 */
export type PageRoute = 
  | 'home'
  | 'experience'
  | 'projects'
  | 'tech-stack'
  | 'contact';

/**
 * Theme preferences
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Portfolio context state
 */
export interface PortfolioState {
  profile: ProfileData | null;
  loading: LoadingState;
  theme: ThemeMode;
  currentPage: PageRoute;
  sidebarOpen: boolean;
}

/* ========================================
   Component Prop Types
   ======================================== */

/**
 * Common component props
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Props for components that handle loading states
 */
export interface LoadableProps extends BaseComponentProps {
  loading?: boolean;
  error?: string | null;
}

/**
 * Props for interactive components
 */
export interface InteractiveProps extends BaseComponentProps {
  disabled?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

/* ========================================
   Filter & Search Types
   ======================================== */

/**
 * Project filters
 */
export interface ProjectFilters {
  type?: ProjectType['type'];
  status?: ProjectStatus;
  technology?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

/**
 * Technology filters
 */
export interface TechFilters {
  category?: TechCategory;
  proficiency?: SkillProficiency;
  searchTerm?: string;
}

/**
 * Experience filters
 */
export interface ExperienceFilters {
  company?: string;
  technology?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

/* ========================================
   Utility Types
   ======================================== */

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract specific project type from projects collection
 */
export type ProjectsByType<T extends ProjectType['type']> = 
  T extends 'academic' ? ProjectsCollection['academic'] :
  T extends 'work' ? ProjectsCollection['work'] :
  T extends 'personal' ? ProjectsCollection['personal'] :
  T extends 'open-source' ? ProjectsCollection['open_source'] :
  never;

/**
 * Omit specific fields from type
 */
export type WithoutId<T> = Omit<T, 'id'>;

/**
 * Make specific fields required
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Portfolio data with computed fields
 */
export interface EnhancedProfileData extends ProfileData {
  computed: {
    totalExperience: number; // years
    currentRole: WorkExperience | null;
    featuredProjects: Project[];
    topTechnologies: string[];
    recentUpdates: string[];
  };
}