import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Spinner } from '../components/ui';

export function LoginPage() {
  const { signInWithGoogle, isLoading, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/emails', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      clearError();
      await signInWithGoogle();
      navigate('/emails', { replace: true });
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white mb-4 shadow-lg">
              <Leaf className="h-9 w-9" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center">
              Outdoor Design
            </h1>
            <h2 className="text-lg font-medium text-gray-600 text-center">
              Work Manager
            </h2>
          </div>

          {/* Tagline in Greek */}
          <p className="text-center text-gray-500 mb-8">
            Διαχείριση εργασιών με τεχνητή νοημοσύνη
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <p className="text-sm text-danger-700">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            variant="secondary"
            size="lg"
            className="w-full justify-center gap-3 py-3 font-medium"
          >
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Info */}
          <p className="text-center text-sm text-gray-500">
            Sign in with your Google account to get started.
            <br />
            Your data is securely stored with Firebase.
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Powered by{' '}
          <span className="font-medium text-gray-300">Anthropic</span>
          {' & '}
          <span className="font-medium text-gray-300">Google</span>
        </p>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
