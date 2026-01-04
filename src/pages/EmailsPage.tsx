import { Mail, Plus, Filter } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge, EmptyState } from '../components/ui';

export function EmailsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Insights</h1>
          <p className="text-gray-600 mt-1">
            AI-analyzed emails from your inbox
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leftIcon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />}>
            Sync Emails
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">New Emails</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">High Urgency</div>
            <div className="text-3xl font-bold text-danger-600 mt-1">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Needs Response</div>
            <div className="text-3xl font-bold text-warning-600 mt-1">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Reviewed</div>
            <div className="text-3xl font-bold text-success-600 mt-1">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Email List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Emails</h2>
            <div className="flex gap-2">
              <Badge variant="primary">All</Badge>
              <Badge>New</Badge>
              <Badge>Reviewed</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<Mail className="h-8 w-8" />}
            title="No emails yet"
            description="Connect your Gmail account to start receiving AI-analyzed email insights."
            action={
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Connect Gmail
              </Button>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
