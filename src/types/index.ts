// Project types
export interface Project {
  id: string;
  name: string;
  description?: string;
  clientId: string;
  status: ProjectStatus;
  priority: Priority;
  startDate?: string;
  endDate?: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'completed' | 'on_hold';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// Client types
export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Document types
export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  projectId?: string;
  clientId?: string;
  size: number;
  createdAt: string;
}

export type DocumentType = 'contract' | 'proposal' | 'design' | 'photo' | 'invoice' | 'other';

// Task types
export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done';

// User types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  preferences: UserPreferences;
}

export type UserRole = 'admin' | 'user';

export interface UserPreferences {
  language: 'en' | 'el';
  currency: 'EUR' | 'USD';
  theme: 'light' | 'dark' | 'system';
}
