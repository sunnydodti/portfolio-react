/* ==========================================================================
   Data Validation Utilities - Validate API responses and data structures
   ========================================================================== */

import type { ProfileData } from '../types';

/* ========================================
   Validation Types
   ======================================== */

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/* ========================================
   Core Validation Functions
   ======================================== */

/**
 * Validate basic profile data structure
 */
export const validateBasicProfile = (profile: unknown): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!profile || typeof profile !== 'object') {
    errors.push('Profile data is missing or not an object');
    return { isValid: false, errors, warnings };
  }

  const p = profile as Record<string, unknown>;

  // Required fields
  if (!p.name || typeof p.name !== 'string') {
    errors.push('Profile name is required and must be a string');
  }

  if (!p.title || typeof p.title !== 'string') {
    errors.push('Profile title is required and must be a string');
  }

  if (!p.email || typeof p.email !== 'string') {
    errors.push('Profile email is required and must be a string');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    warnings.push('Profile email format appears invalid');
  }

  if (!p.location || typeof p.location !== 'string') {
    warnings.push('Profile location is missing');
  }

  return { isValid: errors.length === 0, errors, warnings };
};

/**
 * Validate work experience array
 */
export const validateWorkExperience = (experiences: unknown): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!Array.isArray(experiences)) {
    errors.push('Work experience must be an array');
    return { isValid: false, errors, warnings };
  }

  experiences.forEach((exp, index) => {
    if (!exp || typeof exp !== 'object') {
      errors.push(`Work experience item ${index} is not a valid object`);
      return;
    }

    const e = exp as Record<string, unknown>;

    if (!e.company || typeof e.company !== 'string') {
      errors.push(`Work experience item ${index}: Company name is required`);
    }

    if (!e.position || typeof e.position !== 'string') {
      errors.push(`Work experience item ${index}: Position is required`);
    }

    if (!e.start_date || typeof e.start_date !== 'string') {
      errors.push(`Work experience item ${index}: Start date is required`);
    }

    // Validate date format
    if (e.start_date && typeof e.start_date === 'string') {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(e.start_date)) {
        warnings.push(`Work experience item ${index}: Start date should be in YYYY-MM-DD format`);
      }
    }
  });

  return { isValid: errors.length === 0, errors, warnings };
};

/**
 * Validate projects structure
 */
export const validateProjects = (projects: unknown): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!projects || typeof projects !== 'object') {
    errors.push('Projects data is missing or not an object');
    return { isValid: false, errors, warnings };
  }

  const p = projects as Record<string, unknown>;

  // Check for required project categories
  const requiredCategories = ['work', 'personal', 'academic'];
  requiredCategories.forEach(category => {
    if (!Array.isArray(p[category])) {
      warnings.push(`Projects.${category} should be an array`);
    }
  });

  return { isValid: errors.length === 0, errors, warnings };
};

/**
 * Validate tech stack structure
 */
export const validateTechStack = (techStack: unknown): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!techStack || typeof techStack !== 'object') {
    errors.push('Tech stack data is missing or not an object');
    return { isValid: false, errors, warnings };
  }

  const ts = techStack as Record<string, unknown>;

  // Expected tech stack categories
  const expectedCategories = [
    'programming_languages',
    'frameworks_libraries', 
    'databases',
    'cloud_platforms',
    'development_tools'
  ];

  expectedCategories.forEach(category => {
    if (!Array.isArray(ts[category])) {
      warnings.push(`Tech stack.${category} should be an array`);
    }
  });

  return { isValid: errors.length === 0, errors, warnings };
};

/**
 * Validate complete ProfileData structure
 */
export const validateProfileData = (data: unknown): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data || typeof data !== 'object') {
    errors.push('Profile data is missing or not an object');
    return { isValid: false, errors, warnings };
  }

  const profileData = data as Record<string, unknown>;

  // Validate each section
  if (profileData.profile) {
    const profileResult = validateBasicProfile(profileData.profile);
    errors.push(...profileResult.errors);
    warnings.push(...profileResult.warnings);
  } else {
    errors.push('Basic profile information is missing');
  }

  if (profileData.work_experience) {
    const workResult = validateWorkExperience(profileData.work_experience);
    errors.push(...workResult.errors);
    warnings.push(...workResult.warnings);
  } else {
    warnings.push('Work experience data is missing');
  }

  if (profileData.projects) {
    const projectsResult = validateProjects(profileData.projects);
    errors.push(...projectsResult.errors);
    warnings.push(...projectsResult.warnings);
  } else {
    warnings.push('Projects data is missing');
  }

  if (profileData.tech_stack) {
    const techResult = validateTechStack(profileData.tech_stack);
    errors.push(...techResult.errors);
    warnings.push(...techResult.warnings);
  } else {
    warnings.push('Tech stack data is missing');
  }

  // Log validation results
  if (errors.length > 0) {
    console.error('🚨 Data validation errors:', errors);
  }
  
  if (warnings.length > 0) {
    console.warn('Data validation warnings:', warnings);
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('Data validation passed successfully');
  }

  return { isValid: errors.length === 0, errors, warnings };
};

/**
 * Sanitize and normalize profile data
 */
export const sanitizeProfileData = (data: unknown): ProfileData | null => {
  try {
    const validationResult = validateProfileData(data);
    
    if (!validationResult.isValid) {
      console.error('Cannot sanitize invalid data:', validationResult.errors);
      return null;
    }

    // Type assertion after validation
    const profileData = data as ProfileData;

    // Normalize and clean data
    return {
      ...profileData,
      profile: {
        ...profileData.profile,
        name: profileData.profile.name.trim(),
        title: profileData.profile.title.trim(),
        email: profileData.profile.email.toLowerCase().trim(),
        location: profileData.profile.location?.trim() || '',
      },
    };
  } catch (error) {
    console.error('Error sanitizing profile data:', error);
    return null;
  }
};