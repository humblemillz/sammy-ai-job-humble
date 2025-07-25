

import Admin from './Admin';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import CreateOpportunityModal from './CreateOpportunityModal';


const AdminDashboard = () => {
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

  return (
    <>
      <div className="max-w-2xl mx-auto mt-8 px-4 w-full">
        <div className="bg-white/90 rounded-xl shadow p-6 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#008000] text-center">Admin Dashboard</h1>
          <p className="text-gray-600 text-center mt-2 mb-4">Comprehensive platform management and analytics</p>
        </div>
      </div>

      {/* Buttons above analytics cards */}
      <div className="max-w-4xl mx-auto px-4 w-full flex flex-col md:flex-row gap-3 mb-6 md:justify-center">
        <Button asChild className="bg-[#008000] text-white w-full md:w-auto px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:bg-[#008000]/90 transition-all duration-200">
          <a href="/staff-admin">Staff Admin Dashboard</a>
        </Button>
        <Button className="bg-[#008000] text-white w-full md:w-auto px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:bg-[#008000]/90 transition-all duration-200 flex items-center justify-center gap-2" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Create Opportunity
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <Admin />
      </div>
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

export default AdminDashboard;
