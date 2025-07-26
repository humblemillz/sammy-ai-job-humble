import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTabs from '@/components/admin/AdminTabs';
import EnhancedSubmissionManager from '@/components/admin/EnhancedSubmissionManager';
import OpportunityManager from '@/components/admin/OpportunityManager';
import UserRoleManager from '@/components/admin/UserRoleManager';
import UserManagement from '@/components/admin/UserManagement';
import UserSubscriptionManager from '@/components/admin/UserSubscriptionManager';
import FeatureTogglePanel from '@/components/admin/FeatureTogglePanel';
import PlatformSettings from '@/components/admin/PlatformSettings';
import ScrapingDashboard from '@/components/admin/ScrapingDashboard';
import BulkScrapingManager from '@/components/admin/BulkScrapingManager';
import ApplicationDetailsManager from '@/components/admin/ApplicationDetailsManager';
import ListingsSubmissionsManager from '@/components/admin/ListingsSubmissionsManager';
import PublishedOpportunitiesList from '@/components/admin/PublishedOpportunitiesList';

import SavedOpportunitiesManager from '@/components/admin/SavedOpportunitiesManager';
import CreateOpportunityModal from './CreateOpportunityModal';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('listings-submissions');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreateOpportunity = async (data: any) => {
    setCreateLoading(true);
    // TODO: Add your create logic here
    setTimeout(() => {
      setCreateLoading(false);
      setShowCreateModal(false);
    }, 1000);
  };
  const handleCancelCreate = () => setShowCreateModal(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'listings-submissions':
        return <ListingsSubmissionsManager />;
      case 'scraping':
        return <ScrapingDashboard />;
      case 'bulk-scraping':
        return <BulkScrapingManager />;
      case 'opportunities':
        return <OpportunityManager />;
      case 'discover':
        return <PublishedOpportunitiesList />;
      case 'submissions':
        return <EnhancedSubmissionManager />;
      case 'applications':
        return <ApplicationDetailsManager />;
      case 'users':
        return <UserManagement />;
      case 'user-roles':
        return <UserRoleManager />;
      case 'subscriptions':
        return <UserSubscriptionManager />;
      case 'features':
        return <FeatureTogglePanel />;
      case 'settings':
        return <PlatformSettings />;
      default:
        return <ListingsSubmissionsManager />;
    }
  };

  return (
    <>
      <AdminLayout 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        onCreateOpportunity={() => setShowCreateModal(true)}
      >
        <div className="space-y-6">
          {renderContent()}
        </div>
      </AdminLayout>
      <CreateOpportunityModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSubmit={handleCreateOpportunity}
        onCancel={handleCancelCreate}
        loading={createLoading}
      />
    </>
  );
};

export default Admin;
