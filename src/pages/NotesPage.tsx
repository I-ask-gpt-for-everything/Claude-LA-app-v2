import { StickyNote, Plus, Search, Star } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Input, EmptyState } from '../components/ui';

export function NotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-600 mt-1">
            Quick notes and project documentation
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          New Note
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search notes..."
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button variant="secondary" leftIcon={<Star className="h-4 w-4" />}>
          Favorites
        </Button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Empty State */}
        <Card className="col-span-full">
          <CardContent className="py-12">
            <EmptyState
              icon={<StickyNote className="h-8 w-8" />}
              title="No notes yet"
              description="Create notes to keep track of project details, meeting notes, and ideas."
              action={
                <Button leftIcon={<Plus className="h-4 w-4" />}>
                  Create Note
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips Card */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Quick Tips</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Link notes to clients and tasks for easy reference
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Use tags to organize notes by project or topic
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              Star important notes to find them quickly
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
