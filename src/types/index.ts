import type { Timestamp } from 'firebase/firestore';

// ============================================
// User
// ============================================
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  preferredLanguage: 'el' | 'en';
  theme: 'light' | 'dark' | 'system';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type UserCreateData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// ============================================
// Email Insight (AI-analyzed emails)
// ============================================
export type EmailUrgency = 'high' | 'medium' | 'low';

export type EmailCategory =
  | 'inquiry'
  | 'approval'
  | 'update'
  | 'invoice'
  | 'scheduling'
  | 'other';

export type ProjectStage =
  | 'inquiry'
  | 'design'
  | 'approval'
  | 'construction'
  | 'maintenance'
  | 'unknown';

export type EmailStatus = 'new' | 'reviewed' | 'archived';

export interface SuggestedTask {
  title: string;
  due: string | null;
}

export interface EmailInsight {
  id: string;
  userId: string;
  gmailId: string;
  subject: string;
  from: string;
  fromName: string | null;
  receivedAt: Timestamp;
  // AI-generated fields
  summary: string;
  urgency: EmailUrgency;
  urgencyReason: string | null;
  category: EmailCategory;
  requiresResponse: boolean;
  suggestedTasks: SuggestedTask[];
  clientName: string | null;
  projectLocation: string | null;
  projectStage: ProjectStage;
  // Status
  status: EmailStatus;
  linkedClientId: string | null;
  linkedTaskIds: string[];
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type EmailInsightCreateData = Omit<EmailInsight, 'id' | 'createdAt' | 'updatedAt'>;

// ============================================
// Task
// ============================================
export type TaskStatus = 'todo' | 'in_progress' | 'waiting' | 'done';

export type TaskPriority = 'high' | 'medium' | 'low';

export type TaskSourceType = 'email' | 'note' | 'manual' | 'ai_suggested';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Timestamp | null;
  // Relationships
  clientId: string | null;
  sourceType: TaskSourceType;
  sourceId: string | null;
  // Subtasks
  subtasks: Subtask[];
  // Tracking
  waitingSince: Timestamp | null;
  completedAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
}

export type TaskCreateData = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'completedAt'>;

// ============================================
// Client
// ============================================
export type PropertyType = 'villa' | 'apartment' | 'commercial' | 'public' | 'other';

export type ContactPreference = 'email' | 'phone' | 'whatsapp';

export type ClientStatus = 'active' | 'inactive' | 'vip' | 'archived';

export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  location: string | null;
  propertyType: PropertyType | null;
  // Communication
  preferredContact: ContactPreference | null;
  language: 'el' | 'en';
  notes: string;
  // Status
  status: ClientStatus;
  tags: string[];
  // Stats (auto-calculated)
  totalEmails: number;
  totalTasks: number;
  lastContactAt: Timestamp | null;
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
}

export type ClientCreateData = Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'totalEmails' | 'totalTasks' | 'lastContactAt'>;

// ============================================
// Note
// ============================================
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  linkedClientIds: string[];
  linkedTaskIds: string[];
  tags: string[];
  isFavorite: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
}

export type NoteCreateData = Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

// ============================================
// Notification
// ============================================
export type NotificationType =
  | 'task_overdue'
  | 'new_email'
  | 'approval_needed'
  | 'followup_due';

export type NotificationRelatedType = 'task' | 'email' | 'client';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedId: string | null;
  relatedType: NotificationRelatedType | null;
  read: boolean;
  createdAt: Timestamp;
}

export type NotificationCreateData = Omit<Notification, 'id' | 'createdAt'>;

// ============================================
// Document (for file uploads)
// ============================================
export type DocumentType = 'contract' | 'proposal' | 'design' | 'photo' | 'invoice' | 'other';

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: DocumentType;
  url: string;
  storagePath: string;
  mimeType: string;
  size: number;
  clientId: string | null;
  taskId: string | null;
  createdAt: Timestamp;
  deletedAt: Timestamp | null;
}

export type DocumentCreateData = Omit<Document, 'id' | 'createdAt' | 'deletedAt'>;

// ============================================
// Legacy types (kept for compatibility)
// ============================================
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'completed' | 'on_hold';

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  clientId: string | null;
  status: ProjectStatus;
  priority: Priority;
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  budget: number | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
}

export type ProjectCreateData = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
