
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTabs from '@/components/admin/AdminTabs';
import EnhancedSubmissionManager from '@/components/admin/EnhancedSubmissionManager';
import OpportunityManager from '@/components/admin/OpportunityManager';
import UserRoleManager from '@/components/admin/UserRoleManager';
import UserSubscriptionManager from '@/components/admin/UserSubscriptionManager';
import FeatureTogglePanel from '@/components/admin/FeatureTogglePanel';
import PlatformSettings from '@/components/admin/PlatformSettings';
import ScrapingDashboard from '@/components/admin/ScrapingDashboard';
import BulkScrapingManager from '@/components/admin/BulkScrapingManager';
import ApplicationDetailsManager from '@/components/admin/ApplicationDetailsManager';
import ListingsSubmissionsManager from '@/components/admin/ListingsSubmissionsManager';
import PublishedOpportunitiesList from '@/components/admin/PublishedOpportunitiesList';
import SavedOpportunitiesManager from '@/components/admin/SavedOpportunitiesManager';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('listings-submissions');

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
    <AdminLayout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
    >
      <div className="space-y-6">
        {renderContent()}
      </div>
    </AdminLayout>
  );
};

export default Admin;
