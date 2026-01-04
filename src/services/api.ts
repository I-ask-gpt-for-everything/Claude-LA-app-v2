// API service placeholder
// This will be configured with Firebase in the next step

export const api = {
  // Projects
  projects: {
    getAll: async () => {
      // TODO: Implement Firebase Firestore query
      return [];
    },
    getById: async (_id: string) => {
      // TODO: Implement Firebase Firestore query
      return null;
    },
    create: async (_data: unknown) => {
      // TODO: Implement Firebase Firestore mutation
      return null;
    },
    update: async (_id: string, _data: unknown) => {
      // TODO: Implement Firebase Firestore mutation
      return null;
    },
    delete: async (_id: string) => {
      // TODO: Implement Firebase Firestore mutation
      return null;
    },
  },

  // Clients
  clients: {
    getAll: async () => {
      // TODO: Implement Firebase Firestore query
      return [];
    },
    getById: async (_id: string) => {
      // TODO: Implement Firebase Firestore query
      return null;
    },
    create: async (_data: unknown) => {
      // TODO: Implement Firebase Firestore mutation
      return null;
    },
    update: async (_id: string, _data: unknown) => {
      // TODO: Implement Firebase Firestore mutation
      return null;
    },
    delete: async (_id: string) => {
      // TODO: Implement Firebase Firestore mutation
      return null;
    },
  },

  // Documents
  documents: {
    getAll: async () => {
      // TODO: Implement Firebase Storage query
      return [];
    },
    upload: async (_file: File, _metadata: unknown) => {
      // TODO: Implement Firebase Storage upload
      return null;
    },
    delete: async (_id: string) => {
      // TODO: Implement Firebase Storage delete
      return null;
    },
  },
};
