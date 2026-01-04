import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import type {
  QueryConstraint,
  DocumentData,
  WithFieldValue,
  QuerySnapshot,
  DocumentReference,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  User,
  UserCreateData,
  Task,
  TaskCreateData,
  Client,
  ClientCreateData,
  Note,
  NoteCreateData,
  EmailInsight,
  EmailInsightCreateData,
  Notification,
  NotificationCreateData,
  Document,
  DocumentCreateData,
} from '../types';

// ============================================
// Collection Names
// ============================================
export const COLLECTIONS = {
  USERS: 'users',
  TASKS: 'tasks',
  CLIENTS: 'clients',
  NOTES: 'notes',
  EMAIL_INSIGHTS: 'emailInsights',
  NOTIFICATIONS: 'notifications',
  DOCUMENTS: 'documents',
} as const;

// ============================================
// Generic Helpers
// ============================================

/**
 * Converts Firestore document to typed object with id
 */
function docToData<T>(doc: DocumentData): T {
  return { id: doc.id, ...doc.data() } as T;
}

/**
 * Converts QuerySnapshot to array of typed objects
 */
function snapshotToArray<T>(snapshot: QuerySnapshot): T[] {
  return snapshot.docs.map((doc) => docToData<T>(doc));
}

// ============================================
// User Operations
// ============================================

export async function getUserById(userId: string): Promise<User | null> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docToData<User>(docSnap) : null;
}

export async function createUser(userId: string, data: UserCreateData): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(docRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  } as WithFieldValue<DocumentData>).catch(async () => {
    // Document doesn't exist, create it
    const { setDoc } = await import('firebase/firestore');
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
}

export async function updateUser(userId: string, data: Partial<UserCreateData>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  } as WithFieldValue<DocumentData>);
}

export function subscribeToUser(userId: string, callback: (user: User | null) => void): Unsubscribe {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  return onSnapshot(docRef, (doc) => {
    callback(doc.exists() ? docToData<User>(doc) : null);
  });
}

// ============================================
// Task Operations
// ============================================

export function getTasksQuery(userId: string, ...constraints: QueryConstraint[]) {
  return query(
    collection(db, COLLECTIONS.TASKS),
    where('userId', '==', userId),
    where('deletedAt', '==', null),
    ...constraints
  );
}

export async function getTasks(userId: string): Promise<Task[]> {
  const q = getTasksQuery(userId, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Task>(snapshot);
}

export async function getTasksByStatus(userId: string, status: Task['status']): Promise<Task[]> {
  const q = getTasksQuery(userId, where('status', '==', status), orderBy('dueDate', 'asc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Task>(snapshot);
}

export async function getTasksByClient(userId: string, clientId: string): Promise<Task[]> {
  const q = getTasksQuery(userId, where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Task>(snapshot);
}

export async function getOverdueTasks(userId: string): Promise<Task[]> {
  const now = Timestamp.now();
  const q = getTasksQuery(
    userId,
    where('status', 'in', ['todo', 'in_progress']),
    where('dueDate', '<', now),
    orderBy('dueDate', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshotToArray<Task>(snapshot);
}

export async function createTask(data: TaskCreateData): Promise<DocumentReference> {
  return addDoc(collection(db, COLLECTIONS.TASKS), {
    ...data,
    completedAt: null,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateTask(taskId: string, data: Partial<TaskCreateData>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.TASKS, taskId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  } as WithFieldValue<DocumentData>);
}

export async function completeTask(taskId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.TASKS, taskId);
  await updateDoc(docRef, {
    status: 'done',
    completedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function softDeleteTask(taskId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.TASKS, taskId);
  await updateDoc(docRef, {
    deletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToTasks(userId: string, callback: (tasks: Task[]) => void): Unsubscribe {
  const q = getTasksQuery(userId, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshotToArray<Task>(snapshot));
  });
}

// ============================================
// Client Operations
// ============================================

export function getClientsQuery(userId: string, ...constraints: QueryConstraint[]) {
  return query(
    collection(db, COLLECTIONS.CLIENTS),
    where('userId', '==', userId),
    where('deletedAt', '==', null),
    ...constraints
  );
}

export async function getClients(userId: string): Promise<Client[]> {
  const q = getClientsQuery(userId, orderBy('name', 'asc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Client>(snapshot);
}

export async function getClientsByStatus(userId: string, status: Client['status']): Promise<Client[]> {
  const q = getClientsQuery(userId, where('status', '==', status), orderBy('name', 'asc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Client>(snapshot);
}

export async function getClientById(clientId: string): Promise<Client | null> {
  const docRef = doc(db, COLLECTIONS.CLIENTS, clientId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docToData<Client>(docSnap) : null;
}

export async function createClient(data: ClientCreateData): Promise<DocumentReference> {
  return addDoc(collection(db, COLLECTIONS.CLIENTS), {
    ...data,
    totalEmails: 0,
    totalTasks: 0,
    lastContactAt: null,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateClient(clientId: string, data: Partial<ClientCreateData>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CLIENTS, clientId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  } as WithFieldValue<DocumentData>);
}

export async function softDeleteClient(clientId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CLIENTS, clientId);
  await updateDoc(docRef, {
    deletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToClients(userId: string, callback: (clients: Client[]) => void): Unsubscribe {
  const q = getClientsQuery(userId, orderBy('name', 'asc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshotToArray<Client>(snapshot));
  });
}

// ============================================
// Note Operations
// ============================================

export function getNotesQuery(userId: string, ...constraints: QueryConstraint[]) {
  return query(
    collection(db, COLLECTIONS.NOTES),
    where('userId', '==', userId),
    where('deletedAt', '==', null),
    ...constraints
  );
}

export async function getNotes(userId: string): Promise<Note[]> {
  const q = getNotesQuery(userId, orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Note>(snapshot);
}

export async function getFavoriteNotes(userId: string): Promise<Note[]> {
  const q = getNotesQuery(userId, where('isFavorite', '==', true), orderBy('updatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Note>(snapshot);
}

export async function createNote(data: NoteCreateData): Promise<DocumentReference> {
  return addDoc(collection(db, COLLECTIONS.NOTES), {
    ...data,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateNote(noteId: string, data: Partial<NoteCreateData>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.NOTES, noteId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  } as WithFieldValue<DocumentData>);
}

export async function softDeleteNote(noteId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.NOTES, noteId);
  await updateDoc(docRef, {
    deletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToNotes(userId: string, callback: (notes: Note[]) => void): Unsubscribe {
  const q = getNotesQuery(userId, orderBy('updatedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshotToArray<Note>(snapshot));
  });
}

// ============================================
// Email Insight Operations
// ============================================

export function getEmailInsightsQuery(userId: string, ...constraints: QueryConstraint[]) {
  return query(
    collection(db, COLLECTIONS.EMAIL_INSIGHTS),
    where('userId', '==', userId),
    ...constraints
  );
}

export async function getEmailInsights(userId: string, limitCount = 50): Promise<EmailInsight[]> {
  const q = getEmailInsightsQuery(userId, orderBy('receivedAt', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshotToArray<EmailInsight>(snapshot);
}

export async function getNewEmailInsights(userId: string): Promise<EmailInsight[]> {
  const q = getEmailInsightsQuery(userId, where('status', '==', 'new'), orderBy('receivedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<EmailInsight>(snapshot);
}

export async function getHighUrgencyEmails(userId: string): Promise<EmailInsight[]> {
  const q = getEmailInsightsQuery(
    userId,
    where('urgency', '==', 'high'),
    where('status', '==', 'new'),
    orderBy('receivedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshotToArray<EmailInsight>(snapshot);
}

export async function createEmailInsight(data: EmailInsightCreateData): Promise<DocumentReference> {
  return addDoc(collection(db, COLLECTIONS.EMAIL_INSIGHTS), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateEmailInsight(
  insightId: string,
  data: Partial<EmailInsightCreateData>
): Promise<void> {
  const docRef = doc(db, COLLECTIONS.EMAIL_INSIGHTS, insightId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  } as WithFieldValue<DocumentData>);
}

export async function markEmailAsReviewed(insightId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.EMAIL_INSIGHTS, insightId);
  await updateDoc(docRef, {
    status: 'reviewed',
    updatedAt: serverTimestamp(),
  });
}

export async function archiveEmail(insightId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.EMAIL_INSIGHTS, insightId);
  await updateDoc(docRef, {
    status: 'archived',
    updatedAt: serverTimestamp(),
  });
}

export function subscribeToEmailInsights(
  userId: string,
  callback: (insights: EmailInsight[]) => void
): Unsubscribe {
  const q = getEmailInsightsQuery(userId, orderBy('receivedAt', 'desc'), limit(50));
  return onSnapshot(q, (snapshot) => {
    callback(snapshotToArray<EmailInsight>(snapshot));
  });
}

// ============================================
// Notification Operations
// ============================================

export function getNotificationsQuery(userId: string, ...constraints: QueryConstraint[]) {
  return query(
    collection(db, COLLECTIONS.NOTIFICATIONS),
    where('userId', '==', userId),
    ...constraints
  );
}

export async function getUnreadNotifications(userId: string): Promise<Notification[]> {
  const q = getNotificationsQuery(userId, where('read', '==', false), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Notification>(snapshot);
}

export async function createNotification(data: NotificationCreateData): Promise<DocumentReference> {
  return addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.NOTIFICATIONS, notificationId);
  await updateDoc(docRef, { read: true });
}

export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  const q = getNotificationsQuery(userId, where('read', '==', false));
  const snapshot = await getDocs(q);
  const updates = snapshot.docs.map((doc) => updateDoc(doc.ref, { read: true }));
  await Promise.all(updates);
}

export async function deleteNotification(notificationId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.NOTIFICATIONS, notificationId);
  await deleteDoc(docRef);
}

export function subscribeToNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void
): Unsubscribe {
  const q = getNotificationsQuery(userId, orderBy('createdAt', 'desc'), limit(20));
  return onSnapshot(q, (snapshot) => {
    callback(snapshotToArray<Notification>(snapshot));
  });
}

// ============================================
// Document Operations
// ============================================

export function getDocumentsQuery(userId: string, ...constraints: QueryConstraint[]) {
  return query(
    collection(db, COLLECTIONS.DOCUMENTS),
    where('userId', '==', userId),
    where('deletedAt', '==', null),
    ...constraints
  );
}

export async function getDocuments(userId: string): Promise<Document[]> {
  const q = getDocumentsQuery(userId, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Document>(snapshot);
}

export async function getDocumentsByClient(userId: string, clientId: string): Promise<Document[]> {
  const q = getDocumentsQuery(userId, where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshotToArray<Document>(snapshot);
}

export async function createDocument(data: DocumentCreateData): Promise<DocumentReference> {
  return addDoc(collection(db, COLLECTIONS.DOCUMENTS), {
    ...data,
    deletedAt: null,
    createdAt: serverTimestamp(),
  });
}

export async function softDeleteDocument(documentId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.DOCUMENTS, documentId);
  await updateDoc(docRef, {
    deletedAt: serverTimestamp(),
  });
}

export function subscribeToDocuments(
  userId: string,
  callback: (documents: Document[]) => void
): Unsubscribe {
  const q = getDocumentsQuery(userId, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshotToArray<Document>(snapshot));
  });
}
