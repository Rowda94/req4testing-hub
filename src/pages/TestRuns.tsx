import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Plus, Search, Filter, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';

const TestRuns = () => {
  const { userProfile } = useAuth();

  const canCreateTestRuns = userProfile?.role === 'test_manager';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testläufe</h1>
          <p className="text-muted-foreground">
            Verwalten und überwachen Sie Ihre Testausführungen
          </p>
        </div>
        {canCreateTestRuns && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neuer Testlauf
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Testläufe durchsuchen..." className="pl-8" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-5 w-5" />
                <CardTitle>Release 1.0 Testlauf</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
            </div>
            <CardDescription>
              Vollständiger Testlauf für das erste Release
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fortschritt</span>
                <span className="font-medium">65% (13/20 Tests)</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>01.01.2024 - 15.01.2024</span>
                </div>
                <span>3 Tester zugewiesen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-5 w-5" />
                <CardTitle>Sprint 3 Regression</CardTitle>
              </div>
              <Badge variant="secondary">Geplant</Badge>
            </div>
            <CardDescription>
              Regressionstests für Sprint 3 Features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fortschritt</span>
                <span className="font-medium">0% (0/15 Tests)</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>16.01.2024 - 30.01.2024</span>
                </div>
                <span>2 Tester zugewiesen</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PlayCircle className="h-5 w-5" />
                <CardTitle>Hotfix 0.9.1 Verifikation</CardTitle>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Abgeschlossen</Badge>
            </div>
            <CardDescription>
              Schnelle Verifikation des kritischen Hotfixes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fortschritt</span>
                <span className="font-medium">100% (8/8 Tests)</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>20.12.2023 - 22.12.2023</span>
                </div>
                <span>1 Tester zugewiesen</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {!canCreateTestRuns && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <PlayCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">Eingeschränkte Berechtigung</h3>
            <p className="text-sm text-muted-foreground text-center">
              Nur Test Manager können neue Testläufe erstellen.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestRuns;