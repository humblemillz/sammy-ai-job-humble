
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Plus, FileText, Eye, Users, List } from 'lucide-react';
import EnhancedSubmissionManager from '@/components/admin/EnhancedSubmissionManager';
import AdminOpportunityForm from '@/components/admin/AdminOpportunityForm';
import PublishedOpportunitiesList from '@/components/admin/PublishedOpportunitiesList';
import SavedOpportunitiesManager from '@/components/admin/SavedOpportunitiesManager';
import ListingsSubmissionsManager from '@/components/admin/ListingsSubmissionsManager';

interface StaffStats {
  pendingSubmissions: number;
  approvedSubmissions: number;
  totalOpportunities: number;
  publishedOpportunities: number;
  draftOpportunities?: number;
}

const StaffAdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StaffStats>({
    pendingSubmissions: 0,
    approvedSubmissions: 0,
    totalOpportunities: 0,
    publishedOpportunities: 0,
    draftOpportunities: 0
  });
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchStaffStats();
  }, []);

  const fetchStaffStats = async () => {
    try {
      const [
        { count: pendingSubmissions },
        { count: approvedSubmissions },
        { count: totalOpportunities },
        { count: publishedOpportunities },
        { count: draftOpportunities }
      ] = await Promise.all([
        supabase.from('user_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('user_submissions').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('is_published', false)
      ]);

      setStats({
        pendingSubmissions: pendingSubmissions || 0,
        approvedSubmissions: approvedSubmissions || 0,
        totalOpportunities: totalOpportunities || 0,
        publishedOpportunities: publishedOpportunities || 0,
        draftOpportunities: draftOpportunities || 0
      });
    } catch (error) {
      console.error('Error fetching staff stats:', error);
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    fetchStaffStats();
    setShowCreateForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b mb-6">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Staff Admin Dashboard</h1>
              <p className="text-gray-600">Manage submissions and opportunities</p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Opportunity
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
              <Eye className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingSubmissions}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Submissions</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedSubmissions}</div>
              <p className="text-xs text-muted-foreground">Approved submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Opportunities</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draftOpportunities || 0}</div>
              <p className="text-xs text-muted-foreground">Saved drafts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Opportunities</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedOpportunities}</div>
              <p className="text-xs text-muted-foreground">Live opportunities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOpportunities}</div>
              <p className="text-xs text-muted-foreground">All opportunities</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="listings">All Listings & Submissions</TabsTrigger>
            <TabsTrigger value="submissions">Manage Submissions</TabsTrigger>
            <TabsTrigger value="saved">Saved Opportunities</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <ListingsSubmissionsManager />
          </TabsContent>

          <TabsContent value="submissions">
            <EnhancedSubmissionManager />
          </TabsContent>

          <TabsContent value="saved">
            <SavedOpportunitiesManager />
          </TabsContent>

          <TabsContent value="discover">
            <PublishedOpportunitiesList />
          </TabsContent>
        </Tabs>
      </div>

      <AdminOpportunityForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSuccess={handleCreateSuccess}
        mode="create"
      />
    </div>
  );
};

export default StaffAdminDashboard;
