import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, TestTube, PlayCircle, UserCheck } from 'lucide-react';

const Index = () => {
  const { userProfile } = useAuth();

  const getRoleDisplay = (role: string) => {
    const roleMap = {
      requirements_engineer: 'Requirements Engineer',
      test_manager: 'Test Manager',
      test_case_creator: 'Testfallersteller',
      tester: 'Tester'
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  const roleCapabilities = {
    requirements_engineer: [
      'Erstellen und verwalten von Anforderungen',
      'Überwachen der Anforderungsqualität',
      'Koordination mit Stakeholdern'
    ],
    test_manager: [
      'Erstellen und verwalten von Testläufen',
      'Zuordnung von Testfällen zu Testern',
      'Überwachen des Teststatus',
      'Erstellen von Testfällen'
    ],
    test_case_creator: [
      'Erstellen von Testfällen zu Anforderungen',
      'Definieren von Testschritten',
      'Pflege der Testfallqualität'
    ],
    tester: [
      'Ausführen zugewiesener Tests',
      'Erfassen von Testergebnissen',
      'Dokumentation von Fehlern'
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Willkommen im Require4Testing System
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5" />
            <span>Ihre Rolle</span>
          </CardTitle>
          <CardDescription>
            Informationen zu Ihrer aktuellen Rolle und Berechtigungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Badge variant="secondary" className="text-sm">
                {userProfile?.role && getRoleDisplay(userProfile.role)}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Ihre Berechtigung umfassen:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {userProfile?.role && roleCapabilities[userProfile.role as keyof typeof roleCapabilities]?.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userProfile?.role && ['requirements_engineer', 'test_manager', 'test_case_creator'].includes(userProfile.role) && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anforderungen</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Verwalten Sie Testanforderungen
              </p>
            </CardContent>
          </Card>
        )}

        {userProfile?.role && ['test_case_creator', 'test_manager', 'tester'].includes(userProfile.role) && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testfälle</CardTitle>
              <TestTube className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Erstellen und verwalten Sie Testfälle
              </p>
            </CardContent>
          </Card>
        )}

        {userProfile?.role && ['test_manager', 'tester'].includes(userProfile.role) && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testläufe</CardTitle>
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Organisieren Sie Testausführungen
              </p>
            </CardContent>
          </Card>
        )}

        {userProfile?.role === 'tester' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meine Tests</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Ihnen zugewiesene Tests
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schnellstart</CardTitle>
          <CardDescription>
            Beginnen Sie mit diesen grundlegenden Aktionen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {userProfile?.role === 'requirements_engineer' && (
              <p>• Erstellen Sie Ihre erste Anforderung über den Menüpunkt "Anforderungen"</p>
            )}
            {userProfile?.role === 'test_case_creator' && (
              <p>• Erstellen Sie Testfälle zu bestehenden Anforderungen</p>
            )}
            {userProfile?.role === 'test_manager' && (
              <>
                <p>• Erstellen Sie einen neuen Testlauf</p>
                <p>• Weisen Sie Testfälle den entsprechenden Testern zu</p>
              </>
            )}
            {userProfile?.role === 'tester' && (
              <p>• Überprüfen Sie Ihre zugewiesenen Tests und beginnen Sie mit der Ausführung</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
