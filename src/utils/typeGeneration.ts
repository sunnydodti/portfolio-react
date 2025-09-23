/* ==========================================================================
   Type Generation Utilities - Generate TypeScript types from JSON data
   ========================================================================== */

import type { ProfileData } from '../types';

/* ========================================
   Type Analysis Functions
   ======================================== */

/**
 * Analyze JSON data structure and generate TypeScript interface suggestions
 */
export const analyzeDataStructure = (data: unknown, interfaceName: string = 'GeneratedInterface'): string => {
  if (data === null || data === undefined) {
    return `${interfaceName}: null | undefined`;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return `${interfaceName}: unknown[]`;
    }
    
    // Analyze first few items to determine array type
    const sampleItem = data[0];
    const itemType = analyzeDataStructure(sampleItem, 'ArrayItem');
    return `${interfaceName}: (${itemType})[]`;
  }

  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    const properties: string[] = [];
    
    Object.entries(obj).forEach(([key, value]) => {
      const valueType = getTypeString(value);
      const isOptional = value === null || value === undefined;
      const propertyName = isValidPropertyName(key) ? key : `"${key}"`;
      properties.push(`  ${propertyName}${isOptional ? '?' : ''}: ${valueType};`);
    });
    
    return `interface ${interfaceName} {\n${properties.join('\n')}\n}`;
  }

  return `${interfaceName}: ${getTypeString(data)}`;
};

/**
 * Get TypeScript type string for a value
 */
const getTypeString = (value: unknown): string => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'unknown[]';
    
    // Check if all items are the same type
    const firstType = typeof value[0];
    const allSameType = value.every(item => typeof item === firstType);
    
    if (allSameType) {
      return `${firstType}[]`;
    } else {
      // Mixed types in array
      const types = [...new Set(value.map(item => typeof item))];
      return `(${types.join(' | ')})[]`;
    }
  }
  
  const type = typeof value;
  if (type === 'object') {
    return '{ [key: string]: unknown }'; // Generic object
  }
  
  return type;
};

/**
 * Check if a string is a valid TypeScript property name
 */
const isValidPropertyName = (name: string): boolean => {
  // Valid TypeScript identifier regex
  const identifierRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
  return identifierRegex.test(name) && !isReservedWord(name);
};

/**
 * Check if a word is a TypeScript reserved word
 */
const isReservedWord = (word: string): boolean => {
  const reserved = [
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
    'default', 'delete', 'do', 'else', 'enum', 'export', 'extends',
    'false', 'finally', 'for', 'function', 'if', 'import', 'in',
    'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this',
    'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with'
  ];
  
  return reserved.includes(word);
};

/* ========================================
   Data Schema Generation
   ======================================== */

/**
 * Generate TypeScript interfaces from ProfileData JSON
 */
export const generateProfileDataTypes = (data: ProfileData): string => {
  const interfaces: string[] = [];
  
  // Generate basic profile interface
  if (data.profile) {
    const profileInterface = analyzeDataStructure(data.profile, 'BasicProfile');
    interfaces.push(profileInterface);
  }
  
  // Generate work experience interface
  if (data.work_experience && data.work_experience.length > 0) {
    const workInterface = analyzeDataStructure(data.work_experience[0], 'WorkExperience');
    interfaces.push(workInterface);
  }
  
  // Generate projects interface
  if (data.projects) {
    const projectsInterface = analyzeDataStructure(data.projects, 'ProjectsCollection');
    interfaces.push(projectsInterface);
    
    // Generate specific project interfaces
    if (data.projects.work && data.projects.work.length > 0) {
      const workProjectInterface = analyzeDataStructure(data.projects.work[0], 'WorkProject');
      interfaces.push(workProjectInterface);
    }
    
    if (data.projects.personal && data.projects.personal.length > 0) {
      const personalProjectInterface = analyzeDataStructure(data.projects.personal[0], 'PersonalProject');
      interfaces.push(personalProjectInterface);
    }
  }
  
  // Generate tech stack interface
  if (data.tech_stack) {
    const techStackInterface = analyzeDataStructure(data.tech_stack, 'TechStack');
    interfaces.push(techStackInterface);
  }
  
  // Main ProfileData interface
  const mainInterface = analyzeDataStructure(data, 'ProfileData');
  interfaces.unshift(mainInterface);
  
  return interfaces.join('\n\n');
};

/* ========================================
   Development Utilities
   ======================================== */

/**
 * Log data structure analysis to console (for development)
 */
export const logDataStructure = (data: ProfileData): void => {
  console.group('📋 Data Structure Analysis');
  
  console.log('🔍 Profile Data Keys:', Object.keys(data));
  
  if (data.profile) {
    console.log('👤 Profile Keys:', Object.keys(data.profile));
  }
  
  if (data.work_experience) {
    console.log('💼 Work Experience Count:', data.work_experience.length);
    if (data.work_experience.length > 0) {
      console.log('💼 Work Experience Keys:', Object.keys(data.work_experience[0]));
    }
  }
  
  if (data.projects) {
    console.log('🚀 Project Categories:', Object.keys(data.projects));
    Object.entries(data.projects).forEach(([category, projects]) => {
      if (Array.isArray(projects)) {
        console.log(`  📁 ${category}: ${projects.length} projects`);
      }
    });
  }
  
  if (data.tech_stack) {
    console.log('🛠️ Tech Stack Categories:', Object.keys(data.tech_stack));
    Object.entries(data.tech_stack).forEach(([category, technologies]) => {
      if (Array.isArray(technologies)) {
        console.log(`  ⚙️ ${category}: ${technologies.length} items`);
      }
    });
  }
  
  console.groupEnd();
};

/**
 * Validate data against expected schema
 */
export const compareWithExpectedSchema = (data: ProfileData): {
  missing: string[];
  extra: string[];
  typeMismatches: string[];
} => {
  const expectedKeys = [
    'profile',
    'links', 
    'work_experience',
    'projects',
    'tech_stack',
    'education',
    'awards',
    'social_media',
    'preferences',
    'metadata'
  ];
  
  const actualKeys = Object.keys(data);
  
  const missing = expectedKeys.filter(key => !actualKeys.includes(key));
  const extra = actualKeys.filter(key => !expectedKeys.includes(key));
  const typeMismatches: string[] = [];
  
  // Check specific type expectations
  if (data.work_experience && !Array.isArray(data.work_experience)) {
    typeMismatches.push('work_experience should be an array');
  }
  
  if (data.projects && typeof data.projects !== 'object') {
    typeMismatches.push('projects should be an object');
  }
  
  if (data.tech_stack && typeof data.tech_stack !== 'object') {
    typeMismatches.push('tech_stack should be an object');
  }
  
  return { missing, extra, typeMismatches };
};