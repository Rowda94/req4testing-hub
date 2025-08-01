import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MyTests = () => {
  const { userProfile } = useAuth();

  const isTester = userProfile?.role === 'tester';

  if (!isTester) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meine Tests</h1>
          <p className="text-muted-foreground">
            Ihre zugewiesenen Testfälle und Ausführungen
          </p>
        </div>
        
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <UserCheck className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold">Keine Berechtigung</h3>
            <p className="text-sm text-muted-foreground text-center">
              Dieser Bereich ist nur für Tester verfügbar.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meine Tests</h1>
        <p className="text-muted-foreground">
          Ihre zugewiesenen Testfälle und Ausführungen
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausstehend</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Tests zu bearbeiten</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bestanden</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24</div>
            <p className="text-xs text-muted-foreground">Erfolgreich abgeschlossen</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fehlgeschlagen</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Benötigen Aufmerksamkeit</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Meine Tests durchsuchen..." className="pl-8" />
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
                <UserCheck className="h-5 w-5" />
                <CardTitle>Login-Funktionalität testen</CardTitle>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Ausstehend
              </Badge>
            </div>
            <CardDescription>
              Testfall für die Benutzeranmeldung mit gültigen und ungültigen Daten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Testlauf: Release 1.0 Testlauf</p>
                <p>Fällig: 15.01.2024</p>
              </div>
              <Button size="sm">
                Test starten
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <CardTitle>Datenvalidierung prüfen</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800">
                Bestanden
              </Badge>
            </div>
            <CardDescription>
              Überprüfung der Eingabevalidierung für alle Formularfelder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Testlauf: Release 1.0 Testlauf</p>
                <p>Abgeschlossen: 10.01.2024</p>
              </div>
              <Button variant="outline" size="sm">
                Details anzeigen
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <CardTitle>API Response Zeit</CardTitle>
              </div>
              <Badge variant="destructive">
                Fehlgeschlagen
              </Badge>
            </div>
            <CardDescription>
              Performance-Test für API-Antwortzeiten unter Last
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Testlauf: Release 1.0 Testlauf</p>
                <p>Fehlgeschlagen: 08.01.2024</p>
              </div>
              <Button variant="outline" size="sm">
                Erneut testen
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5" />
                <CardTitle>Mobile Responsive Design</CardTitle>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                Ausstehend
              </Badge>
            </div>
            <CardDescription>
              Test der Benutzeroberfläche auf verschiedenen mobilen Geräten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Testlauf: Sprint 3 Regression</p>
                <p>Fällig: 30.01.2024</p>
              </div>
              <Button size="sm">
                Test starten
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyTests;