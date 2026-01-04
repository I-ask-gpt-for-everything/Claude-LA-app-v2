import { Plus, FileText } from 'lucide-react';
import { Button, EmptyState } from '../components/ui';

export function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-1">
            Store and manage project documents
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          Upload Document
        </Button>
      </div>

      <EmptyState
        icon={<FileText className="h-8 w-8" />}
        title="No documents yet"
        description="Upload documents like contracts, proposals, and design files."
        action={
          <Button leftIcon={<Plus className="h-4 w-4" />}>
            Upload Document
          </Button>
        }
      />
    </div>
  );
}
