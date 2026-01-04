import { CheckSquare, Plus, Filter } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge, EmptyState } from '../components/ui';

export function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">
            Manage your work tasks and to-dos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leftIcon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />}>
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">To Do</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">In Progress</div>
            <div className="text-3xl font-bold text-primary-600 mt-1">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Waiting</div>
            <div className="text-3xl font-bold text-warning-600 mt-1">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Completed</div>
            <div className="text-3xl font-bold text-success-600 mt-1">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban-style columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* To Do Column */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">To Do</h2>
                <Badge variant="default">0</Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<CheckSquare className="h-6 w-6" />}
              title="No tasks"
              description="Create your first task"
            />
          </CardContent>
        </Card>

        {/* In Progress Column */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">In Progress</h2>
                <Badge variant="primary">0</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<CheckSquare className="h-6 w-6" />}
              title="No tasks"
              description="Move tasks here when you start working"
            />
          </CardContent>
        </Card>

        {/* Done Column */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">Done</h2>
                <Badge variant="success">0</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<CheckSquare className="h-6 w-6" />}
              title="No completed tasks"
              description="Completed tasks will appear here"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
