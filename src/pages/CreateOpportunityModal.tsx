import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OpportunityForm from '@/components/shared/OpportunityForm';


import { OpportunityFormData } from '@/types/opportunity-form';

interface CreateOpportunityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OpportunityFormData, isDraft?: boolean) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const CreateOpportunityModal: React.FC<CreateOpportunityModalProps> = ({ open, onOpenChange, onSubmit, onCancel, loading }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Opportunity</DialogTitle>
        </DialogHeader>
        <OpportunityForm
          mode="create"
          userRole="admin"
          onSubmit={onSubmit}
          onCancel={onCancel}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateOpportunityModal;
