import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Shell, ProtectedRoute } from './components/layout';
import { FullPageSpinner } from './components/ui';
import { LoginPage } from './pages';

// Lazy load pages for better performance
const EmailsPage = lazy(() => import('./pages/EmailsPage').then(m => ({ default: m.EmailsPage })));
const TasksPage = lazy(() => import('./pages/TasksPage').then(m => ({ default: m.TasksPage })));
const Clients = lazy(() => import('./pages/Clients').then(m => ({ default: m.Clients })));
const NotesPage = lazy(() => import('./pages/NotesPage').then(m => ({ default: m.NotesPage })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const Documents = lazy(() => import('./pages/Documents').then(m => ({ default: m.Documents })));

function AppRoutes() {
  return (
    <Suspense fallback={<FullPageSpinner message="Loading..." />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/emails"
          element={
            <ProtectedRoute>
              <Shell>
                <EmailsPage />
              </Shell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Shell>
                <TasksPage />
              </Shell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Shell>
                <Clients />
              </Shell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Shell>
                <NotesPage />
              </Shell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Shell>
                <Documents />
              </Shell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Shell>
                <Settings />
              </Shell>
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/emails" replace />} />
        <Route path="*" element={<Navigate to="/emails" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
