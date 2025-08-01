import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestTube, Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const TestCases = () => {
  const { userProfile } = useAuth();

  const canCreateTestCases = userProfile?.role && ['test_case_creator', 'test_manager'].includes(userProfile.role);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testfälle</h1>
          <p className="text-muted-foreground">
            Verwalten Sie Testfälle für Ihre Anforderungen
          </p>
        </div>
        {canCreateTestCases && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Neuer Testfall
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Testfälle durchsuchen..." className="pl-8" />
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
                <TestTube className="h-5 w-5" />
                <CardTitle>Login-Funktionalität testen</CardTitle>
              </div>
              <Badge variant="secondary">Medium</Badge>
            </div>
            <CardDescription>
              Testfall für die Benutzeranmeldung mit gültigen und ungültigen Daten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Anforderung: Benutzeranmeldung</span>
              <span>5 Testschritte</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TestTube className="h-5 w-5" />
                <CardTitle>Datenvalidierung prüfen</CardTitle>
              </div>
              <Badge variant="destructive">Hoch</Badge>
            </div>
            <CardDescription>
              Überprüfung der Eingabevalidierung für alle Formularfelder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Anforderung: Datenvalidierung</span>
              <span>8 Testschritte</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TestTube className="h-5 w-5" />
                <CardTitle>Responsive Design testen</CardTitle>
              </div>
              <Badge>Niedrig</Badge>
            </div>
            <CardDescription>
              Test der Benutzeroberfläche auf verschiedenen Bildschirmgrößen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Anforderung: Responsive Design</span>
              <span>3 Testschritte</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {!canCreateTestCases && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <TestTube className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">Keine Berechtigung</h3>
            <p className="text-sm text-muted-foreground text-center">
              Sie haben keine Berechtigung, Testfälle zu erstellen oder zu bearbeiten.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestCases;