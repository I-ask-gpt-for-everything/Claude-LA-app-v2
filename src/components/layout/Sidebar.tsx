import { NavLink } from 'react-router-dom';
import {
  Mail,
  CheckSquare,
  Users,
  StickyNote,
  FileText,
  Settings,
  X,
  Leaf,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/emails', icon: Mail, label: 'Emails' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/clients', icon: Users, label: 'Clients' },
  { to: '/notes', icon: StickyNote, label: 'Notes' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-600 text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-semibold text-gray-900">ODWM</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors
                  ${isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            {user && (
              <div className="flex items-center gap-3 mb-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-gray-600 hover:text-gray-900"
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Sign out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
