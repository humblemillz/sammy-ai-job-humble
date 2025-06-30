
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { OpportunityFormData, Category } from '@/types/opportunity-form';

interface OpportunityBasicFieldsProps {
  formData: OpportunityFormData;
  categories: Category[];
  onUpdate: (updates: Partial<OpportunityFormData>) => void;
}

const OpportunityBasicFields = ({ formData, categories, onUpdate }: OpportunityBasicFieldsProps) => {
  return (
    <>
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Enter opportunity title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author || ''}
            onChange={(e) => onUpdate({ author: e.target.value })}
            placeholder="Author name (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="organization">Organization *</Label>
          <Input
            id="organization"
            value={formData.organization}
            onChange={(e) => onUpdate({ organization: e.target.value })}
            placeholder="Company/Organization name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select 
            value={formData.category_id} 
            onValueChange={(value) => onUpdate({ category_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preview Text - Optional */}
      <div className="space-y-2">
        <Label htmlFor="preview">Preview Text</Label>
        <Textarea
          id="preview"
          value={formData.preview_text || ''}
          onChange={(e) => onUpdate({ preview_text: e.target.value })}
          placeholder="Brief description that appears in listings (optional)..."
          rows={3}
        />
      </div>

      {/* Full Content - Required */}
      <div className="space-y-2">
        <Label htmlFor="description">Full Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Full opportunity description..."
          rows={6}
          required
        />
      </div>

      {/* Additional Details - All Optional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => onUpdate({ location: e.target.value })}
            placeholder="Job location (optional)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Salary Range</Label>
          <Input
            id="salary"
            value={formData.salary_range || ''}
            onChange={(e) => onUpdate({ salary_range: e.target.value })}
            placeholder="e.g., $50,000 - $70,000 (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deadline">Application Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.application_deadline || ''}
            onChange={(e) => onUpdate({ application_deadline: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="url">Application URL</Label>
          <Input
            id="url"
            type="url"
            value={formData.application_url || ''}
            onChange={(e) => onUpdate({ application_url: e.target.value })}
            placeholder="https://company.com/apply (optional)"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.is_remote || false}
          onCheckedChange={(checked) => onUpdate({ is_remote: checked })}
        />
        <Label>Remote Work Available</Label>
      </div>
    </>
  );
};

export default OpportunityBasicFields;
