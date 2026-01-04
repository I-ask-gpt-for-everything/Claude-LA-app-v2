import { Plus } from 'lucide-react';
import { Button, EmptyState } from '../components/ui';

export function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage your landscape design projects
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          New Project
        </Button>
      </div>

      <EmptyState
        title="No projects yet"
        description="Get started by creating your first landscape design project."
        action={
          <Button leftIcon={<Plus className="h-4 w-4" />}>
            Create Project
          </Button>
        }
      />
    </div>
  );
}
