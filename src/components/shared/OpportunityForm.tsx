
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { OpportunityFormData, OpportunityFormProps } from '@/types/opportunity-form';
import { useOpportunityCategories } from '@/hooks/useOpportunityCategories';
import OpportunityBasicFields from '@/components/forms/OpportunityBasicFields';
import OpportunityImageUpload from '@/components/forms/OpportunityImageUpload';
import OpportunityArrayFields from '@/components/forms/OpportunityArrayFields';
import OpportunityFormActions from '@/components/forms/OpportunityFormActions';

const OpportunityForm = ({ 
  mode, 
  userRole, 
  initialData, 
  onSubmit, 
  onCancel, 
  loading = false 
}: OpportunityFormProps) => {
  const { categories } = useOpportunityCategories();
  const [formData, setFormData] = useState<OpportunityFormData>({
    title: '',
    author: '',
    category_id: '',
    preview_text: '',
    description: '',
    organization: '',
    location: '',
    salary_range: '',
    is_remote: false,
    application_deadline: '',
    application_url: '',
    requirements: [],
    benefits: [],
    tags: [],
    featured_image_url: '',
    is_published: false,
    ...initialData
  });

  const isAdmin = userRole === 'admin' || userRole === 'staff_admin';

  const updateFormData = (updates: Partial<OpportunityFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!formData.title || !formData.description || !formData.organization || !formData.category_id) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (isAdmin) {
        const dataToSubmit = isDraft 
          ? { ...formData, is_published: false }
          : formData;
        await onSubmit(dataToSubmit, isDraft);
      } else {
        await onSubmit(formData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form');
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {mode === 'create' ? 'Create' : 'Edit'} Opportunity
          {isAdmin && (
            <Badge variant="outline" className="ml-2">
              Admin Mode
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          <OpportunityBasicFields
            formData={formData}
            categories={categories}
            onUpdate={updateFormData}
          />

          <OpportunityImageUpload
            imageUrl={formData.featured_image_url}
            onImageChange={(url) => updateFormData({ featured_image_url: url })}
          />

          <OpportunityArrayFields
            requirements={formData.requirements || []}
            benefits={formData.benefits || []}
            tags={formData.tags || []}
            onRequirementsChange={(requirements) => updateFormData({ requirements })}
            onBenefitsChange={(benefits) => updateFormData({ benefits })}
            onTagsChange={(tags) => updateFormData({ tags })}
          />

          {/* Admin Controls */}
          {isAdmin && (
            <div className="border-t pt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(checked) => updateFormData({ is_published: checked })}
                />
                <Label>Publish Immediately</Label>
              </div>
            </div>
          )}

          <OpportunityFormActions
            userRole={userRole}
            loading={loading}
            onCancel={onCancel}
            onSubmit={handleSubmit}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default OpportunityForm;
