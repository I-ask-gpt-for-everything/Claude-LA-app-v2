import { Card, CardHeader, CardContent } from '../components/ui';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to Outdoor Design Work Manager
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Active Projects</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Total Clients</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">48</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">Pending Tasks</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">23</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-gray-500">This Month Revenue</div>
            <div className="text-3xl font-bold text-gray-900 mt-1">€8,450</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No recent projects to display.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No upcoming tasks to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
