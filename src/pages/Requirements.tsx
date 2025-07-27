/**
 * Requirements Management Page
 * 
 * This component handles the display and management of requirements in the system.
 * It provides functionality for:
 * - Viewing all requirements
 * - Creating new requirements (for requirements engineers)
 * - Editing existing requirements (for requirements engineers)
 * - Filtering and searching requirements
 * 
 * Access control:
 * - View: requirements_engineer, test_manager, test_case_creator
 * - Create/Edit: requirements_engineer only
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Edit, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';

/**
 * Type definition for a requirement record from the database
 */
interface Requirement {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

/**
 * Form data interface for creating/editing requirements
 */
interface RequirementFormData {
  title: string;
  description: string;
  status: string;
  priority: string;
}

const Requirements = () => {
  // Authentication and state hooks
  const { userProfile, user } = useAuth();
  const { toast } = useToast();
  
  // Component state
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [filteredRequirements, setFilteredRequirements] = useState<Requirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
  const [formData, setFormData] = useState<RequirementFormData>({
    title: '',
    description: '',
    status: 'draft',
    priority: 'medium'
  });

  /**
   * Check if the current user can edit requirements
   * Only requirements engineers can create and edit requirements
   */
  const canEdit = userProfile?.role === 'requirements_engineer';

  /**
   * Fetch all requirements from the database
   * Includes profile information for the creator
   */
  const fetchRequirements = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('requirements')
        .select(`
          *,
          profiles:created_by (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequirements(data || []);
      setFilteredRequirements(data || []);
    } catch (error: any) {
      toast({
        title: 'Fehler beim Laden',
        description: 'Anforderungen konnten nicht geladen werden.',
        variant: 'destructive',
      });
      console.error('Error fetching requirements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Filter requirements based on search term, status, and priority
   * Updates the filtered requirements list in real-time
   */
  useEffect(() => {
    let filtered = requirements;

    // Filter by search term (title and description)
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (req.description && req.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(req => req.priority === priorityFilter);
    }

    setFilteredRequirements(filtered);
  }, [requirements, searchTerm, statusFilter, priorityFilter]);

  /**
   * Load requirements when component mounts
   */
  useEffect(() => {
    fetchRequirements();
  }, []);

  /**
   * Handle form submission for creating or updating a requirement
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast({
        title: 'Fehler',
        description: 'Sie müssen angemeldet sein.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);

      if (editingRequirement) {
        // Update existing requirement
        const { error } = await supabase
          .from('requirements')
          .update({
            title: formData.title,
            description: formData.description,
            status: formData.status,
            priority: formData.priority,
          })
          .eq('id', editingRequirement.id);

        if (error) throw error;

        toast({
          title: 'Erfolgreich aktualisiert',
          description: 'Die Anforderung wurde erfolgreich aktualisiert.',
        });
      } else {
        // Create new requirement
        const { error } = await supabase
          .from('requirements')
          .insert([{
            title: formData.title,
            description: formData.description,
            status: formData.status,
            priority: formData.priority,
            created_by: user.id,
          }]);

        if (error) throw error;

        toast({
          title: 'Erfolgreich erstellt',
          description: 'Die Anforderung wurde erfolgreich erstellt.',
        });
      }

      // Reset form and close dialog
      setFormData({ title: '', description: '', status: 'draft', priority: 'medium' });
      setEditingRequirement(null);
      setIsDialogOpen(false);
      
      // Refresh requirements list
      fetchRequirements();
    } catch (error: any) {
      toast({
        title: 'Fehler',
        description: error.message || 'Ein Fehler ist aufgetreten.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Open the edit dialog with existing requirement data
   */
  const handleEdit = (requirement: Requirement) => {
    setEditingRequirement(requirement);
    setFormData({
      title: requirement.title,
      description: requirement.description || '',
      status: requirement.status,
      priority: requirement.priority,
    });
    setIsDialogOpen(true);
  };

  /**
   * Reset form and open dialog for creating new requirement
   */
  const handleNewRequirement = () => {
    setEditingRequirement(null);
    setFormData({ title: '', description: '', status: 'draft', priority: 'medium' });
    setIsDialogOpen(true);
  };

  /**
   * Get the appropriate badge variant based on status
   */
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'implemented': return 'secondary';
      case 'tested': return 'outline';
      default: return 'secondary';
    }
  };

  /**
   * Get the appropriate badge variant based on priority
   */
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  /**
   * Get the appropriate icon for status
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'implemented': return <CheckCircle className="h-4 w-4" />;
      case 'tested': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  /**
   * Get display text for status values
   */
  const getStatusDisplay = (status: string) => {
    const statusMap = {
      draft: 'Entwurf',
      approved: 'Genehmigt',
      implemented: 'Implementiert',
      tested: 'Getestet'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  /**
   * Get display text for priority values
   */
  const getPriorityDisplay = (priority: string) => {
    const priorityMap = {
      low: 'Niedrig',
      medium: 'Mittel',
      high: 'Hoch',
      critical: 'Kritisch'
    };
    return priorityMap[priority as keyof typeof priorityMap] || priority;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <FileText className="h-8 w-8" />
            <span>Anforderungen</span>
          </h1>
          <p className="text-muted-foreground">
            Verwalten Sie alle Testanforderungen für Ihr Projekt
          </p>
        </div>
        
        {/* Create New Requirement Button - only for requirements engineers */}
        {canEdit && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewRequirement}>
                <Plus className="h-4 w-4 mr-2" />
                Neue Anforderung
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingRequirement ? 'Anforderung bearbeiten' : 'Neue Anforderung erstellen'}
                </DialogTitle>
                <DialogDescription>
                  {editingRequirement 
                    ? 'Bearbeiten Sie die Details der Anforderung.'
                    : 'Erstellen Sie eine neue Anforderung für Ihr Projekt.'
                  }
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="z.B. Benutzer-Login-Funktionalität"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detaillierte Beschreibung der Anforderung..."
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Entwurf</SelectItem>
                        <SelectItem value="approved">Genehmigt</SelectItem>
                        <SelectItem value="implemented">Implementiert</SelectItem>
                        <SelectItem value="tested">Getestet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorität</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Priorität wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Niedrig</SelectItem>
                        <SelectItem value="medium">Mittel</SelectItem>
                        <SelectItem value="high">Hoch</SelectItem>
                        <SelectItem value="critical">Kritisch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Abbrechen
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {editingRequirement ? 'Aktualisieren' : 'Erstellen'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter und Suche</CardTitle>
          <CardDescription>
            Verwenden Sie die Filter, um bestimmte Anforderungen zu finden
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="space-y-2">
              <Label htmlFor="search">Suche</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Titel oder Beschreibung durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="draft">Entwurf</SelectItem>
                  <SelectItem value="approved">Genehmigt</SelectItem>
                  <SelectItem value="implemented">Implementiert</SelectItem>
                  <SelectItem value="tested">Getestet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Priority Filter */}
            <div className="space-y-2">
              <Label htmlFor="priority-filter">Priorität</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priorität filtern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Prioritäten</SelectItem>
                  <SelectItem value="critical">Kritisch</SelectItem>
                  <SelectItem value="high">Hoch</SelectItem>
                  <SelectItem value="medium">Mittel</SelectItem>
                  <SelectItem value="low">Niedrig</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2">Lade Anforderungen...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredRequirements.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Keine Anforderungen gefunden</p>
                <p className="text-sm">
                  {requirements.length === 0 
                    ? canEdit 
                      ? 'Erstellen Sie Ihre erste Anforderung mit dem Button oben.'
                      : 'Es wurden noch keine Anforderungen erstellt.'
                    : 'Versuchen Sie, die Filter zu ändern oder die Suche anzupassen.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredRequirements.map((requirement) => (
            <Card key={requirement.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      {getStatusIcon(requirement.status)}
                      <span>{requirement.title}</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant={getStatusBadgeVariant(requirement.status)}>
                        {getStatusDisplay(requirement.status)}
                      </Badge>
                      <Badge variant={getPriorityBadgeVariant(requirement.priority)}>
                        {getPriorityDisplay(requirement.priority)}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Edit Button - only for requirements engineers */}
                  {canEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(requirement)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Bearbeiten
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              {requirement.description && (
                <CardContent>
                  <p className="text-muted-foreground">{requirement.description}</p>
                </CardContent>
              )}
              
              <CardContent className="pt-0">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>
                    Erstellt von: {requirement.profiles?.full_name || requirement.profiles?.email || 'Unbekannt'}
                  </span>
                  <span>
                    Erstellt: {new Date(requirement.created_at).toLocaleDateString('de-DE')}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Requirements;