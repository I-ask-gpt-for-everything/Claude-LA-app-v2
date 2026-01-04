import { Card, CardHeader, CardContent, Input, Select, Button } from '../components/ui';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account and application preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your name"
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <Input
              label="Company Name"
              placeholder="Your landscape architecture company"
            />
            <Button>Save Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Language"
              options={[
                { value: 'en', label: 'English' },
                { value: 'el', label: 'Ελληνικά (Greek)' },
              ]}
            />
            <Select
              label="Currency"
              options={[
                { value: 'EUR', label: 'Euro (€)' },
                { value: 'USD', label: 'US Dollar ($)' },
              ]}
            />
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
