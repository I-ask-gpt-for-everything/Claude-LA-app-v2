import { Plus, Users } from 'lucide-react';
import { Button, EmptyState } from '../components/ui';

export function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">
            Manage your client relationships
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          Add Client
        </Button>
      </div>

      <EmptyState
        icon={<Users className="h-8 w-8" />}
        title="No clients yet"
        description="Start building your client base by adding your first client."
        action={
          <Button leftIcon={<Plus className="h-4 w-4" />}>
            Add Client
          </Button>
        }
      />
    </div>
  );
}
