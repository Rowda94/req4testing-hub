import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, FileText, TestTube, PlayCircle, UserCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplay = (role: string) => {
    const roleMap = {
      requirements_engineer: 'Requirements Engineer',
      test_manager: 'Test Manager',
      test_case_creator: 'Testfallersteller',
      tester: 'Tester'
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  const navigationItems = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: User,
      roles: ['requirements_engineer', 'test_manager', 'test_case_creator', 'tester']
    },
    { 
      path: '/requirements', 
      label: 'Anforderungen', 
      icon: FileText,
      roles: ['requirements_engineer', 'test_manager', 'test_case_creator']
    },
    { 
      path: '/test-cases', 
      label: 'Testfälle', 
      icon: TestTube,
      roles: ['test_case_creator', 'test_manager', 'tester']
    },
    { 
      path: '/test-runs', 
      label: 'Testläufe', 
      icon: PlayCircle,
      roles: ['test_manager', 'tester']
    },
    { 
      path: '/my-tests', 
      label: 'Meine Tests', 
      icon: UserCheck,
      roles: ['tester']
    }
  ];

  const canAccessRoute = (allowedRoles: string[]) => {
    return userProfile?.role && allowedRoles.includes(userProfile.role);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Require4Testing</h1>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map(item => (
              canAccessRoute(item.roles) && (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  onClick={() => navigate(item.path)}
                  className="flex items-center space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              )
            ))}
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {userProfile?.full_name ? getInitials(userProfile.full_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">
                  {userProfile?.full_name || user?.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userProfile?.role && getRoleDisplay(userProfile.role)}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Abmelden</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;