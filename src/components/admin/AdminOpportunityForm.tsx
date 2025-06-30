
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import OpportunityForm from '@/components/shared/OpportunityForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface OpportunityFormData {
  title: string;
  author: string;
  category_id: string;
  preview_text: string;
  description: string;
  organization: string;
  location?: string;
  salary_range?: string;
  is_remote?: boolean;
  application_deadline?: string;
  application_url?: string;
  requirements?: string[];
  benefits?: string[];
  tags?: string[];
  featured_image_url?: string;
  is_published?: boolean;
}

interface AdminOpportunityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: 'create' | 'edit';
  opportunityId?: string;
  initialData?: Partial<OpportunityFormData>;
}

const AdminOpportunityForm = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  mode = 'create',
  opportunityId,
  initialData 
}: AdminOpportunityFormProps) => {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData: OpportunityFormData, isDraft: boolean = false) => {
    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    setSubmitting(true);
    try {
      const isPublishing = formData.is_published && !isDraft;
      
      const baseOpportunityData = {
        title: formData.title,
        author: formData.author,
        organization: formData.organization,
        description: formData.description,
        category_id: formData.category_id,
        preview_text: formData.preview_text,
        featured_image_url: formData.featured_image_url,
        location: formData.location,
        salary_range: formData.salary_range,
        is_remote: formData.is_remote,
        application_deadline: formData.application_deadline ? new Date(formData.application_deadline).toISOString() : null,
        application_url: formData.application_url,
        requirements: formData.requirements,
        benefits: formData.benefits,
        tags: formData.tags,
        is_published: isPublishing,
        status: 'approved' as const,
        source: 'user_submitted' as const,
        submitted_by: user.id,
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      };

      // Add published_at only if publishing
      const opportunityData = isPublishing 
        ? { ...baseOpportunityData, published_at: new Date().toISOString() }
        : baseOpportunityData;

      if (mode === 'create') {
        const { error } = await supabase
          .from('opportunities')
          .insert(opportunityData);

        if (error) throw error;
        
        const successMessage = isPublishing 
          ? 'Opportunity created and published successfully' 
          : 'Opportunity saved as draft successfully';
        toast.success(successMessage);
      } else {
        const { error } = await supabase
          .from('opportunities')
          .update(opportunityData)
          .eq('id', opportunityId);

        if (error) throw error;
        
        const successMessage = isPublishing 
          ? 'Opportunity updated and published successfully' 
          : 'Opportunity updated successfully';
        toast.success(successMessage);
      }

      // Log admin activity
      await supabase
        .from('admin_activity_logs')
        .insert({
          admin_id: user.id,
          action: mode === 'create' ? 'OPPORTUNITY_CREATED' : 'OPPORTUNITY_UPDATED',
          target_type: 'opportunity',
          target_id: opportunityId,
          details: { 
            title: formData.title, 
            published: isPublishing,
            mode 
          }
        });

      onSuccess();
    } catch (error) {
      console.error('Error saving opportunity:', error);
      toast.error('Failed to save opportunity');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Opportunity' : 'Edit Opportunity'}
          </DialogTitle>
        </DialogHeader>
        
        <OpportunityForm
          mode={mode}
          userRole="admin"
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={submitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdminOpportunityForm;
